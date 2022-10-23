import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import AdminLayout from '../../../components/adminLayout';
import * as bt from 'react-bootstrap';  
import AdminMockInterviewList from '../../../components/admin/mockInterview';

const AdminMockInterview: React.FC = (): ReactElement => {

    return (
        <>
            <AdminLayout>
                <AdminMockInterviewList />
            </AdminLayout>
        </>
    );
}

export default AdminMockInterview;