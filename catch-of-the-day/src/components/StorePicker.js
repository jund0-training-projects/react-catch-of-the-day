// always import into your component, don't worry it won't reproduce multiple copies
import React from 'react';

// each component is going to be its own class
class StorePicker extends React.Component {
  render() {
    return (
      <React.Fragment>
        <h1>hello</h1>
        { /*comment example it must exist within the returned element or fragment*/}
        <form className='store-selector'>
          <h2>Please Enter A Store</h2>
        </form>
      </React.Fragment>
    )
  }
}

export default StorePicker;
