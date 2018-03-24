//higher order component just to wrap modal in the case when user goes to beer via url

import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';
import AuxComp from '../AuxComp/AuxComp';
import Modal from '../../components/containers/Modal/Modal';
import BeerDetails from '../../components/containers/BeerDetails/BeerDetails';
import Spinner from '../../components/presentational/Spinner/Spinner';
import {Redirect} from 'react-router-dom';

class ModalHoc extends Component {
    
    state = {
        show: false,
    }


    componentWillMount () {
        this.setState({
            show: true
        })
    }

    componentDidMount() {
        //getting beer from api based on react router id param
        this.props.getBeer(this.props.match.params.id);
    }

    onModalClosed() {
        this.setState({
            show: false
        })
    }

    render() {
        let beer;
        if (!this.props.error) {
            beer = this.props.beer[0];
        }
        console.log(this.props.beer);
        console.log(beer);
        return(
            <AuxComp>
                {this.state.show ? null : <Redirect to="/"/>}
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
