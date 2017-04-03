const Feature = require('../models').Feature;
const FeatureItem = require('../models').FeatureItem;

module.exports = {

  // Creates instance of a project.
  create(req, res) {
    console.log("we are in the features create function");
    console.log(req.body.title);
    console.log(req.body.duration);
    return Feature
      .create({
        title: req.body.title,
        duration: req.body.duration
      })
      .then(feature => res.status(201).send(feature))
      .catch(error => res.status(400).send(error));
    // .catch(error => res.status(400).send(error));
  },

  // Retrieves all current projects in a database.
  list(req, res) {
    console.log('features list func')
    return Feature
      .findAll({
        include: [{
          model: FeatureItem,
          as: 'featureItems'
        }],
      })
      .then(features => res.status(200).send(features))
      .catch(error => res.status(400).send(error));
  },

  // Find a single feature based on its ID
  retrieve(req, res) {
    return Feature
      .findById(req.params.featureId, {
        include: [{
          model: FeatureItem,
          as: 'featureItems',
        }],
      })
      .then(feature => {
        if (!feature) {
          return res.status(404).send({
            message: 'Feature Not Found',
          });
        }
        return res.status(200).send(feature);
      })
      .catch(error => res.status(400).send(error));
  },

  // Update a single feature
  update(req, res) {
    return Feature
      .findById(req.params.featureId, {
        include: [{
          model: FeatureItem,
          as: 'featureItems',
        }],
      })
      .then(feature => {
        if (!feature) {
          return res.status(404).send({
            message: 'Feature Not Found',
          });
        }
        return feature
          .update({
            title: req.body.title || feature.title,
          })
          .then(() => res.status(200).send(feature))  // Send back the updated feature.
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },

  // Delete a single feature based on ID
  destroy(req, res) {
    return Feature
      .findById(req.params.featureId)
      .then(feature => {
        if (!feature) {
          return res.status(400).send({
            message: 'feature Not Found',
          });
        }
        return feature
          .destroy()
          .then(() => res.status(200).send({ message: 'Feature deleted' }))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },
};
