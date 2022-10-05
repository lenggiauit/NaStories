import React, { useEffect } from "react";
import { BlogPost } from "../../../services/models/admin/blogPost";
import { useUpdateBlogPostStatusMutation } from "../../../services/admin";
import PageLoading from "../../pageLoading";

type Props = {
    dataItem: BlogPost,
    onSelected: (dataItem: BlogPost) => void,
    onChangeStatus: (dataItem: BlogPost) => void,
}

const BlogPostItem: React.FC<Props> = ({ dataItem, onSelected, onChangeStatus }) => {

    const [updateBlogPostStatus, updateBlogPostStatusStatus] = useUpdateBlogPostStatusMutation();

    const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        updateBlogPostStatus({payload: { id : dataItem.id, status: value}});
      };

 
    return (<>
    {updateBlogPostStatusStatus.isLoading && <PageLoading />}
        <div className="col-md-12" >
            <div className="row admin-post-item border border-white">
                <div className="col-7">
                    <div className="row">
                        <div className="col-3 admin-post-img">
                            <img src={dataItem.thumbnail} alt={dataItem.title} />
                        </div>
                        <div className="col pl-0 text-left">
                            <b className="align-middle">{dataItem.title}</b>
                            <p>{dataItem.shortDescription}</p>
                        </div>
                    </div>
                </div>
                <div className="col-2 pt-6">
                    <select name="status" className="form-control" onChange={ handleStatusChange }>
                        <option selected={dataItem.isPublic} value="Published">Published</option>
                        <option selected={dataItem.isDraft}  value="Draft">Draft</option>
                        <option selected={dataItem.isArchived}  value="Archived">Archived</option>
                    </select>
                </div>
                <div className="col-1 text-center pt-6">
                    <span className="align-middle">{dataItem.view}</span>
                </div>
                <div className="col-1 text-center pt-6">
                    <span className="align-middle">{dataItem.view}</span>
                </div>
                <div className="col-1 text-center pt-6" >
                    <a href="#" onClick={(e) => { e.preventDefault(); onSelected(dataItem) }}><i className="bi bi-pencil-square"></i></a>
                </div> 
            </div>
        </div>
    </>)
}

export default BlogPostItem;