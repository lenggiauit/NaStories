import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import AdminLayout from '../../../components/adminLayout';
import * as bt from 'react-bootstrap'; 
import AdminFeedbackList from '../../../components/admin/feedback';


const Feedback: React.FC = (): ReactElement => {

    return (
        <>
            <AdminLayout>
                <AdminFeedbackList />
            </AdminLayout>
        </>
    );
}

export default Feedback;