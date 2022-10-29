import React, { ReactElement, useCallback, useEffect, useState } from "react";
import { v4 } from "uuid";
import { useGetMockInterviewListQuery } from "../../../services/account";
import { useGetMockInterviewListMutation } from "../../../services/admin";
import { useGetEventBookingAvaiableDateQuery } from "../../../services/event";
import { MockInterview } from "../../../services/models/admin/mockInterview";
import { MockInterviewResource } from "../../../services/resources/mockInterviewResource";
import { AppSetting, MetaData, Paging } from "../../../types/type";
import { MockInterviewEnumStatus } from "../../../utils/constants";
import { ResultCode } from "../../../utils/enums";
import Pagination from "../../pagination";
import { Translation } from "../../translation";
import AdminMockInterviewItem from "./item";
import showMockInterviewModal from "./modalDetail";
const appSetting: AppSetting = require('../../../appSetting.json');


const AdminMockInterviewList: React.FC = (): ReactElement => {

    // get list
    const [getMockInterviewList, getMockInterviewStatus] = useGetMockInterviewListMutation();
    const [metaData, setMetaData] = useState<MetaData>({ paging: { index: 1, size: appSetting.PageSize } });
    const [pagingData, setPagingData] = useState<Paging>({ index: 1, size: appSetting.PageSize });
    const [totalRows, setTotalRows] = useState<number>(0);

    const [MockInterviewList, setMockInterviewList] = useState<MockInterview[]>([]);
    
    const [eventStatusFilter, seteventStatusFilter] = useState<string>("");

    const pagingChangeEvent: any = (p: Paging) => {

        let mp: Paging = {
            index: p.index,
            size: p.size
        }
        setPagingData(mp);
    }
    useEffect(() => {
        let md: MetaData = {
            paging: pagingData
        }
        setMetaData(md);
    }, [pagingData]);


    useEffect(() => {
        getMockInterviewList({ payload: { eventStatus: eventStatusFilter }, metaData: metaData });
    }, [metaData, eventStatusFilter]);

    useEffect(() => {
        if (getMockInterviewStatus.isSuccess && getMockInterviewStatus.data.resource != null) {
            let data = getMockInterviewStatus.data.resource;
            if (data.length > 0) {
                setTotalRows(data[0].totalRows);
            }
            else {
                setTotalRows(0);
            }
            setMockInterviewList(data);
        }
    }, [getMockInterviewStatus]);
 
    const onSelectedHandler = useCallback((dataDetail: MockInterview) => {
        showMockInterviewModal({
            title: dataDetail.eventBookingDate != null ? dataDetail.eventBookingDate.title : " Mock Interview - " + dataDetail.fullName,
            data: dataDetail
        });

    }, []);



    return (
        <>
            <section className="section">
                <div className="container">
                    <header className="section-header">
                        <h2>Manage <Translation tid="header_mock_interview_title" /></h2>
                        <hr />
                    </header>
                    <div data-provide="shuffle">
                        <div className="row gap-y gap-2" data-shuffle="list">
                            <div className="col-md-12">
                                <div className="row admin-post-header">
                                    <div className="col-2">
                                        Title
                                    </div>
                                    <div className="col-1">
                                         Code
                                    </div>
                                    <div className="col-1">
                                        RedeemCode
                                    </div>
                                    <div className="col-2">
                                        Email
                                    </div>
                                    <div className="col-2">
                                        Start date
                                    </div>
                                    <div className="col-2">
                                        <select name="eventStatus" className="form-control form-control-sm" onChange={(e)=>{ seteventStatusFilter(e.target.value);setPagingData({...pagingData, index: 1} as Paging ); }}>
                                            <option value="">All status</option> 
                                            {Object.entries(MockInterviewEnumStatus).map((status) => 
                                            (
                                                <option value={status[0]}>{status[1]}</option>
                                            )
                                            )}
                                        </select>
                                    </div>
                                    <div className="col-2 text-center">
                                        Action
                                    </div>
                                </div>
                            </div>

                        </div>
                        {MockInterviewList.length > 0  && MockInterviewList.map(p =>
                            <AdminMockInterviewItem key={v4()} dataItem={p} onSelected={onSelectedHandler} />
                        )
                        }
                        <div className="mt-7">
                        <Pagination totalRows={totalRows} pagingData={pagingData} pageChangeEvent={pagingChangeEvent} />
                    </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default AdminMockInterviewList;