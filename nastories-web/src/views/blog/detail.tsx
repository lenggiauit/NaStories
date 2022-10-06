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
import PageLoading from "../../components/pageLoading";
import Pagination from "../../components/pagination";
import { useGetPostDetailQuery } from "../../services/blog";
import { AppSetting, MetaData, Paging } from "../../types/type";
import ConverterLocaleDateString from "../../utils/converter";
import { ResultCode } from "../../utils/enums";

const appSetting: AppSetting = require('../../appSetting.json');


const BlogDetail: React.FC = (): ReactElement => {

    const route = useRouteMatch();
    const { postUrl }: any = useParams();
    const match = matchPath(route.url, {
        path: "/blog/:postUrl",
        exact: true,
        strict: false
    });

    const getPostDetailStatus = useGetPostDetailQuery({ postUrl });

    useEffect(() => {
        if (match != null) {


        }
        else {
            window.location.href = "/notfound";
        }
    }, [])

    return (
        <>
            <Layout isPublic={true}>
                {getPostDetailStatus.isLoading && <PageLoading />}
                {getPostDetailStatus.isSuccess && getPostDetailStatus.data.resultCode == ResultCode.Success && <>
                    <div className="section">
                        <div className="container">
                            <div className="text-center">
                                <h2>{getPostDetailStatus.data.resource.title}</h2>
                                <p>{ConverterLocaleDateString(getPostDetailStatus.data.resource.createdDate)} by {getPostDetailStatus.data.resource.user.fullName}</p>
                            </div>

                            <div dangerouslySetInnerHTML={{ __html: getPostDetailStatus.data.resource.content }} />
                            <div className="gap-xy-2 mt-6">
                                {getPostDetailStatus.data.resource.tags.map((t) =>
                                    <a key={v4().toString()} className="badge badge-pill badge-secondary" href={`/blog/tag/${t.url}`}>{t.name}</a>
                                )} 
                            </div>
                        </div>
                    </div>
                </>}
                <Footer />
            </Layout>
        </>
    );
}

export default BlogDetail;