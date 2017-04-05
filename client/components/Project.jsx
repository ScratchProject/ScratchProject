import React, { Component } from 'react';
import FeaturesCntr from './feature/FeaturesCntr.jsx';
import AddFeature from './add_feature/AddFeature.jsx';
import CheckpointCntr from './checkpoint/CheckpointCntr.jsx';
import axios from 'axios';

// This array is constant. We add and remove from it and then use it to set state.
// By doing this, we do not have to create a new variable each time we want to set state.
let featuresList = [];

export default class Project extends Component {
  constructor(props) {
    super(props);
    this.state = {
      features: featuresList
    };
    this.addFeature = this.addFeature.bind(this);
    this.removeFeature = this.removeFeature.bind(this);
  }

  componentDidMount() {
    // retieve all the features from the database and load the initial state
    // this only runs on the first load of the page
    axios
      .get('/api/features')
      .then((allFeatures) => {

        // calculates the total amount of time since the project was created and renders the correct time (red circle)
        for (let i = 0; i < allFeatures.data.length; i += 1) {
          let createdTime = Date.parse(allFeatures.data[i].createdAt);
          let currentTime = Date.now();
          let elapsed = (currentTime - createdTime) / 1000; // converts ms to secs
          allFeatures.data[i].elapsed = elapsed > allFeatures.data[i].duration ? allFeatures.data[i].duration : elapsed; 
        }

        featuresList = allFeatures.data;

        this.setState({
          features: featuresList,
        })
      })
  }

  // adds a new feature(project) to the DOM as well as pushes it to the database
  addFeature(title, duration) {
    let feature = {
      title: title,
      duration: Number(duration)
    }

    axios
      .post('/api/features', feature)
      .then((newFeature) => {

        featuresList.push(newFeature.data);
        this.setState({ features: featuresList }, () => {
          console.log('New Feature Added');
          console.log('FEATURES STATE', this.state.features);
        })
      })
  }

  // small problem with this is that the sterinterval keeps going even after the remove, doesnt cause any serious errors but we do get a warning message in the console of the browser
  // removes a feature(project) from the DOM as well as remove it from the database
  removeFeature(index) {
    // removes the feature from the global array Features List
    const deletedFeat = featuresList.splice(index, 1);
    // sends a request to the server to remove the feature by ID
    axios
      .delete(`/api/features/${deletedFeat[0].id}`)
      .then(() => {
        this.setState({
          features: featuresList
        })
      })
  }


  render() {
    
    const addFeature = this.addFeature;
    const featuresArray = this.state.features;
    const removeFeature = this.removeFeature;

    return (
      <div id="app-container" style={{ textAlign: 'center' }}>
        <CheckpointCntr addFeature={addFeature} />
        <FeaturesCntr featuresArray={featuresArray} removeFeature={removeFeature} />
      </div>
    );
  }
}

