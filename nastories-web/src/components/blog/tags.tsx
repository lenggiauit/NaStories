import { type } from "os";
import { ReactElement, useEffect, useState } from "react";
import { v4 } from "uuid";
import { PostDataItem } from "../../services/models/postDataItem";
import { Translation } from "../translation";


const Tags: React.FC = ({ }): ReactElement => {

    return (
        <>
            <h6 className="sidebar-title"><Translation tid="heading_tags" /></h6>
            <div className="gap-multiline-items-1">
                <a className="badge badge-secondary mr-1" href="#">Record</a>
                <a className="badge badge-secondary mr-1" href="#">Progress</a>
                <a className="badge badge-secondary mr-1" href="#">Customers</a>
                <a className="badge badge-secondary mr-1" href="#">Freebie</a>
                <a className="badge badge-secondary mr-1" href="#">Offer</a>
                <a className="badge badge-secondary mr-1" href="#">Screenshot</a>
                <a className="badge badge-secondary mr-1" href="#">Milestone</a>
                <a className="badge badge-secondary mr-1" href="#">Version</a>
                <a className="badge badge-secondary mr-1" href="#">Design</a>
                <a className="badge badge-secondary mr-1" href="#">Customers</a>
                <a className="badge badge-secondary mr-1" href="#">Job</a>
            </div>
        </>
    )
};

export default Tags;
