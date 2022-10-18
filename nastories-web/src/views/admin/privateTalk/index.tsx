import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import AdminLayout from '../../../components/adminLayout';
import * as bt from 'react-bootstrap';  
import AdminPrivateTalkList from '../../../components/admin/privateTalk';

const AdminPrivateTalk: React.FC = (): ReactElement => {

    return (
        <>
            <AdminLayout>
                <AdminPrivateTalkList />
            </AdminLayout>
        </>
    );
}

export default AdminPrivateTalk;