import { ReactElement, useEffect, useState } from "react";
import { matchPath, useParams, useRouteMatch } from "react-router-dom";
import { v4 } from "uuid";
import { useGetPostDetailQuery, useGetRelatedPostQuery } from "../../services/blog";
import { BlogPostResource } from "../../services/resources/blogPostResource";
import ConverterLocaleDateString from "../../utils/converter";
import { ResultCode } from "../../utils/enums";
import { getLoggedUser } from "../../utils/functions";
import LoginModal from "../loginModal";
import PageLoading from "../pageLoading";
import { Translation } from "../translation";
import PostComment from "./comment";
import RelatedPost from "./related";
import SharePost from "./share";
 

const PostDetail: React.FC = ({  }): ReactElement => {
 
    const route = useRouteMatch();
    const { postUrl }: any = useParams();
    const match = matchPath(route.url, {
        path: "/blog/:postUrl",
        exact: true,
        strict: false
    });

    useEffect(() => {
        if (match == null) {
            window.location.href = "/notfound"; 
        }
         
    }, [])

    const getPostDetailStatus = useGetPostDetailQuery({ postUrl });
 
    return (
        <> 
            {getPostDetailStatus.isLoading && <PageLoading />}
            {getPostDetailStatus.isSuccess && getPostDetailStatus.data.resultCode == ResultCode.Success && <>
                <div className="section">
                    <div className="container">
                        <div className="text-center">
                            <h2>{getPostDetailStatus.data.resource.title}</h2>
                            <p>{ConverterLocaleDateString(getPostDetailStatus.data.resource.createdDate)} by {getPostDetailStatus.data.resource.user.fullName}</p>
                        </div>
                        
                        <div dangerouslySetInnerHTML={{ __html: getPostDetailStatus.data.resource.content }} />
                        <div className="gap-xy-2 mt-6">
                            {getPostDetailStatus.data.resource.tags.map((t) =>
                                <a key={v4().toString()} className="badge badge-pill badge-secondary" href={`/blog/tag/${t.url}`}>{t.name}</a>
                            )}
                        </div>
                        <div className="mt-6">
                            <RelatedPost key={v4().toString()}  category={getPostDetailStatus.data.resource.category.url} notIn={getPostDetailStatus.data.resource.url} />
                        </div>
                        <div className="mt-6">
                            <SharePost key={v4().toString()}   postData={getPostDetailStatus.data.resource} />  
                        </div>
                        {/* <div className="mt-6">
                            <PostComment key={v4().toString()}  postData={getPostDetailStatus.data.resource} />  
                        </div>   */}
                    </div>
                </div>
            </>} 
        </>
    );
};

export default PostDetail;