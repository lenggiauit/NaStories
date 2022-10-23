import React, { useEffect } from "react";
import { useAppContext } from "../../contexts/appContext";
import { dictionaryList } from "../../locales";
import { useRemoveMutation } from "../../services/notification";
import { NotificationResource } from "../../services/resources/notificationResource";

type Props = {
    dataItem: NotificationResource,
    onDelete: (dataItem: NotificationResource) => void,
}

const NotificationItem: React.FC<Props> = ({ dataItem, onDelete }) => {
    const { locale, setLocale } = useAppContext();
    const [removeNotify, removeNotifyStatus] = useRemoveMutation();
     
    return (<>
        <div className="col-md-12 mx-md-auto">
            <div className="alert alert-warning alert-dismissible fade show" role="alert">
              
                {dictionaryList[locale][dataItem.message]}
                <button type="button" onClick={(e) => { removeNotify({payload: dataItem.id }); onDelete(dataItem) }} className="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">×</span>
                </button>
 
            </div>
        </div>
    </>)
}

export default NotificationItem;