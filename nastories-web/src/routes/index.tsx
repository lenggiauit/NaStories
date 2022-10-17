import React, { ReactElement, Suspense, lazy } from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import GlobalSpinner from "../components/globalSpinner";
import NagistarLoading from "../components/nagistarLoading";
import history from "../utils/history";
var delayTime = 500;
const Home = lazy(() => {
    return Promise.all([
        import("../views/home"),
        new Promise(resolve => setTimeout(resolve, delayTime))
    ])
        .then(([moduleExports]) => moduleExports);
});


 

const Dashboard = lazy(() => {
    return Promise.all([
        import("../views/dashboard"),
        new Promise(resolve => setTimeout(resolve, delayTime))
    ])
        .then(([moduleExports]) => moduleExports);
});
 
const Messages = lazy(() => {
    return Promise.all([
        import("../views/messages"),
        new Promise(resolve => setTimeout(resolve, delayTime))
    ])
        .then(([moduleExports]) => moduleExports);
});

const Notification = lazy(() => {
    return Promise.all([
        import("../views/notification"),
        new Promise(resolve => setTimeout(resolve, delayTime))
    ])
        .then(([moduleExports]) => moduleExports);
});

const Profile = lazy(() => {
    return Promise.all([
        import("../views/profile"),
        new Promise(resolve => setTimeout(resolve, delayTime))
    ])
        .then(([moduleExports]) => moduleExports);
});
 
const Login = lazy(() => {
    return Promise.all([
        import("../views/login"),
        new Promise(resolve => setTimeout(resolve, delayTime))
    ])
        .then(([moduleExports]) => moduleExports);
});

const Register = lazy(() => {
    return Promise.all([
        import("../views/register"),
        new Promise(resolve => setTimeout(resolve, delayTime))
    ])
        .then(([moduleExports]) => moduleExports);
});

const ForgotPassword = lazy(() => {
    return Promise.all([
        import("../views/forgotPassword"),
        new Promise(resolve => setTimeout(resolve, delayTime))
    ])
        .then(([moduleExports]) => moduleExports);
});
const ResetPassword = lazy(() => {
    return Promise.all([
        import("../views/resetPassword"),
        new Promise(resolve => setTimeout(resolve, delayTime))
    ])
        .then(([moduleExports]) => moduleExports);
});

const About = lazy(() => {
    return Promise.all([
        import("../views/about"),
        new Promise(resolve => setTimeout(resolve, delayTime))
    ])
        .then(([moduleExports]) => moduleExports);
});

const TermOfService = lazy(() => {
    return Promise.all([
        import("../views/termsOfService"),
        new Promise(resolve => setTimeout(resolve, delayTime))
    ])
        .then(([moduleExports]) => moduleExports);
});

const Contact = lazy(() => {
    return Promise.all([
        import("../views/contact"),
        new Promise(resolve => setTimeout(resolve, delayTime))
    ])
        .then(([moduleExports]) => moduleExports);
});

const Blog = lazy(() => {
    return Promise.all([
        import("../views/blog"),
        new Promise(resolve => setTimeout(resolve, delayTime))
    ])
        .then(([moduleExports]) => moduleExports);
});

const BlogDetail = lazy(() => {
    return Promise.all([
        import("../views/blog/detail"),
        new Promise(resolve => setTimeout(resolve, delayTime))
    ])
        .then(([moduleExports]) => moduleExports);
});

const BlogCategory = lazy(() => {
    return Promise.all([
        import("../views/blog/category"),
        new Promise(resolve => setTimeout(resolve, delayTime))
    ])
        .then(([moduleExports]) => moduleExports);
});

const BlogTags = lazy(() => {
    return Promise.all([
        import("../views/blog/tag"),
        new Promise(resolve => setTimeout(resolve, delayTime))
    ])
        .then(([moduleExports]) => moduleExports);
});

const PrivateTalk = lazy(() => {
    return Promise.all([
        import("../views/event/privateTalk"),
        new Promise(resolve => setTimeout(resolve, delayTime))
    ])
        .then(([moduleExports]) => moduleExports);
});

const MockInterview = lazy(() => {
    return Promise.all([
        import("../views/event/mockInterview"),
        new Promise(resolve => setTimeout(resolve, delayTime))
    ])
        .then(([moduleExports]) => moduleExports);
});

 
// Admin 
const AdminBlogCategory = lazy(() => {
    return Promise.all([
        import("../views/admin/blog/category"),
        new Promise(resolve => setTimeout(resolve, delayTime))
    ])
        .then(([moduleExports]) => moduleExports);
});

const AdminBlogPost = lazy(() => {
    return Promise.all([
        import("../views/admin/blog/post"),
        new Promise(resolve => setTimeout(resolve, delayTime))
    ])
        .then(([moduleExports]) => moduleExports);
});

const AdminUsers = lazy(() => {
    return Promise.all([
        import("../views/admin/users"),
        new Promise(resolve => setTimeout(resolve, delayTime))
    ])
        .then(([moduleExports]) => moduleExports);
});

const AdminBookingDate = lazy(() => {
    return Promise.all([
        import("../views/admin/bookingDate"),
        new Promise(resolve => setTimeout(resolve, delayTime))
    ])
        .then(([moduleExports]) => moduleExports);
});

const Page404 = lazy(() => {
    return Promise.all([
        import("../views/pageNotFound"),
        new Promise(resolve => setTimeout(resolve, delayTime))
    ])
        .then(([moduleExports]) => moduleExports);
});

//user
const UserPrivateTalk = lazy(() => {
    return Promise.all([
        import("../views/user/privateTalk"),
        new Promise(resolve => setTimeout(resolve, delayTime))
    ])
        .then(([moduleExports]) => moduleExports);
});



const IndexRouter: React.FC = (): ReactElement => {
    return (
        <>
            <Router history={history}>
                <Suspense fallback={<NagistarLoading />}>
                    <Switch>
                        <Route path="/" exact component={Home} /> 
                        <Route path="/dashboard" exact component={Dashboard} /> 
                        <Route path="/notification" exact component={Notification} /> 
                        <Route path="/messages" exact component={Messages} />
                        <Route path="/profile" exact component={Profile} />
                         
                        <Route path="/login" exact component={Login} />
                        <Route path="/register" exact component={Register} />
                        <Route path="/forgotpassword" exact component={ForgotPassword} />
                        <Route path="/resetPassword" exact component={ResetPassword} />
                        <Route path="/about" exact component={About} />
                        <Route path="/contact" exact component={Contact} />
                        <Route path="/blog" exact component={Blog} /> 
                        <Route path="/blog/:postUrl" exact component={BlogDetail} />
                        <Route path="/blog/category/:categoryUrl" exact component={BlogCategory} />
                        <Route path="/blog/tag/:tagUrl" exact component={BlogTags} />
                         
                        <Route path="/private-talk" exact component={PrivateTalk} /> 
                        <Route path="/mock-interview" exact component={MockInterview} /> 

                        <Route path="/termOfService" exact component={TermOfService} />
                        {/* Admin  */} 
                        <Route path="/admin/blog/category" exact component={AdminBlogCategory} />
                        <Route path="/admin/blog/post" exact component={AdminBlogPost} />
                        <Route path="/admin/users" exact component={AdminUsers} />
                        <Route path="/admin/bookingdate" exact component={AdminBookingDate} />
                        {/* User  */} 
                        <Route path="/user/private-talk" exact component={UserPrivateTalk} />
                        <Route path="/user/private-talk/:id" exact component={UserPrivateTalk} />
                        {/* 404 */}
                        <Route path="/404" component={Page404} />
                        <Redirect to="/404" />
                    </Switch>
                </Suspense>
            </Router>
            <GlobalSpinner />
        </>
    );
};

export default IndexRouter;