import React, { ReactElement, useCallback } from "react";
import { v4 } from "uuid";
import { useGetMockInterviewListQuery } from "../../../services/account";
import { useGetEventBookingAvaiableDateQuery } from "../../../services/event";
import { MockInterviewResource } from "../../../services/resources/mockInterviewResource"; 
import { ResultCode } from "../../../utils/enums";
import PageLoading from "../../pageLoading";
import { Translation } from "../../translation";
import UserMockInterviewItem from "./item";
import showMockInterviewModal from "./modalDetail";
 


const UserMockInterviewList: React.FC = (): ReactElement => {

    const getMockInterviewListQueryStatus = useGetMockInterviewListQuery({ payload: {} });
    
    const getEventBookingAvaiableDateQueryStatus = useGetEventBookingAvaiableDateQuery({ payload: null });

    const onSelectedHandler = useCallback((dataDetail: MockInterviewResource)=>{
        showMockInterviewModal({
            title: dataDetail.eventBookingDate != null ? dataDetail.eventBookingDate.title: "Mock Interview - " + dataDetail.fullName,
            data: dataDetail
        });

    }, []);

    

    return (
        <>
        {getMockInterviewListQueryStatus.isLoading && <PageLoading />}
            <section className="section">
                <div className="container">
                    <header className="section-header">
                        <h2><Translation tid="header_mock_interview_title" /></h2>
                        <hr />
                    </header>
                    <div data-provide="shuffle">
                        <div className="row gap-y gap-2" data-shuffle="list">
                            <div className="col-md-12">
                                <div className="row admin-post-header"> 
                                    <div className="col-3 ">
                                         Mã
                                    </div>
                                    {/* <div className="col-2">
                                        Giảm giá
                                    </div> */}
                                    <div className="col-3">
                                        Ngày hẹn
                                    </div>
                                    <div className="col-3">
                                        Trạng thái
                                    </div> 
                                    <div className="col-3">
                                        
                                    </div>
                                </div>
                            </div>

                        </div>
                        {getMockInterviewListQueryStatus.data && getMockInterviewListQueryStatus.data.resultCode== ResultCode.Success && 
                         getEventBookingAvaiableDateQueryStatus.data != null && getEventBookingAvaiableDateQueryStatus.data.resultCode== ResultCode.Success
                           && getMockInterviewListQueryStatus.data.resource
                            .map(p => 
                                <UserMockInterviewItem key={v4()} dataItem={p} bookingDate={getEventBookingAvaiableDateQueryStatus.data!.resource} onSelected={onSelectedHandler} onDeleted={() =>{}} onRequestChange={() =>{ getMockInterviewListQueryStatus.refetch();}} />
                            )
                        }
                         
                    </div>
                </div>
            </section>
        </>
    );
}

export default UserMockInterviewList;