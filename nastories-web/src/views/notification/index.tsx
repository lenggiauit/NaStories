import { ReactElement } from "react";
import Footer from "../../components/footer";
import Layout from "../../components/layout";
import { AppSetting } from "../../types/type";

const appSetting: AppSetting = require('../../appSetting.json');

const Notification: React.FC = (): ReactElement => {

    return(<>
            <Layout>
                <div className="container height-100vh-nav-footer">
                    <div className="row h-100">

                        <h2>Notification</h2>
                    </div>
                </div>
                <Footer />
            </Layout>
    </>)

}

export default Notification;