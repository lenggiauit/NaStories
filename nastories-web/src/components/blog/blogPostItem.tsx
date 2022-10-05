import { type } from "os";
import { ReactElement, useEffect, useState } from "react";
import { v4 } from "uuid";
import { PostDataItem } from "../../services/models/postDataItem";
import { BlogPostResource } from "../../services/resources/blogPostResource";

  
type Props = {
    postData: BlogPostResource
}

const BlogPostItem: React.FC<Props> = ({ postData }): ReactElement => {
    
    return (
        <>
            <div className="col-md-6">
                <div className="card border hover-shadow-6 mb-6 d-block">
                    <a href={`/blog/${postData.url}`}><img className="card-img-top" src={postData.thumbnail} alt={postData.title} /></a>
                    <div className="p-6 text-center">
                        <p><a className="small-5 text-lighter text-uppercase ls-2 fw-400" href={`/blog/category/${postData.category.url}`}>{postData.category.name}</a></p>
                        <h5 className="mb-0"><a className="text-dark" href={`/blog/${postData.url}`}>{postData.shortDescription}</a></h5>
                    </div>
                </div>
            </div>
        </>
    ) 
};

export default BlogPostItem;
