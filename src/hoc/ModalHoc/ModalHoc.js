//higher order component just to wrap modal in the case when user goes to beer via url

import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';
import AuxComp from '../AuxComp/AuxComp';
import Modal from '../../components/containers/Modal/Modal';
import BeerDetails from '../../components/containers/BeerDetails/BeerDetails';
import Spinner from '../../components/presentational/Spinner/Spinner';

class ModalHoc extends Component {
    
    state = {
        show: false,
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.beer !== this.props.beer) {
            this.onShow();
        }
    }

    componentDidMount() {
        //getting beer from api based on react router id param
        this.props.getBeer(this.props.match.params.id);
    }

    onModalClosed() {
        this.setState({
            show: false
        });
        //redirection timed out just to show some animation before component dissapear
        setTimeout(() => this.props.history.push("/"), 400);
    }

    onShow() {
        this.setState({
            show: true
        });
    }

    render() {
        let beer;
        if (!this.props.error) {
            beer = this.props.beer[0];
        }
        return(
            <AuxComp>
                <Modal 
                    show = {this.state.show}
                    modalClosed = {() => this.onModalClosed()}>
                        {this.props.beer.length > 0 ? <BeerDetails 
                            beer={beer}
                            areAllFetched={false}/> : null}
                    {this.props.loading ? <Spinner /> : null}
                </Modal>
            </AuxComp>
        );
    }
}

const mapStateToProps = state => {
    return {
        beer: state.modal.oneBeer,
        loading: state.modal.loadingModal,
        error: state.modal.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getBeer: (id) => dispatch(actions.getOneBeer(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalHoc);
