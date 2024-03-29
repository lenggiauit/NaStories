import dateFormat from "dateformat";
import React, { useCallback, useEffect, useState } from "react"; 
import { useAppContext } from "../../../contexts/appContext";
import { dictionaryList } from "../../../locales";
import { useRemoveMockInterviewMutation, useRequestChangeMockInterviewMutation } from "../../../services/account";
import { useGetEventBookingAvaiableDateQuery } from "../../../services/event";
import { EventBookingDateResource } from "../../../services/resources/eventBookingDateResource";
import { MockInterviewResource } from "../../../services/resources/mockInterviewResource";
import { ResultCode } from "../../../utils/enums";
import calcTime from "../../../utils/time";
 
import showConfirmModal from "../../modal";
import showDialogModal from "../../modal/showModal";
import PageLoading from "../../pageLoading";
import { Translation } from "../../translation";
import showDeleteConfirmModal from "./modalDelete";
import showRequestChangeModal from "./modalRequestChange";
 
type Props = {
    dataItem: MockInterviewResource,
    bookingDate: EventBookingDateResource[],
    onSelected: (dataItem: MockInterviewResource) => void,
    onRequestChange: (dataItem: MockInterviewResource) => void,
    onDeleted: (dataItem: MockInterviewResource) => void,
}

const UserMockInterviewItem: React.FC<Props> = ({ dataItem, bookingDate, onSelected, onRequestChange, onDeleted }) => {
    
    const { locale } = useAppContext();
    const [RemoveMockInterview, RemoveMockInterviewStatus] = useRemoveMockInterviewMutation();
    const [RequestChangeMockInterview, RequestChangeMockInterviewStatus] = useRequestChangeMockInterviewMutation();

    const [isDeleted, setIsDeleted] = useState(false);
    const [isRequestChanged, setIsRequestChanged] = useState(false);
     
    const onDeleteMockInterview = useCallback((e)  => {
        e.preventDefault();
        showDeleteConfirmModal({
            message: dictionaryList[locale]["deleteMocinterview_msg"],
            onConfirm: (r) => {
                RemoveMockInterview({ payload: {id: dataItem.id, reason: r } });
                setIsDeleted(true);
                onDeleted(dataItem);
            }
        });
    }, []);

    const onRequestChangeMockInterview = useCallback((e)  => {
        e.preventDefault();  
        showRequestChangeModal({
            message: dictionaryList[locale]["requestChangeMockInterview_msg"],
            bookingDate: bookingDate,
            onConfirm: (bookingId, r) => {
                RequestChangeMockInterview({ payload: {eventId: dataItem.id, eventBookingDateId: bookingId, reason: r } });
                setIsRequestChanged(true); 
            }
        });
    }, []);

    useEffect(() => {
        if (RequestChangeMockInterviewStatus.data && RequestChangeMockInterviewStatus.data.resultCode == ResultCode.Success) {
            onRequestChange(dataItem);
            showDialogModal({ 
                message: dictionaryList[locale]["requestChangeMockInterviewSuccess_msg"]
            });
        }

    }, [RequestChangeMockInterviewStatus]);
 
    return (<>
        {(RequestChangeMockInterviewStatus.isLoading || RemoveMockInterviewStatus.isLoading ) && <PageLoading />}
        <div className={`col-md-12`} >
            <div className="row admin-post-item border-top border-light p-2">
                 
                <div className="col-md-3 text-left">
                <a href="#" onClick={(e) => { e.preventDefault(); onSelected(dataItem) }}> 
                    {dataItem.code}
                    </a>
                </div>
                {/* <div className="col-md-2 text-center">
                    {dataItem.redeemCode}
                </div> */}
                <div className="col-md-3 text-center">
                    {dataItem.eventBookingDate ? dateFormat(dataItem.eventBookingDate.start, "mmm dd, yyyy - HH:MM") + " Vietnam"  : "---"}
                </div>
                <div className="col-md-3 text-center">
                    {dataItem.eventStatus}
                    {dataItem.eventRequestChangeReason != null && dataItem.eventStatus == "Chờ xác nhận" && <br /> }
                    {dataItem.eventRequestChangeReason != null && dataItem.eventStatus == "Chờ xác nhận" && 

                         dataItem.eventRequestChangeReason.eventBookingDate != null &&
                          "(" + dateFormat(dataItem.eventRequestChangeReason.eventBookingDate.start, "mmm dd, yyyy - HH:MM") + ")"
                    
                    }
                    {dataItem.eventRequestChangeReason != null && dataItem.eventStatus == "Chờ xác nhận" && 

                    dataItem.eventRequestChangeReason.eventBookingDate == null &&
                    "(Chưa xác định ngày)" 
                    }
                </div>
                <div className="col-md-3 text-right" >
                    {((dataItem.isEnableRequestChange && !isRequestChanged) && !isDeleted) && 
                        <a className="btn btn-xs btn-round btn-success mr-1" href="#" onClick={onRequestChangeMockInterview} ><Translation tid="action_mockinterview_requestchangetime" /></a> 
                    }
                    {(dataItem.isEnableDelete && !isDeleted) &&
                    <a className="btn btn-xs btn-round btn-danger" href="#" onClick={onDeleteMockInterview}><Translation tid="btnCancel" /></a>
                    }
                </div>
            </div>
        </div>
    </>)
}

export default UserMockInterviewItem;