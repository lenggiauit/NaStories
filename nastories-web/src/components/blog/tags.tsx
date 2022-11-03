import { type } from "os";
import { ReactElement, useEffect, useState } from "react";
import { v4 } from "uuid";
import { useGetTagsQuery } from "../../services/blog";
import { PostDataItem } from "../../services/models/postDataItem";
import { ResultCode } from "../../utils/enums";
import LocalSpinner from "../localSpinner";
import { Translation } from "../translation";


const Tags: React.FC = ({ }): ReactElement => {
    const getQueryTagsStatus = useGetTagsQuery(null);
    return (
        <>
            <h6 className="sidebar-title"><Translation tid="heading_tags" /></h6>
            <div className="gap-multiline-items-1">
            {getQueryTagsStatus.isLoading && <LocalSpinner /> }
            {getQueryTagsStatus.data && getQueryTagsStatus.data.resultCode == ResultCode.Success && <>
                {getQueryTagsStatus.data.resource.map((t) => (
                    <a key={v4().toString()} className="badge badge-secondary mr-1" href={`/blog/tag/${t.url}`}>{t.name}</a>
                ))}
            </>
            }  
            </div>
        </>
    )
};

export default Tags;
