import React, { ReactElement } from "react";
import { render, unmountComponentAtNode } from 'react-dom'
import { Translation } from "../../translation";

const bookingConfirmModalDialogId = "booking-confirm-modal-dialog";
type Props = {
    options: PropTypes
}

const BookingConfirmModal: React.FC<Props> = ({ options }) => {

    const removeModalComponent = (): void => {
        const target = document.getElementById(bookingConfirmModalDialogId);
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
    const onSaveHandler: React.MouseEventHandler<HTMLButtonElement> = () => {
        removeModalComponent();
        options.onSave();
    }
    const onDeleteHandler: React.MouseEventHandler<HTMLButtonElement> = () => {
        removeModalComponent();
        options.onDelete();
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
                    <div className="modal-body pb-0">
                        <p className="m-0"><b>{options.message1}</b></p>
                        <p className="m-0"><b>{options.message2}</b></p>
                        <p className="m-0"><b>{options.message3}</b></p>
                    </div>
                    <div className="modal-footer border-0">
                        <button type="button" className="btn btn-secondary" onClick={onCancelHandler} data-dismiss="modal"><Translation tid="btnClose" /></button>
                        <button type="button" className="btn btn-danger" onClick={onDeleteHandler} ><Translation tid="btnDelete" /></button>
                        <button type="button" className="btn btn-primary" onClick={onSaveHandler} ><Translation tid="btnSave" /></button>
                        
                    </div>
                </div>
            </div>
        </div>
    </>);
}

type PropTypes = {
    title?: any,
    message1: any,
    message2: any,
    message3: any,
    onSave: () => void,
    onDelete: () => void,
    onCancel?: () => void,
}

const ShowBookingConfirmModal = (options: PropTypes) => {
    let divTarget = document.getElementById(bookingConfirmModalDialogId);
    if (divTarget) {
        render(<BookingConfirmModal options={options} />, divTarget);
    } else {

        divTarget = document.createElement('div');
        divTarget.id = bookingConfirmModalDialogId;
        document.body.appendChild(divTarget);
        render(<BookingConfirmModal options={options} />, divTarget);
    }
}

export default ShowBookingConfirmModal;