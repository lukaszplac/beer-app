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


class BeerDetails extends Component {

    state = {
        orderType: null,
        otherBeerClicked: false,
        isFavorite: false
    }

    componentDidMount() {
        this.onChangeOrderByAbv(this.props.beer);
        this.props.getFavorites();

    }

    //used to change 3 x modal beers for new clicked beer if component did update, comparing prev props with new one just to be sure
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.otherBeer !== this.props.otherBeer)
            this.onChangeOrderByAbv(this.props.otherBeer[0]);
    }

    // requestForSimilarBeersFromLocalStore() {

    // }
    onChangeOrderByAbv(currentBeer) {
        let abv = Math.ceil(currentBeer.abv);
        this.props.apiRequestForSimillarBeers(abv, orderTypes.ABV_GT);
        //this.props.beersGreaterABV.forEach((b) => console.log(b.abv));
        this.setState({
            orderType: orderTypes.ABV_GT
        });
    }
    onChangeOrderByIbu(currentBeer) {
        let ibu = Math.floor(currentBeer.ibu);
        this.props.apiRequestForSimillarBeers(ibu, orderTypes.IBV_LT);
        //this.props.beersGreaterIBU.forEach((b) => console.log(b.ibu));
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

    removeFavorite(id) {
        let docId = "";
        console.log(id);
        for (let key in this.props.favBeers) {
            if (this.props.favBeers.hasOwnProperty(key)) {
                if (this.props.favBeers[key].id === id) docId=key;
            }
        }
        if (docId !== "") this.props.removeFavorite(docId);
        else return;
    }

    render () {
        let currentBeer = this.props.beer;

        if (this.state.otherBeerClicked && !this.props.loadingModal) {
            currentBeer = this.props.otherBeer[0];
        }

        let favBeers = [];

        favBeers = Object.values(this.props.favBeers).map(obId => obId.id);

        console.log(favBeers);

        let isFavorite = favBeers.includes(currentBeer.id);
        
        let bestServedWith = currentBeer.food_pairing.map((food, index) => (
            <p key={index}>{food}</p>
        ));

        return(
            this.props.loadingModal ? <Spinner /> :
            this.props.error ? <p style={{textAlign: 'center'}}>Beers can`t be shown</p> :
            <AuxComp>
                <div className={styles.BeerDetails}>
                    <div className={styles.Pictures}>
                        <div className={styles.MainImage}>
                            <div style={{width: '30%'}}><img src={currentBeer.image_url} alt="main modal"/></div>
                            <FavIndicator onActivateFav={(id) => this.props.addFavorite(currentBeer.id)}
                                          onDeactivateFav={(id) => this.removeFavorite(currentBeer.id)}
                                          isFavorite={isFavorite}/>
                        </div>
                        {this.props.loading ? <Spinner /> : <RightPanelModal
                                                                    orderType={this.state.orderType}
                                                                    beers={this.props.rightPanelBeers}
                                                                    onChangeIbu={() => this.onChangeOrderByIbu(currentBeer)}
                                                                    onChangeAbv={() => this.onChangeOrderByAbv(currentBeer)}
                                                                    onBeerClicked={(id) => this.onBeerClicked(id)} 
                                                                    />}
                    </div>
                    <div className={styles.TextDescr} >
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
        addFavorite: (id) => dispatch(actions.addFavorite(id)),
        removeFavorite: (docId) => dispatch(actions.removeFavorite(docId)),
        getFavorites: () => dispatch(actions.getFavorites())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BeerDetails);