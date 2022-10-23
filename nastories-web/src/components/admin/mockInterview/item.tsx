import dateFormat from "dateformat";
import React, { useCallback, useEffect, useState } from "react"; 
import { useAppContext } from "../../../contexts/appContext";
import { dictionaryList } from "../../../locales";
import { useRemoveMockInterviewMutation, useRequestChangeMockInterviewMutation } from "../../../services/account";
import { useGetEventBookingAvaiableDateQuery } from "../../../services/event";
import { MockInterview } from "../../../services/models/admin/mockInterview";
import { EventBookingDateResource } from "../../../services/resources/eventBookingDateResource";
import { MockInterviewResource } from "../../../services/resources/mockInterviewResource";
import { AppSetting } from "../../../types/type";
import showConfirmModal from "../../modal";
import showDialogModal from "../../modal/showModal";
import { Translation } from "../../translation"; 
const appSetting: AppSetting = require('../../../appSetting.json');

type Props = {
    dataItem: MockInterview, 
    onSelected: (dataItem: MockInterview) => void,
    
}

const AdminMockInterviewItem: React.FC<Props> = ({ dataItem, onSelected }) => {
 
    return (<>
        <div className={`col-md-12`} >
            <div className="row admin-post-item border-top border-light p-2">
                <div className="col-md-4">
                    <a href="#" onClick={(e) => { e.preventDefault(); onSelected(dataItem) }}> 
                        { dataItem.eventBookingDate ? dataItem.eventBookingDate.title : dataItem.fullName }
                    </a>
                </div>
                <div className="col-md-2 text-center">
                    {dataItem.email}
                </div>
                <div className="col-md-2 text-center"> 
                    {dataItem.eventBookingDate ? dateFormat( dataItem.eventBookingDate.start, "dd, mm, yyyy - h:MM:ss TT") : "---"}
                </div>
                <div className="col-md-2 text-center">
                    {dataItem.eventStatus}
                </div>
                <div className="col-md-2 text-center" > 
                     <a className="btn btn-xs btn-round btn-primary" href={`${appSetting.SiteUrl}admin/mock-interview/${dataItem.id}`}  >View full</a>
                </div>
            </div>
        </div>
    </>)
}

export default AdminMockInterviewItem;