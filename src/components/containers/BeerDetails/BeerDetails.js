import React, {Component} from 'react';
import AuxComp from '../../../hoc/AuxComp/AuxComp';
import styles from './BeerDetails.scss';
import MainDescription from '../../presentational/MainDescription/MainDescription';
import BestFood from '../../presentational/BestFood/BestFood';
import RightPanelModal from '../../presentational/RightPanelModal/RightPanelModal';
import Spinner from '../../presentational/Spinner/Spinner';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions/index';
import * as orderTypes from './beerOrder'; 


class BeerDetails extends Component {

    state = {
        orderType: null,
        otherBeerClicked: false
    }

    componentDidMount() {
        this.onChangeOrderByAbv(this.props.beer);
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

    render () {
        let currentBeer = this.props.beer;

        if (this.state.otherBeerClicked && !this.props.loadingModal) {
            currentBeer = this.props.otherBeer[0];
        }

        let bestServedWith = currentBeer.food_pairing.map((food, index) => (
            <p key={index}>{food}</p>
        ));

        return(
            this.props.loadingModal ? <Spinner /> :
            <AuxComp>
                <div className={styles.BeerDetails}>
                    <div className={styles.Pictures}>
                        <div className={styles.MainImage}>
                            <div style={{width: '30%'}}><img src={currentBeer.image_url} alt="main modal"/></div>
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
        otherBeer: state.modal.oneBeer
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        apiRequestForSimillarBeers: (measuredBy, url_param) => dispatch(actions.apiCallModalBeers(measuredBy, url_param)),
        onBeerClicked: (id) => dispatch(actions.getOneBeer(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BeerDetails);