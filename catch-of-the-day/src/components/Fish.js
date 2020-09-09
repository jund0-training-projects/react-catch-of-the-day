import React from 'react';
import PropTypes from 'prop-types';
import { formatPrice } from "../helpers";

class Fish extends React.Component {
  // declared static property because we clarign proptypes for all the fish
  // so it not necessart to duplicate it because its going to be exactly the same
  static propTypes = {
    details: PropTypes.shape({
      image: PropTypes.string,
      name: PropTypes.string,
      desc: PropTypes.string,
      status: PropTypes.string,
      price: PropTypes.number,
    }),
    addToOrder: PropTypes.func
  }

  // handleClick = () => {
  //   this.props.addToOrder(this.props.index);
  // };

  render() {
    // const image = this.props.details.image;
    // const name = this.props.details.name;
    const { image, name, price, desc, status } = this.props.details;
    const isAvailable = status === 'available';
    return (
      // <div className='single-fish'>&#128031;</div>
      <li className="menu-fish">
        <img src={image} alt="" />
        <h3 className="fish-name">
          {name}
          <span className="price">{formatPrice(price)}</span>
        </h3>
        <p>{desc}</p>
        <button disabled={!isAvailable} onClick={() => this.props.addToOrder(this.props.index)}>{isAvailable ? 'Add To Order' : 'Sold Out!'} </button>
      </li>
    )
  }
}

export default Fish;
