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
import { useCreateEditBlogPostMutation, useGetQueryCategoryQuery } from "../../../../services/admin";
//@ts-ignore
import { SliderPicker } from 'react-color';
import { getLoggedUser } from "../../../../utils/functions";
import { Category } from "../../../../services/models/admin/category";
import { Tag } from "../../../../services/models/tag";
import { useUploadImageMutation, useUploadPackageFileMutation } from "../../../../services/fileService";
import { GlobalKeys } from "../../../../utils/constants"; 
import { Editor } from "react-draft-wysiwyg";
import { ContentState, convertFromHTML, EditorProps, EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"; 
import { stateToHTML } from 'draft-js-export-html'; 
import htmlToDraft from 'html-to-draftjs'; 
import { TagsInput } from "react-tag-input-component";

 

let appSetting: AppSetting = require('../../../../appSetting.json');

interface FormValues {
    id: string,
    title: string,
    thumbnail: string,
    shortDescription: string,
    content: string,
    categotyId: Category,
    tags: any[],
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
    const [isPublic, setIsPublic] = useState<boolean>(dataModel != null ? dataModel.isPublic : true);
    const [isDraft, setIsDraft] = useState<boolean>(dataModel != null ? dataModel.isDraft : false);

    const getQueryCategoryStatus = useGetQueryCategoryQuery({ payload: { isArchived: false } });

    const [uploadFile, uploadData] = useUploadImageMutation();
    const [currentThumbnail, setCurrentThumbnail] = useState<string>(dataModel?.thumbnail ?? GlobalKeys.NoThumbnailUrl);
    
    const blocksFromHTML = htmlToDraft(dataModel != null? dataModel?.content.replace(/(<\/?)figure((?:\s+.*?)?>)/g, '$1div$2'): "");
     
    const contentState = ContentState.createFromBlockArray(blocksFromHTML.contentBlocks);
    const [editorState, setEditorState] = React.useState(
        EditorState.createWithContent(contentState) );

    const [editorContent, setEditorContent] = useState<any>();
    const [selectedTags, setSelectedTags] = useState<any[]>(dataModel != null ? dataModel.tags.map(t => t.name) : []);

     
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
        categotyId: (dataModel != null ? dataModel.category.id : ""),
        tags: (dataModel != null ? dataModel.tags : []),
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
                            fetch(appSetting.BaseUrl + `admin/CheckBlogPostTitle?title=${title}` + (dataModel != null ? `&BlogPostid=${dataModel.id}` : ""), opts)
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
            categotyId: Yup.string()
                .required(dictionaryList[locale]["RequiredField"]),
            shortDescription: Yup.string()
                .required(dictionaryList[locale]["RequiredField"]),


        });
    }
    const handleOnSubmit = (values: FormValues, actions: FormikHelpers<FormValues>) => {

        createEditBlogPost({
            payload: {
                id: values.id,
                title: values.title,
                categoryId: values.categotyId,
                thumbnail: currentThumbnail,
                content: editorContent,
                shortDescription: values.shortDescription,
                isArchived: isArchived,
                isPublic: isPublic,
                isDraft: isDraft,
                tags: selectedTags

            }
        });
    }

    useEffect(() => {
        if (createEditBlogPostStatus.isSuccess && createEditBlogPostStatus.data.resultCode == ResultCode.Success) {
            onClose(createEditBlogPostStatus.data.resource);
        }
    }, [createEditBlogPostStatus])
 
    const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      
        const value = event.target.value;
        switch(value.toLocaleLowerCase()){
            case "published":
                {
                    setIsPublic(true);
                    setIsDraft(false);
                    setIsArchived(false);
                    break;
                }
                case "draft": {
                    setIsPublic(false);
                    setIsDraft(true);
                    setIsArchived(false);
                    break;
                }
                case "archived":{
                    setIsPublic(false);
                    setIsDraft(false);
                    setIsArchived(true);
                    break;
                }
        } 
      };
 
    const inputFileUploadRef = useRef<HTMLInputElement>(null);

    const handleSelectFile: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        let file = e.target.files?.item(0);
        if (file) {
            const formData = new FormData();
            formData.append("file", file!);
            uploadFile(formData);
        }
    }
 
    const uploadCallback = async (file: any) => {
        return new Promise((resolve, reject) => {
            if (file) {
                const formData = new FormData();
                formData.append("file", file);
                const currentUser = getLoggedUser();
                const headers: HeadersInit = {
                    // 'Content-Type': 'multipart/form-data',
                    'X-Request-Id': uuid.v4().toString(),
                    'Authorization': `Bearer ${currentUser?.accessToken}`
                };
                const opts: RequestInit = {
                    method: 'POST',
                    headers,
                    body: formData
                };
                fetch(appSetting.BaseUrl + "file/uploadImage", opts)
                    .then(response => response.json())
                    .then((json) => {
                        if (json.resultCode == ResultCode.Success)
                            resolve({ data: { link: json.resource.url } });
                        else
                            reject();
                    }).catch(() => {
                        reject();
                    })
            }
        });
    }

    useEffect(() => {
        if (uploadData.data && uploadData.data.resultCode == ResultCode.Success) {
            setCurrentThumbnail(uploadData.data.resource.url);
        }
    }, [uploadData.data]);

    useEffect(() => {
        setEditorContent(stateToHTML(editorState.getCurrentContent()));

    }, [editorState]);
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
                                        <Field as="select" type="select" name="categotyId"
                                            className="form-control" placeholder="Category"
                                            defaultValue={dataModel != null ? dataModel.category.id : ""} >
                                            <option value="" label="Select a categoty">Select a categoty</option>
                                            {getQueryCategoryStatus.data && <>
                                                {getQueryCategoryStatus.data.resource.map((type) => (
                                                    <option key={type.id} value={type.id} >{type.name}</option>
                                                ))}
                                            </>
                                            }
                                        </Field>
                                        <ErrorMessage
                                            name="categotyId"
                                            component="div"
                                            className="alert alert-field alert-danger"
                                        />
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
                                        <Field type="textarea" as="textarea" row={5} length={350} className="form-control" name="shortDescription" placeholder="short description" />
                                        <ErrorMessage
                                            name="shortDescription"
                                            component="div"
                                            className="alert alert-field alert-danger"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <div className="border" style={{ height: 255, overflow: 'auto' }}>
                                            <Editor wrapperClassName="nsEditorClassName"
                                                editorState={editorState} toolbar={{ image: { uploadEnabled: true, uploadCallback: uploadCallback, previewImage: true } }}
                                                onEditorStateChange={setEditorState}
                                            />
                                        </div>
                                        <ErrorMessage
                                            name="content"
                                            component="div"
                                            className="alert alert-field alert-danger"
                                        />
                                    </div>
                                    <div className="form-group">
                                    <TagsInput
                                        value={selectedTags}
                                        onChange={setSelectedTags}
                                        name="tags"
                                        placeHolder="tags"
                                    />
                                    </div>
                                    <div className="form-group">
                                        <select name="status" className="form-control" onChange={ handleStatusChange } >
                                            <option selected={dataModel?.isPublic}  value="Published">Published</option>
                                            <option selected={dataModel?.isDraft}  value="Draft">Draft</option>
                                            <option selected={dataModel?.isArchived}  value="Archived">Archived</option>
                                        </select> 
                                    </div>
                                    <div className="modal-footer border-0 pr-0 pl-0 mb-4">
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

export default AddEditBlogPostModal;