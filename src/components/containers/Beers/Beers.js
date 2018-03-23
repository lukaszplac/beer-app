import React, { Component } from 'react';
import Spinner from '../../presentational/Spinner/Spinner';
import * as actions from '../../../store/actions/index';
import {connect} from 'react-redux';
import Beer from '../../presentational/Beer/Beer';
import styles from './Beers.scss';

class Beers extends Component {

    state = {
        pageNumber: 1,
        //requestSent: false
    }

    componentDidMount() {
        if (!this.props.initialized) this.props.initialRequest(1);
        window.addEventListener("scroll", () => this.scrollEventHandler());
        console.log('BEERS did mount');
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

    render() {
        let beers = null;
        if (!this.props.error) {
            beers = this.props.beers.map((beer) => (
                <Beer key={beer.id} 
                    name={beer.name} 
                    tagline={beer.tagline} 
                    image_url={beer.image_url} />
            ));
        } 
        return (
            <div className={styles.Beers}>
                {beers}
                {this.props.loading ? <div className={styles.Spinner}><Spinner /></div> : null}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        error: state.error,
        beers: state.beers,
        loading: state.loading,
        allFetched: state.allFetched,
        initialized: state.initialized
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        initialRequest: (page) => dispatch(actions.initialLoad(page)),
        loadMoreBeersRequest: (page) => dispatch(actions.onLoadMore(page)),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Beers);