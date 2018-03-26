import React from 'react';
import styles from './SimillarBeers.scss';

const abvBeers = (props) => {
    let simillarBeers = props.beers.map((beer) => (
                                        <div key={beer.id} className={styles.Image}>           
                                                <img src={beer.image_url} />
                                                <p>{beer.name}</p>
                                                <p>{beer.abv}</p>
                                                
                                        </div>                                                      
                                     ));
    return (
        <div className={styles.SimillarBeers}>
            {simillarBeers.length === 0 ? <h4>Seems like there is nothing more to offer. You choose the best of the best. Cheers :)</h4> : null}
            {simillarBeers}
        </div>
    );
}

export default abvBeers;