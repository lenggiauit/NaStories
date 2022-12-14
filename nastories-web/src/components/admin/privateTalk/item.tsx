import dateFormat from "dateformat";
import React, { useCallback, useEffect, useState } from "react"; 
import { useAppContext } from "../../../contexts/appContext";
import { dictionaryList } from "../../../locales";
import { useRemovePrivateTalkMutation, useRequestChangePrivateTalkMutation } from "../../../services/account";
import { useGetEventBookingAvaiableDateQuery } from "../../../services/event";
import { EventBookingDateResource } from "../../../services/resources/eventBookingDateResource";
import { PrivateTalkResource } from "../../../services/resources/privateTalkResource";
import { AppSetting } from "../../../types/type";
import { PrivateTalkEnumStatus } from "../../../utils/constants";
import {  getPrivateTalkEnumStatusName } from "../../../utils/functions";
import showConfirmModal from "../../modal";
import showDialogModal from "../../modal/showModal";
import { Translation } from "../../translation";
import showDeleteConfirmModal from "./modalDelete";
import showRequestChangeModal from "./modalRequestChange";
const appSetting: AppSetting = require('../../../appSetting.json');

type Props = {
    dataItem: PrivateTalkResource, 
    onSelected: (dataItem: PrivateTalkResource) => void,
    
}

const AdminPrivateTalkItem: React.FC<Props> = ({ dataItem, onSelected }) => {
 
    return (<>
        <div className={`col-md-12`} >
            <div className="row admin-post-item border-top border-light p-2"> 
                <div className="col-2">
                    <a href="#" onClick={(e) => { e.preventDefault(); onSelected(dataItem) }}> 
                    {dataItem.code}
                    </a>
                </div>
                <div className="col-2">
                    {dataItem.redeemCode}
                </div>
                <div className="col-md-2 text-center">
                    {dataItem.email}
                </div>
                <div className="col-md-2 text-center"> 
                    {dataItem.eventBookingDate ? dateFormat( dataItem.eventBookingDate.start, "mmm dd, yyyy - HH:MM") : "---"}
                </div>
                <div className="col-md-2 text-center">
                    {getPrivateTalkEnumStatusName("" + dataItem.eventStatus + "")} 
                </div>
                <div className="col-md-2 text-center" > 
                     <a className="btn btn-xs btn-round btn-primary" href={`${appSetting.SiteUrl}admin/private-talk/${dataItem.id}`}  >View full</a>
                </div>
            </div>
        </div>
    </>)
}

export default AdminPrivateTalkItem;