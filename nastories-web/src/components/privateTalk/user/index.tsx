import React, { ReactElement } from "react";
import { useGetPrivateTalkListQuery } from "../../../services/account";
import { ResultCode } from "../../../utils/enums";
import { Translation } from "../../translation";
import UserPrivateTalkItem from "./item";



const UserPrivateTalkList: React.FC = (): ReactElement => {

    const getPrivateTalkListQueryStatus = useGetPrivateTalkListQuery({ payload: {} });

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
                                    <div className="col-7">
                                        Title
                                    </div>
                                    <div className="col-2">
                                        Start date
                                    </div>
                                    <div className="col-2">
                                        Status
                                    </div> 
                                    <div className="col-1">
                                        Action
                                    </div>
                                </div>
                            </div>

                        </div>
                        {getPrivateTalkListQueryStatus.data && getPrivateTalkListQueryStatus.data.resultCode== ResultCode.Success  && 
                            getPrivateTalkListQueryStatus.data.resource
                            .map(p => 
                                <UserPrivateTalkItem dataItem={p} onSelected={()=>{}} onChangeStatus={() =>{}} />
                            )
                        }
                         
                    </div>
                </div>
            </section>
        </>
    );
}

export default UserPrivateTalkList;