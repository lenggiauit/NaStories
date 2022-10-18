import { ReactElement, useEffect, useState } from "react";
import { matchPath, useParams, useRouteMatch } from "react-router-dom";
import { v4 } from "uuid";
import BlogPostItem from "../../../components/blog/blogPostItem";
import Categories from "../../../components/blog/categories";
import BlogSearch from "../../../components/blog/search";
import Tags from "../../../components/blog/tags";
import TopPosts from "../../../components/blog/topPosts";
import Footer from "../../../components/footer";
import Layout from "../../../components/layout";
import LocalSpinner from "../../../components/localSpinner";
import NotFound from "../../../components/notFound";
import Pagination from "../../../components/pagination";
import { useGetBlogPostByTagMutation } from "../../../services/blog";
import { BlogPostResource } from "../../../services/resources/blogPostResource";
import { AppSetting, MetaData, Paging } from "../../../types/type";
import { DisplayType } from "../../../utils/enums";
import { useQuery } from "../../../utils/functions";


 
const appSetting: AppSetting = require('../../../appSetting.json');

const BlogTags: React.FC = (): ReactElement => {
    const route = useRouteMatch();
    const { tagUrl }: any = useParams();
    const match = matchPath(route.url, {
        path: "/blog/tag/:tagUrl",
        exact: true,
        strict: false
    });

    useEffect(() => {
        if (match == null) {
            window.location.href = "/notfound"; 
        }
         
    }, [])
  
    let query = useQuery();
    const [keyWords, setKeyWords] = useState<string | null>(query.get("s")); 
    const [getBlogPostList, getBlogPostStatus] = useGetBlogPostByTagMutation();
    const [metaData, setMetaData] = useState<MetaData>({ paging: { index: 1, size: appSetting.PageSize } });
    const [pagingData, setPagingData] = useState<Paging>({ index: 1, size: appSetting.PageSize });
    const [totalRows, setTotalRows] = useState<number>(0);
    const [BlogPostList, setBlogPostList] = useState<BlogPostResource[]>([]);
 
    const pagingChangeEvent: any = (p: Paging) => {

        let mp: Paging = {
            index: p.index,
            size: p.size
        }
        setPagingData(mp);
    }
    useEffect(() => {
        let md: MetaData = {
            paging: pagingData
        }
        setMetaData(md);
    }, [pagingData]);
 
    useEffect(() => {
        getBlogPostList({ payload: {url: tagUrl, keywords: keyWords}, metaData: metaData });
    }, [metaData]);

    useEffect(() => {
        if (getBlogPostStatus.isSuccess && getBlogPostStatus.data.resource != null) {
            let data = getBlogPostStatus.data.resource;
            if (data.length > 0) {
                setTotalRows(data[0].totalRows);
            }
            else {
                setTotalRows(0);
            } 
            setBlogPostList(data);
        }
    }, [getBlogPostStatus]);
    
    return (
        <>
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
                                {getBlogPostStatus.isLoading && <LocalSpinner /> }
                                    {BlogPostList.map((p) => (
                                     <BlogPostItem key={v4().toString()} displayType={DisplayType.List} postData={p} />
                                    ))}  
                                    {(getBlogPostStatus.isSuccess && BlogPostList.length == 0 ) && <NotFound />}
                                </div> 
                                <Pagination totalRows={totalRows} pagingData={pagingData} pageChangeEvent={pagingChangeEvent} />
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
        </>
    );
}

export default BlogTags;