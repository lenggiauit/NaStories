import React, { ReactElement } from "react";
import Footer from "../../components/footer";
import Layout from "../../components/layout";

const TermOfService: React.FC = (): ReactElement => {
    return (
        <>
            <Layout isPublic={true}> 
                <section className="section">
                    <div className="container">
                        <header className="section-header">
                            <h2>Term of Service</h2>
                            <hr /> 
                        </header> 
                        <div className="row gap-y text-center">
                            <p className="lead">
                                Terms of service are the legal agreements between a service provider and a person who wants to use that service. The person must agree to abide by the terms of service in order to use the offered service. Terms of service can also be merely a disclaimer, especially regarding the use of websites
                            </p>
                        </div> 
                    </div>
                </section> 
                <Footer />
            </Layout>
        </>
    ); 
}

export default TermOfService;