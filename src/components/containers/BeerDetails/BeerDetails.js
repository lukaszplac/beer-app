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
        orderType: null
    }

    componentDidMount() {
        let abv = Math.ceil(this.props.beer.abv);
        this.props.areAllFetched ? null : this.props.apiRequestForSimillarBeers(abv, orderTypes.ABV_GT);
        //this.props.beersGreaterABV.forEach((b) => console.log(b.abv));
        this.setState({
            orderType: orderTypes.ABV_GT
        });
    }

    // requestForSimilarBeersFromLocalStore() {

    // }
    onChangeOrderByIbu() {
        this.props.areAllFetched ? null : this.props.apiRequestForSimillarBeers(this.props.beer.ibu, orderTypes.IBV_LT);
        //this.props.beersGreaterIBU.forEach((b) => console.log(b.ibu));
        this.setState({
            orderType: orderTypes.IBV_LT
        });
    }

    render () {

        let bestServedWith = this.props.beer.food_pairing.map((food, index) => (
            <p key={index}>{food}</p>
        ));

        return(
            <AuxComp>
                <div className={styles.BeerDetails}>
                    <div className={styles.Pictures}>
                        <div className={styles.MainImage}>
                            <div style={{width: '30%'}}><img src={this.props.beer.image_url} /></div>
                        </div>
                        {this.props.loading ? <Spinner /> : <RightPanelModal
                                                                    orderType={this.state.orderType}
                                                                    beers={this.props.rightPanelBeers}
                                                                    onChangeBeers={() => this.onChangeOrderByIbu()} 
                                                                    />}
                    </div>
                    <div className={styles.TextDescr}>
                        <MainDescription
                                name = {this.props.beer.name}
                                tagline = {this.props.beer.tagline}
                                description = {this.props.beer.description}
                                ibu = {this.props.beer.ibu}
                                abv = {this.props.beer.abv}
                                ebc = {this.props.beer.ebc} />
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
        error: state.modal.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        apiRequestForSimillarBeers: (measuredBy, url_param) => dispatch(actions.apiCallModalBeers(measuredBy, url_param)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BeerDetails);