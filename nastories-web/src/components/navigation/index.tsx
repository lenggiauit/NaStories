import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import * as bt from 'react-bootstrap';
import { Translation } from '../../components/translation/'
import { LanguageSelector } from '../languageSelector';
import { AppProvider } from '../../contexts/appContext';
import { getLoggedUser, hasPermission, hasPermissions, logout } from '../../utils/functions';
import { AnimationLogo } from '../animationLogo';
import { User } from '../../services/models/user';
import { PermissionKeys } from '../../utils/constants';
import { getSignalRHubConnection, StartSignalRHubConnection, StopSignalRHubConnection } from '../../services/chat';

type Props = {
    isPublic: boolean,
    navCssClass?: string,
    currentUser: User | null
}

const Navigation: React.FC<Props> = ({ isPublic, navCssClass, currentUser }) => {
    const location = useLocation();
    const signalRHubConnection = null;
    const [messageCount, setMessageCount] = useState<Number>(0);
    // Start onload 
    useEffect(() => {
        StartSignalRHubConnection();
        return () => {
            StopSignalRHubConnection();
        }
    }, []);
    useEffect(() => {
        setTimeout(() => {
            const signalRHubConnection = getSignalRHubConnection();
            if (signalRHubConnection.state === 'Connected') {
                const currentUser = getLoggedUser();
                if (currentUser != null) {
                    signalRHubConnection.send("checkNewMessages", currentUser.id);
                    console.log("checkNewMessages");
                }
                signalRHubConnection.on("onHaveNewMessages", (count) => {
                    setMessageCount(count);
                    console.log(count);
                });
            }
        }, 1000);


    }, [signalRHubConnection]);
    return (
        <>

            <nav className="navbar navbar-expand-lg navbar-dark">
                <div className="container">
                    <a className="navbar-brand" href="/">
                        <AnimationLogo width={45} height={45} />
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <span className="navbar-divider d-mobile-none"></span>
                        <ul className="nav nav-navbar nav-text-normal mr-auto">
                            <li>
                                <a className={`nav-link ${(location.pathname == '/') ? "active" : ""}`} href="/">
                                    <Translation tid="nav_home" />
                                </a>
                            </li>
                            <li>
                                <a className={`nav-link ${(location.pathname == '/about') ? "active" : ""}`} href="/about">
                                    <Translation tid="nav_about" />
                                </a>
                            </li>
                            <li>
                                <a className={`nav-link ${(location.pathname == '/blog') ? "active" : ""}`} href="/blog">
                                    <Translation tid="nav_blog" />
                                </a>
                            </li>
                            <li>
                                <a className={`nav-link ${(location.pathname == '/contact') ? "active" : ""}`} href="/contact">
                                    <Translation tid="nav_contact" />
                                </a>
                            </li>
                        </ul>
                        <div className="justify-content-end">
                            <ul className="nav nav-navbar nav-text-normal mr-auto navbar-right">
                                {currentUser != null
                                    && (hasPermissions([PermissionKeys.Admin]))
                                    && <>
                                        <li className="nav-item dropdown">
                                            <a className={`nav-link ${(location.pathname.indexOf('admin') != -1) ? "active" : ""}`}
                                                role="button" data-bs-toggle="dropdown" data-toggle="dropdown" aria-expanded="false"
                                                href="#">
                                                <i className="bi bi-gear-fill" style={{ fontSize: 24 }}></i>
                                            </a>
                                            <ul className="dropdown-menu">
                                                <li className="dropdown-submenu">
                                                    <i className="bi bi-files" style={{ fontSize: 18 }}></i><b><span className="ml-2"><Translation tid="nav_admin_blog" /></span></b>
                                                    <ul >
                                                        <li><a className="dropdown-item" href="/admin/blog/category"><Translation tid="nav_admin_manageCategory" /></a> </li>
                                                        <li><a className="dropdown-item" href="/admin/blog/post"><Translation tid="nav_admin_managePost" /></a> </li>
                                                    </ul> 
                                                </li>
                                               <li><hr className="dropdown-divider" /></li> 
                                                <li className="dropdown-submenu">
                                                <a className="dropdown-item" href="/admin/users">
                                                    <i className="bi bi-people-fill" style={{ fontSize: 18 }}></i>
                                                    <span className="ml-2"><Translation tid="nav_admin_manageUser" /></span>
                                                </a>
                                                </li>
                                            </ul>
                                        </li>
                                    </>
                                }
                                {currentUser != null && <>
                                    <li className="nav-item">
                                        <a className={`nav-link ${(location.pathname.indexOf('notification') != -1) ? "active" : ""}`} href="/notification">
                                            <i className="bi bi-bell" style={{ fontSize: 24 }}></i>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className={`nav-link ${(location.pathname.indexOf('messages') != -1) ? "active" : ""}`} href="/messages">

                                            <i className="bi bi-chat-text" style={{ fontSize: 24 }}></i>

                                            {messageCount == 0 ? "" : <> ({messageCount})</>}</a>
                                    </li>

                                    <li className="nav-item dropdown">
                                        <a className={`nav-link ${((location.pathname.indexOf('profile') != -1) ||
                                            (location.pathname.indexOf('propertylist') != -1) ||
                                            (location.pathname.indexOf('profile') != -1)
                                        ) ? "active" : ""}`}

                                            role="button" data-bs-toggle="dropdown" data-toggle="dropdown" aria-expanded="false"
                                            href="#">
                                            <i className="bi bi-person-circle" style={{ fontSize: 24 }}></i>
                                        </a>
                                        <ul className="dropdown-menu">
                                            <li><h5>{currentUser.email}</h5></li>
                                            <li><hr className="dropdown-divider" /></li>
                                            <li>
                                                <a className="dropdown-item" href="/profile">
                                                    <i className="bi bi-person-lines-fill" style={{ fontSize: 18 }}></i>
                                                    <span className="ml-2"><Translation tid="nav_profile" /></span>
                                                </a>
                                            </li>
                                            <li>
                                                <a className="dropdown-item" href="/yourappointment">
                                                    <i className="bi bi-calendar-check-fill" style={{ fontSize: 16 }}></i>
                                                    <span className="ml-2">Your appointment </span>
                                                </a>
                                            </li>

                                            <li><hr className="dropdown-divider" /></li>
                                            <li>
                                                <a className="dropdown-item" href="#" onClick={() => logout()}>
                                                    <i className="bi bi-box-arrow-right" style={{ fontSize: 18 }}></i>
                                                    <span className="ml-2"><Translation tid="nav_logout" /></span>
                                                </a>
                                            </li>
                                        </ul>
                                    </li>
                                    <LanguageSelector />
                                </>
                                }
                            </ul>
                        </div>
                        {isPublic && currentUser == null && <>
                            <a className="btn btn-sm btn-success" href="/login"><Translation tid="nav_login" /></a>
                        </>}
                    </div>
                </div>
            </nav>
        </>
    )
};

export default Navigation;