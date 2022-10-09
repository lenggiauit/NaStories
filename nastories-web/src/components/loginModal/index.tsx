import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useAppContext } from "../../contexts/appContext";
import { dictionaryList } from "../../locales";
import { AppSetting, LoginFormValues } from "../../types/type";
import { ResultCode } from "../../utils/enums";
import { getLoggedUser, logout, setLoggedUser } from "../../utils/functions";
import { Translation } from "../translation";
import * as Yup from "yup";
import { Md5 } from "md5-typescript";
import { useUserLoginMutation } from "../../services/account";
let appSetting: AppSetting = require('../../appSetting.json');

type Props = {
    isShow: boolean;
    onClose: (isLogged: boolean) => void;
}

const LoginModal : React.FC<Props> = ({ isShow, onClose }) =>{
    
    const { locale, } = useAppContext(); 
    let initialValues: LoginFormValues = { username: '', password: '' };
    
      // login
    const [login, { isLoading, data, error }] = useUserLoginMutation();
 
    const validationSchema = () => {
        return Yup.object().shape({
            username: Yup.string().required(dictionaryList[locale]["RequiredField"]),
            password: Yup.string().required(dictionaryList[locale]["RequiredField"]),
        });
    }
    const handleOnSubmit = (values: LoginFormValues, actions: FormikHelpers<LoginFormValues>) => {
        let pwd = Md5.init(values.password);
        login({ payload: { name: values.username, password: pwd } });

    }
    const onCloseHandler: any = () => {
        onClose(false);
    }

    useEffect(() => {
        logout();
    }, [])
    useEffect(() => {
        if (data && data.resultCode == ResultCode.Success) {
            setLoggedUser(data.resource); 
            onClose(true);
        }
    }, [data])
 
    return(<> 
        <div className={`modal fade ${ isShow ? "show": ""}`} role="dialog" aria-labelledby="loginModalLabel" aria-modal="true"  >
            <div className="modal-dialog modal-sm" role="document">
                <div className="modal-content"> 
                    <div className="modal-header">
                        <h5 className="modal-title" id="loginModalLabel"><Translation tid="SigninToYourAccount" /></h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={onCloseHandler} >
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div className="modal-body pb-0 pt-5">
                    <Formik initialValues={initialValues} onSubmit={handleOnSubmit} validationSchema={validationSchema} >
                            <Form autoComplete={"off"}>
                                <div className="form-group">
                                    <Field type="text" className="form-control" name="username" placeholder="Username or Email" />
                                    <ErrorMessage
                                        name="username"
                                        component="div"
                                        className="alert alert-field alert-danger"
                                    />
                                </div>

                                <div className="form-group">
                                    <Field type="password" className="form-control" name="password" placeholder="Password" />
                                    <ErrorMessage
                                        name="password"
                                        component="div"
                                        className="alert alert-field alert-danger"
                                    />
                                </div> 
                                <div className="form-group">
                                    <button className="btn btn-block btn-primary" type="submit" disabled={isLoading} >
                                        <Translation tid="Login" />
                                    </button>
                                </div>
                            </Form>
                        </Formik>
                    </div>
                </div>
            </div>
        </div> 
    </>);
}

export default LoginModal;