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
        language: "Tiếng anh",
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
            note: Yup.string() 
            .max(500), 
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
                message: "Bạn cần xác nhận 'Mình đã rõ'", 
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
                message: "Đăng ký Mock Interview thành công!",
                onClose: () => {
                    window.location.href = appSetting.SiteUrl + "user/mock-interview/"; 
                }
            });
        }
        if (addEditMockInterviewStatus.data && addEditMockInterviewStatus.data.resultCode == ResultCode.BookingDateIsInvalid) {
            showDialogModal({
                message: "Ngày bạn chọn đã có người đăng ký rồi, vui lòng chọn lại ngày khác!",
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
            showDialogModal({ message: "Bạn cần chọn file Pdf hoặc Word!"})
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
            showDialogModal({ message: "Bạn cần chọn file Pdf hoặc Word!"})
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
            showDialogModal({ message: "Bạn cần chọn file Pdf hoặc Word!"})
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
                <header className="section-header">
                    <h2><Translation tid="header_mock_interview_title" /></h2>
                    <hr />
                    <p className="lead">
                    Cảm ơn bạn đã tin tưởng để trải nghiệm một buổi phỏng vấn thử trực tiếp với Na, dưới đây là các bước để đặt hẹn cho buổi phỏng vấn nhé:
                    </p>
                    <ul className="text-left">
                        <li>
                            Bạn điền đầy đủ thông tin yêu cầu bên dưới.
                        </li>
                        <li>
                            Sau khi nhận được thông tin đặt hẹn của bạn, Na sẽ xem xét và gửi email xác nhận đến bạn trong vòng 24 giờ, nếu bạn không nhận được email thì nhớ kiểm tra hộp thư Spam nhé.

                        </li>
                        <li>
                            Bạn chuyển khoản theo hướng dẫn trong email và phản hồi email lại cho Na để xác nhận nha.
                        </li>
                        <li>
                            Sau khi đã nhận được chuyển khoản của bạn, Na sẽ gửi assignment, hướng dẫn làm bài, nộp bài và cách thức tham gia phỏng vấn thử.
                        </li>
                        <li>
                            Nếu có bất kỳ thay đổi gì trước ngày diễn ra buổi phỏng vấn, bạn nhớ email báo cho Na biết để được hỗ trợ tốt nhất nhé.
                        </li>
                        <li>
                            Phí: <b>500.000 VND</b>
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
                            Bạn cần <a href="#" onClick={() => { setShowModalLogin(true) }}>đăng nhập </a> để đăng ký hoặc <a href="/register" >đăng ký thành viên</a>
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
                {addEditMockInterviewStatus.isLoading && <PageLoading />}
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
                                            <Field type="text" className="form-control" name="fullname" placeholder="Họ tên" />
                                            <ErrorMessage
                                                name="fullname"
                                                component="div"
                                                className="alert alert-field alert-danger"
                                            />
                                        </div>

                                        <div className="form-group col-md-6">
                                            <Field as="select" type="select" name="ageRange"
                                                className="form-control" placeholder="Độ tuổi" >
                                                <option value="" label="Chọn độ tuổi">Chọn độ tuổi</option>
                                                <option value="< 18 tuổi" >&lt; 18 tuổi</option>
                                                <option value="18 đến 22 tuổi" >18 đến 22 tuổi</option>
                                                <option value="23 đến 26 tuổi" >23 đến 26 tuổi</option>
                                                <option value="27 đến 32 tuổi" >27 đến 32 tuổi</option>
                                                <option value="> 32 tuổi" > &gt; 32 tuổi</option>
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
                                                className="form-control" placeholder="Ngôn ngữ" > 
                                                <option value="Tiếng anh" >Tiếng anh</option>
                                                <option value="Tiếng việt" >Tiếng việt</option>
                                                 
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
                                                <label className="custom-file-label">{currentCoverLetter != null ? currentCoverLetter : "Cover letter file (nếu có)" }</label>
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
                                                <label className="custom-file-label">{currentJobDescription != null ? currentJobDescription : "Job description file (nếu có)" }</label>
                                            </div> 
                                            <ErrorMessage
                                                name="jobDescription"
                                                component="div"
                                                className="alert alert-field alert-danger"
                                            />
                                        </div>

                                        <div className="form-group col-md-12">
                                            <Field type="textarea" as="textarea" row={7} className="form-control" name="note" maxLength={500} placeholder="Ghi chú thêm (nếu có)" />
                                            <ErrorMessage
                                                name="note"
                                                component="div"
                                                className="alert alert-field alert-danger"
                                            />
                                        </div> 
                                        <div className="form-group col-md-12">
                                            <p>Bạn chọn một ngày trong danh sách ngày trong combobox bên dưới, nếu không có ngày phù hợp hoặc không còn ngày trống hãy chọn option 'Để sau' </p>
                                            <Field as="select" type="select" name="eventBookingDateId"
                                                className="form-control" placeholder="Booking date">
                                                <option value="" label="Chọn ngày">Chọn ngày</option>
                                                {getEventBookingAvaiableDateQueryStatus.data && <>
                                                    {getEventBookingAvaiableDateQueryStatus.data.resource.map((type) => (
                                                        <option key={type.id} value={type.id} >{dateFormat(calcTime(new Date(type.start), 7), "dd/mm/yyyy - h:MM:ss TT") + " Vietnam"}</option>
                                                    ))}
                                                </>
                                                } 
                                                 {getEventBookingAvaiableDateQueryStatus.data && getEventBookingAvaiableDateQueryStatus.data.resource.length == 0 &&
                                                <option value={NIL_UUID} label="Lịch gần nhất không còn trống, Na sẽ email ngày cụ thể sau khi bạn đăng ký">Lịch gần nhất không còn trống, Na sẽ email ngày cụ thể sau khi bạn đăng ký</option> 
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
                                            Buổi Mock Interview của tụi mình sẽ diễn ra trong vòng 1.5 giờ, bạn nên chuẩn bị sẵn những câu hỏi của mình để tận dụng triệt để thời gian này nha.
                                            </p>
                                            <div className="custom-control custom-checkbox">
                                                <Field type="checkbox" className="custom-control-input" checked={isUnderstand ? "checked" : ""} />
                                                <label className="custom-control-label" onClick={handleIsUnderstandClick}>Mình đã rõ</label>
                                            </div>
                                        </div>
                                        <div className="form-group col-md-12 text-center hide">
                                            <Field type="text" maxLength={20} className="form-control" style={{width: 150}} name="redeemCode" placeholder="Mã giảm giá" />
                                        </div> 
                                        <div className="form-group col-md-12 text-center">
                                            <button className="btn btn-lg btn-primary " type="submit" style={{ width: 250 }}  >
                                                <Translation tid="Submit" />
                                            </button>
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