import { type } from "os";
import { ReactElement, useEffect, useState } from "react";
import { v4 } from "uuid";
import { PostDataItem } from "../../services/models/postDataItem";
import { BlogPostResource } from "../../services/resources/blogPostResource";
import { DisplayType } from "../../utils/enums";
import { Translation } from "../translation";


type Props = {
    postData: BlogPostResource,
    displayType: DisplayType
}

const BlogPostItem: React.FC<Props> = ({ postData, displayType }): ReactElement => {

    if (displayType == DisplayType.Grid) {
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
    }
    else if (displayType == DisplayType.List) {
        return (
            <>
                <div className="card hover-shadow-7 mb-5">
                    <div className="row">
                        <div className="col-md-4">
                            <a href={`/blog/${postData.url}`}><img className="fit-cover h-100" src={postData.thumbnail} alt={postData.title} /></a>
                        </div>

                        <div className="col-md-8">
                            <div className="p-7">
                                <h4>{postData.title}</h4>
                                <p>{postData.shortDescription}</p>
                                <a className="small ls-1" href={`/blog/${postData.url}`}><Translation tid="read_more" /><span className="pl-1">⟶</span></a>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
    else{
        return (<></>);
    }
};

export default BlogPostItem;
