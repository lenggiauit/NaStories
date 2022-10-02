import { type } from "os";
import { ReactElement, useEffect, useState } from "react";
import { v4 } from "uuid";
import { PostDataItem } from "../../services/models/postDataItem";
import { Translation } from "../translation";


const Categories: React.FC = ({ }): ReactElement => {

    return (
        <>
            <h6 className="sidebar-title"><Translation tid="heading_categories" /></h6>
            <div className="row link-color-default fs-14 lh-24">
                <div className="col-6"><a href="#">News</a></div>
                <div className="col-6"><a href="#">Updates</a></div>
                <div className="col-6"><a href="#">Design</a></div>
                <div className="col-6"><a href="#">Marketing</a></div>
                <div className="col-6"><a href="#">Partnership</a></div>
                <div className="col-6"><a href="#">Product</a></div>
                <div className="col-6"><a href="#">Hiring</a></div>
                <div className="col-6"><a href="#">Offers</a></div>
            </div>
        </>
    )
};

export default Categories;
