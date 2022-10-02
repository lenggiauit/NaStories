import { type } from "os";
import { ReactElement, useEffect, useState } from "react";
import { v4 } from "uuid";
import { PostDataItem } from "../../services/models/postDataItem";
import { Translation } from "../translation";

 
const TopPosts: React.FC = ({ }): ReactElement => {
    const [topPostDataList, setTopPostDataList] = useState<PostDataItem[]>([]);
    return (
        <>
            <h6 className="sidebar-title"><Translation tid="heading_topposts" /></h6>
            {topPostDataList.map(p => 
             <a className="media text-default align-items-center mb-5" href={p.url}>
                <img className="rounded w-65px mr-4" src={p.thumbnail} />
                <p className="media-body small-2 lh-4 mb-0">{p.shortDescription}</p>
            </a> 
            )}   
        </>
    )
};

export default TopPosts;
