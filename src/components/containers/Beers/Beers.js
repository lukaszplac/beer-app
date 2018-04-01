import React, { Component } from 'react';
import Spinner from '../../presentational/Spinner/Spinner';
import * as actions from '../../../store/actions/index';
import {connect} from 'react-redux';
import Beer from '../../presentational/Beer/Beer';
import Modal from '../../containers/Modal/Modal';
import styles from './Beers.scss';
import BeerDetails from '../BeerDetails/BeerDetails';
import axios from '../../../axios-instances';
import withErrorHandler from '../../../hoc/withErrorHandler';
import WheelDown from '../../presentational/WheelDown/WheelDown';
import TipRightClick from '../../presentational/TipRightClick/TipRightClick';
import AuxComp from '../../../hoc/AuxComp/AuxComp';
import AnimHeart from '../../presentational/AnimHeart/AnimHeart';

class Beers extends Component {

    state = {
        beerClicked: false,
        beerToShow: null,
        tipShouldAppear: true,
        rightClickTrigger: false,
        favAllertShouldAppear: false,
        favAllertShouldAppearModal: false,
        currentlyProcessed: 0
    }

    //just giving the event handler a refernece to be able to remove it in the future when modal appears
    scrollHandler = () => this.scrollEventHandler();
    
    //every 15s tipShouldAppera will reset to true to allow next appearance of tip
    interval = setInterval(() => this.setState({tipShouldAppear: true}), 25000);

    componentDidMount() {
        if (!this.props.initialized) this.props.initialRequest(1);
        window.addEventListener("scroll", this.scrollHandler );
    }

    componentWillUnmount() {
        //removing event handler when unmount (otherwise when comming back from favorites for example com
        //ponent did mount would have registered another listener) and there might have been a problem with data integrity
        window.removeEventListener('scroll', this.scrollHandler);
        clearInterval(this.interval);
    }

    scrollEventHandler() {
        var scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
        var scrollHeight = (document.documentElement && document.documentElement.scrollHeight) || document.body.scrollHeight;
        var clientHeight = document.documentElement.clientHeight || window.innerHeight;
        var scrolledToBottom = Math.ceil(scrollTop + clientHeight+5) >= scrollHeight;

        //more beer will be loaded when scrolled to bottom and no beers are loading and not all beers are fetched yet
        if (scrolledToBottom && !this.props.allFetched && !this.props.loading) {
            this.props.loadMoreBeersRequest(this.props.page);
        }
    }

    onBeerClicked(e, beer, isFav, len) {
        let dbOrApiBusy = this.props.processingDB || this.props.loading;
        if (e.button === 0) {
            this.setState({
                beerClicked: true,
                beerToShow: beer.id-1
            })
        //remove listener to prevent scrolling end fetching itmes when modal exist
        window.removeEventListener('scroll', this.scrollHandler);
        //capture right click event and trigger adding favorite if it is still not there
        } else if (e.button === 2) {
            if (!isFav && !dbOrApiBusy) {
                this.props.addFavorite(beer, len);
                if (this.props.favFull) this.setState({favAllertShouldAppear: true});
                else this.setState({currentlyProcessed: beer.id})
            }
        }
    }

    onModalClosed() {
        this.setState({
            beerClicked: false,
            beerToShow: null
        })
        //registering listener back againg when modal goes off
        window.addEventListener("scroll", this.scrollHandler);
    }

    favAlertAppearFromModal() {
        this.setState({favAllertShouldAppearModal: true});
    }

    favAlertResetFromModal() {
        this.setState({favAllertShouldAppearModal: false});
    }

    onMouseEnterOnBeer() {
        if(this.state.tipShouldAppear) {
            this.setState({rightClickTrigger: true, tipShouldAppear: false})
        } 
    }

    onMouseLeave() {
        this.setState({rightClickTrigger: false, favAllertShouldAppear: false});
    }

    onContextDisabled(e, beer, isFav, len) {
        //prevent displaying context menu and trigger on click event
        e.preventDefault();
        this.onBeerClicked(e, beer, isFav, len);
    }

    render() {
        let beers = null;
        let favBeersIds = this.props.favBeers.map((beer) => beer.id);
        if (!this.props.error) {
            beers = this.props.beers.map((beer) => {
                let isFav = favBeersIds.includes(beer.id);
                return (
                <Beer key={beer.id} 
                    name={beer.name} 
                    tagline={beer.tagline} 
                    image_url={beer.image_url}
                    classes="animated bounceInDown"
                    clicked={ (e) => this.onBeerClicked(e, beer, isFav) }
                    mouseEnter = {!isFav ? () => this.onMouseEnterOnBeer() : null}
                    mouseLeave = {!isFav ? () => this.onMouseLeave() : null}
                    contextMenuDisable = { (e) => this.onContextDisabled(e, beer, isFav, favBeersIds.length) }
                    showAsFav = {isFav}
                    processing = {beer.id === this.state.currentlyProcessed ? this.props.processingDB : false}/>
                )
            });
        } else {
            beers = <p style={{textAlign: 'center'}}>Beers can`t be shown</p>
        }
        return (
            <AuxComp>
                <div className={styles.Beers}>
                    <Modal 
                        show = {this.state.beerClicked}
                        modalClosed = {() => this.onModalClosed()}>
                            {this.state.beerToShow != null ? <BeerDetails
                                                                beersCount={this.props.favBeers.length}
                                                                beer={this.props.beers[this.state.beerToShow]}
                                                                favAlertAppear={() => this.favAlertAppearFromModal()}
                                                                favAlertReset={() => this.favAlertResetFromModal()}/> : null}
                    </Modal>
                    {beers}
                    {this.props.loading && !this.props.allFetched ? <div className={styles.Spinner}><Spinner /></div> : null}
                    {this.props.allFetched ? <div className={styles.EndLine}></div> : null}
                </div>

                {!this.props.allFetched && !this.props.error ? <WheelDown /> : null}

                {this.state.rightClickTrigger && !this.props.favFull ? <TipRightClick text="TIP! Right click to FAV!"/> : null}
                {this.state.favAllertShouldAppear || this.state.favAllertShouldAppearModal
                    ? <TipRightClick text="Favorites list is full. Remove some beers."/> : null}
                <AnimHeart /> 

            </AuxComp>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        error: state.beer.error,
        beers: state.beer.beers,
        loading: state.beer.loading,
        allFetched: state.beer.allFetched,
        initialized: state.beer.initialized,
        favBeers: state.beer.favs,
        processingDB: state.favs.processing,
        page: state.beer.page,
        favFull: state.favs.full
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        initialRequest: (page) => dispatch(actions.initialLoad(page)),
        loadMoreBeersRequest: (page) => dispatch(actions.onLoadMore(page)),
        addFavorite: (beer, length) => dispatch(actions.addFavoriteDB(beer, length))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Beers, axios));