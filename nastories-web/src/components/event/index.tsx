import { ReactElement } from "react"
import { Translation } from "../translation";

const Event: React.FC = ({ }): ReactElement => {

    return (<>

        <section id="section-pricing" className="section bg-gray">
            <div className="container">
                <header className="section-header">
                    <h2><Translation tid="header_event_title" /></h2>
                    <hr />
                </header>
                <div className="row gap-y text-center">

                    <div className="col-md-6">
                        <div className="pricing-1 position-relative">

                            <p className="plan-name">Private Talk</p>
                            <br />
                            <h2 className="price">
                                <span className="price-unit">VND</span>
                                <span data-bind-radio="pricing" data-monthly="6.67" data-yearly="75">300k</span>
                            </h2>
                            <div className="text-muted p-1">
                                <ul className="list-infor">
                                    <li>
                                        <small>Bạn đang có một vài vấn đề băn khoăn, thắc mắc hoặc trở ngại cần được gỡ rối liên quan đến công việc, học tập, cuộc sống. </small>
                                    </li>
                                    <li>
                                        <small>Bạn cần một người lắng nghe và cho bạn lời khuyên hữu ích hoặc một góc nhìn mới.</small>
                                    </li>
                                    <li>
                                        <small>Bạn theo dõi Na cũng được một thời gian và bạn tin rằng những kỹ năng và kinh nghiệm của Na sẽ giúp được cho bạn.</small>
                                    </li>
                                </ul>
                            </div>
                            <br />
                            <br />
                            <p className="text-center py-3 align-self-end mt-auto">
                                <a className="btn btn-primary mt-auto" href="/private-talk">Đăng ký</a>  
                            </p>
                           
                                
                        </div>
                    </div>


                    <div className="col-md-6">
                        <div className="pricing-1">
                            <p className="plan-name">Mock Interview, Real Feedback</p>
                            <br />
                            <h2 className="price text-success">
                                <span className="price-unit">VND</span>
                                <span data-bind-radio="pricing">500k</span>
                            </h2>

                            <div className="text-muted p-1">
                                <ul className="list-infor">
                                    <li>
                                        <small>
                                        Bạn đang tìm kiếm cơ hội trong ngành IT Business Analyst nhưng chưa có nhiều kinh nghiệm hoặc còn thiếu tự tin.
                                        </small>
                                    </li>
                                    <li>
                                        <small>
                                        Bạn đã tham gia vài khóa học và trang bị khá nhiều kiến thức về ngành nhưng vẫn sợ hãi khi nghĩ đến việc đối diện với nhà tuyển dụng trong buổi phỏng vấn.
                                        </small>
                                    </li>
                                    <li>
                                        <small>
                                        Bạn muốn trải nghiệm thử một buổi phỏng vấn BA để có sự chuẩn bị tốt hơn. 
                                        </small>
                                    </li>
                                    <li>
                                        <small>
                                        Bạn đã từng nghe đến assignment khi phỏng vấn nhưng không biết nó ra sao và cách làm thế nào. 
                                        </small>
                                    </li>

                                </ul>
                            </div>

                            <br />
                            <p className="text-center py-3 align-self-end mt-auto">
                                <a className="btn btn-success" href="/mock-interview">Đăng ký</a>
                            </p>
                        </div>
                    </div>

                </div>


            </div>
        </section>


    </>);
}

export default Event;