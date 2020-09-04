import React from 'react';
import Header from './Header';
import Inventory from './Inventory';
import Order from './Order';
import sampleFishes from '../sample-fishes';

class App extends React.Component {
  // where we need to set initial state
  // use contructor or property

  state = {
    fishes: {},
    order: {}
  }
  // need to create secondary method to add fish to state
  addFish = fish => {
    console.log("Adding a fish!");
    // in order to update state, you have to use react state api
    // 1. Take a copy of the existing state
    const fishes = { ...this.state.fishes };
    // 2. Add our new fish to that fishes
    fishes[`fish${Date.now()}`] = fish;
    // 3. Set the new fishes object to state
    this.setState({
      fishes: fishes
    });
  };

  loadSampleFishes = () => {
    this.setState({fishes: sampleFishes});
  };

  render() {
    return (
      <div className='catch-of-the-day'>
        <div className='menu'>
          <Header tagline="Fresh Seafood Market"/>
        </div>
        <Order />
        <Inventory addFish={this.addFish} loadSampleFishes={this.loadSampleFishes}/>
      </div>
    )
  }
}

export default App;
