import React from 'react';
import { formatPrice } from "../helpers";
// introducing animations
import { TransitionGroup, CSSTransition } from "react-transition-group";
import PropTypes from "prop-types";

class Order extends React.Component {

  static propTypes = {
    fishes: PropTypes.object,
    order: PropTypes.object,
    removeFromOrder: PropTypes.func,
  };

  // as render function becomes to complicated its best practce
  // to create render functions to make the render function more readible.
  renderOrder = key => {
    const fish = this.props.fishes[key];
    // gets the quantity of the ordered fish
    const count = this.props.order[key];
    // gets the status of the ordered fish
    const isAvailable = fish && fish.status === 'available';

    const transitionOptions = {
      classNames: "order",
      key,
      timeout: {
        enter:500,
        exit:500
      }
    };
    // with null it will not render fish to make sure fish is loaded
    // before we continue.
    if(!fish) return null

    if(!isAvailable) {
      return (
        <CSSTransition {...transitionOptions}>
          <li key={key}>
            Sorry, {fish ? fish.name : fish} is not available.
          </li>);
        </CSSTransition>
      )
    }
    return (
      <CSSTransition {...transitionOptions}>
        <li key={key}>
          <span>
            <TransitionGroup component="span" className="count">
              <CSSTransition {...transitionOptions}>
                <span>{count}</span>
              </CSSTransition>
            </TransitionGroup>
            lbs {fish.name}
            {formatPrice(count * fish.price)}
            <button onClick={() => this.props.removeFromOrder(key)}>
              &times;
            </button>
          </span>
        </li>
      </CSSTransition>
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
        <TransitionGroup component="ul" className='order'>
          {/*{orderIds.map(key => <li>{key}</li>)}*/}
          {orderIds.map(this.renderOrder)}
        </TransitionGroup>
        <div className='total'>
          Total:
          <strong>{formatPrice(total)}</strong>
        </div>
      </div>
    )
  }
}

export default Order;
