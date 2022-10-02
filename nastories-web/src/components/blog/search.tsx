import { type } from "os";
import { ReactElement, useEffect, useState } from "react";
import { v4 } from "uuid";
import { PostDataItem } from "../../services/models/postDataItem";
import { Translation } from "../translation";


const BlogSearch: React.FC = ({ }): ReactElement => {

    return (
        <>
            <h6 className="sidebar-title"><Translation tid="heading_search" /></h6>
            <form className="input-group" target="#" method="GET">
                <input type="text" className="form-control" name="s" placeholder="Search" />
                <div className="input-group-addon">
                    <span className="input-group-text"><i className="ti-search"></i></span>
                </div>
            </form>
        </>
    )
};

export default BlogSearch;
