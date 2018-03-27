import React, {Component} from 'react';
import styles from './Modal.scss';
import AuxComp from '../../../hoc/AuxComp/AuxComp';
import Backdrop from '../../presentational/Backdrop/Backdrop';

class Modal extends Component {

    render() {
        return(
            <AuxComp>
                <Backdrop show={this.props.show}
                        clicked={this.props.modalClosed}/>
                <div
                    className={styles.Modal}
                    style={{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.show ? '1' : '0'
                    }}>
                    {this.props.children}
                    <button className={styles.Close} onClick={this.props.modalClosed}>X</button>
                </div>
                
            </AuxComp>
        );
    }
}

export default Modal;