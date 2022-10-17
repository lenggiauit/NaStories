import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import { ReactElement, useState } from "react";
import { v4 } from "uuid";
import { useGetRelatedPostQuery, useAddCommentMutation } from "../../services/blog";
import { BlogPostResource } from "../../services/resources/blogPostResource";
import { ResultCode } from "../../utils/enums";
import { getLoggedUser } from "../../utils/functions";
import LoginModal from "../loginModal";
import { Translation } from "../translation";
import * as Yup from "yup";
import { dictionaryList } from "../../locales";
import { useAppContext } from "../../contexts/appContext";
import { CommentResource } from "../../services/resources/commentResource";

type Props = {
    postData: BlogPostResource;
    onSubmit: (comment: CommentResource) => void;
}

interface FormValues {
    comment: any;
}

const PostCommentForm: React.FC<Props> = ({ postData }): ReactElement => {

    const { locale, } = useAppContext();
    let initialValues: FormValues = { comment: '' };
    const [postComment, { isLoading, data, error }] = useAddCommentMutation();

    const validationSchema = () => {
        return Yup.object().shape({
            username: Yup.string().required(dictionaryList[locale]["RequiredField"]),
        });
    }
    const handleOnSubmit = (values: FormValues, actions: FormikHelpers<FormValues>) => {

            alert(values.comment);

    }

    return (
        <div className="p-6">
            <Formik initialValues={initialValues} onSubmit={handleOnSubmit} validationSchema={validationSchema} validateOnChange={false} >
                <Form autoComplete="off">
                    <div className="form-group">
                        <Field type="textarea" as="textarea" row={5} length={350} className="form-control" name="comment" placeholder="comment111" />
                        <ErrorMessage
                            name="comment"
                            component="div"
                            className="alert alert-field alert-danger"
                        />
                    </div>
                    <div className="form-group">
                        <button className="btn btn-block btn-primary float-right" style={{width: 150}} type="submit" disabled={isLoading} >
                            <Translation tid="Comment" />
                        </button>
                    </div>
                </Form>
            </Formik>
        </div>
    )
};

export default PostCommentForm;