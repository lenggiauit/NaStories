import { ReactElement } from "react";
import Footer from "../../../components/footer";
import Layout from "../../../components/layout";
import { AppSetting } from "../../../types/type";

 
const appSetting: AppSetting = require('../../../appSetting.json');

const BlogTags: React.FC = (): ReactElement => {
     
    
    return (
        <>
            <Layout isPublic={true}>
                 Post by tags
                <Footer />
            </Layout>
        </>
    );
}

export default BlogTags;