import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import AdminLayout from '../../../../components/adminLayout';
import * as bt from 'react-bootstrap'; 
import BlogPostList from '../../../../components/admin/post';


const Post: React.FC = (): ReactElement => {

    return (
        <>
            <AdminLayout>
                 <BlogPostList />
            </AdminLayout>
        </>
    );
}

export default Post;