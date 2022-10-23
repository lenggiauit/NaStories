import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import AdminLayout from '../../../components/adminLayout';
import * as bt from 'react-bootstrap';   
import AdminMockInterviewDetail from '../../../components/admin/mockInterview/detail';

const AdminMockInterviewDetailPage: React.FC = (): ReactElement => {

    return (
        <>
            <AdminLayout>
                <AdminMockInterviewDetail />
            </AdminLayout>
        </>
    );
}

export default AdminMockInterviewDetailPage;