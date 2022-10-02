import { type } from "os";
import { ReactElement, useEffect, useState } from "react";
import { v4 } from "uuid";
import { PostDataItem } from "../../services/models/postDataItem";

  
type Props = {
    dataItem: PostDataItem
}

const BlogPostItem: React.FC<Props> = ({ dataItem }): ReactElement => {
    
    return (
        <>
            <div className="col-md-6">
                <div className="card border hover-shadow-6 mb-6 d-block">
                    <a href="#"><img className="card-img-top" src={dataItem.thumbnail} alt={dataItem.title} /></a>
                    <div className="p-6 text-center">
                        <p><a className="small-5 text-lighter text-uppercase ls-2 fw-400" href={dataItem.category.url}>{dataItem.category.name}</a></p>
                        <h5 className="mb-0"><a className="text-dark" href={dataItem.url}>{dataItem.shortDescription}</a></h5>
                    </div>
                </div>
            </div>
        </>
    ) 
};

export default BlogPostItem;
