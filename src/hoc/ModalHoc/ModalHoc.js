//higher order component just to wrap modal in the case when user goes to beer via url

import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';
import AuxComp from '../AuxComp/AuxComp';
import Modal from '../../components/containers/Modal/Modal';
import BeerDetails from '../../components/containers/BeerDetails/BeerDetails';

class ModalHoc extends Component {
    
    state = {
        show: false,
    }

    componentDidMount() {
        //getting beer from api based on react router id param
        this.props.getBeer(this.props.match.params.id);
        this.showModal();
    }
    
    showModal() {
        this.setState({
            show: true
        })
    }

    onModalClosed() {
        this.setState({
            show: false
        })
    }

    render() {
        return(
            //AuxComp only wraps without creating real dom element
            <AuxComp>
                <Modal 
                    show = {this.state.show}
                    modalClosed = {() => this.onModalClosed()}>
                       <BeerDetails 
                            beer={this.props.beer}
                            areAllFetched={false}/> : null}
                </Modal>
            </AuxComp>
        );
    }
}

const mapStateToProps = state => {
    return {
        beer: state.modal.beer
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getBeer: (id) => dispatch(actions.getOneBeer(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalHoc);
