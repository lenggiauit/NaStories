import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';

import Layout from '../../components/layout';
import Footer from '../../components/footer';
import Resources from '../../components/resources';
import { Translation } from '../../components/translation';

const ResourcesPage: React.FC = (): ReactElement => {

    return (
        <>
            <Layout isPublic={true}>
                <section className="section">
                    <div className="container">
                        <header className="section-header mb-5">
                            <h2><Translation tid="nav_resources" /></h2> 
                        </header> 
                        <Resources /> 
                    </div>
                </section>
                <Footer />
            </Layout>

        </>
    );
}

export default ResourcesPage;