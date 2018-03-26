import React from 'react';
import styles from './RightPanelModal.scss';
import SimillarBeers from '../SimillarBeers/SimillarBeers';

const rightPanelModal = (props) => {
    return (
        <div className={styles.RightPanelModal}>
            <h4>If you like a little bit more power these beers are for you:</h4>
            <SimillarBeers beers={props.beers} />
            <button onClick={props.onChangeBeers}>Or maybe with lower ibu ?</button>
        </div>
    );
}

export default rightPanelModal;