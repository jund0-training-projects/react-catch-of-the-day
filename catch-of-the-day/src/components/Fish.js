import React from 'react';
import { formatPrice } from "../helpers";

class Fish extends React.Component {
  render() {
    // const image = this.props.details.image;
    // const name = this.props.details.name;
    const { image, name, price, desc, availability } = this.props.details;
    return (
      // <div className='single-fish'>&#128031;</div>
      <li className="menu-fish">
        <img src={image} alt="" />
        <h3 className="fish-name">
          {name}
          <span className="price">{formatPrice(price)}</span>
        </h3>
        <p>{desc}</p>
        <button>Add To Cart </button>
      </li>
    )
  }
}

export default Fish;
