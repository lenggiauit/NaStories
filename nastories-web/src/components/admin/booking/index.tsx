import React, { useEffect, useState, useCallback, useRef } from "react";
import { Translation } from "../../translation"; 
import { AppSetting, MetaData, Paging } from "../../../types/type";
import Pagination from "../../pagination";  
import { v4 } from "uuid";
import PageLoading from "../../pageLoading";
import LocalSpinner from "../../localSpinner"; 
import { hasPermission } from "../../../utils/functions"; 
import { PermissionKeys } from "../../../utils/constants"; 
import { EventBookingDate } from "../../../services/models/admin/eventBookingDate";
import { useAddEditEventAvailableDateMutation, useGetEventAvailableDateMutation, useGetPrivateTalkIdByEventBookingDateMutation, useRemoveEventAvailableDateMutation } from "../../../services/admin"; 
 
import FullCalendar, {
  DateSelectArg,
  EventAddArg,
  EventApi,
  EventChangeArg,
  EventClickArg
} from "@fullcalendar/react"; 
import allLocales from "@fullcalendar/core/locales-all";
import interactionPlugin from "@fullcalendar/interaction"; 
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from '@fullcalendar/timegrid'; 
import { ResultCode } from "../../../utils/enums";
import ShowBookingConfirmModal from "./bookingConfirmModal";
import { dictionaryList } from "../../../locales";
import { date } from "yup";
import calcTime from "../../../utils/time";
import dateFormat from "dateformat";

 
const appSetting: AppSetting = require('../../../appSetting.json');

const BookingList: React.FC = () => {
    const [isShowModal, setIsShowModal] = useState<boolean>(false);
    // get list
    const [getBookingList, getBookingStatus] = useGetEventAvailableDateMutation();
    const [addEventAvailableDate, addEventAvailableDateStatus] = useAddEditEventAvailableDateMutation();
    const [removeEventAvailableDate, removeEventAvailableDateStatus] = useRemoveEventAvailableDateMutation();
    const [GetPrivateTalkIdByEventBookingDate, GetPrivateTalkIdByEventBookingDateStatus] = useGetPrivateTalkIdByEventBookingDateMutation();

    const [metaData, setMetaData] = useState<MetaData>({ paging: { index: 1, size: appSetting.PageSize } });
    const [pagingData, setPagingData] = useState<Paging>({ index: 1, size: appSetting.PageSize });
    const [totalRows, setTotalRows] = useState<number>(0);
    const [isArchived, setIsArchived] = useState<boolean>(false);
    const [BookingList, setBookingList] = useState<EventBookingDate[]>([]);
    const [events, setEvents] = useState<any[]>([]);
    const [selecttedBooking, setSelecttedBooking] = useState<EventBookingDate>();
    const [calendarView, setCalendarView] = useState<string>("dayGridMonth");
    
    useEffect(() => {

        getBookingList({ payload: null });

    }, []);

    useEffect(() => {

        if(GetPrivateTalkIdByEventBookingDateStatus.data  && GetPrivateTalkIdByEventBookingDateStatus.data.resource != '00000000-0000-0000-0000-000000000000'){
             
            window.open(appSetting.SiteUrl + "admin/private-talk/" + GetPrivateTalkIdByEventBookingDateStatus.data.resource);
        }

    }, [GetPrivateTalkIdByEventBookingDateStatus]);

    useEffect(()=>{
        if(getBookingStatus.data?.resultCode == ResultCode.Success){

          var a =  getBookingStatus.data.resource.map((i) =>{
                return { title: i.title, start: i.start, end: i.end }
            });
            setEvents(a);
        } 

    }, [getBookingStatus]);

    const [currentEvents, setCurrentEvents] = useState<EventApi[]>([]);
    const handleEvents = useCallback(
        (events: EventApi[]) => setCurrentEvents(events),
        []
      );

      const handleDateSelect = useCallback((selectInfo: DateSelectArg) => {
        let calendarApi = selectInfo.view.calendar;
        if( calendarApi.view.type == "timeGrid"){
            let title = "New"; 
            calendarApi.addEvent({
                id: v4(),
                title,
                start: selectInfo.startStr,
                end: selectInfo.endStr, 
            }); 
        }
        else{ 
            calendarApi.changeView("timeGrid", selectInfo.start); 
        }
        
      }, []);
 
    const handleEventClick = useCallback((clickInfo: EventClickArg) => { 
         
        ShowBookingConfirmModal({
            message1: `Title: ${clickInfo.event.title}`,
            message2: `Canada time: ${clickInfo.event.start?.toLocaleString()}`,
            message3: `VN Time: ${dateFormat(calcTime(new Date(clickInfo.event.start!), 7), "mm/dd/yyyy - h:MM:ss TT")}`,
            onDelete: () => {
                removeEventAvailableDate({ payload: { id: clickInfo.event.id}});
                clickInfo.event.remove(); 
            },
            onView: () =>{

                GetPrivateTalkIdByEventBookingDate({payload: {eventBookingDateId : clickInfo.event.id }});

            },
            onSave:()=>{
                let calendarApi = clickInfo.view.calendar;
                var event = calendarApi.getEventById(clickInfo.event.id);
                if(event != null){
                    event.setProp("title",  "Available time");
                } 

                addEventAvailableDate({ payload: { id: clickInfo.event.id, title: "Available time", start: clickInfo.event.startStr, end: clickInfo.event.endStr  }});  
            }
        }); 
      }, []);
  
    return (<>
        {getBookingStatus.isLoading && <PageLoading />}
        
        <section className="section overflow-hidden bg-gray">
            <div className="container">
                <header className="section-header mb-0">
                    <h2><Translation tid="heading_bookingdateList" /></h2>
                    <hr /> 
                </header> 
                <div>  
                {getBookingStatus.data != null && getBookingStatus.data?.resultCode == ResultCode.Success &&  
                <FullCalendar  
                    headerToolbar= {{
                        left: 'prev,next today',
                        center: 'title',
                        right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
                    }}
                    //timeZone={"UTC"}
                    plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
                    initialView={calendarView}
                    selectable={true}
                    editable={true}  
                    initialEvents={ getBookingStatus.data.resource }
                    locales={allLocales}
                    locale="en"
                    eventsSet={handleEvents}
                    select={handleDateSelect}  
                    eventClick={handleEventClick} 
                    />
                }
                </div> 
            </div>
        </section>
    </>)
}

export default BookingList;


 

 