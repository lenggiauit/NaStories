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
                if (problem == "Kh??c") {
                    return schema.required(dictionaryList[locale]["RequiredField"])
                }
            }).max(150),
            problemDescription: Yup.string().required(dictionaryList[locale]["RequiredField"]), 
            yourSolutionDescription: Yup.string().required(dictionaryList[locale]["RequiredField"]), 
            yourExpectationDescription: Yup.string().required(dictionaryList[locale]["RequiredField"]), 
            redeemCode: Yup.string().max(20)
        });
    }

    const onChangeProblem = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        if (value == "Kh??c") {
            setshowOtherProblem(true);
        }
    };

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
                message: "????ng k?? Private Talk th??nh c??ng!",
                onClose: () => {
                    window.location.href = appSetting.SiteUrl + "user/private-talk/";// + addEditPrivateTalkStatus.data?.resource;
                }
            });
        }
        if (addEditPrivateTalkStatus.data && addEditPrivateTalkStatus.data.resultCode == ResultCode.BookingDateIsInvalid) {
            showDialogModal({
                message: "Ng??y b???n ch???n ???? c?? ng?????i ????ng k?? r???i, vui l??ng ch???n l???i ng??y kh??c!",
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
                        C???m ??n b???n ???? tin t?????ng Na ????? chia s??? v???n ????? c???a m??nh, d?????i ????y l?? c??c b?????c ????? ?????t h???n v???i Na nh??:
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
                            N???u c?? b???t k??? thay ?????i g?? tr?????c ng??y di???n ra Private Talk, b???n nh??? email b??o cho Na bi???t ????? ???????c h??? tr??? t???t nh???t nh??.
                        </li>
                        <li>
                            Ph??: <b>300.000 VND</b>
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
                                            <Field type="text" className="form-control" name="fullname" placeholder="H??? t??n" />
                                            <ErrorMessage
                                                name="fullname"
                                                component="div"
                                                className="alert alert-field alert-danger"
                                            />
                                        </div>

                                        <div className="form-group col-md-6">
                                            <Field as="select" type="select" name="agerange"
                                                className="form-control" placeholder="????? tu???i" >
                                                <option value="" label="Ch???n ????? tu???i">Ch???n ????? tu???i</option>
                                                <option value="< 18 tu???i" >&lt; 18 tu???i</option>
                                                <option value="18 ?????n 22 tu???i" >18 ?????n 22 tu???i</option>
                                                <option value="23 ?????n 26 tu???i" >23 ?????n 26 tu???i</option>
                                                <option value="27 ?????n 32 tu???i" >27 ?????n 32 tu???i</option>
                                                <option value="> 32 tu???i" > &gt; 32 tu???i</option>
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
                                                        className="form-control" placeholder="V???n ????? b???n mu???n trao ?????i thu???c v???*" >
                                                        <option value="" label="V???n ????? b???n mu???n trao ?????i thu???c v???*">V???n ????? b???n mu???n trao ?????i thu???c v???*</option>
                                                        <option value="H???c t???p" >H???c t???p</option>
                                                        <option value="C??ng vi???c" >C??ng vi???c</option>
                                                        <option value="V???n ????? c?? nh??n trong ?????i s???ng" >V???n ????? c?? nh??n trong ?????i s???ng</option>
                                                        <option value="Kh??c" >Kh??c</option>
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
                                                        <Field type="text" className="form-control" name="problemOther" maxLength={250} placeholder="Nh???p v???n ????? c???a b???n" />

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
                                            <Field type="textarea" as="textarea" row={7} className="form-control" name="problemDescription" placeholder="M?? t??? chi ti???t v??? v???n ????? c???a b???n*" />
                                            <ErrorMessage
                                                name="problemDescription"
                                                component="div"
                                                className="alert alert-field alert-danger"
                                            />
                                        </div>

                                        <div className="form-group col-md-12">
                                            <Field type="textarea" as="textarea" row={7} className="form-control" name="yourSolutionDescription" placeholder="B???n ???? t??? t??m gi???i ph??p cho v???n ????? c???a m??nh nh?? th??? n??o v?? gi???i ph??p ???? l?? g???*" />
                                            <ErrorMessage
                                                name="yourSolutionDescription"
                                                component="div"
                                                className="alert alert-field alert-danger"
                                            />
                                        </div>

                                        <div className="form-group col-md-12">
                                            <Field type="textarea" as="textarea" row={7} className="form-control" name="yourExpectationDescription" placeholder="B???n k?? v???ng Na s??? gi??p ???????c b???n nh???ng g?? v?? nh?? th??? n??o?*" />
                                            <ErrorMessage
                                                name="yourExpectationDescription"
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
                                                {getEventBookingAvaiableDateQueryStatus.data && getEventBookingAvaiableDateQueryStatus.data.resource.length == 0  &&
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
                                                Bu???i Private Talk c???a t???i m??nh s??? di???n ra trong v??ng 1 gi???, b???n n??n chu???n b??? s???n nh???ng c??u h???i c???a m??nh ????? t???n d???ng tri???t ????? th???i gian n??y nha.
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

export default PrivateTalkRegisterForm;