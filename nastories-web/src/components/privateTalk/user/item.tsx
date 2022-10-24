import dateFormat from "dateformat";
import React, { useCallback, useEffect, useState } from "react"; 
import { useAppContext } from "../../../contexts/appContext";
import { dictionaryList } from "../../../locales";
import { useRemovePrivateTalkMutation, useRequestChangePrivateTalkMutation } from "../../../services/account";
import { useGetEventBookingAvaiableDateQuery } from "../../../services/event";
import { EventBookingDateResource } from "../../../services/resources/eventBookingDateResource";
import { PrivateTalkResource } from "../../../services/resources/privateTalkResource";
import calcTime from "../../../utils/time";
import showConfirmModal from "../../modal";
import showDialogModal from "../../modal/showModal";
import { Translation } from "../../translation";
import showDeleteConfirmModal from "./modalDelete";
import showRequestChangeModal from "./modalRequestChange";

type Props = {
    dataItem: PrivateTalkResource,
    bookingDate: EventBookingDateResource[],
    onSelected: (dataItem: PrivateTalkResource) => void,
    onRequestChange: (dataItem: PrivateTalkResource) => void,
    onDeleted: (dataItem: PrivateTalkResource) => void,
}

const UserPrivateTalkItem: React.FC<Props> = ({ dataItem, bookingDate, onSelected, onRequestChange, onDeleted }) => {
    
    const { locale } = useAppContext();
    const [RemovePrivateTalk, RemovePrivateTalkStatus] = useRemovePrivateTalkMutation();
    const [RequestChangePrivateTalk, RequestChangePrivateTalkStatus] = useRequestChangePrivateTalkMutation();

    const [isDeleted, setIsDeleted] = useState(false);
    const [isRequestChanged, setIsRequestChanged] = useState(false);
     
    const onDeletePrivateTalk = useCallback((e)  => {
        e.preventDefault();
        showDeleteConfirmModal({
            message: dictionaryList[locale]["deletePrivateTalkmsg"],
            onConfirm: (r) => {
                RemovePrivateTalk({ payload: {id: dataItem.id, reason: r } });
                setIsDeleted(true);
                onDeleted(dataItem);
            }
        });
    }, []);

    const onRequestChangePrivateTalk = useCallback((e)  => {
        e.preventDefault();  
        showRequestChangeModal({
            message: dictionaryList[locale]["requestChangePrivateTalk_msg"],
            bookingDate: bookingDate,
            onConfirm: (bookingId, r) => {
                RequestChangePrivateTalk({ payload: {eventId: dataItem.id, eventBookingDateId: bookingId, reason: r } });
                setIsRequestChanged(true);
                onRequestChange(dataItem);
                showDialogModal({ 
                    message: dictionaryList[locale]["requestChangePrivateTalkSuccess_msg"]
                });
            }
        });
    }, []);

    

    return (<>
        <div className={`col-md-12 ${isDeleted ? "hide": ""}`} >
            <div className="row admin-post-item border-top border-light p-2">
                <div className="col-md-3">
                    <a href="#" onClick={(e) => { e.preventDefault(); onSelected(dataItem) }}> 
                        { dataItem.eventBookingDate ? dataItem.eventBookingDate.title : dataItem.fullName }
                    </a>
                </div>
                <div className="col-md-2 text-center">
                    {dataItem.code}
                </div>
                <div className="col-md-1 text-center">
                    {dataItem.redeemCode}
                </div>
                <div className="col-md-2 text-center">
                    {dataItem.eventBookingDate ? dateFormat(calcTime(new Date(dataItem.eventBookingDate.start), 7), "dd/mm/yyyy - h:MM:ss TT") + " VietNam"   : "---"}
                </div>
                <div className="col-md-1 text-center">
                    {dataItem.eventStatus}
                </div>
                <div className="col-md-3 text-right" >
                    {(dataItem.isEnableRequestChange && !isRequestChanged) && 
                        <a className="btn btn-xs btn-round btn-success mr-1" href="#" onClick={onRequestChangePrivateTalk} ><Translation tid="action_privatetalk_requestchangetime" /></a> 
                    }
                    <a className="btn btn-xs btn-round btn-danger" href="#" onClick={onDeletePrivateTalk}><Translation tid="btnCancel" /></a>
                </div>
            </div>
        </div>
    </>)
}

export default UserPrivateTalkItem;