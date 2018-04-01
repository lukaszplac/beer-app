import React, {Component} from 'react';
import styles from './FavCountIndicator.scss';
import { StatefulToolTip } from "react-portal-tooltip"
import {connect} from 'react-redux';

class FavCountIndicator extends Component {

    render() {
        let classes = [styles.FavCountInactive];
        if (this.props.favCount > 0) {
            classes = [styles.FavCount, styles.FavCountActive];
        }
        if (this.props.favCount > 29) {
            classes = [styles.FavCount, styles.Max];
        }
    
        let position = "bottom";
        let arrow = "center";
        let parentDiv = <div className={classes.join(' ')}
                             onClick={this.props.onClickFavCount}>
                                <i className="fas fa-heart"></i>
                                <p>{this.props.favCount}</p>
                        </div>
        let toolTipItems = Object.values(this.props.favBeersDB)
                                 .slice(-4)
                                 .map((item => this.props.favBeers.filter(fav => fav.id === item.id)[0]))
                                 .reverse()
                                 .map(beerObject => (
                                                beerObject !== undefined ? 
                                                <div className={styles.TooltipItem}
                                                     key={beerObject.id}>
                                                    <img src={beerObject.image_url} alt="tooltip pic"/>
                                                    <div className={styles.TooltipItemDescr}>
                                                        <h4>{beerObject.name}</h4>
                                                        <p>{beerObject.tagline}</p>
                                                    </div>
                                                </div> : null
                                            ));
        let viewWidth = document.documentElement.clientWidth;
        return (
            <StatefulToolTip position={position}
                    arrow={arrow}
                    parent={parentDiv}
                    style = {viewWidth < 768 ? {style: {visibility: 'hidden'}, arrowStyle: {}} : undefined}>
                            <div className={styles.Tooltip}>
                                <h4 className={styles.TooltipTitle}>Recently added as favorites:</h4>
                                {toolTipItems}
                            </div>
            </StatefulToolTip>
        );
    }
}

const mapStateToProps = state => {
    return {
        favBeersDB: state.favs.favBeers,
        favBeers: state.beer.favs
    }
}

export default connect(mapStateToProps)(FavCountIndicator);