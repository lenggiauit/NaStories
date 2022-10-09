import { ReactElement, useState } from "react";
import { v4 } from "uuid";
import { useGetRelatedPostQuery } from "../../services/blog";
import { BlogPostResource } from "../../services/resources/blogPostResource";
import { ResultCode } from "../../utils/enums";
import { getLoggedUser } from "../../utils/functions";
import LoginModal from "../loginModal";
import { Translation } from "../translation";
import CommentForm from "./commentForm";
import PostCommentList from "./commentList";

type Props = {
    postData : BlogPostResource, 
}

const PostComment: React.FC<Props> = ({ postData }): ReactElement => {
 
    const currentUser = getLoggedUser();
    const [showModalLogin, setShowModalLogin] = useState<boolean>(false);
    
 
    return (
        <>
            <h6 className="sidebar-title"><Translation tid="heading_comment" /></h6> 
            {currentUser == null  && <> 
                <p className="text-center">
                    You need to <a href="#" onClick={() =>{ setShowModalLogin(true)}}>login </a>to post a comment
                </p>
                <div>
                    <LoginModal onClose={() =>{setShowModalLogin(false)}} isShow={showModalLogin} />
                </div>
            </>}
            <div>
            <PostCommentList postData={postData} />
            </div>
            {currentUser != null  && <div> 
                <CommentForm postData={postData} onSubmit={() =>{}}  />
            </div>}
            
        </>
    )
};

export default PostComment;