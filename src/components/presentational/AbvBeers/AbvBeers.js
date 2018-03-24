import React from 'react';

const abvBeers = (props) => {
    return (
        <p className={styles.Header}>If you like a little bit more power we recommend these beers</p>
        <div>
            <img src={props.beerImage} />
            
        </div> 
    );
}

export default abvBeers;