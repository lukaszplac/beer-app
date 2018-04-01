import React, {Component} from 'react';
import AuxComp from '../../../hoc/AuxComp/AuxComp';
import styles from './BeerDetails.scss';
import MainDescription from '../../presentational/MainDescription/MainDescription';
import BestFood from '../../presentational/BestFood/BestFood';
import RightPanelModal from '../../presentational/RightPanelModal/RightPanelModal';
import Spinner from '../../presentational/Spinner/Spinner';
import FavIndicator from './FavIndicator/FavIndicator';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions/index';
import * as orderTypes from './beerOrder';
import retrieveDocId from '../../../helpers/retrieveDocId';


class BeerDetails extends Component {

    state = {
        orderType: null,
        otherBeerClicked: false
    }

    componentDidMount() {
        this.onChangeOrderByAbv(this.props.beer);
    }

    //used to change 3 x modal beers for new clicked beer if component did update, comparing prev props with new one just to be sure
    //propsed other beer is the beer fetched from api when beer has been clicked
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.otherBeer !== this.props.otherBeer)
            this.onChangeOrderByAbv(this.props.otherBeer[0]);
    }

    onChangeOrderByAbv(currentBeer) {
        let abv = Math.ceil(currentBeer.abv);
        this.props.apiRequestForSimillarBeers(abv, orderTypes.ABV_GT);
        this.setState({
            orderType: orderTypes.ABV_GT
        });
    }

    onChangeOrderByIbu(currentBeer) {
        let ibu = Math.floor(currentBeer.ibu);
        this.props.apiRequestForSimillarBeers(ibu, orderTypes.IBV_LT);
        this.setState({
            orderType: orderTypes.IBV_LT
        });
    }

    onBeerClicked(id) {
        this.props.onBeerClicked(id);
        this.setState({
            otherBeerClicked: true
        })
    }

    removeFavorite(beer) {
        let docId = retrieveDocId.call(this.props.favBeers, beer.id);
        if (docId !== "") this.props.removeFavorite(beer, docId);
    }

    addFavorite(beer, count) {
        this.props.addFavorite(beer, count);
    }

    render () {
        //at the beginning setting current beer to beer passed from wrapping component => see Beers
        let currentBeer = this.props.beer;
        let bestServedWith = null;
        if (!this.props.error) {

            //..but, if other beer is clicked and it is not still loading currentBeer is changed to other beer fetched from api
            if (this.state.otherBeerClicked && !this.props.loadingModal) {
                currentBeer = this.props.otherBeer[0];
            }
            
            //getting data for BestFood component => see below
            bestServedWith = currentBeer.food_pairing.map((food, index) => (
                <p key={index}>{food}</p>
            ));
        }
        return(
            //showing modal if something is loading
            this.props.loadingModal ? <Spinner /> :
            
            //showing some simple text if something is wrong otherwise rendering whole bunch of code below
            this.props.error ? <p style={{textAlign: 'center'}}>Beers can`t be shown</p> :
            <AuxComp>
                <div className={styles.BeerDetails}>
                    <div className={styles.Pictures}>
                        <div className={styles.MainImage}>
                            <div style={{width: '30%'}}><img src={currentBeer.image_url} alt="main modal"/></div>
                            
                            {/*the little heart next to beer is whole new component because it can change state by handling clicking
                               and also represents state, it has to be able also controlling state of alert appearing when fav list is full
                               by passing methods alerAppear and alertReset*/}
                            <FavIndicator onActivateFav={() => this.addFavorite(currentBeer, this.props.beersCount)}
                                          onDeactivateFav={() => this.removeFavorite(currentBeer)}
                                          id={currentBeer.id}
                                          favBeers={this.props.favBeers}
                                          count={this.props.beersCount}
                                          alertAppear={this.props.favAlertAppear}
                                          alertReset={this.props.favAlertReset}/>
                        </div>
                        {/*also right panel must show spinner when beers with lower ibu or higher abv are loading*/}
                        {/*3 beer for right panel are also kept in stor under state.modal.beersModal*/}
                        {this.props.loading ? <Spinner /> : <RightPanelModal
                                                                    orderType={this.state.orderType}
                                                                    beers={this.props.rightPanelBeers}
                                                                    onChangeIbu={() => this.onChangeOrderByIbu(currentBeer)}
                                                                    onChangeAbv={() => this.onChangeOrderByAbv(currentBeer)}
                                                                    onBeerClicked={(id) => this.onBeerClicked(id)} 
                                                                    />}
                    </div>
                    <div className={styles.TextDescr} >
                        {/*showing text and other infor for current beer*/}
                        <MainDescription
                                name = {currentBeer.name}
                                tagline = {currentBeer.tagline}
                                description = {currentBeer.description}
                                ibu = {currentBeer.ibu}
                                abv = {currentBeer.abv}
                                ebc = {currentBeer.ebc} />
                        <BestFood>
                                {bestServedWith}
                        </BestFood>
                    </div>
                </div>
            </AuxComp>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        rightPanelBeers: state.modal.beersModal,
        loading: state.modal.loadingModalBeers,
        loadingModal: state.modal.loadingModal,
        error: state.modal.error,
        otherBeer: state.modal.oneBeer,
        favBeers: state.favs.favBeers
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        apiRequestForSimillarBeers: (measuredBy, url_param) => dispatch(actions.apiCallModalBeers(measuredBy, url_param)),
        onBeerClicked: (id) => dispatch(actions.getOneBeer(id)),
        addFavorite: (beer, length) => dispatch(actions.addFavoriteDB(beer, length)),
        removeFavorite: (beer, docId) => dispatch(actions.removeFavoriteDB(beer, docId)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BeerDetails);