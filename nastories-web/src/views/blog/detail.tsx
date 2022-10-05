import React, { ReactElement, useEffect, useState } from "react";
import { matchPath, useParams, useRouteMatch } from "react-router-dom";
import { v4 } from "uuid";
import BlogPostItem from "../../components/blog/blogPostItem";
import Categories from "../../components/blog/categories";
import BlogSearch from "../../components/blog/search";
import Tags from "../../components/blog/tags";
import TopPosts from "../../components/blog/topPosts";
import Footer from "../../components/footer";
import Layout from "../../components/layout";
import NotFound from "../../components/notFound";
import Pagination from "../../components/pagination";
import { AppSetting, MetaData, Paging } from "../../types/type";
import { ResultCode } from "../../utils/enums"; 

const appSetting: AppSetting = require('../../appSetting.json');


const BlogDetail: React.FC = (): ReactElement => {

    const route = useRouteMatch();
    const { postUrl} : any = useParams();
    const match = matchPath(route.url, {
        path: "/blog/:postUrl",
        exact: true,
        strict: false
      });

     useEffect(()=>{
        if(match != null){
 

        }
        else{
            window.location.href = "/notfound";
        }
     }, []) 

    


    return (
        <>
            <Layout isPublic={true}>
                <div className="container">

                {postUrl}
                </div> 
                <Footer />
            </Layout>
        </>
    );
}

export default BlogDetail;