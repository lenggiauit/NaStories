import React, { ReactElement } from "react";
import Footer from "../../../components/footer";
import Layout from "../../../components/layout";
import UserPrivateTalkList from "../../../components/privateTalk/user";
 

const UserPrivateTalk: React.FC = (): ReactElement => {
    return (
        <>
            <Layout isPublic={false}> 
                <UserPrivateTalkList /> 
                <Footer />
            </Layout>
        </>
    ); 
}

export default UserPrivateTalk;