import { ErrorMessage, Field, Form, Formik, FormikHelpers, useFormik, useFormikContext } from "formik";
import React, { useState, useEffect } from "react";
import { useAppContext } from "../../../../contexts/appContext";
import { Translation } from "../../../translation";
import * as Yup from "yup";
import { dictionaryList } from "../../../../locales";
import { AppSetting } from "../../../../types/type";
import { ResultCode } from "../../../../utils/enums";
import PageLoading from "../../../pageLoading";
import * as uuid from "uuid";
//@ts-ignore
import { SliderPicker } from 'react-color';
import { checkIfFilesAreCorrectType, getLoggedUser } from "../../../../utils/functions";
import { FileSharing } from "../../../../services/models/admin/fileSharing";
import showDialogModal from "../../../modal/showModal";
import { useUploadPackageFileMutation } from "../../../../services/fileService";
import { useCreateEditFileSharingMutation } from "../../../../services/admin";

let appSetting: AppSetting = require('../../../../appSetting.json');

interface FormValues {
    id: string,
    category: string,
    name: string,
    url: string,
    isArchived: boolean
}

type Props = {
    dataModel?: FileSharing | undefined,
    onClose: (dataModel?: FileSharing) => void,
}

const AddEditResourceModal: React.FC<Props> = ({ dataModel, onClose }) => {

    const { locale } = useAppContext();
    const formikProps = useFormikContext();
    const [FileSharing, setFileSharing] = useState<FileSharing | undefined>(dataModel);
    const [isArchived, setIsArchived] = useState<boolean>(dataModel != null ? dataModel.isArchived : false);
    const [currentFile, setCurrentFile] = useState<string>();
    const [uploadFile, uploadFileData] = useUploadPackageFileMutation();
    const [createEditFileSharing, createEditFileSharingStatus] = useCreateEditFileSharingMutation();
    const onCancelHandler: React.MouseEventHandler<HTMLButtonElement> = (e) => {
        e.preventDefault();
        onClose();
    }

    const onCloseHandler: any = () => {
        onClose();
    }

    let initialValues: FormValues =
    {
        id: (dataModel == null ? uuid.NIL : dataModel.id),
        name: (dataModel != null ? dataModel?.name : ""),
        category: (dataModel != null ? dataModel?.category : ""),
        url: (dataModel != null ? dataModel?.url : ""),
        isArchived: (dataModel != null ? dataModel.isArchived : false),
    };

    useEffect(() => {
        setCurrentFile(dataModel?.url);
    }, [dataModel]);
    

    const validationSchema = () => {
        return Yup.object().shape({
            name: Yup.string().required(dictionaryList[locale]["RequiredField"]), 
            category: Yup.string().required(dictionaryList[locale]["RequiredField"]), 
        });
    }
    const handleOnSubmit = (values: FormValues, actions: FormikHelpers<FormValues>) => {
        createEditFileSharing({
            payload: {
                id: values.id,
                name: values.name,
                category: values.category,
                url: currentFile,
                isArchived: isArchived
            }
        }); 
    }

    useEffect(() => {
        if (createEditFileSharingStatus.isSuccess && createEditFileSharingStatus.data.resultCode == ResultCode.Success) {
            onClose(createEditFileSharingStatus.data.resource);
        }
    }, [createEditFileSharingStatus])

    const handleArchivedClick: React.MouseEventHandler<HTMLLabelElement> = (e) => {
        setIsArchived(!isArchived);
    }

    const handleSelectFile: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        let file = e.target.files?.item(0);
        if (file) { 
            const formData = new FormData();
            formData.append("file", file!);
            uploadFile(formData);
        }
        else{
            showDialogModal({ message: "Bạn cần chọn file Pdf, Word, Excel, Images..."})
        }
    }

    useEffect(() => {
        if (uploadFileData.data && uploadFileData.data.resultCode == ResultCode.Success) { 
            setCurrentFile(uploadFileData.data.resource.url); 
        }
    }, [uploadFileData]);

    // 
    return (<>
       {createEditFileSharingStatus.isLoading && <PageLoading />}
        <div className="modal fade show" role="dialog" aria-labelledby="addEditFileSharingModalLabel" aria-modal="true"  >
            <div className="modal-dialog modal-lg" role="document">
                <div className="modal-content">

                    <div className="modal-header">
                        <h5 className="modal-title" id="addEditFileSharingModalLabel">
                            {!dataModel && <Translation tid="CreateNewFileSharing" />}
                            {dataModel && <Translation tid="EditFileSharing" />}
                        </h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={onCloseHandler} >
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div className="modal-body pb-0 pt-5">
                        <Formik initialValues={initialValues}
                            onSubmit={handleOnSubmit}
                            validationSchema={validationSchema}
                            validateOnChange={false}  >
                            {({ values, errors, touched }) => (
                                <Form autoComplete="off">
                                <div className="form-group"> 
                                        <Field type="text" className="form-control" name="category" placeholder="category" />
                                        <ErrorMessage
                                            name="category"
                                            component="div"
                                            className="alert alert-field alert-danger"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <Field type="hidden" name="id" />
                                        <Field type="text" className="form-control" name="name" placeholder="name" />
                                        <ErrorMessage
                                            name="name"
                                            component="div"
                                            className="alert alert-field alert-danger"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <div className="custom-control custom-checkbox">
                                            <Field type="file" name="coverLetter" className="custom-file-input" onChange={handleSelectFile} accept=".jpg, .jpeg, .png, .pdf, .doc, .docx, .xlsx, .xls" />
                                            <label className="custom-file-label">{currentFile != null ? currentFile : ""}</label>
                                        </div>
                                        <ErrorMessage
                                            name="coverLetter"
                                            component="div"
                                            className="alert alert-field alert-danger"
                                        />
                                    </div> 
                                    <div className="form-group">
                                        <div className="custom-control custom-checkbox">
                                            <Field type="checkbox" className="custom-control-input" name="isArchived" checked={isArchived} />
                                            <label className="custom-control-label" onClick={handleArchivedClick} ><Translation tid="archived" /></label>
                                        </div>
                                    </div>
                                    <div className="modal-footer border-0 pr-0 pl-0">
                                        <button type="button" className="btn btn-secondary" onClick={onCancelHandler} data-dismiss="modal"><Translation tid="btnClose" /></button>
                                        <button type="submit" className="btn btn-primary" >
                                            {dataModel && <Translation tid="btnSave" />}
                                            {!dataModel && <Translation tid="btnCreate" />}
                                        </button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        </div>
    </>);
}

export default AddEditResourceModal;