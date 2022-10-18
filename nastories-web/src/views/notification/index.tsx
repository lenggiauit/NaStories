import { ReactElement } from "react";
import Footer from "../../components/footer";
import Layout from "../../components/layout";
import NotificationList from "../../components/notification";
import { AppSetting } from "../../types/type";

const appSetting: AppSetting = require('../../appSetting.json');

const Notification: React.FC = (): ReactElement => {

    return (<>
        <Layout> 
            <NotificationList />
            <Footer />
        </Layout>
    </>)

}

export default Notification;