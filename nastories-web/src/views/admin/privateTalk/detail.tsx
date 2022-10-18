import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import AdminLayout from '../../../components/adminLayout';
import * as bt from 'react-bootstrap';   
import AdminPrivateTalkDetail from '../../../components/admin/privateTalk/detail';

const AdminPrivateTalkDetailPage: React.FC = (): ReactElement => {

    return (
        <>
            <AdminLayout>
                <AdminPrivateTalkDetail />
            </AdminLayout>
        </>
    );
}

export default AdminPrivateTalkDetailPage;