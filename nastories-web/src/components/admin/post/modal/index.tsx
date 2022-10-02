import { ErrorMessage, Field, Form, Formik, FormikHelpers, useFormik, useFormikContext } from "formik";
import React, { useState, useEffect, useRef } from "react";
import { useAppContext } from "../../../../contexts/appContext";
import { Translation } from "../../../translation";
import * as Yup from "yup";
import { dictionaryList } from "../../../../locales";
import { AppSetting } from "../../../../types/type";
import { ResultCode } from "../../../../utils/enums";
import PageLoading from "../../../pageLoading";
import { BlogPost } from "../../../../services/models/admin/blogPost";
import * as uuid from "uuid";
import { useCreateEditBlogPostMutation } from "../../../../services/admin";
//@ts-ignore
import { SliderPicker } from 'react-color';
import { getLoggedUser } from "../../../../utils/functions";
import { Category } from "../../../../services/models/admin/category";
import { Tag } from "../../../../services/models/tag";
import { useUploadImageMutation, useUploadPackageFileMutation } from "../../../../services/fileService";
import { GlobalKeys } from "../../../../utils/constants";

let appSetting: AppSetting = require('../../../../appSetting.json');

interface FormValues {
    id: string,
    title: string,
    thumbnail: string,
    shortDescription: string,
    content: string,
    categoty?: Category,
    tags?: Tag[], 
    isArchived: boolean,
    isPublic: boolean,
    isDraft: boolean
}

type Props = {
    dataModel?: BlogPost,
    onClose: (dataModel?: BlogPost) => void,
}

const AddEditBlogPostModal: React.FC<Props> = ({ dataModel, onClose }) => {

    const { locale } = useAppContext(); 
    const [BlogPost, setBlogPost] = useState<BlogPost | undefined>(dataModel);
    const [createEditBlogPost, createEditBlogPostStatus] = useCreateEditBlogPostMutation();
    const [isArchived, setIsArchived] = useState<boolean>(dataModel != null ? dataModel.isArchived : false);
    const [isPublic, setIsPublic] = useState<boolean>(dataModel != null ? dataModel.isPublic : false);
    const [isDraft, setIsDraft] = useState<boolean>(dataModel != null ? dataModel.isDraft : false);

    const [uploadFile, uploadData] = useUploadImageMutation();
    const [uploadPackageFile, uploadPackageData] = useUploadPackageFileMutation();
    const [currentThumbnail, setCurrentThumbnail] = useState<string>(dataModel?.thumbnail ?? GlobalKeys.NoThumbnailUrl);
    const [currentPackage, setCurrentPackage] = useState<string>();
     
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
        title: (dataModel != null ? dataModel?.title : ""),
        thumbnail: (dataModel != null ? dataModel?.thumbnail : ""),
        shortDescription: (dataModel != null ? dataModel?.shortDescription : ""),
        content: (dataModel != null ? dataModel?.content : ""),
        isArchived: (dataModel != null ? dataModel.isArchived : false),
        isPublic: (dataModel != null ? dataModel.isPublic : false),
        isDraft: (dataModel != null ? dataModel.isDraft : false),
        categoty: dataModel?.category,
        tags: dataModel?.tags
    };

    const validationSchema = () => {
        return Yup.object().shape({
            title: Yup.string().required(dictionaryList[locale]["RequiredField"])
            .test("BlogPostNameAlreadyExisted", dictionaryList[locale]["BlogPostNameAlreadyExisted"], (title) => {
                if (title) {
                    return new Promise((resolve, reject) => {
                        const currentUser = getLoggedUser();
                        const headers: HeadersInit = {
                            'Content-Type': 'application/json',
                            'X-Request-Id': uuid.v4().toString(),
                            'Authorization': `Bearer ${currentUser?.accessToken}`
                          };
                        const opts: RequestInit = {
                            method: 'GET',
                            headers
                          };
                        fetch(appSetting.BaseUrl + `admin/CheckBlogPostTitle?title=${title}` + (dataModel != null? `&BlogPostid=${dataModel.id}`: ""), opts)
                            .then(response => response.json())
                            .then((json) => {
                                if (json.resultCode == ResultCode.Invalid)
                                    resolve(false);
                                else
                                    resolve(true);
                            }).catch(() => {
                                resolve(false);
                            })
                    })
                }
                else {
                    return true;
                }
            }),
            shortDescription: Yup.string()
                .required(dictionaryList[locale]["RequiredField"])
                .length(500),
            content: Yup.string()
            .required(dictionaryList[locale]["RequiredField"])

        });
    }
    const handleOnSubmit = (values: FormValues, actions: FormikHelpers<FormValues>) => { 
         
    }

    useEffect(() => {
        if (createEditBlogPostStatus.isSuccess && createEditBlogPostStatus.data.resultCode == ResultCode.Success) {
            onClose(createEditBlogPostStatus.data.resource);
        }
    }, [createEditBlogPostStatus])

    const handleArchivedClick: React.MouseEventHandler<HTMLLabelElement> = (e) => {
        setIsArchived(!isArchived);
    }
    const handlePublicClick: React.MouseEventHandler<HTMLLabelElement> = (e) => {
        setIsPublic(!isPublic);
    } 
    const inputFileUploadRef = useRef<HTMLInputElement>(null);

    const handleSelectFile: React.ChangeEventHandler<HTMLInputElement> = (e) => { 
        let file = e.target.files?.item(0);
        if (file) {
            const formData = new FormData();
            formData.append("file", file!);
            uploadFile(formData);
        }
    }

    const handleUploadFile: React.MouseEventHandler<HTMLAnchorElement> = (e) => { 
        inputFileUploadRef.current?.click();
    }

    useEffect(() => {
        if (uploadData.data && uploadData.data.resultCode == ResultCode.Success) {
            setCurrentThumbnail(uploadData.data.resource.url);
        }
    }, [uploadData.data]);

    const handleSelectPackageFile: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        let file = e.target.files?.item(0);
        if (file) {
            const formData = new FormData();
            formData.append("file", file!);
            uploadPackageFile(formData);
        }
    }


    useEffect(() => {
        if (uploadPackageData.data && uploadPackageData.data.resultCode == ResultCode.Success) {
            setCurrentPackage(uploadPackageData.data.resource.url);

        }
    }, [uploadPackageData]);
    
 
    // 
    return (<>
        {createEditBlogPostStatus.isLoading && <PageLoading />}
        <div className="modal fade show" role="dialog" aria-labelledby="addEditBlogPostModalLabel" aria-modal="true"  >
            <div className="modal-dialog modal-lg" role="document">
                <div className="modal-content">

                    <div className="modal-header">
                        <h5 className="modal-title" id="addEditBlogPostModalLabel">
                            {!dataModel && <Translation tid="CreateNewBlogPost" />}
                            {dataModel && <Translation tid="EditBlogPost" />}
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
                                    <div className="form-group align-items-center text-center">
                                        <img src={currentThumbnail} alt={"Thumbnail"} className="thumbnail-upload-img" width="350" />
                                        <div className="profile-avatar-edit-link-container mt-4">  
                                                <input type="file" name="image" ref={inputFileUploadRef} onChange={handleSelectFile} /> 
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <Field type="hidden" name="id" />
                                        <Field type="text" className="form-control" name="title" placeholder="title" />
                                        <ErrorMessage
                                            name="title"
                                            component="div"
                                            className="alert alert-field alert-danger"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <Field type="textarea" as="textarea" row={7} length={500} className="form-control" name="shortDescription" placeholder="short description" />
                                        <ErrorMessage
                                            name="shortDescription"
                                            component="div"
                                            className="alert alert-field alert-danger"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <Field type="textarea" as="textarea" row={15} className="form-control" name="content" placeholder="content" />
                                        <ErrorMessage
                                            name="content"
                                            component="div"
                                            className="alert alert-field alert-danger"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <div className="custom-control custom-checkbox">
                                            <Field type="checkbox" className="custom-control-input" name="isArchived" checked={isArchived} />
                                            <label className="custom-control-label" onClick={handleArchivedClick} ><Translation tid="archived" /></label>
                                        </div>
                                        <div className="custom-control custom-checkbox">
                                            <Field type="checkbox" className="custom-control-input" name="isPublic" checked={isPublic} />
                                            <label className="custom-control-label" onClick={handlePublicClick} ><Translation tid="input_public" /></label>
                                        </div>
                                    </div>
                                    <div className="modal-footer border-0 pr-0 pl-0">
                                        <button type="button" className="btn btn-secondary" onClick={onCancelHandler} data-dismiss="modal"><Translation tid="btnClose" /></button>
                                        {!dataModel &&
                                        <button type="submit" className="btn btn-primary" >
                                            <Translation tid="btnSaveDraft" />
                                        </button>
                                        }
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

export default AddEditBlogPostModal;