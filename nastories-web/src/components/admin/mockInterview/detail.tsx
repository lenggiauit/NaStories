import dateFormat from "dateformat";
import React, { useCallback, useEffect, useState } from "react"; 
import { matchPath, Redirect, useHistory, useParams, useRouteMatch } from "react-router-dom";
import { useAppContext } from "../../../contexts/appContext";
import { dictionaryList } from "../../../locales";
import { useRemoveMockInterviewMutation, useRequestChangeMockInterviewMutation } from "../../../services/account";
import { useCancelMockInterviewMutation, useGetEventAvailableDateQueryQuery, useGetMockInterviewDetailQuery, useUpdateMockInterviewStatusMutation } from "../../../services/admin"; 
import { EventBookingDateResource } from "../../../services/resources/eventBookingDateResource";
import { MockInterviewResource } from "../../../services/resources/mockInterviewResource";
import { AppSetting } from "../../../types/type";
import { MockInterviewEnumStatus } from "../../../utils/constants";
import { ResultCode } from "../../../utils/enums";
import calcTime from "../../../utils/time";
import showConfirmModal from "../../modal";
import showDialogModal from "../../modal/showModal";
import NotFound from "../../notFound";
import PageLoading from "../../pageLoading";
import { Translation } from "../../translation"; 
const appSetting: AppSetting = require('../../../appSetting.json');



const AdminMockInterviewDetail: React.FC = () => {
    let history = useHistory();
    const route = useRouteMatch();
    const { id }: any = useParams();
    const match = matchPath(route.url, {
        path: "/admin/mock-interview/:id",
        exact: true,
        strict: false
    });

    useEffect(() => {
        if (match == null) {
            window.location.href = "/notfound"; 
        }
         
    }, [])

    const getdetailStatus = useGetMockInterviewDetailQuery({ payload: id });
    const [UpdateMockInterview, UpdateMockInterviewStatus] = useUpdateMockInterviewStatusMutation();
    const [CancelMockInterview, CancelMockInterviewStatus] = useCancelMockInterviewMutation();

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
        UpdateMockInterview({payload: { id: getdetailStatus.data?.resource.id, status: eventStatus, eventBookingDateId: eventDateId }}); 
    }, [eventStatus, eventDateId]);

    const handleOnCancel = useCallback(() =>{
        CancelMockInterview({payload: { id: id }}); 
    }, []);
    
    useEffect(()=>{
        if(CancelMockInterviewStatus.data && CancelMockInterviewStatus.data.resultCode == ResultCode.Success)
        { 
            showDialogModal({ message : "Cập nhật thành công" });
        } 
    }, [CancelMockInterviewStatus]);

    useEffect(()=>{
        if(UpdateMockInterviewStatus.data && UpdateMockInterviewStatus.data.resultCode == ResultCode.Success)
        {
            setEventStatus(null);
            setEventDateId(null);
            showDialogModal({ message : "Cập nhật thành công" });
        }
        

    }, [UpdateMockInterviewStatus]);
  
    return (<>
        {getdetailStatus.isLoading && <PageLoading />}
        {getdetailStatus.isSuccess && getdetailStatus.data.resultCode == ResultCode.Success && getdetailStatus.data.resource != null && <>
            
            <div className="section">
                <div className="container">
                    <a href="#" onClick={() => window.location.href = appSetting.SiteUrl + "admin/mock-interview" }> Back </a>
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
                                <td>Language:</td>
                                <td>{getdetailStatus.data.resource.language}</td>
                            </tr>
                            <tr className="border-top border-light">
                                <td>Resume:</td>
                                <td><a target="_blank" href={getdetailStatus.data.resource.resume}>Download</a></td>
                            </tr>
                            <tr className="border-top border-light">
                                <td>Cover letter:</td>
                                <td><a target="_blank" href={getdetailStatus.data.resource.coverLetter}>Download</a></td>
                            </tr>
                            <tr className="border-top border-light">
                                <td>Job description:</td>
                                <td><a target="_blank" href={getdetailStatus.data.resource.jobDescription}>Download</a></td>
                            </tr>
                            <tr className="border-top border-light">
                                <td>Note:</td>
                                <td>{getdetailStatus.data.resource.note}</td>
                            </tr>
                            <tr className="border-top border-light">
                                <td>Status:</td>
                                <td colSpan={2}>  
                                    <select name="eventStatus" className="form-control form-control-sm" onChange={(e)=>{ setEventStatus(e.target.value) }}> 
                                        {Object.keys(MockInterviewEnumStatus).map((status) => 
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
                            <button className="btn btn-secondary " onClick={() => window.location.href = appSetting.SiteUrl + "admin/mock-interview" }>Back to list</button>
                            <button className="btn btn-primary ml-2" onClick={handleOnSaveChange} disabled={!(eventStatus != null || eventDateId != null)} > Save change</button>
                            <button className="btn btn-danger ml-2" onClick={handleOnCancel} > Hủy ngày</button>
                            </div>
                        </div>
                    </div>  
                </div>
            </div>
        </>} 
    </>) 
     
}

export default AdminMockInterviewDetail;