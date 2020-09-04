// always import into your component, don't worry it won't reproduce multiple copies
import React from 'react';
import { getFunName } from "../helpers";

// each component is going to be its own class
class StorePicker extends React.Component {

  // constructor() {
  //   // supper will instantiate React.Component
  //   super();
  //   this.goToStore = this.goToStore.bind(this);
  // }

  myInput = React.createRef();

  // goToStore(event) {
  goToStore = event => {
    // 1. Stop the form from submitting
    event.preventDefault();
    // Never manipulate the dom
    // 2. get the text from that input
    // console.log(this) => null because custom method is not a property of instance of StorePicker
    console.log(this.myInput);
    // 3. Change the page to /store/whatever-they-entered
    console.log(this)
  }

  componentDidMount() {
    console.log('Mounted!!')
  }

  render() {
    return (
      <form className='store-selector' onSubmit={this.goToStore}>
        { /*comment example it must exist within the returned element or fragment*/}
        <h2>Please Enter A Store</h2>
        <input type='text'
               ref={this.myInput}
               required
               placeholder='Store Name'
               defaultValue={getFunName()}/>
        <button type='submit'>Vist Store &rarr;</button>
      </form>
    )
  }
}

export default StorePicker;
