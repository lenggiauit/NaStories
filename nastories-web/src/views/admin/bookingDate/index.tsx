import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import AdminLayout from '../../../components/adminLayout';
import * as bt from 'react-bootstrap'; 
import BookingDateList from '../../../components/admin/booking';


const Category: React.FC = (): ReactElement => {

    return (
        <>
            <AdminLayout>
                  <BookingDateList />
            </AdminLayout>
        </>
    );
}

export default Category;