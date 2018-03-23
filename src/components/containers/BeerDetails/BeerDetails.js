import React, {Component} from 'react';
import AuxComp from '../../../hoc/AuxComp/AuxComp';
import styles from './BeerDetails.scss';
import MainDescription from '../../presentational/MainDescription/MainDescription';
import BestFood from '../../presentational/BestFood/BestFood';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions/index';


class BeerDetails extends Component {

    componentDidMount() {
        let ibu = Math.round(this.props.beer.ibu);
        this.props.areAllFetched ? null : this.props.apiRequestForIbuSimillarBeers_Gt(ibu);
        this.props.beersGreaterIBU.forEach((b) => console.log(b.ibu));
    }

    // requestForSimilarBeersFromLocalStore() {

    // }

    render () {
        console.log(this.props.beer);
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
                        <div className={styles.OtherImages}>
                        </div>
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
        beersGreaterABV: state.modal.beersABVGt,
        beersLowerABV: state.modal.beersABVLt,
        beersGreaterIBU: state.modal.beersIBUGt,
        beersLowerIBU: state.modal.beersIBULt,
        beersGreaterEBC: state.modal.beersEBCGt,
        beersLowerEBC: state.modal.beersEBCLt,
        lodaing: state.modal.loading,
        error: state.modal.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        apiRequestForIbuSimillarBeers_Gt: (ibu) => dispatch(actions.apiCallIbuGt(ibu))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BeerDetails);