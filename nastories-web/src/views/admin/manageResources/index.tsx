import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import AdminLayout from '../../../components/adminLayout';
import * as bt from 'react-bootstrap';  
import AdminResources from '../../../components/admin/manageResources';


const Resources: React.FC = (): ReactElement => {

    return (
        <>
            <AdminLayout>
                <AdminResources />
            </AdminLayout>
        </>
    );
}

export default Resources;