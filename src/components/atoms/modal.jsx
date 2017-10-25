import React, { Component } from 'react';
import classnames from 'classnames';

import firstInstruction from '../../images/first.png';
import secondInstruction from '../../images/second.png';
import thirdInstruction from '../../images/third.png';

class Modal extends Component {
  constructor() {
    super();

    this.state = {
      showModal: false,
    }

    this.handleModal = this.handleModal.bind(this);
  }

  handleModal() {
    this.setState({
      showModal: !this.state.showModal,
    })

    this.state.showModal
      ? document.body.style.overflow = 'auto'
      : document.body.style.overflow = 'hidden'
  }

  render() {
    const { showModal } = this.state;
    return (
      <div>
        <div className="info">
          <button onClick={this.handleModal} className="info__text">How do I find a Spotify URI?</button>
        </div>
        <div className={classnames('info__modal', { 'info__modal--show': showModal })}>
          <div className="info__modal__content">
            <div className="info__modal__cross" onClick={this.handleModal} >
              <svg className="cross__svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                <circle className="cross__circle" cx="26" cy="26" r="25" fill="none"/>
                <path className="cross__path cross__path--right" fill="none" d="M16,16 l20,20" />
                <path className="cross__path cross__path--right" fill="none" d="M16,36 l20,-20" />
              </svg>
            </div>
            <div className="info__modal__image">
              <img src={firstInstruction} alt="Instruction 1" />
            </div>
            <div className="info__modal__image" >
              <img src={secondInstruction} alt="Instruction 2" />
            </div>
            <div className="info__modal__image">
              <img src={thirdInstruction} alt="Instruction 3" />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Modal;