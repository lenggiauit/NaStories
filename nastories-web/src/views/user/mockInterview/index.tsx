import React, { ReactElement } from "react";
import Footer from "../../../components/footer";
import Layout from "../../../components/layout"; 
import UserMockInterviewList from "../../../components/mockInterview/user";
 

const UserMockInterview: React.FC = (): ReactElement => {
    return (
        <>
            <Layout isPublic={false}> 
                <UserMockInterviewList /> 
                <Footer />
            </Layout>
        </>
    ); 
}

export default UserMockInterview;