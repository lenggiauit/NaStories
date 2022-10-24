import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import React, { ReactElement } from "react";
import { render, unmountComponentAtNode } from 'react-dom'
import { useAppContext } from "../../../contexts/appContext";
import { dictionaryList } from "../../../locales";
import { Translation } from "../../translation";
import * as Yup from "yup";

const pmModalDialogId = "delete-confirm-modal-dialog";

interface FormValues {
    reason: string
}

type Props = {
    options: PropTypes
}

const ConfirmModal: React.FC<Props> = ({ options }) => {

    const { locale } = useAppContext();
    let initialValues: FormValues =
    {
        reason: ""
    };

    const validationSchema = () => {
        return Yup.object().shape({
            reason: Yup.string()
                .required(dictionaryList[locale]["RequiredField"])

        });
    }
    const handleOnSubmit = (values: FormValues, actions: FormikHelpers<FormValues>) => {
        removeModalComponent();
        options.onConfirm(values.reason);
    }

    const removeModalComponent = (): void => {
        const target = document.getElementById(pmModalDialogId);
        if (target) {
            unmountComponentAtNode(target);
        }

    }
    const onCloseHandler: React.MouseEventHandler<HTMLButtonElement> = () => {
        removeModalComponent();
    }
    const onCancelHandler: React.MouseEventHandler<HTMLButtonElement> = () => {
        removeModalComponent();
        if (options.onCancel)
            options.onCancel();
    }

    return (<>
        <div className="modal fade show" role="dialog" aria-labelledby="exampleModalLabel" aria-modal="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    {options.title && <>
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">{options.title}</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={onCloseHandler} >
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                    </>}
                    <Formik initialValues={initialValues}
                        onSubmit={handleOnSubmit}
                        validationSchema={validationSchema}
                        validateOnChange={false}  >
                        {({ values, errors, touched }) => (
                            <Form autoComplete="off">
                                <div className="modal-body pb-0">
                                    <p className="m-0 ml-1">{options.message}</p>
                                    <div className="form-group m-2">
                                        <Field type="text" className="form-control" name="reason" placeholder="lý do" />
                                        <ErrorMessage
                                            name="reason"
                                            component="div"
                                            className="alert alert-field alert-danger"
                                        />
                                    </div>
                                    <div className="modal-footer border-0">
                                        <button type="button" className="btn btn-secondary" onClick={onCancelHandler} data-dismiss="modal"><Translation tid="btnClose" /></button>
                                        <button type="submit" className="btn btn-primary"><Translation tid="btnConfirm" /></button>
                                    </div>
                                </div>

                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    </>);
}

type PropTypes = {
    title?: any,
    message: any,
    onConfirm: (reason: any) => void,
    onCancel?: () => void,
}

const showDeleteConfirmModal = (options: PropTypes) => {
    let divTarget = document.getElementById(pmModalDialogId);
    if (divTarget) {
        render(<ConfirmModal options={options} />, divTarget);
    } else {

        divTarget = document.createElement('div');
        divTarget.id = pmModalDialogId;
        document.body.appendChild(divTarget);
        render(<ConfirmModal options={options} />, divTarget);
    }
}

export default showDeleteConfirmModal;