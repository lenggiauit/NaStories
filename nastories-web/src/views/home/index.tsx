import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Layout from '../../components/layout';
import { selectUser } from "../../store/userSlice";
import { decrypt } from '../../utils/crypter';
import { getLoggedUser } from '../../utils/functions';
import * as bt from 'react-bootstrap';
import Footer from '../../components/footer'; 
import Event from '../../components/event';
import Introduce from '../../components/introduce';
import CoverHeader from '../../components/coverHeader';
import YoutubeCarousel from '../../components/youtubeCarousel';
import BlogCarousel from '../../components/blog/blogCarousel';
import FeedbackView from '../../components/feedbackView';


const Home: React.FC = (): ReactElement => {

    return (
        <>
            <Layout isPublic={true}>
                <CoverHeader />
                <Introduce />
                <Event />
                <FeedbackView />
                <YoutubeCarousel />
                <BlogCarousel /> 
                <Footer />
            </Layout>

        </>
    );
}

export default Home;