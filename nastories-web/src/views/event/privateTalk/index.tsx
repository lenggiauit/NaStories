import Footer from "../../../components/footer";
import Layout from "../../../components/layout";
import PrivateTalkRegisterForm from "../../../components/privateTalk/registerForm";

const PrivateTalk: React.FC = ()  => {

    return (
        <>
            <Layout isPublic={true}>
                <PrivateTalkRegisterForm />
                <Footer />
            </Layout>

        </>
    );
}

export default PrivateTalk;