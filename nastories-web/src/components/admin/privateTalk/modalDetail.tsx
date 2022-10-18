import React, { ReactElement } from "react";
import { render, unmountComponentAtNode } from 'react-dom'
import { PrivateTalkResource } from "../../../services/resources/privateTalkResource";
import { Translation } from "../../translation";
 

const pmModalDialogId = "privateTalk-modal-dialog";
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
            <div className="modal-dialog modal-lg" role="document">
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
                        <table style={{width: "100%" }}>
                            <tr>
                                <td>Full name:</td>
                                <td>{options.data.fullName}</td>
                            </tr>
                            <tr className="border-top border-light">
                                <td>Email:</td>
                                <td>{options.data.email}</td>
                            </tr>
                            <tr className="border-top border-light">
                                <td>Độ tuổi:</td>
                                <td>{options.data.ageRange}</td>
                            </tr>
                            <tr className="border-top border-light">
                                <td>Vấn đề:</td>
                                <td>{options.data.problem}</td>
                            </tr>
                            <tr className="border-top border-light">
                                <td>Mô tả vấn đề:</td>
                                <td>{options.data.problemDescription}</td>
                            </tr>
                            <tr className="border-top border-light">
                                <td>Giải pháp:</td>
                                <td>{options.data.yourSolutionDescription}</td>
                            </tr>
                            <tr className="border-top border-light">
                                <td>Mong muốn:</td>
                                <td>{options.data.yourExpectationDescription}</td>
                            </tr>
                            <tr className="border-top border-light">
                                <td>Status:</td>
                                <td>{options.data.eventStatus}</td>
                            </tr>
                        </table>
                        
                        
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
    data: PrivateTalkResource, 
    onClose?: () => void,
}

const showPrivateTalkModal = (options: PropTypes) => {
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

export default showPrivateTalkModal;