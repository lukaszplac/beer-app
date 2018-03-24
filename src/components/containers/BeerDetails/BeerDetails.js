import React, {Component} from 'react';
import AuxComp from '../../../hoc/AuxComp/AuxComp';
import styles from './BeerDetails.scss';
import MainDescription from '../../presentational/MainDescription/MainDescription';
import BestFood from '../../presentational/BestFood/BestFood';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions/index';


class BeerDetails extends Component {

    componentDidMount() {
        let abv = Math.round(this.props.beer.abv);
        this.props.areAllFetched ? null : this.props.apiRequestForAbvSimillarBeers_Gt(abv);
        //this.props.beersGreaterABV.forEach((b) => console.log(b.abv));
    }

    // requestForSimilarBeersFromLocalStore() {

    // }

    render () {
        let abvGreaterBeers = this.props.beersGreaterABV.sort((p, n) => p.abv > n.abv)
                                                        .slice(0,3)
                                                        .map((beer) => (
                                                            <AbvBeers beerImage={beer.image_url} 
                                                                      beerName={beer.name}
                                                                      abv={beer.abv}/>                                                      
                                                        ));

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
                        <div className={styles.RightPanel}>
                            <div>
                            {this.state.loadingABV ? <Spinner /> : {abvGreaterBeers}}
                            </div>
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
        beersGreaterABV: state.modal.abvGTbeers,
        lodaingABV: state.modal.loadingABV,
        error: state.modal.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        apiRequestForAbvSimillarBeers_Gt: (abv) => dispatch(actions.apiCallabvGt(abv))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BeerDetails);