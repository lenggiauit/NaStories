import { ReactElement } from "react";
import { v4 } from "uuid";
import { useGetRelatedPostQuery } from "../../services/blog";
import { ResultCode } from "../../utils/enums";
import LocalSpinner from "../localSpinner";
import { Translation } from "../translation";

type Props = {
    category : any,
    notIn:  any
}

const RelatedPost: React.FC<Props> = ({ category, notIn }): ReactElement => {

    const getRelatedPostQueryStatus = useGetRelatedPostQuery({ category, notIn});
 
    return (
        <>
            <h6 className="sidebar-title"><Translation tid="heading_relatedposts" /></h6> 
            {getRelatedPostQueryStatus.isLoading && <LocalSpinner /> }
            {getRelatedPostQueryStatus.data && getRelatedPostQueryStatus.data.resultCode == ResultCode.Success && <>
                <ul className="related-post">
                {getRelatedPostQueryStatus.data.resource.map((p) => (
                    <li key={v4().toString()}>
                        <a key={v4().toString()} href={`/blog/${p.url}`}>{p.title}</a> 
                    </li>
                ))}
                </ul>
            </>
            }   
            
        </>
    )
};

export default RelatedPost;