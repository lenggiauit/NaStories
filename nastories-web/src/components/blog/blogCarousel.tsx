import { v4 } from "uuid";
import { useGetTopPostQuery } from "../../services/blog";
import { DisplayType, ResultCode } from "../../utils/enums";
import { Translation } from "../translation";
import BlogPostItem from "./blogPostItem";

const BlogCarousel :  React.FC = () =>{

    const getTopPostQueryStatus = useGetTopPostQuery(null);
 
    return (
        <>   
        <section className="section bg-gray">
            <div className="container">
            <header className="section-header"><h2><Translation tid="header_blog_title" /></h2>
            <hr />
            </header>
                <div id="blog-post-carouse" className="carousel slide" data-ride="carousel">
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <div className="row gap-y"> 
                            {getTopPostQueryStatus.data && getTopPostQueryStatus.data.resultCode == ResultCode.Success && <>
                                {getTopPostQueryStatus.data.resource.slice(0, 3) .map((p) => (
                                <div key={v4()}  className="col-md-4">
                                    <div className="card border hover-shadow-6 mb-6 d-block">
                                        <a href={`/blog/${p.url}`}><img className="card-img-top" src={p.thumbnail} alt={p.title} /></a>
                                        <div className="p-6 text-center">
                                            <p><a className="small-5 text-lighter text-uppercase ls-2 fw-400" href={`/blog/category/${p.category.url}`}>{p.category.name}</a></p>
                                            {/* <h5 className="mb-0"><a className="text-dark" href={`/blog/${p.url}`}>{p.shortDescription}</a></h5> */}
                                        </div>
                                    </div>
                                </div>
                            //     <div key={v4()}  className="col-md-4">
                            //     <div className="card text-white bg-img" style={{backgroundImage: `url(${p.thumbnail})`}} data-overlay="5">
                            //     <div className="card-body">
                            //       <h5 className="card-title">Background image</h5>
                            //       <p>Some quick example text to build on the card title and make up the bulk of the card's content. Some quick example text to build on the card title.</p>
                            //       <a className="fs-12 fw-600" href="#">Read more <i className="fa fa-angle-right pl-1"></i></a>
                            //     </div>
                            //   </div>
                            //   </div>


                            ))}
                            </>} 
                            </div>
                        </div>
                        <div className="carousel-item">
                            <div className="row gap-y">
                            {getTopPostQueryStatus.data && getTopPostQueryStatus.data.resultCode == ResultCode.Success && <>
                                {getTopPostQueryStatus.data.resource.slice(3, 6) .map((p) => (
                                <div key={v4()}  className="col-md-4">
                                    <div className="card border hover-shadow-6 mb-6 d-block">
                                        <a href={`/blog/${p.url}`}><img className="card-img-top" src={p.thumbnail} alt={p.title} /></a>
                                        <div className="p-6 text-center">
                                            <p><a className="small-5 text-lighter text-uppercase ls-2 fw-400" href={`/blog/category/${p.category.url}`}>{p.category.name}</a></p>
                                            {/* <h5 className="mb-0"><a className="text-dark" href={`/blog/${p.url}`}>{p.shortDescription}</a></h5> */}
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
                                {getTopPostQueryStatus.data.resource.slice(6, 9) .map((p) => (
                                <div key={v4()}  className="col-md-4">
                                    <div className="card border hover-shadow-6 mb-6 d-block">
                                        <a href={`/blog/${p.url}`}><img className="card-img-top" src={p.thumbnail} alt={p.title} /></a>
                                        <div className="p-6 text-center">
                                            <p><a className="small-5 text-lighter text-uppercase ls-2 fw-400" href={`/blog/category/${p.category.url}`}>{p.category.name}</a></p>
                                            {/* <h5 className="mb-0"><a className="text-dark" href={`/blog/${p.url}`}>{p.shortDescription}</a></h5> */}
                                        </div>
                                    </div>
                                </div>
                            ))}
                            </>} 
                            </div>
                        </div>
                    </div>
                    <a className="carousel-control-prev" href="#blog-post-carouse" role="button" data-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    </a>
                    <a className="carousel-control-next" href="#blog-post-carouse" role="button" data-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    </a>
                </div>


            </div>
        </section>

    </>);
}

export default BlogCarousel;