import React from 'react';

class EditFishForm extends React.Component {

  handleChange = event => {
    // current Target is the what is responsible for triggered event.
    // the name is associated to the input name, which is why each input needs a name
    console.log(event.currentTarget.name);
    // value is the hoped changed value
    console.log(event.currentTarget.value);

    // update that fish
    // 1. Take a copy of the current fish
    // leverage es6 computed property name because
    // the function doesn't know which fish property to update
    const updatedFish = {
      ...this.props.fish,
      [event.currentTarget.name] : event.currentTarget.value
    };

    console.log(updatedFish);
    this.props.updateFish(this.props.index, updatedFish);

  }

  render() {
    return (
      <div className="fish-edit">
        <input name="name"  type="text" onChange={this.handleChange} value={this.props.fish.name}/>
        <input name="price"  type="text" onChange={this.handleChange} value={this.props.fish.price} />
        <select name="status"  type="text" onChange={this.handleChange} value={this.props.fish.status} >
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold Out!</option>
        </select>
        <textarea name="desc" onChange={this.handleChange} value={this.props.fish.desc} ></textarea>
        <input name="image"  type="text" onChange={this.handleChange} value={this.props.fish.image} />
        <button onClick={() => this.props.deleteFish(this.props.index)}> Delete Fish</button>
      </div>
    );
  }
}

export default EditFishForm;
