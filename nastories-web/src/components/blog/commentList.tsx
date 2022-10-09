import { ReactElement, useState } from "react";
import { v4 } from "uuid";
import { useGetRelatedPostQuery } from "../../services/blog";
import { BlogPostResource } from "../../services/resources/blogPostResource";
import { ResultCode } from "../../utils/enums";
import { getLoggedUser } from "../../utils/functions";
import LoginModal from "../loginModal";
import { Translation } from "../translation";

type Props = {
    postData : BlogPostResource, 
}

const PostCommentList: React.FC<Props> = ({ postData }): ReactElement => {
 
    
    return (
        <>
             Post Comment List
        </>
    )
};

export default PostCommentList;