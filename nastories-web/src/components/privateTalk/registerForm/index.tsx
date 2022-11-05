import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import { v4 } from "uuid";
import { useAppContext } from "../../../contexts/appContext";
import { dictionaryList } from "../../../locales";
import { Translation } from "../../translation";
import * as Yup from "yup";
import { getLoggedUser } from "../../../utils/functions";
import * as uuid from "uuid";
import { AppSetting } from "../../../types/type";
import { ResultCode } from "../../../utils/enums";
import LoginModal from "../../loginModal";
import { useEffect, useState } from "react";
import { useGetEventBookingAvaiableDateQuery, useAddEditPrivateTalkMutation } from "../../../services/event";
import calcTime from "../../../utils/time";
import dateFormat from "dateformat";
import showConfirmModal from "../../modal";
import showDialogModal from "../../modal/showModal";
import { NIL as NIL_UUID } from 'uuid';
import PageLoading from "../../pageLoading";


let appSetting: AppSetting = require('../../../appSetting.json');

interface FormValues {
    id: any,
    fullname: any,
    email: any,
    agerange: any,
    problem: any,
    problemOther: any,
    problemDescription: any,
    yourSolutionDescription: any,
    yourExpectationDescription: any,
    eventBookingDateId: any,
    redeemCode: any
}

const PrivateTalkRegisterForm: React.FC = () => {

    const { locale } = useAppContext();
    const currentUser = getLoggedUser();
    const [showModalLogin, setShowModalLogin] = useState<boolean>(false);
    const [showOtherProblem, setshowOtherProblem] = useState<boolean>(false);
    const [isUnderstand, setIsUnderstand] = useState<boolean>(false);
    const getEventBookingAvaiableDateQueryStatus = useGetEventBookingAvaiableDateQuery({ payload: null });
    const [addEditPrivateTalk, addEditPrivateTalkStatus] = useAddEditPrivateTalkMutation();

    let initialValues: FormValues =
    {
        id: "",
        fullname: currentUser?.fullName,
        email: currentUser?.email,
        agerange: "",
        problem: "",
        problemOther: "",
        problemDescription: "",
        yourSolutionDescription: "",
        yourExpectationDescription: "",
        eventBookingDateId: "",
        redeemCode: ""
    };

    const validationSchema = () => {
        return Yup.object().shape({
            fullname: Yup.string().required(dictionaryList[locale]["RequiredField"])
            .max(100), 
            email: Yup.string().email().required(dictionaryList[locale]["RequiredField"])
            .max(150),
            agerange: Yup.string().required(dictionaryList[locale]["RequiredField"]), 
            problem: Yup.string().required(dictionaryList[locale]["RequiredField"]),
            problemOther: Yup.string().when('problem', (problem, schema) => {
                if (problem == "Khác") {
                    return schema.required(dictionaryList[locale]["RequiredField"])
                }
            }).max(150),
            problemDescription: Yup.string().required(dictionaryList[locale]["RequiredField"])
            .max(500),
            yourSolutionDescription: Yup.string().required(dictionaryList[locale]["RequiredField"])
            .max(500),
            yourExpectationDescription: Yup.string().required(dictionaryList[locale]["RequiredField"])
            .max(500),
            redeemCode: Yup.string().max(20)
        });
    }

    const onChangeProblem = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        if (value == "Khác") {
            setshowOtherProblem(true);
        }
    };

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

            addEditPrivateTalk({
                payload:
                {
                    id: values.id,
                    fullname: values.fullname,
                    email: values.email,
                    agerange: values.agerange,
                    eventBookingDateId: values.eventBookingDateId,
                    problem: values.problem,
                    problemDescription: values.problemDescription,
                    problemOther: values.problemOther,
                    yourExpectationDescription: values.yourExpectationDescription,
                    yourSolutionDescription: values.yourSolutionDescription,
                    redeemCode: values.redeemCode
                }
            });
        }

    }

    useEffect(() => {
        if (addEditPrivateTalkStatus.data && addEditPrivateTalkStatus.data.resultCode == ResultCode.Success) {
            showDialogModal({
                message: "Đăng ký Private Talk thành công!",
                onClose: () => {
                    window.location.href = appSetting.SiteUrl + "user/private-talk/";// + addEditPrivateTalkStatus.data?.resource;
                }
            });
        }
        if (addEditPrivateTalkStatus.data && addEditPrivateTalkStatus.data.resultCode == ResultCode.BookingDateIsInvalid) {
            showDialogModal({
                message: "Ngày bạn chọn đã có người đăng ký rồi, vui lòng chọn lại ngày khác!",
                onClose: () => {
                    getEventBookingAvaiableDateQueryStatus.refetch();
                }
            });
        }

    }, [addEditPrivateTalkStatus]);

    const privateTalkHeader = () => {
        // style={{ backgroundImage: `url(../../assets/images/privatetalk_cover.jpg)` }}
        return (<section className="section text-white bg-primary" > 
            <div className="container">
                <header className="section-header text-infor">
                    <h2><Translation tid="header_private_talk_title" /></h2>
                    <hr />
                    <p className="lead">
                        Cảm ơn bạn đã tin tưởng Na để chia sẻ vấn đề của mình, dưới đây là các bước để đặt hẹn với Na nhé:
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
                            Nếu có bất kỳ thay đổi gì trước ngày diễn ra Private Talk, bạn nhớ email báo cho Na biết để được hỗ trợ tốt nhất nhé.
                        </li>
                        <li>
                            Phí: <b>300.000 VND</b>
                        </li>
                    </ul>
                </header>

            </div>
        </section>)
    };

    if (currentUser == null) {
        return (
            <>
                {privateTalkHeader()}
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
            {addEditPrivateTalkStatus.isLoading && <PageLoading />}
                {privateTalkHeader()}
                <section className="section">
                    <div className="container">
                        <header className="section-header">
                            <h2><Translation tid="header_private_talk_register_form_title" /></h2>
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
                                            <Field as="select" type="select" name="agerange"
                                                className="form-control" placeholder="Độ tuổi" >
                                                <option value="" label="Chọn độ tuổi">Chọn độ tuổi</option>
                                                <option value="< 18 tuổi" >&lt; 18 tuổi</option>
                                                <option value="18 đến 22 tuổi" >18 đến 22 tuổi</option>
                                                <option value="23 đến 26 tuổi" >23 đến 26 tuổi</option>
                                                <option value="27 đến 32 tuổi" >27 đến 32 tuổi</option>
                                                <option value="> 32 tuổi" > &gt; 32 tuổi</option>
                                            </Field>
                                            <ErrorMessage
                                                name="agerange"
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
                                            {!showOtherProblem &&
                                                <div >
                                                    <Field as="select" type="select" name="problem" onChange={(event: React.ChangeEvent<HTMLSelectElement>) => { onChangeProblem(event); setFieldValue("problem", event.target.value) }}
                                                        className="form-control" placeholder="Vấn đề bạn muốn trao đổi thuộc về*" >
                                                        <option value="" label="Vấn đề bạn muốn trao đổi thuộc về*">Vấn đề bạn muốn trao đổi thuộc về*</option>
                                                        <option value="Học tập" >Học tập</option>
                                                        <option value="Công việc" >Công việc</option>
                                                        <option value="Vấn đề cá nhân trong đời sống" >Vấn đề cá nhân trong đời sống</option>
                                                        <option value="Khác" >Khác</option>
                                                    </Field>
                                                    <ErrorMessage
                                                        name="problem"
                                                        component="div"
                                                        className="alert alert-field alert-danger"
                                                    />
                                                </div>
                                            }
                                            {showOtherProblem &&
                                                <div >
                                                    <div className="input-group mb-2">
                                                        <div className="input-group-prepend">
                                                            <div className="input-group-text" onClick={() => setshowOtherProblem(false)} ><i className="bi bi-backspace" style={{ cursor: "pointer" }}></i></div>
                                                        </div>
                                                        <Field type="text" className="form-control" name="problemOther" maxLength={250} placeholder="Nhập vấn đề của bạn" />

                                                        <ErrorMessage
                                                            name="problemOther"
                                                            component="div"
                                                            className="alert alert-field alert-danger"
                                                        />
                                                    </div>
                                                </div>
                                            }
                                        </div>

                                        <div className="form-group col-md-12">
                                            <Field type="textarea" as="textarea" row={7} className="form-control" name="problemDescription" maxLength={500} placeholder="Mô tả chi tiết về vấn đề của bạn*" />
                                            <ErrorMessage
                                                name="problemDescription"
                                                component="div"
                                                className="alert alert-field alert-danger"
                                            />
                                        </div>

                                        <div className="form-group col-md-12">
                                            <Field type="textarea" as="textarea" row={7} className="form-control" name="yourSolutionDescription" maxLength={500} placeholder="Bạn đã tự tìm giải pháp cho vấn đề của mình như thế nào và giải pháp đó là gì?*" />
                                            <ErrorMessage
                                                name="yourSolutionDescription"
                                                component="div"
                                                className="alert alert-field alert-danger"
                                            />
                                        </div>

                                        <div className="form-group col-md-12">
                                            <Field type="textarea" as="textarea" row={7} className="form-control" name="yourExpectationDescription" maxLength={500} placeholder="Bạn kì vọng Na sẽ giúp được bạn những gì và như thế nào?*" />
                                            <ErrorMessage
                                                name="yourExpectationDescription"
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
                                                        <option key={type.id} value={type.id} >{dateFormat(type.start, "mmm dd, yyyy - HH:MM") + " Vietnam"}</option>
                                                    ))}
                                                </>
                                                } 
                                                {getEventBookingAvaiableDateQueryStatus.data && getEventBookingAvaiableDateQueryStatus.data.resource.length == 0  &&
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
                                                Buổi Private Talk của tụi mình sẽ diễn ra trong vòng 1 giờ, bạn nên chuẩn bị sẵn những câu hỏi của mình để tận dụng triệt để thời gian này nha.
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

export default PrivateTalkRegisterForm;