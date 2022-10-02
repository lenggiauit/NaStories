import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import AdminLayout from '../../../components/adminLayout';
import * as bt from 'react-bootstrap'; 


const User: React.FC = (): ReactElement => {

    return (
        <>
            <AdminLayout>
                 admin user
            </AdminLayout>
        </>
    );
}

export default User;