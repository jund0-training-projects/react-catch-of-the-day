import React from 'react';
import PropTypes from "prop-types";
import firebase from "firebase";
import AddFishForm from "./AddFishForm";
import EditFishForm from "./EditFishForm";
import Login from "./Login";
import base, { firebaseApp } from "../base";

class Inventory extends React.Component {
  static propTypes = {
    fishes: PropTypes.object,
    index: PropTypes.string,
    updateFish: PropTypes.func,
    deleteFish: PropTypes.func,
    loadSampleFishes: PropTypes.func
  };

  state = {
    uid: null,
    owner: null
  }
  // checking for if you're already logged in
  componentDidMount() {
    firebase.auth().onAuthStateChanged( user => {
      if(user) {
        this.authHandler({ user });
      }
    })
  }

  authHandler = async (authData) => {
    console.log(authData);
    // 1.Look up the current store in the firebase database
    // returns promise
    const store = await base.fetch(this.props.storeId, { context: this });
    console.log(store);
    // 2. Claim it if there is no owner
    if (!store.owner) {
      // post data to the firebase database by having the database owner field assigned to logged in user
      // uid is the unique id of the user.
      // post to owner field, creates it if it doesnt exist
      await base.post(`${this.props.storeId}/owner`, {
        data: authData.user.uid
      })
    }
    // 3. Set the state of the inventory component to reflect the current user
    // create state that is local to component
    this.setState({
      uid: authData.user.uid,
      owner: store.owner || authData.user.uid
    })
  };
  authenticate = (provider) => {
    console.log('authenticating... with ', provider);
    // dynamic method of getting appropriate provider
    const authProvider = new firebase.auth[`${provider}AuthProvider`]();
    firebaseApp
      .auth()
      .signInWithPopup(authProvider)
      .then(this.authHandler);
  };

  logout = async () => {
    console.log('Logging Out');
    await firebase.auth().signOut();
    this.setState({uid: null, owner: null});
  };

  render() {
    const logout = <button onClick={this.logout}>Log Out!</button>
    // 1. check if they are logged in
    if (!this.state.uid){
      return <Login authenticate={this.authenticate} />
    }

    // 2. check if they are not the owner of the store
    if (this.state.uid !== this.state.owner){
      return (
        <div>
          <p>Sorry you are not the owner!</p>
          {logout}
        </div>
      )
    }

    // 3 they must be the owner, just render the inventory
    return (
      <div className='inventory'>
        <h2>Inventory</h2>
        {logout}
        {Object.keys(this.props.fishes).map(key =>
          <EditFishForm
            key={key}
            index={key}
            fish={this.props.fishes[key]}
            updateFish={this.props.updateFish}
            deleteFish={this.props.deleteFish}
          />)}
        <AddFishForm addFish={this.props.addFish}/>
        <button onClick={this.props.loadSampleFishes}>
          Load Sample Fishes
        </button>
      </div>
    )
  }
}

export default Inventory;
