import React, { Component } from 'react';
import Spinner from '../../presentational/Spinner/Spinner';
import * as actions from '../../../store/actions/index';
import {connect} from 'react-redux';
import Beer from '../../presentational/Beer/Beer';
import Modal from '../../containers/Modal/Modal';
import styles from './Beers.scss';
import BeerDetails from '../BeerDetails/BeerDetails';

class Beers extends Component {

    state = {
        pageNumber: 1,
        beerClicked: false,
        beerToShow: null
    }

    //just giving the event handler a refernece to be able to remove it in the future when modal appears
    scrollHandler = () => this.scrollEventHandler();

    componentDidMount() {
        if (!this.props.initialized) this.props.initialRequest(1);
        window.addEventListener("scroll", this.scrollHandler );
    }

    scrollEventHandler() {
        var scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
        var scrollHeight = (document.documentElement && document.documentElement.scrollHeight) || document.body.scrollHeight;
        var clientHeight = document.documentElement.clientHeight || window.innerHeight;
        var scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight;
        if (scrolledToBottom && !this.props.allFetched) {
            this.setState((prev, props) => {
                return {pageNumber: prev.pageNumber + 1}
            })
            this.props.loadMoreBeersRequest(this.state.pageNumber);
        }
    }

    onBeerClicked(beerId) {
        this.setState({
            beerClicked: true,
            beerToShow: beerId-1
        })
        //remove listener to prevent scrolling end fetching itmes when modal exist
        window.removeEventListener('scroll', this.scrollHandler);
    }

    onModalClosed() {
        this.setState({
            beerClicked: false,
            beerToShow: null
        })
        //registering listener back againg when modal goes off
        window.addEventListener("scroll", this.scrollHandler);
    }

    render() {
        let beers = null;
        if (!this.props.error) {
            beers = this.props.beers.map((beer) => (
                <Beer key={beer.id} 
                    name={beer.name} 
                    tagline={beer.tagline} 
                    image_url={beer.image_url} 
                    clicked={ () => this.onBeerClicked(beer.id) }/>
            ));
        } 
        return (
            <div className={styles.Beers}>
                <Modal 
                    show = {this.state.beerClicked}
                    modalClosed = {() => this.onModalClosed()}>
                         {this.state.beerToShow != null ? <BeerDetails
                                                            beer={this.props.beers[this.state.beerToShow]}
                                                            areAllFetched={this.props.allFetched}/> : null}
                </Modal>
                {beers}
                {this.props.loading ? <div className={styles.Spinner}><Spinner /></div> : null}
                {this.props.allFetched ? <div className={styles.EndLine}></div> : null}           
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        error: state.beer.error,
        beers: state.beer.beers,
        loading: state.beer.loading,
        allFetched: state.beer.allFetched,
        initialized: state.beer.initialized
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        initialRequest: (page) => dispatch(actions.initialLoad(page)),
        loadMoreBeersRequest: (page) => dispatch(actions.onLoadMore(page)),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Beers);