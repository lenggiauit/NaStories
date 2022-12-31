import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import React from 'react';
import { Translation } from '../translation';
import { v4 } from "uuid";
import * as Yup from "yup";
import * as uuid from "uuid";
import { NIL as NIL_UUID } from 'uuid';
import { useEffect, useState } from "react";
import { AppSetting } from '../../types/type';
import { dictionaryList } from '../../locales';
import { useAppContext } from '../../contexts/appContext';
import { useSendContactMutation } from '../../services/home';
import { ResultCode } from '../../utils/enums';
import showDialogModal from '../modal/showModal';
import PageLoading from '../pageLoading';


type FormValues = {
    yourName: string;
    yourEmail: string;
    yourMessage: string;
};



export const ContactForm: React.FC = () => {
    const { locale } = useAppContext();

    const [sendContact, sendContactStatus] = useSendContactMutation();

    let initialValues: FormValues =
    {

        yourName: "",
        yourEmail: "",
        yourMessage: ""
    };

    const validationSchema = () => {
        return Yup.object().shape({
            yourName: Yup.string().required(dictionaryList[locale]["RequiredField"])
                .max(100),
            yourEmail: Yup.string().email().required(dictionaryList[locale]["RequiredField"])
                .max(150),
            yourMessage: Yup.string().required(dictionaryList[locale]["RequiredField"]) 
        });
    }


    const handleOnSubmit = (values: FormValues, actions: FormikHelpers<FormValues>) => {
        sendContact({ payload: { yourName: values.yourName, yourEmail: values.yourEmail, yourMessage: values.yourMessage } });
        actions.resetForm();
    }

    useEffect(() => {
        if (sendContactStatus.data && sendContactStatus.data.resultCode == ResultCode.Success) {
            showDialogModal({
                message: "Thông tin của bạn đã được gửi thành công, Na's Stories sẽ liên hệ với bạn sớm nhất có thể!",
                onClose: () => {

                }
            });
        }

    }, [sendContactStatus]);

    return (
        <>
            {sendContactStatus.isLoading && <PageLoading />}
            <Formik initialValues={initialValues}
                onSubmit={handleOnSubmit}
                validationSchema={validationSchema}
                validateOnChange={false}  >
                {({ values, errors, touched, setFieldValue }) => (
                    <Form autoComplete="off">
                        <div className="form-row pl-8 pr-8">
                            <div className="form-group col-md-6">
                                <Field type="text" className="form-control" name="yourName" placeholder="Họ tên" />
                                <ErrorMessage
                                    name="yourName"
                                    component="div"
                                    className="alert alert-field alert-danger"
                                />
                            </div>

                            <div className="form-group col-md-6">
                                <Field type="text" className="form-control" name="yourEmail" placeholder="Email" />
                                <ErrorMessage
                                    name="yourEmail"
                                    component="div"
                                    className="alert alert-field alert-danger"
                                />
                            </div>
                            <div className="form-group col-md-12">
                                <Field type="textarea" as="textarea" style={{height: 150}} className="form-control" name="yourMessage" placeholder="Nội dung" />
                                <ErrorMessage
                                    name="yourMessage"
                                    component="div"
                                    className="alert alert-field alert-danger"
                                />
                            </div>

                            <div className="col-12 text-center">
                                <button className="btn btn-primary " style={{ width: 250 }} type="submit"><Translation tid="btnSubmit"></Translation></button>
                            </div>
                        </div>

                    </Form>
                )}
            </Formik>

        </>
    );
}


