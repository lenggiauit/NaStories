import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Layout from '../../components/layout';
import { selectUser } from "../../store/userSlice";
import { decrypt } from '../../utils/crypter';
import { getLoggedUser } from '../../utils/functions';
import * as bt from 'react-bootstrap';
import Footer from '../../components/footer'; 


const Home: React.FC = (): ReactElement => {

    return (
        <>
            <Layout isPublic={true}>

               
                
                <Footer />
            </Layout>

        </>
    );
}

export default Home;