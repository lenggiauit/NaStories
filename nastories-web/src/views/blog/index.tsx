import React, { ReactElement, useState } from "react";
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
import { PostDataItem } from "../../services/models/postDataItem";
import { AppSetting, MetaData, Paging } from "../../types/type";
const appSetting: AppSetting = require('../../appSetting.json');

const Blog: React.FC = (): ReactElement => {
    const [metaData, setMetaData] = useState<MetaData>({ paging: { index: 1, size: appSetting.PageSize } });
    const [pagingData, setPagingData] = useState<Paging>({ index: 1, size: appSetting.PageSize });
    const [totalRows, setTotalRows] = useState<number>(0);
    const [postDataList, setPostDataList] = useState<PostDataItem[]>([]);
    const pagingChangeEvent: any = (p: Paging) => {

        let mp: Paging = {
            index: p.index,
            size: p.size
        }
        setPagingData(mp);
    }
    
    return (
        <>
            <Layout isPublic={true}>
                <section className="section bg-gray">
                    <div className="container">
                        <header className="section-header">
                            <h2>Na’s Stories blog</h2>
                            <hr />
                            <p className="lead">
                                Na sẽ kể những câu chuyện đời thường nhưng có ý nghĩa diễn ra xung quanh Na, hi
                            </p>
                        </header>
                        <div className="row">
                            {/* <!-- Begin left side --> */}
                            <div className="col-md-8 col-xl-9">
                                <div className="row gap-y">
                                    {postDataList.map(p => <BlogPostItem key={v4().toString()} dataItem={p} />)} 
                                    {(postDataList == null || postDataList.length == 0) && <NotFound />}
                                </div> 
                                <Pagination totalRows={totalRows} pageChangeEvent={pagingChangeEvent} />
                            </div>
                            {/* <!-- End left side --> */} 
                            {/* <!-- Begin right side --> */}
                            <div className="col-md-4 col-xl-3">
                                <div className="sidebar px-4 py-md-0"> 
                                    <BlogSearch /> 
                                    <hr />
                                    <Categories />
                                    <hr />
                                    <TopPosts />
                                    <hr />
                                    <Tags />
                                </div>
                            </div> 
                            {/* <!-- End right side --> */}
                        </div>
                    </div>
                </section>
                <Footer />
            </Layout>
        </>
    );
}

export default Blog;