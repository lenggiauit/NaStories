import { type } from "os";
import { ReactElement, useEffect, useState } from "react";
import { v4 } from "uuid";
import { useGetTopPostQuery } from "../../services/blog"; 
import { ResultCode } from "../../utils/enums";
import { Translation } from "../translation";

 
const TopPosts: React.FC = ({ }): ReactElement => {

    const getTopPostQueryStatus = useGetTopPostQuery(null);
 
    return (
        <>
            <h6 className="sidebar-title"><Translation tid="heading_topposts" /></h6>

            {getTopPostQueryStatus.data && getTopPostQueryStatus.data.resultCode == ResultCode.Success && <>
                {getTopPostQueryStatus.data.resource.map((p) => (
                    <a key={v4().toString()} className="media text-default align-items-center mb-5" href={`/blog/${p.url}`}>
                        <img className="rounded w-65px mr-4" src={p.thumbnail} />
                        <p className="media-body small-2 lh-4 mb-0">{p.shortDescription}</p>
                    </a> 
                ))}
            </>
            }   
        </>
    )
};

export default TopPosts;
