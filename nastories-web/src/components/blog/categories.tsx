import { type } from "os";
import { ReactElement, useEffect, useState } from "react";
import { v4 } from "uuid";
import { useGetCategoryQuery } from "../../services/blog";
import { PostDataItem } from "../../services/models/postDataItem";
import { ResultCode } from "../../utils/enums";
import LocalSpinner from "../localSpinner";
import { Translation } from "../translation";


const Categories: React.FC = ({ }): ReactElement => {

    const getQueryCategoryStatus = useGetCategoryQuery(null);


    return (
        <>
            <h6 className="sidebar-title"><Translation tid="heading_categories" /></h6>
            {getQueryCategoryStatus.isLoading && <LocalSpinner /> }
            <div className="row link-color-default fs-14 lh-24">
            {getQueryCategoryStatus.data && getQueryCategoryStatus.data.resultCode == ResultCode.Success && <>
                {getQueryCategoryStatus.data.resource.map((c) => (
                   <div key={v4()} className="col-6"><a href={`/blog/category/${c.url}`}><span style={{color: c.color }}>{c.name}</span></a></div>
                ))}
            </>
            } 
            </div>
        </>
    )
};

export default Categories;
