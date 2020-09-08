import React from 'react';
import Header from './Header';
import Inventory from './Inventory';
import Order from './Order';
import Fish from './Fish';
import sampleFishes from '../sample-fishes';
// importing fire base
import base from '../base';

class App extends React.Component {
  // where we need to set initial state
  // use contructor or property

  state = {
    fishes: {},
    order: {}
  }
  // lifecycle method
  componentDidMount() {
    // not the same as input refs, more as a ref to data within a database.
    // reference App Comopnent's props from react router
    const { params } = this.props.match;
    // first reinstate our local Storage
    // parse returns string to object
    const localStorageRef = localStorage.getItem(params.storedId);
    if(localStorageRef) {
      this.setState({ order: JSON.parse(localStorageRef) });
    }
    // reference to the store name and fishes state
    this.ref = base.syncState(`${params.storedId}/fishes`, {
      context: this,
      state: 'fishes'
    });
  }

  // lifecycle method
  // method for handling updates to component
  componentDidUpdate() {
    console.log(this.state.order);
    // with localstorage api need value needs to be a string
    localStorage.setItem(this.props.match.params.storedId, JSON.stringify(this.state.order));
    // console.log('Component Did Update')
  }

  // lifecycle method
  componentWillUnmount() {
    // why we store ref so we can remove it
    // it will un mount the app component and clean up any memory leak issues.
    base.removeBinding(this.ref);
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

  // editing existing fish
  updateFish = (key, updatedFish) => {
    console.log('app updateFish');
    console.log(key);
    console.log(updatedFish);
    // 1. take a copy of the current state
    const fishes = { ...this.state.fishes };
    // 2. Update that state
    fishes[key] = updatedFish;
    console.log(fishes);
    // 3. Set that to state
    this.setState( {
      fishes: fishes
    });
  }

  deleteFish = (key) => {
    // 1. take a copy of the current state
    const fishes = { ...this.state.fishes };
    // 2. delete fish
    fishes[key] = null;
    // 3. set that to state
    this.setState({
      fishes : fishes
    });

  };

  loadSampleFishes = () => {
    this.setState({fishes: sampleFishes});
  };

  addToOrder = (key) => {
    // 1. take a copy of state
    const order = { ...this.state.order }
    // 2. either add to order, or update the number in our order
    order[key] = order[key] + 1 || 1;
    // 3. Call setState to update our state object
    this.setState({
      order: order
    });
  };

  removeFromOrder = (key) => {
    // 1. take a copy of state
    const order = { ...this.state.order }
    // 2. delete order
    // order[key] = null;
    // using delete because not mirroring to firebease
    delete order[key];
    // reinstate back into state
    // 3. Call setState to update our state object
    this.setState({
      order: order
    });
  };

  render() {
    return (
      <div className='catch-of-the-day'>
        <div className='menu'>
          <Header tagline="Fresh Seafood Market"/>
          {/*to pass details of fish we pass it through the Fish details prop*/}
          <ul className='fishes'>
            {Object.keys(this.state.fishes).map(key => (
                <Fish
                  key={key}
                  index={key}
                  details={this.state.fishes[key]}
                  addToOrder={this.addToOrder}
                />
              ))}
          </ul>
        </div>
        {/*alternate method for passing the entire state as a prop*/}
        {/*<Order { ...this.state } />*/}
        <Order fishes={this.state.fishes}
               order={this.state.order}
               removeFromOrder={this.removeFromOrder}
        />
        <Inventory addFish={this.addFish}
                   updateFish={this.updateFish}
                   deleteFish={this.deleteFish}
                   loadSampleFishes={this.loadSampleFishes}
                   fishes={this.state.fishes}
        />
      </div>
    )
  }
}

export default App;
