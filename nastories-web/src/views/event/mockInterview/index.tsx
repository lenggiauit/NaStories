import Footer from "../../../components/footer";
import Layout from "../../../components/layout";
import MockInterviewRegisterForm from "../../../components/mockInterview/registerForm";

const MockInterview: React.FC = ()  => {

    return (
        <>
            <Layout isPublic={true}>
                 <MockInterviewRegisterForm />
                <Footer />
            </Layout>

        </>
    );
}

export default MockInterview;