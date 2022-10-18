import React, { ReactElement, useState } from "react";
import { useGetNotificationQuery, useRemoveAllMutation } from "../../services/notification";
import { ResultCode } from "../../utils/enums";
import { Translation } from "../translation";
import NotificationItem from "./item";




const NotificationList: React.FC = (): ReactElement => {

    const getNotificationQueryStatus = useGetNotificationQuery({ payload: {} });
    const [removeAllNotify, removeAllNotifyStatus] = useRemoveAllMutation();
    const [isRemoveAll, setIsRemoveAll] = useState(false);
    return (
        <>
            <section className="section bg-gray">
                <div className="container">
                    <header className="section-header">
                        <small></small>
                        <h2><Translation tid="header_notification_title" /></h2>
                        <hr />

                    </header>
                    {isRemoveAll || (getNotificationQueryStatus.data && getNotificationQueryStatus.data.resultCode == ResultCode.Success &&
                        getNotificationQueryStatus.data.resource.length > 0) &&
                        <div className="row text-right mb-2">
                            <div className="col">
                                <button type="button" className="btn btn-link" onClick={(e) => { removeAllNotify({ payload: {} }); setIsRemoveAll(true); }}>Remove all</button>
                            </div>
                        </div>
                    }
                    <div className="row">
                        {!isRemoveAll && getNotificationQueryStatus.data && getNotificationQueryStatus.data.resultCode == ResultCode.Success &&
                            getNotificationQueryStatus.data.resource
                                .map(notify =>
                                    <NotificationItem dataItem={notify} onDelete={() => { }} />
                                )
                        }
                        {getNotificationQueryStatus.data && getNotificationQueryStatus.data.resultCode == ResultCode.Success &&
                            getNotificationQueryStatus.data.resource.length == 0 &&
                            <>
                                <div className="col text-center">
                                    <p className="lead "><small><Translation tid="notification_notfound" /></small></p>
                                </div>
                            </>
                        }
                    </div>

                </div>
            </section>

        </>
    );
}

export default NotificationList;