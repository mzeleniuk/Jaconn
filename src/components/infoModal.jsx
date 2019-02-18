import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';

import { CloseIcon, InfoIcon } from '../images/icons';
import { showLoader } from '../redux/actions';
import { Storage } from '../services/storage';

class InfoModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            modalIsOpen: false
        };
    };

    openModal = () => {
        this.setState({ modalIsOpen: true });
    };

    closeModal = () => {
        this.setState({ modalIsOpen: false });
    };

    resetApp = () => {
        this.props.showLoader();

        Storage.clearStorage();
        window.location.reload();
    };

    render() {
        return (
            <Fragment>
                <div className="info-modal-icon" onClick={this.openModal}>
                    <InfoIcon />
                </div>

                <Modal ariaHideApp={false}
                       role="dialog"
                       isOpen={this.state.modalIsOpen}
                       shouldCloseOnOverlayClick={false}
                       shouldCloseOnEsc={true}
                       onRequestClose={this.closeModal}
                       closeTimeoutMS={500}
                       bodyOpenClassName="modal-open"
                       overlayClassName="modal-overlay"
                       className="modal-body"
                >
                    <div className="modal-container">
                        <div className="modal-header">
                            <div className="modal-close-button" onClick={this.closeModal}>
                                <CloseIcon />
                            </div>
                        </div>

                        <div className="modal-content">
                            <div className="modal-content-wrapper">
                                <h2 className="modal-title">{this.props.dictionary.name}</h2>

                                <p className="modal-message">{this.props.dictionary.projectInfoParagraphOne}</p>
                                <p className="modal-message">{this.props.dictionary.projectInfoParagraphTwo}</p>
                                <p className="modal-message">{this.props.dictionary.projectInfoParagraphThree}</p>
                                <p className="modal-message">{this.props.dictionary.projectInfoParagraphFour}</p>
                                <p className="modal-message">{this.props.dictionary.projectInfoParagraphFive}</p>
                                <p className="modal-message">{this.props.dictionary.projectInfoParagraphSix}</p>
                                <p className="modal-message">{this.props.dictionary.projectInfoParagraphSeven}</p>
                                <p className="modal-message">{this.props.dictionary.projectInfoParagraphEight}</p>
                                <p className="modal-message">{this.props.dictionary.projectInfoParagraphNine}</p>

                                <div className="button-container">
                                    <button className="button-white" onClick={this.resetApp}>
                                        {this.props.dictionary.clearStorage}
                                    </button>
                                </div>

                                <hr/>

                                <div className="modal-footer">
                                    <p>{this.props.dictionary.modalFooterPartOne}</p>
                                    <p>{this.props.dictionary.modalFooterPartTwo}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal>
            </Fragment>
        );
    };
}

const mapStateToProps = state => {
    return {
        dictionary: {
            clearStorage: state.dictionary.data['ClearStorage'],
            modalFooterPartOne: state.dictionary.data['ModalFooterPartOne'],
            modalFooterPartTwo: state.dictionary.data['ModalFooterPartTwo'],
            name: state.dictionary.data['Name'],
            projectInfoParagraphOne: state.dictionary.data['ProjectInfoParagraphOne'],
            projectInfoParagraphTwo: state.dictionary.data['ProjectInfoParagraphTwo'],
            projectInfoParagraphThree: state.dictionary.data['ProjectInfoParagraphThree'],
            projectInfoParagraphFour: state.dictionary.data['ProjectInfoParagraphFour'],
            projectInfoParagraphFive: state.dictionary.data['ProjectInfoParagraphFive'],
            projectInfoParagraphSix: state.dictionary.data['ProjectInfoParagraphSix'],
            projectInfoParagraphSeven: state.dictionary.data['ProjectInfoParagraphSeven'],
            projectInfoParagraphEight: state.dictionary.data['ProjectInfoParagraphEight'],
            projectInfoParagraphNine: state.dictionary.data['ProjectInfoParagraphNine']
        }
    };
};

const mapDispatchToProps = {
    showLoader
};

export default connect(mapStateToProps, mapDispatchToProps)(InfoModal);
