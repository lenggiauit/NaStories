import React, { ReactElement } from "react";
import { render, unmountComponentAtNode } from 'react-dom'
import { Translation } from "../translation";

const pmModalDialogId = "pm-modal-dialog";
type Props = {
    options: PropTypes
}

const ShowModal: React.FC<Props> = ({ options }) => {

    const removeModalComponent = (): void => {
        const target = document.getElementById(pmModalDialogId);
        if (target) {
            unmountComponentAtNode(target);
        }

    }
    const onCloseHandler: React.MouseEventHandler<HTMLButtonElement> = () => {
        removeModalComponent();
        if(options.onClose)
            options.onClose();
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
                        <p className="m-0">{options.message}</p>
                    </div>
                    <div className="modal-footer border-0">
                        <button type="button" className="btn btn-primary" onClick={onCloseHandler} data-dismiss="modal"><Translation tid="btnClose" /></button> 
                    </div>
                </div>
            </div>
        </div>
    </>);
}

type PropTypes = {
    title?: any,
    message: any, 
    onClose?: () => void,
}

const showDialogModal = (options: PropTypes) => {
    let divTarget = document.getElementById(pmModalDialogId);
    if (divTarget) {
        render(<ShowModal options={options} />, divTarget);
    } else {

        divTarget = document.createElement('div');
        divTarget.id = pmModalDialogId;
        document.body.appendChild(divTarget);
        render(<ShowModal options={options} />, divTarget);
    }
}

export default showDialogModal;