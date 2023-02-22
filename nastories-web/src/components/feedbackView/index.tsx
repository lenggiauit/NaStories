import Slider from "react-slick";
import { v4 } from "uuid";
import { useGetFeedbackListQuery, useGetYoutubevideosQuery } from "../../services/home";
import { GlobalKeys } from "../../utils/constants";
import { ResultCode } from "../../utils/enums";
import LocalSpinner from "../localSpinner";
import PageLoading from "../pageLoading";
import { Translation } from "../translation";


const FeedbackView: React.FC = () => {

    const getFeedbackListQueryStatus = useGetFeedbackListQuery(null);

    return (
        <>    
            <section className="section bg-gray">
                <div className="container">
                <header className="section-header mb-0"><h2><Translation tid="header_feedback_title" /></h2>
                <hr />
                </header>

                <div className="row gap-y text-center">
                {getFeedbackListQueryStatus.isLoading && <LocalSpinner /> }
                {getFeedbackListQueryStatus.data && getFeedbackListQueryStatus.data.resultCode == ResultCode.Success &&
                <>
                 {getFeedbackListQueryStatus.data.resource.map((c) => (
                    <div className="col-md-6 mx-auto">
                       
                        <blockquote className="blockquote"> 
                            <div className="iconbox iconbox-xxl bg-white mb-7">
                                <i className="icon-profile-male lead-6"></i>
                            </div> 

                            <br />
                            {Array.from(Array(Math.ceil(c.rating)), (e, i) => 
                            <>
                                <span className="iconbox text-warning iconbox-sm mr-1">
                                    <i className="fa fa-star"></i>
                                </span>
                            </> 
                             )}
                            <br /> 
                            {c.comment.length > 500 ? c.comment.substring(0, 500) : c.comment }
                            <footer>{c.user.fullName}</footer>
                        </blockquote>
                    </div> 
                
                        ))}                  
                    </>
                    }
                </div> 
                </div>
            </section>

        </>);
}

export default FeedbackView;