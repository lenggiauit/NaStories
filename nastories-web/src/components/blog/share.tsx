import { ReactElement } from "react";
import { v4 } from "uuid";
import { useGetRelatedPostQuery } from "../../services/blog";
import { ResultCode } from "../../utils/enums";
import { Translation } from "../translation";
// @ts-ignore
import MetaTags from 'react-meta-tags'; 
import { BlogPostResource } from "../../services/resources/blogPostResource";
import { AppSetting } from "../../types/type";
const appSetting: AppSetting = require('../../appSetting.json');
type Props = {
    postData : BlogPostResource, 
}

const SharePost: React.FC<Props> = ({ postData }): ReactElement => {
 
    return (
        <>
            <MetaTags>
                <title>{postData.title}</title>
                <meta id="meta-description" name="description" content={postData.shortDescription} />
                <meta id="og-title" property="og:title" content={postData.title} />
                <meta id="og-image" property="og:image" content={postData.thumbnail} />
            </MetaTags>
            <h6 className="sidebar-title"><Translation tid="heading_sharing" /></h6> 
            <div id="fb-root"></div> 
            <script async defer crossOrigin="anonymous" src="https://connect.facebook.net/vi_VN/sdk.js#xfbml=1&version=v15.0" nonce="PQUKoJ99"></script>
            <div className="fb-share-button" data-href="https://developers.facebook.com/docs/plugins/" 
            data-layout="button" data-size="large"><a target="_blank" 
            href={`https://www.facebook.com/sharer/sharer.php?u=${appSetting.SiteUrl}blog/${postData.url}`} 
            className="fb-xfbml-parse-ignore"><i className="fa fa-facebook"></i></a></div>
            
        </>
    )
};

export default SharePost;