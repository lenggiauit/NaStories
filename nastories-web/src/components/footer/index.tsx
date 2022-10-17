import React, { ReactElement } from 'react';
import * as bt from 'react-bootstrap';
import Navigation from '../../components/navigation/'
import { AppProvider } from '../../contexts/appContext';
import { AnimationLogo } from '../animationLogo';
import { Translation } from '../translation';
 
const Footer: React.FC  = ({ children }): ReactElement => {
 
    return (
        <>
            <AppProvider> 
                <footer className="footer">
                    <div className="container">
                        <div className="row gap-y align-items-center">

                            <div className="col-md-4 text-center text-md-left"> 
                                <div className="social social-sm social-bg-brand social-cycling">
                                    <a className="social-facebook mr-2" target="_blank" href="https://www.facebook.com/NaAndStories"><i className="fa fa-facebook"></i></a> 
                                    <a className="social-youtube" target="_blank" href="https://www.youtube.com/@nastories"><i className="fa fa-youtube"></i></a> 
                                </div> 
                            </div>

                            <div className="col-md-8">
                                <div className="nav nav-bold nav-uppercase justify-content-center justify-content-md-end">
                                     <a className="nav-link" href="/"><Translation tid="nav_home" /></a>
                                    <a className="nav-link" href="/blog"><Translation tid="nav_blog" /></a>  
                                    {/* <a className="nav-link" href="/termOfService"><Translation tid="nav_termsOfService" /></a> */}
                                    <a className="nav-link" href="/contact"><Translation tid="nav_contact" /></a>
                                </div>
                            </div>

                            <div className="col-12">
                                <hr className="my-0" />
                            </div>

                            <div className="col-md-12 text-center text-md-left">
                                <small>© 2022 Na’s Stories, Lenggiauit. All rights reserved.</small>
                            </div> 
                        </div>
                    </div>
                </footer>



                {children}
            </AppProvider>
        </>
    )

};

export default Footer;



