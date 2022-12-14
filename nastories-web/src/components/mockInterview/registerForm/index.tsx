import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import { v4 } from "uuid";
import { useAppContext } from "../../../contexts/appContext";
import { dictionaryList } from "../../../locales";
import { Translation } from "../../translation";
import * as Yup from "yup";
import { checkIfFilesAreCorrectType, getLoggedUser } from "../../../utils/functions";
import * as uuid from "uuid";
import { NIL as NIL_UUID } from 'uuid';
import { AppSetting } from "../../../types/type";
import { ResultCode } from "../../../utils/enums";
import LoginModal from "../../loginModal";
import { useEffect, useState } from "react";
import { useGetEventBookingAvaiableDateQuery, useAddEditPrivateTalkMutation, useAddEditMockInterviewMutation } from "../../../services/event";
import calcTime from "../../../utils/time";
import dateFormat from "dateformat";
import showConfirmModal from "../../modal";
import showDialogModal from "../../modal/showModal";
import { useUploadPackageFileMutation } from "../../../services/fileService";
import PageLoading from "../../pageLoading";
let appSetting: AppSetting = require('../../../appSetting.json');

interface FormValues {
    id: any,
    fullname: any,
    email: any,
    ageRange: any,
    language: any,
    resume: any,
    coverLetter: any,
    jobDescription: any, 
    note: any,
    eventBookingDateId: any,
    redeemCode: any,
}

const MockInterviewRegisterForm: React.FC = () => {

    const { locale } = useAppContext();
    const currentUser = getLoggedUser();
    const [showModalLogin, setShowModalLogin] = useState<boolean>(false);
    const [showOtherProblem, setshowOtherProblem] = useState<boolean>(false);
    const [isUnderstand, setIsUnderstand] = useState<boolean>(false);
    const getEventBookingAvaiableDateQueryStatus = useGetEventBookingAvaiableDateQuery({ payload: null });
    const [addEditMockInterview, addEditMockInterviewStatus] = useAddEditMockInterviewMutation();
    const [currentFileField, setCurrentFileField] = useState<string>();
    const [currentResume, setCurrentResume] = useState<string>();
    const [uploadFile, uploadFileData] = useUploadPackageFileMutation();
    const [currentCoverLetter, setCurrentCoverLetter] = useState<string>();
    const [currentJobDescription , setCurrentJobDescription] = useState<string>();
    let initialValues: FormValues =
    {
        id: "",
        fullname: currentUser?.fullName,
        email: currentUser?.email,
        ageRange: "",
        language: "Ti???ng anh",
        resume: "",
        coverLetter: "",
        jobDescription: "", 
        note: "",
        eventBookingDateId: "",
        redeemCode: ""
    };

    const validationSchema = () => {
        return Yup.object().shape({
            fullname: Yup.string().required(dictionaryList[locale]["RequiredField"])
            .max(100), 
            email: Yup.string().email().required(dictionaryList[locale]["RequiredField"])
            .max(150), 
            ageRange: Yup.string().required(dictionaryList[locale]["RequiredField"]), 
            note: Yup.string(), 
            resume: Yup.mixed().test("resume", dictionaryList[locale]["RequiredField"], function test(value) {
                return currentResume != null && currentResume.length > 0;
              }), 
            // coverLetter: Yup.mixed().test("coverLetter", dictionaryList[locale]["RequiredField"], function test(value) {
            //     return currentCoverLetter != null && currentCoverLetter.length > 0;
            //   }), 
            // jobDescription: Yup.mixed().test("jobDescription", dictionaryList[locale]["RequiredField"], function test(value) {
            //     return currentJobDescription != null && currentJobDescription.length > 0;
            //   }), 
            redeemCode: Yup.string() 
            .max(20)
        });
    }
 
    const handleIsUnderstandClick: React.MouseEventHandler<HTMLLabelElement> = (e) => {
        setIsUnderstand(!isUnderstand);
    }

    const handleOnSubmit = (values: FormValues, actions: FormikHelpers<FormValues>) => {

        if (!isUnderstand) {
            showDialogModal({
                message: "B???n c???n x??c nh???n 'M??nh ???? r??'", 
            });
        }
        else {

            addEditMockInterview({
                payload:
                {
                    id: values.id,
                    fullname: values.fullname,
                    email: values.email,
                    agerange: values.ageRange,
                    eventBookingDateId: values.eventBookingDateId,
                    language: values.language,
                    resume: currentResume,
                    coverLetter: currentCoverLetter,
                    jobDescription: currentJobDescription,
                    note: values.note,
                    redeemCode: values.redeemCode
                }
            });
        }

    }

    useEffect(() => {
        if (addEditMockInterviewStatus.data && addEditMockInterviewStatus.data.resultCode == ResultCode.Success) {
            showDialogModal({
                message: "????ng k?? Mock Interview th??nh c??ng!",
                onClose: () => {
                    window.location.href = appSetting.SiteUrl + "user/mock-interview/"; 
                }
            });
        }
        if (addEditMockInterviewStatus.data && addEditMockInterviewStatus.data.resultCode == ResultCode.BookingDateIsInvalid) {
            showDialogModal({
                message: "Ng??y b???n ch???n ???? c?? ng?????i ????ng k?? r???i, vui l??ng ch???n l???i ng??y kh??c!",
                onClose: () => {
                    getEventBookingAvaiableDateQueryStatus.refetch();
                }
            });
        }

    }, [addEditMockInterviewStatus]);

    const handleSelectResume: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        let file = e.target.files?.item(0);
        if (file && checkIfFilesAreCorrectType([file])) {
            setCurrentFileField("Resume");
            const formData = new FormData();
            formData.append("file", file!);
            uploadFile(formData);
        }
        else{
            showDialogModal({ message: "B???n c???n ch???n file Pdf ho???c Word!"})
        }
    }

    const handleSelectCoverLetter: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        let file = e.target.files?.item(0);
        if (file && checkIfFilesAreCorrectType([file])) {
            setCurrentFileField("CoverLetter");
            const formData = new FormData();
            formData.append("file", file!);
            uploadFile(formData);
        }
        else{
            showDialogModal({ message: "B???n c???n ch???n file Pdf ho???c Word!"})
        }
    }

    const handleSelectJobDescription: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        let file = e.target.files?.item(0);
        if (file && checkIfFilesAreCorrectType([file])) {
            setCurrentFileField("JobDescription");
            const formData = new FormData();
            formData.append("file", file!);
            uploadFile(formData);
        }
        else{
            showDialogModal({ message: "B???n c???n ch???n file Pdf ho???c Word!"})
        }
    } 

    useEffect(() => {
        if (uploadFileData.data && uploadFileData.data.resultCode == ResultCode.Success) {
            if(currentFileField == "Resume")
                setCurrentResume(uploadFileData.data.resource.url);
            if(currentFileField == "CoverLetter")
                setCurrentCoverLetter(uploadFileData.data.resource.url);
            if(currentFileField == "JobDescription")
                setCurrentJobDescription(uploadFileData.data.resource.url);

            setCurrentFileField("");

        }
    }, [uploadFileData]);



    const mockInterviewHeader = () => { 
        return (<section className="section text-white bg-success" > 
            <div className="container">
                <header className="section-header text-infor">
                    <h2><Translation tid="header_mock_interview_title" /></h2>
                    <hr />
                    <p className="lead">
                    C???m ??n b???n ???? tin t?????ng ????? tr???i nghi???m m???t bu???i ph???ng v???n th??? tr???c ti???p v???i Na, d?????i ????y l?? c??c b?????c ????? ?????t h???n cho bu???i ph???ng v???n nh??:
                    </p>
                    <ul className="text-left">
                        <li>
                            B???n ??i???n ?????y ????? th??ng tin y??u c???u b??n d?????i.
                        </li>
                        <li>
                            Sau khi nh???n ???????c th??ng tin ?????t h???n c???a b???n, Na s??? xem x??t v?? g???i email x??c nh???n ?????n b???n trong v??ng 24 gi???, n???u b???n kh??ng nh???n ???????c email th?? nh??? ki???m tra h???p th?? Spam nh??.

                        </li>
                        <li>
                            B???n chuy???n kho???n theo h?????ng d???n trong email v?? ph???n h???i email l???i cho Na ????? x??c nh???n nha.
                        </li>
                        <li>
                            Sau khi ???? nh???n ???????c chuy???n kho???n c???a b???n, Na s??? g???i assignment, h?????ng d???n l??m b??i, n???p b??i v?? c??ch th???c tham gia ph???ng v???n th???.
                        </li>
                        <li>
                            N???u c?? b???t k??? thay ?????i g?? tr?????c ng??y di???n ra bu???i ph???ng v???n, b???n nh??? email b??o cho Na bi???t ????? ???????c h??? tr??? t???t nh???t nh??.
                        </li>
                        <li>
                            Ph??: <b>500.000 VND</b>
                        </li>
                    </ul>
                </header>

            </div>
        </section>)
    };

    if (currentUser == null) {
        return (
            <>
                {mockInterviewHeader()}
                <section className="section">
                    <div className="container">
                        <header className="section-header"></header>
                        <p className="text-center">
                            B???n c???n <a href="#" onClick={() => { setShowModalLogin(true) }}>????ng nh???p </a> ????? ????ng k?? ho???c <a href="/register" >????ng k?? th??nh vi??n</a>
                        </p>
                        <div>
                            <LoginModal onClose={() => { setShowModalLogin(false) }} isShow={showModalLogin} />
                        </div>
                    </div>
                </section>
            </>)
    }
    else {

        return (
            <>
                {(addEditMockInterviewStatus.isLoading || uploadFileData.isLoading) && <PageLoading />}
                {mockInterviewHeader()}
                <section className="section">
                    <div className="container">
                        <header className="section-header">
                            <h2><Translation tid="header_mock_interview_register_form_title" /></h2>
                            <hr />
                        </header>
                        <Formik initialValues={initialValues}
                            onSubmit={handleOnSubmit}
                            validationSchema={validationSchema}
                            validateOnChange={false}  >
                            {({ values, errors, touched, setFieldValue }) => (
                                <Form autoComplete="off">
                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <Field type="hidden" name="id" />
                                            <Field type="text" className="form-control" name="fullname" placeholder="H??? t??n" />
                                            <ErrorMessage
                                                name="fullname"
                                                component="div"
                                                className="alert alert-field alert-danger"
                                            />
                                        </div>

                                        <div className="form-group col-md-6">
                                            <Field as="select" type="select" name="ageRange"
                                                className="form-control" placeholder="????? tu???i" >
                                                <option value="" label="Ch???n ????? tu???i">Ch???n ????? tu???i</option>
                                                <option value="< 18 tu???i" >&lt; 18 tu???i</option>
                                                <option value="18 ?????n 22 tu???i" >18 ?????n 22 tu???i</option>
                                                <option value="23 ?????n 26 tu???i" >23 ?????n 26 tu???i</option>
                                                <option value="27 ?????n 32 tu???i" >27 ?????n 32 tu???i</option>
                                                <option value="> 32 tu???i" > &gt; 32 tu???i</option>
                                            </Field>
                                            <ErrorMessage
                                                name="ageRange"
                                                component="div"
                                                className="alert alert-field alert-danger"
                                            />
                                        </div>



                                        <div className="form-group col-md-6">
                                            <Field type="text" className="form-control" name="email" placeholder="Email" />
                                            <ErrorMessage
                                                name="email"
                                                component="div"
                                                className="alert alert-field alert-danger"
                                            />
                                        </div>
                                        <div className="form-group col-md-6"> 
                                            <Field as="select" type="select" name="language"
                                                className="form-control" placeholder="Ng??n ng???" > 
                                                <option value="Ti???ng anh" >Ti???ng anh</option>
                                                <option value="Ti???ng vi???t" >Ti???ng vi???t</option>
                                                 
                                            </Field>
                                            <ErrorMessage
                                                name="language"
                                                component="div"
                                                className="alert alert-field alert-danger"
                                            />
                                               
                                        </div>

                                        <div className="form-group col-md-12">
                                            <div className="custom-control custom-checkbox">
                                            <Field type="file" name="resume" className="custom-file-input" onChange={handleSelectResume} accept=".pdf" />
                                                <label className="custom-file-label">{currentResume != null ? currentResume : "Resume/CV file" }</label>
                                            </div> 
                                            <ErrorMessage
                                                name="resume"
                                                component="div"
                                                className="alert alert-field alert-danger"
                                            />
                                        </div>

                                        <div className="form-group col-md-12">
                                            <div className="custom-control custom-checkbox">
                                            <Field type="file" name="coverLetter" className="custom-file-input" onChange={handleSelectCoverLetter} accept=".pdf" />
                                                <label className="custom-file-label">{currentCoverLetter != null ? currentCoverLetter : "Cover letter file (n???u c??)" }</label>
                                            </div> 
                                            <ErrorMessage
                                                name="coverLetter"
                                                component="div"
                                                className="alert alert-field alert-danger"
                                            />
                                        </div>

                                        <div className="form-group col-md-12">
                                            <div className="custom-control custom-checkbox">
                                            <Field type="file" name="jobDescription" className="custom-file-input" onChange={handleSelectJobDescription} accept=".pdf" />
                                                <label className="custom-file-label">{currentJobDescription != null ? currentJobDescription : "Job description file (n???u c??)" }</label>
                                            </div> 
                                            <ErrorMessage
                                                name="jobDescription"
                                                component="div"
                                                className="alert alert-field alert-danger"
                                            />
                                        </div>

                                        <div className="form-group col-md-12">
                                            <Field type="textarea" as="textarea" row={7} className="form-control" name="note" placeholder="Ghi ch?? th??m (n???u c??)" />
                                            <ErrorMessage
                                                name="note"
                                                component="div"
                                                className="alert alert-field alert-danger"
                                            />
                                        </div> 
                                        <div className="form-group col-md-12">
                                            <p>Th???i gian</p>
                                            <Field as="select" type="select" name="eventBookingDateId"
                                                className="form-control" placeholder="Booking date">
                                                <option value="" label="Ch???n ng??y">Ch???n ng??y</option>
                                                {getEventBookingAvaiableDateQueryStatus.data && <>
                                                    {getEventBookingAvaiableDateQueryStatus.data.resource.map((type) => (
                                                        <option key={type.id} value={type.id} >{dateFormat(type.start, "mmm dd, yyyy - HH:MM") + " Vietnam"}</option>
                                                    ))}
                                                </>
                                                } 
                                                 {getEventBookingAvaiableDateQueryStatus.data && getEventBookingAvaiableDateQueryStatus.data.resource.length == 0 &&
                                                <option value={NIL_UUID} label="L???ch g???n nh???t kh??ng c??n tr???ng, Na s??? email ng??y c??? th??? sau khi b???n ????ng k??">L???ch g???n nh???t kh??ng c??n tr???ng, Na s??? email ng??y c??? th??? sau khi b???n ????ng k??</option> 
                                                 }
                                            </Field>
                                            <ErrorMessage
                                                name="eventBookingDateId"
                                                component="div"
                                                className="alert alert-field alert-danger"
                                            />
                                        </div>

                                        <div className="form-group col-md-12">
                                            <p>
                                            Bu???i Mock Interview c???a t???i m??nh s??? di???n ra trong v??ng 1.5 gi???, b???n n??n chu???n b??? s???n nh???ng c??u h???i c???a m??nh ????? t???n d???ng tri???t ????? th???i gian n??y nha.
                                            </p>
                                            <div className="custom-control custom-checkbox">
                                                <Field type="checkbox" className="custom-control-input" checked={isUnderstand ? "checked" : ""} />
                                                <label className="custom-control-label" style={{fontSize: 16}} onClick={handleIsUnderstandClick}>M??nh ???? r??</label>
                                            </div>
                                        </div>
                                        <div className="form-group col-md-12 text-center hide">
                                            <Field type="text" maxLength={20} className="form-control" style={{width: 150}} name="redeemCode" placeholder="M?? gi???m gi??" />
                                        </div> 
                                        <div className="form-group col-md-12 text-center">
                                            <button className="btn btn-lg btn-primary " type="submit" style={{ width: 250 }}  >
                                                <Translation tid="Submit" />
                                            </button>
                                        </div>

                                        <div className="col-md-12 text-center">
                                            B???n g???p kh?? kh??n khi ????ng k???<a target="_blank" href={appSetting.SiteUrl + "messages"}> Chat v???i Na </a>
                                        </div>


                                    </div>

                                </Form>
                            )}
                        </Formik>
                        <br />
                        <br />
                        <br />
                        <br />
                    </div>
                </section>

            </>);
    }
}

export default MockInterviewRegisterForm;