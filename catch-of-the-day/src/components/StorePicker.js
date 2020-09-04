// always import into your component, don't worry it won't reproduce multiple copies
import React from 'react';
import { getFunName } from "../helpers";

// each component is going to be its own class
class StorePicker extends React.Component {
  render() {
    return (
      <form className='store-selector'>
        { /*comment example it must exist within the returned element or fragment*/}
        <h2>Please Enter A Store</h2>
        <input type='text' required placeholder='Store Name' defaultValue={getFunName()}/>
        <button type='submit'>Vist Store &rarr;</button>
      </form>
    )
  }
}

export default StorePicker;
