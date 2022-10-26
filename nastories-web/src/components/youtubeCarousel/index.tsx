import Slider from "react-slick";
import { v4 } from "uuid";
import { useGetYoutubevideosQuery } from "../../services/home";
import { ResultCode } from "../../utils/enums";
import { Translation } from "../translation";


const YoutubeCarousel: React.FC = () => {

    const getYoutubevideosQueryStatus = useGetYoutubevideosQuery(null);

    return (
        <>   
            <section className="section bg-gray">
                <div className="container">
                <header className="section-header mb-0"><h2><Translation tid="header_youtube_title" /></h2>
                <hr />
                </header>
                <div className="small ls-1 text-right"><a target="_blank" href="https://www.youtube.com/@nastories">Xem tất cả</a></div>
                    <div id="youtube-carouse" className="carousel slide" data-ride="carousel">
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <div className="row gap-y"> 
                                {getYoutubevideosQueryStatus.data && getYoutubevideosQueryStatus.data.resultCode == ResultCode.Success && <>
                                    {getYoutubevideosQueryStatus.data.resource.slice(0, 3) .map((c) => (
                                        <div  key={v4()} className="col-md-6 col-lg-4"> 
                                            <a href={c.url} target="_blank">
                                                <div className="card text-white bg-img justify-content-center" style={{ backgroundImage: 'url(' + c.thumbnail + ')', minHeight: "196px" }} data-overlay="1">
                                                    <div className="card-body text-center flex-grow-0"></div>
                                                </div>
                                            </a> 
                                        </div> 
                                ))}
                                </>} 
                                </div>
                            </div>
                            <div className="carousel-item">
                                <div className="row gap-y">
                                {getYoutubevideosQueryStatus.data && getYoutubevideosQueryStatus.data.resultCode == ResultCode.Success && <>
                                    {getYoutubevideosQueryStatus.data.resource.slice(3, 6) .map((c) => (
                                        <div  key={v4()} className="col-md-6 col-lg-4"> 
                                            <a href={c.url} target="_blank">
                                                <div className="card text-white bg-img justify-content-center" style={{ backgroundImage: 'url(' + c.thumbnail + ')', minHeight: "196px" }} data-overlay="1">
                                                    <div className="card-body text-center flex-grow-0"></div>
                                                </div>
                                            </a> 
                                        </div> 
                                ))}
                                </>} 
                                </div>
                            </div>
                            <div className="carousel-item">
                                <div className="row gap-y">
                                {getYoutubevideosQueryStatus.data && getYoutubevideosQueryStatus.data.resultCode == ResultCode.Success && <>
                                    {getYoutubevideosQueryStatus.data.resource.slice(6, 9) .map((c) => (
                                        <div  key={v4()} className="col-md-6 col-lg-4"> 
                                            <a href={c.url} target="_blank">
                                                <div className="card text-white bg-img justify-content-center" style={{ backgroundImage: 'url(' + c.thumbnail + ')', minHeight: "196px" }} data-overlay="1">
                                                    <div className="card-body text-center flex-grow-0"></div>
                                                </div>
                                            </a> 
                                        </div> 
                                ))}
                                </>} 
                                </div>
                            </div>
                        </div>
                        <a className="carousel-control-prev" href="#youtube-carouse" role="button" data-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        </a>
                        <a className="carousel-control-next" href="#youtube-carouse" role="button" data-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        </a>
                    </div>


                </div>
            </section>

        </>);
}

export default YoutubeCarousel;