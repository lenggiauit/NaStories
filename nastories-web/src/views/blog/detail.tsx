import React, { ReactElement, useEffect, useState } from "react";
import { matchPath, useParams, useRouteMatch } from "react-router-dom";
import { v4 } from "uuid";
import BlogPostItem from "../../components/blog/blogPostItem";
import Categories from "../../components/blog/categories";
import PostComment from "../../components/blog/comment";
import PostDetail from "../../components/blog/detail";
import RelatedPost from "../../components/blog/related";
import BlogSearch from "../../components/blog/search";
import SharePost from "../../components/blog/share";
import Tags from "../../components/blog/tags";
import TopPosts from "../../components/blog/topPosts";
import Footer from "../../components/footer";
import Layout from "../../components/layout";
import NotFound from "../../components/notFound";
import PageLoading from "../../components/pageLoading";
import Pagination from "../../components/pagination";
import { useGetPostDetailQuery } from "../../services/blog";
import { AppSetting, MetaData, Paging } from "../../types/type";
import ConverterLocaleDateString from "../../utils/converter";
import { ResultCode } from "../../utils/enums";

const appSetting: AppSetting = require('../../appSetting.json');
 
const BlogDetail: React.FC = (): ReactElement => {
 
    return (
        <>
            <Layout isPublic={true}>
                 <PostDetail /> 
                <Footer />
            </Layout>
        </>
    );
}

export default BlogDetail;