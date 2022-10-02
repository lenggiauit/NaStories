import React, { ReactElement } from "react";
import Footer from "../../components/footer";
import Layout from "../../components/layout";

const Contact: React.FC = (): ReactElement => {
    return (
        <>
            <Layout isPublic={true}> 
                <section className="section">
                    <div className="container">
                        <header className="section-header">
                            <h2>Contact</h2>
                            <hr /> 
                        </header> 
                        <div className="row gap-y text-center">
                            <p className="lead">
                                
                            </p>
                        </div> 
                    </div>
                </section> 
                <Footer />
            </Layout>
        </>
    ); 
}

export default Contact;