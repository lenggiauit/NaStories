import { v4 } from "uuid";
import { useGetNewsPostQuery } from "../../services/blog";
import { DisplayType, ResultCode } from "../../utils/enums";
import LocalSpinner from "../localSpinner";
import PageLoading from "../pageLoading";
import { Translation } from "../translation";
import BlogPostItem from "./blogPostItem";

const BlogCarousel: React.FC = () => {

    const getTopPostQueryStatus = useGetNewsPostQuery(null);

    return (
        <> 
            <section className="section bg-gray">
                <div className="container">
                    <header className="section-header mb-0"><h2><Translation tid="header_blog_title" /></h2>
                        <hr /> 
                    </header>
                    <div className="small ls-1 text-right"><a href="/blog">Xem tất cả</a></div>
                    {getTopPostQueryStatus.isLoading && <LocalSpinner /> }
                    <div id="blog-post-carouse" className="carousel slide" data-ride="carousel" style={{minHeight: 350}}>
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <div className="row gap-y">
                                    {getTopPostQueryStatus.data && getTopPostQueryStatus.data.resultCode == ResultCode.Success && <>
                                        {getTopPostQueryStatus.data.resource.slice(0, 3).map((p) => (
                                            <div key={v4()} className="col-md-4">
                                                <div className="card home-post border hover-shadow-6 mb-6 d-block">
                                                    <a href={`/blog/${p.url}`}><img className="card-img-top" src={p.thumbnail} alt={p.title} /></a>
                                                    <div className="p-6 text-center">
                                                        <p><a className="small-5 text-lighter text-uppercase ls-2 fw-400" href={`/blog/category/${p.category.url}`}>{p.category.name}</a></p>
                                                        <a className="text-dark" href={`/blog/${p.url}`}>{p.shortDescription.length > 50 ? p.shortDescription.substring(0, 50) : p.shortDescription }</a>
                                                    </div>
                                                </div>
                                            </div> 
                                        ))}
                                    </>}
                                </div>
                            </div>
                            <div className="carousel-item">
                                <div className="row gap-y">
                                    {getTopPostQueryStatus.data && getTopPostQueryStatus.data.resultCode == ResultCode.Success && <>
                                        {getTopPostQueryStatus.data.resource.slice(3, 6).map((p) => (
                                            <div key={v4()} className="col-md-4">
                                                <div className="card border hover-shadow-6 mb-6 d-block">
                                                    <a href={`/blog/${p.url}`}><img className="card-img-top" src={p.thumbnail} alt={p.title} /></a>
                                                    <div className="p-6 text-center">
                                                        <p><a className="small-5 text-lighter text-uppercase ls-2 fw-400" href={`/blog/category/${p.category.url}`}>{p.category.name}</a></p> 
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </>}
                                </div>
                            </div>
                            <div className="carousel-item">
                                <div className="row gap-y">
                                    {getTopPostQueryStatus.data && getTopPostQueryStatus.data.resultCode == ResultCode.Success && <>
                                        {getTopPostQueryStatus.data.resource.slice(6, 9).map((p) => (
                                            <div key={v4()} className="col-md-4">
                                                <div className="card border hover-shadow-6 mb-6 d-block">
                                                    <a href={`/blog/${p.url}`}><img className="card-img-top" src={p.thumbnail} alt={p.title} /></a>
                                                    <div className="p-6 text-center">
                                                        <p><a className="small-5 text-lighter text-uppercase ls-2 fw-400" href={`/blog/category/${p.category.url}`}>{p.category.name}</a></p> 
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </>}
                                </div>
                            </div>
                        </div>
                        {/* <a className="carousel-control-prev" href="#blog-post-carouse" role="button" data-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    </a>
                    <a className="carousel-control-next" href="#blog-post-carouse" role="button" data-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    </a> */}
                    </div>


                </div>
            </section>

        </>);
}

export default BlogCarousel;