import dateFormat from "dateformat";
import React, { useCallback, useEffect, useState } from "react"; 
import { matchPath, Redirect, useHistory, useParams, useRouteMatch } from "react-router-dom";
import { useAppContext } from "../../../contexts/appContext";
import { dictionaryList } from "../../../locales";
import { useRemovePrivateTalkMutation, useRequestChangePrivateTalkMutation } from "../../../services/account";
import { useGetEventAvailableDateQueryQuery, useGetPrivateTalkDetailQuery, useUpdatePrivateTalkStatusMutation } from "../../../services/admin"; 
import { EventBookingDateResource } from "../../../services/resources/eventBookingDateResource";
import { PrivateTalkResource } from "../../../services/resources/privateTalkResource";
import { AppSetting } from "../../../types/type";
import { PrivateTalkEnumStatus } from "../../../utils/constants";
import { ResultCode } from "../../../utils/enums";
import calcTime from "../../../utils/time";
import showConfirmModal from "../../modal";
import showDialogModal from "../../modal/showModal";
import NotFound from "../../notFound";
import PageLoading from "../../pageLoading";
import { Translation } from "../../translation";
import showDeleteConfirmModal from "./modalDelete";
import showRequestChangeModal from "./modalRequestChange";
const appSetting: AppSetting = require('../../../appSetting.json');



const AdminPrivateTalkDetail: React.FC = () => {
    let history = useHistory();
    const route = useRouteMatch();
    const { id }: any = useParams();
    const match = matchPath(route.url, {
        path: "/admin/private-talk/:id",
        exact: true,
        strict: false
    });

    useEffect(() => {
        if (match == null) {
            window.location.href = "/notfound"; 
        }
         
    }, [])

    const getdetailStatus = useGetPrivateTalkDetailQuery({ payload: id });
    const [UpdatePrivateTalk, UpdatePrivateTalkStatus] = useUpdatePrivateTalkStatusMutation();

    const getEventBookingAvaiableDateQueryStatus = useGetEventAvailableDateQueryQuery({ payload: null });

    const [eventStatus, setEventStatus] = useState<string | null>(null);
    const [eventDateId, setEventDateId] = useState<string | null>(null);

    const [bookingId, setBookingId] = useState<string>("");

    useEffect(()=>{
        if(getdetailStatus.isSuccess && getdetailStatus.data.resultCode == ResultCode.Success && getdetailStatus.data.resource != null){
            //setEventStatus(getdetailStatus.data.resource.eventStatus);
        }

    }, [getdetailStatus]);

    useEffect(()=>{
        if(getdetailStatus.isSuccess && getdetailStatus.data.resultCode == ResultCode.Success && getdetailStatus.data.resource != null){
           
            if(getEventBookingAvaiableDateQueryStatus.isSuccess && getEventBookingAvaiableDateQueryStatus.data.resultCode == ResultCode.Success && getEventBookingAvaiableDateQueryStatus.data.resource != null){
                if(getdetailStatus.data.resource.eventRequestChangeReason?.eventBookingDate != null)
                {
                    setBookingId(getdetailStatus.data.resource.eventRequestChangeReason.eventBookingDate?.id);
                }
                else{
                    setBookingId(getdetailStatus.data.resource.eventBookingDate?.id);
                }
            }

        }

    }, [getdetailStatus, getEventBookingAvaiableDateQueryStatus]);

    const handleOnSaveChange = useCallback(() =>{
        UpdatePrivateTalk({payload: { id: getdetailStatus.data?.resource.id, status: eventStatus, eventBookingDateId: eventDateId }}); 
    }, [eventStatus, eventDateId]);


    useEffect(()=>{
        if(UpdatePrivateTalkStatus.data && UpdatePrivateTalkStatus.data.resultCode == ResultCode.Success)
        {
            setEventStatus(null);
            setEventDateId(null);
            showDialogModal({ message : "Cập nhật thành công" });
        }
        

    }, [UpdatePrivateTalkStatus]);
  
    return (<>
        {getdetailStatus.isLoading && <PageLoading />}
        {getdetailStatus.isSuccess && getdetailStatus.data.resultCode == ResultCode.Success && getdetailStatus.data.resource != null && <>
            
            <div className="section">
                <div className="container">
                    <a href="#" onClick={() => window.location.href = appSetting.SiteUrl + "admin/private-talk" }> Back </a>
                    <div className="text-center">
                        <h2>{getdetailStatus.data.resource.eventBookingDate ? getdetailStatus.data.resource .eventBookingDate.title : getdetailStatus.data.resource .fullName }</h2> 
                    </div>
                    <div className="mt-6">
                    <table style={{width: "100%" }}>
                            <tr>
                                <td style={{width: "150px"}}>Full name:</td>
                                <td colSpan={2}>{getdetailStatus.data.resource.fullName}</td>
                            </tr>  
                            <tr className="border-top border-light">
                                <td>Email:</td>
                                <td colSpan={2}>{getdetailStatus.data.resource.email}</td>
                            </tr>
                            <tr className="border-top border-light">
                                <td>Start Date:</td>
                                <td colSpan={2}>
                                <select name="eventStartDateId" onChange={(e)=>{ setEventDateId(e.target.value) }}
                                        className="form-control" placeholder="Booking date"> 
                                        <option value="" label="Chọn ngày">Chọn ngày</option>
                                        {getEventBookingAvaiableDateQueryStatus.data != null &&
                                            getEventBookingAvaiableDateQueryStatus.data.resultCode == ResultCode.Success && 
                                            getEventBookingAvaiableDateQueryStatus.data.resource.map((b) => (
                                                <option key={b.id} value={b.id} selected={ getdetailStatus.data.resource.eventBookingDate?.id == b.id} > 
                                                    {dateFormat( b.start, "dd, mm, yyyy - h:MM:ss TT")} 
                                                </option>
                                            ))}  
                                </select> 
                                </td>
                            </tr> 
                            
                            <tr className="border-top border-light">
                                <td>Độ tuổi:</td>
                                <td colSpan={2}>{getdetailStatus.data.resource.ageRange}</td>
                            </tr>
                            <tr className="border-top border-light">
                                <td>Vấn đề:</td>
                                <td colSpan={2}>{getdetailStatus.data.resource.problem}</td>
                            </tr>
                            <tr className="border-top border-light">
                                <td>Mô tả vấn đề:</td>
                                <td colSpan={2}>{getdetailStatus.data.resource.problemDescription}</td>
                            </tr>
                            <tr className="border-top border-light">
                                <td>Giải pháp:</td>
                                <td colSpan={2}>{getdetailStatus.data.resource.yourSolutionDescription}</td>
                            </tr>
                            <tr className="border-top border-light">
                                <td>Mong muốn:</td>
                                <td colSpan={2}>{getdetailStatus.data.resource.yourExpectationDescription}</td>
                            </tr>
                            <tr className="border-top border-light">
                                <td>Status:</td>
                                <td colSpan={2}>  
                                    <select name="eventStatus" className="form-control form-control-sm" onChange={(e)=>{ setEventStatus(e.target.value) }}> 
                                        {Object.keys(PrivateTalkEnumStatus).map((status) => 
                                        (
                                            <option value={status} selected={ getdetailStatus.data.resource.eventStatus == status} >{status}</option>
                                        )
                                        )}
                                    </select> 
                                </td> 
                            </tr>
                            {getdetailStatus.data.resource.eventCancelReason != null &&
                                <tr className="border-top border-light">
                                    <td>Cancel Reason:</td>
                                    <td colSpan={2}>
                                        {getdetailStatus.data.resource.eventCancelReason.reason} 
                                        
                                    </td> 
                                </tr> 
                            }
                            {getdetailStatus.data.resource.eventRequestChangeReason != null &&
                                <tr className="border-top border-light">
                                    <td>Request change Reason:</td>
                                    <td colSpan={2}>
                                        {getdetailStatus.data.resource.eventRequestChangeReason.reason}  
                                        <br />
                                        <select name="eventBookingDateId"
                                                className="form-control" placeholder="Booking date">
                                                <option value="" label="Na's Stories sẽ chọn ngày sớm nhất có thể">Na's Stories sẽ chọn ngày sớm nhất có thể</option>
                                                {getEventBookingAvaiableDateQueryStatus.data != null &&
                                                 getEventBookingAvaiableDateQueryStatus.data.resultCode == ResultCode.Success && 
                                                    getEventBookingAvaiableDateQueryStatus.data.resource.map((b) => (
                                                        <option key={b.id} value={b.id} selected={ bookingId == b.id} >{dateFormat(calcTime(new Date(b.start), 7), "dd, mm, yyyy - h:MM:ss TT") + " VietNam"}</option>
                                                    ))}  
                                        </select>
                                    </td> 
                                </tr> 
                            }
                        </table>
                        <hr />
                        <div className="row">
                            <div className="col-md-12 text-center">
                            <button className="btn btn-secondary " onClick={() => window.location.href = appSetting.SiteUrl + "admin/private-talk" }>Back to list</button>
                            <button className="btn btn-primary ml-2" onClick={handleOnSaveChange} disabled={!(eventStatus != null || eventDateId != null)} > Save change</button>
                            </div>
                        </div>
                    </div>  
                </div>
            </div>
        </>} 
    </>) 
     
}

export default AdminPrivateTalkDetail;