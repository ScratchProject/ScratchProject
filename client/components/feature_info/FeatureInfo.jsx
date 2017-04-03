import React, { Component } from 'react';

class FeatureInfo extends Component {
  // This component renders the red and green bars that belong to each feature/project. 
  // The 2 handles changes grab the data from the input fields.
  // Handle submit sends the input data back to App.jsx where we add the new info into the database,
  // and render them on the screen

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      deadline: '',
      unit: ''
    };

    this.handleChange = this.handleTitleChange.bind(this);
    this.handleChange = this.handleDeadlineChange.bind(this);
    this.handleChange = this.handleUnitChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleTitleChange(event) {
    event.preventDefault();
    this.setState({ title: event.target.value });
  }

  handleDeadlineChange(event) {
    event.preventDefault();
    this.setState({ deadline: event.target.value });
  }

  handleUnitChange(event) {
    event.preventDefault();
    console.log("is the unit coming in?");
    console.log(event.target.value);
    this.setState({ unit: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.addFeature(this.state.title, this.state.deadline, this.state.unit);

    this.setState({
      title: '',
      deadline: '',
      unit: ''
    })
  }

  render() {

    return (
      <form className="feature-form" onSubmit={this.handleSubmit}>
        <div className="title-container">
          <input type="text" id='tit' className="feature-title" placeholder="Project Name" value={this.state.title} onChange={(a) => this.handleTitleChange(a)} />
        </div>
        <div className="deadline-container">
          <input type="text" id='dine' className="deadline-num" placeholder="Duration" value={this.state.deadline} onChange={(a) => this.handleDeadlineChange(a)} />
          <select defaultValue="Minutes" className="deadline-unit" onChange={(a) => this.handleUnitChange(a)} >
            <option value="Minutes">Minutes</option>
            <option value="Hours">Hours</option>
            <option value="Days">Days</option>
          </select>
        </div>
        <button type='submit' id="add-feature">Add Project</button>
      </form>
    );
  }
}

export default FeatureInfo;
