import React, { ReactElement, useCallback } from "react";
import { v4 } from "uuid";
import { useGetPrivateTalkListQuery } from "../../../services/account";
import { useGetEventBookingAvaiableDateQuery } from "../../../services/event";
import { PrivateTalkResource } from "../../../services/resources/privateTalkResource";
import { ResultCode } from "../../../utils/enums";
import { Translation } from "../../translation";
import UserPrivateTalkItem from "./item";
import showPrivateTalkModal from "./modalDetail";



const UserPrivateTalkList: React.FC = (): ReactElement => {

    const getPrivateTalkListQueryStatus = useGetPrivateTalkListQuery({ payload: {} });
    
    const getEventBookingAvaiableDateQueryStatus = useGetEventBookingAvaiableDateQuery({ payload: null });

    const onSelectedHandler = useCallback((dataDetail: PrivateTalkResource)=>{
        showPrivateTalkModal({
            title: dataDetail.eventBookingDate != null ? dataDetail.eventBookingDate.title: " Private Talk - " + dataDetail.fullName,
            data: dataDetail
        });

    }, []);

    

    return (
        <>
            <section className="section">
                <div className="container">
                    <header className="section-header">
                        <h2><Translation tid="header_private_talk_title" /></h2>
                        <hr />
                    </header>
                    <div data-provide="shuffle">
                        <div className="row gap-y gap-2" data-shuffle="list">
                            <div className="col-md-12">
                                <div className="row admin-post-header">
                                    <div className="col-5">
                                        Title
                                    </div>
                                    <div className="col-2">
                                        Start date
                                    </div>
                                    <div className="col-1">
                                        Status
                                    </div> 
                                    <div className="col-4">
                                        Action
                                    </div>
                                </div>
                            </div>

                        </div>
                        {getPrivateTalkListQueryStatus.data && getPrivateTalkListQueryStatus.data.resultCode== ResultCode.Success && 
                         getEventBookingAvaiableDateQueryStatus.data != null && getEventBookingAvaiableDateQueryStatus.data.resultCode== ResultCode.Success
                           && getPrivateTalkListQueryStatus.data.resource
                            .map(p => 
                                <UserPrivateTalkItem key={v4()} dataItem={p} bookingDate={getEventBookingAvaiableDateQueryStatus.data!.resource} onSelected={onSelectedHandler} onDeleted={() =>{}} onRequestChange={() =>{}} />
                            )
                        }
                         
                    </div>
                </div>
            </section>
        </>
    );
}

export default UserPrivateTalkList;