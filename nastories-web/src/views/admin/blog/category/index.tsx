import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import AdminLayout from '../../../../components/adminLayout';
import * as bt from 'react-bootstrap'; 
import CategorysList from '../../../../components/admin/category';


const Category: React.FC = (): ReactElement => {

    return (
        <>
            <AdminLayout>
                  <CategorysList />
            </AdminLayout>
        </>
    );
}

export default Category;