import React, { useState } from "react";
import { BlogPost } from "../../../services/models/admin/blogPost"; 
import AddEditBlogPostModal from "./modal/";

type Props = {
    onAdded: (BlogPost?: BlogPost) => void,
}
const AddBlogPostButton: React.FC<Props> = ({ onAdded }) => {

    const [isShowModal, setIsShowModal] = useState<boolean>(false);
    const onAddNewHandler = (dataModel?: BlogPost) => {
        setIsShowModal(false)
        onAdded(dataModel);
    }
    return (<>
        {isShowModal && <AddEditBlogPostModal onClose={onAddNewHandler} />}
        <div className="col-6 col-lg-3">
            <a className="card shadow-1 hover-shadow-6" href="#" onClick={(e) => { e.preventDefault(); setIsShowModal(true) }} data-toggle="modal"  >
                <div className="card-body project-container d-flex text-center justify-content-center ">
                    <i className="bi bi-plus" style={{ fontSize: 42 }} ></i>
                </div>
            </a>
        </div>
    </>);
}



export default AddBlogPostButton;