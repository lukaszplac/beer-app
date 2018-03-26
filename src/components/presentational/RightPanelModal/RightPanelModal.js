import React from 'react';
import styles from './RightPanelModal.scss';
import SimillarBeers from '../SimillarBeers/SimillarBeers';
import * as orderTypes from '../../containers/BeerDetails/beerOrder';

const rightPanelModal = (props) => {
    let info = <h4>If you like a little bit more power these beers are for you:</h4>
    if (props.orderType === orderTypes.IBV_LT) info = <h4>These more delicate beers should make you happy!</h4>
    return (
        <div className={styles.RightPanelModal}>
            {info}      
            <SimillarBeers beers={props.beers} type={props.orderType} onBeerClicked={props.onBeerClicked}/>
            <div className={styles.Buttons}>
                <button onClick={props.onChangeIbu}>Lower ibu?</button>
                <button onClick={props.onChangeAbv}>More abv?</button>
            </div>
        </div>
    );
}

export default rightPanelModal;