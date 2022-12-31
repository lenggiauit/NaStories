import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import { useAppContext } from "../../../contexts/appContext";
import * as Yup from "yup";
import { dictionaryList } from '../../../locales';
import { useEffect, useState } from "react";
import { Translation } from "../../translation";
import { AppSetting, MetaData, Paging } from "../../../types/type";
import { FileSharingResource } from "../../../services/resources/fileSharingResource";
import LocalSpinner from "../../localSpinner";
import Pagination from "../../pagination";
import NotFound from "../../notFound";
import { useGetAdminFileSharingMutation } from "../../../services/admin";
import PageLoading from "../../pageLoading";
import { v4 } from "uuid";
import { FileSharing } from "../../../services/models/admin/fileSharing";
import AddEditResourceModal from "./modal";
let appSetting: AppSetting = require('../../../appSetting.json');

type FormValues = {
    keywords: string;
};

const AdminResources: React.FC = () => {

    const { locale } = useAppContext();

    let initialValues: FormValues =
    {
        keywords: ""
    };

    const validationSchema = () => {
        return Yup.object().shape({
            keywords: Yup.string().max(20)
        });
    }

    const handleOnSubmit = (values: FormValues, actions: FormikHelpers<FormValues>) => {
        setKeyWords(values.keywords);
    }
    const [isShowModal, setIsShowModal] = useState<boolean>(false);
    const [keyWords, setKeyWords] = useState<string | null>("");
    const [getFileSharingList, getFileSharingStatus] = useGetAdminFileSharingMutation();
    const [metaData, setMetaData] = useState<MetaData>({ paging: { index: 1, size: appSetting.PageSize } });
    const [pagingData, setPagingData] = useState<Paging>({ index: 1, size: appSetting.PageSize });
    const [totalRows, setTotalRows] = useState<number>(0);
    const [fileSharingList, setFileSharingList] = useState<FileSharing[]>([]);
    const [selecttedFileSharing, setSelecttedFileSharing] = useState<FileSharing | undefined>();
    const pagingChangeEvent: any = (p: Paging) => {

        let mp: Paging = {
            index: p.index,
            size: p.size
        }
        setPagingData(mp);
    }
    useEffect(() => {
        let md: MetaData = {
            paging: pagingData
        }
        setMetaData(md);
    }, [pagingData]);

    useEffect(() => {
        getFileSharingList({ payload: { keywords: keyWords }, metaData: metaData });
    }, [metaData, keyWords]);

    useEffect(() => {
        if (getFileSharingStatus.isSuccess && getFileSharingStatus.data.resource != null) {
            let data = getFileSharingStatus.data.resource;
            if (data.length > 0) {
                setTotalRows(data[0].totalRows);
            }
            else {
                setTotalRows(0);
            }
            setFileSharingList(data);
        }
    }, [getFileSharingStatus]);


    useEffect(() => {


    }, []);

    const onEditHandler = (item: FileSharing) => { 
        setIsShowModal(true);
        setSelecttedFileSharing(item);
    }
    const onAddHandler = () => { 
        setIsShowModal(true); 
        setSelecttedFileSharing(undefined);
    }
    const onCloseHandler = (item?: FileSharing) => {
        setIsShowModal(false); 
        getFileSharingList({ payload: { keywords: keyWords }, metaData: metaData }); 
    }  
   
    return (
        <>
            {getFileSharingStatus.isLoading && <PageLoading />}
            {isShowModal && <AddEditResourceModal dataModel={selecttedFileSharing} onClose={onCloseHandler} />}
            <section className="section overflow-hidden bg-gray">
                <div className="container">
                    <header className="section-header mb-0">
                        <h2><Translation tid="nav_admin_manageResources" /></h2>
                        <hr />
                    </header>

                    <div className="row">
                        <div className="col-md-6 mx-auto">
                            <Formik initialValues={initialValues}
                                onSubmit={handleOnSubmit}
                                validationSchema={validationSchema}
                                validateOnChange={false}  >
                                {({ values, errors, touched, setFieldValue }) => (
                                    <Form autoComplete="off" className="input-round">
                                        <div className="form-group input-group">
                                            <Field type="text" className="form-control" name="keywords" placeholder="Từ khóa" maxLength="50" />
                                            <div className="input-group-append">
                                                <button className="btn btn-primary" type="submit"><Translation tid="btn_search" /></button>
                                            </div>
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <a href="#" onClick={() =>{ onAddHandler()}}> Add new</a>
                            {getFileSharingStatus.isLoading && <LocalSpinner />}
                            {Array.from(new Set(fileSharingList.map((item) => item.category))).map((category) => (
                                <div key={v4()}>
                                    <hr className="hr-dash my-3" />
                                    <h3>{category}</h3>
                                    <br />
                                    <div className="row">
                                        {
                                            fileSharingList.filter(f => f.category == category).map((file) => (
                                                <div key={v4()} className="col-md-6"> 
                                                    <h6 className="float-left">
                                                        <i className="fa fa-file-text-o mr-3"></i>
                                                        <a className="inline-block text-right w-100" target="_blank" href={file.url}>
                                                            {file.name.length > 100 ? file.name.substring(0, 100) : file.name}
                                                        </a> 
                                                    </h6>
                                                    {file.isArchived ? " - (Archived)": ""}
                                                    <a className="float-right" href="#" onClick={() =>{ onEditHandler( file )}}>Edit</a> 
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            ))}
                            {(getFileSharingStatus.isSuccess && fileSharingList.length == 0) && <NotFound />}
                        </div>
                    </div>
                    <Pagination totalRows={totalRows} pagingData={pagingData} pageChangeEvent={pagingChangeEvent} />
                </div>
            </section>
        </>)
}

export default AdminResources;