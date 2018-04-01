import React from 'react';
import styles from './SimillarBeers.scss';
import * as orderTypes from '../../containers/BeerDetails/beerOrder';

//simple functional component to provide info for RightPanelComponent and then in higher order by BeerDetails
const abvBeers = (props) => {
    let simillarBeers = props.beers.map((beer) => {
                                        let info = props.type === orderTypes.ABV_GT ? <p>ABV:{beer.abv}</p> : <p>IBU:{beer.ibu}</p>  
                                        return (
                                        <div key={beer.id} 
                                             className={styles.Image}
                                             onClick={(id) => props.onBeerClicked(beer.id)}>           
                                                <img src={beer.image_url} alt={"simmilar beer image" + beer.id}/>
                                                <p>{beer.name}</p>
                                                {info}
                                        </div>                                                      
                                        )});
    return (
        <div className={styles.SimillarBeers}>
            {simillarBeers.length === 0 ? <h4>Seems like there is nothing more to offer. You choose the best of the best. Cheers :)</h4> : null}
            {simillarBeers}
        </div>
    );
}

export default abvBeers;