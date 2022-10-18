import React, { ReactElement } from "react";
import Footer from "../../components/footer";
import Layout from "../../components/layout";
import { Translation } from "../../components/translation";

const Contact: React.FC = (): ReactElement => {
    return (
        <>
            <Layout isPublic={true}> 
                <section className="section">
                    <div className="container">
                        <header className="section-header">
                            <h2><Translation tid="nav_contact" /></h2>
                            <hr /> 
                        </header> 
                         
                        <div className="social social-bg-brand text-center">
                            <a className="social-facebook" target="_blank" href="https://www.facebook.com/NaAndStories"><i className="fa fa-facebook"></i></a> 
                            <a className="social-linkedin" target="_blank" href="https://www.linkedin.com/in/vanthikimchi"><i className="fa fa-linkedin"></i></a> 
                            <a className="social-youtube" target="_blank" href="https://www.youtube.com/@nastories"><i className="fa fa-youtube"></i></a> 
                        </div>
                        
                    </div>
                </section> 
                <Footer />
            </Layout>
        </>
    ); 
}

export default Contact;