import React from 'react';
import { formatPrice } from "../helpers";

class Order extends React.Component {
  // as render function becomes to complicated its best practce
  // to create render functions to make the render function more readible.
  renderOrder = key => {
    const fish = this.props.fishes[key];
    // gets the quantity of the ordered fish
    const count = this.props.order[key];
    // gets the status of the ordered fish
    const isAvailable = fish && fish.status === 'available';
    // with null it will not render fish to make sure fish is loaded
    // before we continue.
    if(!fish) return null

    if(!isAvailable) {
      return <li key={key}>Sorry, {fish ? fish.name : fish} is not available.</li>
    }
    return (
      <li key={key}>
        {count} lbs {fish.name}
        {formatPrice(count * fish.price)}
      </li>
    );
  }
  render() {
    const orderIds = Object.keys(this.props.order);
    const total = orderIds.reduce((prevTotal, key) => {
      // get the ordered fish
      const fish = this.props.fishes[key];
      // gets the quantity of the ordered fish
      const count = this.props.order[key];
      // gets the status of the ordered fish
      const isAvailable = fish && fish.status === 'available';

      if(isAvailable) {
        return prevTotal + count * fish.price;
      }
      return prevTotal;
    }, 0);

    return (
      <div className='order-wrap'>
        <h2>Order</h2>
        <ul className='order'>
          {/*{orderIds.map(key => <li>{key}</li>)}*/}
          {orderIds.map(this.renderOrder)}
        </ul>
        <div className='total'>
          <strong>{formatPrice(total)}</strong>
        </div>
      </div>
    )
  }
}

export default Order;
