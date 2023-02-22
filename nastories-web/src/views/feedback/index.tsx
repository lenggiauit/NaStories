import React, { ReactElement } from 'react';
import Layout from '../../components/layout';
import Footer from '../../components/footer';
import { FeedbackForm } from '../../components/feedbackForm';
import { Translation } from '../../components/translation';
import { getLoggedUser } from '../../utils/functions';

const Home: React.FC = (): ReactElement => {
    const currentUser = getLoggedUser();
    let userName = "";
    if(currentUser != null)
    {
        userName = currentUser.fullName != null ? currentUser.fullName : currentUser.email;
    }
    return (
        <>
            <Layout isPublic={false}>
                <section className="section">
                    <div className="container">
                        <header className="section-header">
                            <h2>Nhận xét về chất lượng chương trình</h2>
                            <hr />
                            <p className="lead-2"> 
                                Xin chào {userName}, <br />
                                Mong bạn dành ra một vài phút đánh giá về chất lượng chương trình đã tham gia nhé. Ý kiến của bạn rất có ý nghĩa vì nó sẽ giúp Na nâng cao chất lượng cho những lần sau. 
                                <br />
                                Cảm ơn bạn rất nhiều! 
                            </p>
                        </header>
                        <FeedbackForm />
                        <br />
                        <br />  
                    </div>
                </section>
                <Footer />
            </Layout>
        </>
    );
}

export default Home;