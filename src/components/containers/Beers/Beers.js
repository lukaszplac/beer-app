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
        //initial request for page number 1, page count is kept in store but initial request is done here
        //adding also event listener for scrolling
        if (!this.props.initialized) this.props.initialRequest(1);
        window.addEventListener("scroll", this.scrollHandler );
    }

    componentWillUnmount() {
        //removing event handler when unmount (otherwise when comming back from favorites for example com
        //ponent did mount would have registered another listener) and there might have been some problems
        window.removeEventListener('scroll', this.scrollHandler);
        clearInterval(this.interval);
    }

    scrollEventHandler() {
        //some counting of viewport size, found in the web
        var scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
        var scrollHeight = (document.documentElement && document.documentElement.scrollHeight) || document.body.scrollHeight;
        var clientHeight = document.documentElement.clientHeight || window.innerHeight;
        //adding 5 because not always event triggered - strange..
        var scrolledToBottom = Math.ceil(scrollTop + clientHeight+5) >= scrollHeight;

        //more beer will be loaded when scrolled to bottom and no beers are loading and not all beers are fetched yet
        if (scrolledToBottom && !this.props.allFetched && !this.props.loading) {
            this.props.loadMoreBeersRequest(this.props.page);
        }
    }

    //clicking on beer event handler
    //when left button - just set local keeping beerClicked and beer id to replace the old one in Beer Details component
    onBeerClicked(e, beer, isFav, len) {
        let dbOrApiBusy = this.props.processingDB || this.props.loading;
        if (e.button === 0) {
            this.setState({
                beerClicked: true,
                beerToShow: beer.id-1
            })
        //remove listener to prevent scrolling end fetching itmes when modal exist
        //modal exist only when left button clicked so this function is inside this block
        window.removeEventListener('scroll', this.scrollHandler);

        //capture right click event and trigger adding favorite if it is still not there (!isFav) or
        //and server or api are not busy (to prevent double adding to database)
        } else if (e.button === 2) {
            if (!isFav && !dbOrApiBusy) {
                //adding favorit lenght(len) is needed to check in the action dispatcher the length of favorites I asumed max of 30 favs
                //to not sending multiple request to API
                this.props.addFavorite(beer, len);

                //setting local state to be able to show fav allert in case when favlist is full (30)
                if (this.props.favFull) this.setState({favAllertShouldAppear: true});

                //otherwise setting currently processed beer to know where the little spinner should appear
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

    //event comming down from modal to allow showing fav allert when user tries to add fav from modla and fav list is full
    favAlertAppearFromModal() {
        this.setState({favAllertShouldAppearModal: true});
    }

    //also comming down from modal but reseting when user removed some beer and free space for favorites is back again
    favAlertResetFromModal() {
        this.setState({favAllertShouldAppearModal: false});
    }

    //tip abour right click only appears when entering mouse on beer,
    //resetting tip shoudl appear and waiting another 25s => see setInterval above
    onMouseEnterOnBeer() {
        if(this.state.tipShouldAppear) {
            this.setState({rightClickTrigger: true, tipShouldAppear: false})
        } 
    }

    //when mouse leaves both fav aller or right click should not appear!
    onMouseLeave() {
        this.setState({rightClickTrigger: false, favAllertShouldAppear: false});
    }

    onContextDisabled(e, beer, isFav, len) {
        //prevent displaying context menu and trigger on click event
        e.preventDefault();
        this.onBeerClicked(e, beer, isFav, len);
    }

    //rendering list of fetched beers and applying props down to Beer compoenent
    //favBeersIds is just array of ids, this array is used to check if there is favorite beer among beers fetched from api (this.porps.beers)
    render() {
        let beers = null;
        let favBeersIds = this.props.favBeers.map((beer) => beer.id);
        if (!this.props.error) {
            beers = this.props.beers.map((beer) => {
                let isFav = favBeersIds.includes(beer.id);
                return ( //rendering Beer and passing down props
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
            //just showing some simple info when some error occurs.
            beers = <p style={{textAlign: 'center'}}>Beers can`t be shown</p>
        }
        return (
            <AuxComp>
                <div className={styles.Beers}>
                    <Modal //modal will appear only when local state beerClicked changes
                        show = {this.state.beerClicked}
                        modalClosed = {() => this.onModalClosed()}>
                            {this.state.beerToShow != null ? <BeerDetails //this is compoenent showing details for clicked beer using id taken from beerToShow local state, see method onBeerClicked()
                                                                beersCount={this.props.favBeers.length}
                                                                beer={this.props.beers[this.state.beerToShow]}
                                                                favAlertAppear={() => this.favAlertAppearFromModal()}
                                                                favAlertReset={() => this.favAlertResetFromModal()}/> : null}
                    </Modal>
                    
                    {beers}

                    {/*showing Spinner when not all beers are fetched and server is busy*/}
                    {this.props.loading && !this.props.allFetched ? <div className={styles.Spinner}><Spinner /></div> : null}
                    
                    {/*showing endLine when all beers fetched*/}
                    {this.props.allFetched ? <div className={styles.EndLine}></div> : null} 
                </div>

                {/*showing some other components on page depending on current state*/}
                {!this.props.allFetched && !this.props.error 
                    ? <WheelDown /> : null}
                {this.state.rightClickTrigger && !this.props.favFull 
                    ? <TipRightClick text="TIP! Right click to FAV!"/> : null}
                {this.state.favAllertShouldAppear || this.state.favAllertShouldAppearModal
                    ? <TipRightClick text="Favorites list is full. Remove some beers."/> : null}
                
                {/*showing animation when beer is beeing aded to favorites => look inside AnimHeart*/}
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

//used wihtErrorHandler HOC to show serwer error when nsomething goes wrong
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Beers, axios));