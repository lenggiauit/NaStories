import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import AdminLayout from '../../../components/adminLayout';
import * as bt from 'react-bootstrap'; 
import AdminUserList from '../../../components/admin/user';


const User: React.FC = (): ReactElement => {

    return (
        <>
            <AdminLayout>
                <AdminUserList />
            </AdminLayout>
        </>
    );
}

export default User;