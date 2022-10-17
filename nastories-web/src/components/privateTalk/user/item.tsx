import React, { useEffect } from "react";
import { BlogPost } from "../../../services/models/admin/blogPost";
import { useUpdateBlogPostStatusMutation } from "../../../services/admin";
import PageLoading from "../../pageLoading";
import { PrivateTalkResource } from "../../../services/resources/privateTalkResource";

type Props = {
    dataItem: PrivateTalkResource,
    onSelected: (dataItem: PrivateTalkResource) => void,
    onChangeStatus: (dataItem: PrivateTalkResource) => void,
}

const UserPrivateTalkItem: React.FC<Props> = ({ dataItem, onSelected, onChangeStatus }) => {


    const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;

    };


    return (<>
        <div className="col-md-12" >
            <div className="row admin-post-item border border-white">
                <div className="col-7">
                    { dataItem.eventBookingDate ? dataItem.eventBookingDate.title : dataItem.fullName }
                </div>
                <div className="col-2">
                    {dataItem.eventBookingDate ? dataItem.eventBookingDate.start : "---"}
                </div>
                <div className="col-2">
                    {dataItem.eventStatus}
                </div>
                <div className="col-1 text-center pt-6" >
                    <a href="#" onClick={(e) => { e.preventDefault(); onSelected(dataItem) }}><i className="bi bi-pencil-square"></i></a>
                </div>
            </div>
        </div>
    </>)
}

export default UserPrivateTalkItem;