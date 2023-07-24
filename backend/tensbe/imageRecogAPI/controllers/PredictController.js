const tf = require('@tensorflow/tfjs-node');
const fs = require('fs');
var path = require('path');

let model; // Initialize the variable to hold the loaded model

// Load the model once when the server starts
(async () => {
  try {
    console.log('Loading model...');
    model = await tf.node.loadSavedModel(path.join(__dirname, '..', 'SavedModel2'));
    console.log('Model loaded successfully!');
  } catch (error) {
    console.error('Error loading the model:', error);
  }
})();

exports.makePredictions = async (req, res, next) => {
  const imagePath = `./public/images/${req && req['filename']}`;
  try {
    // Read the image data
    const image = fs.readFileSync(imagePath);
    const tensor = tf.node.decodeImage(image);
    const resizedImage = tensor.resizeNearestNeighbor([224, 224]);
    const batchedImage = resizedImage.expandDims(0);
    const input = batchedImage.toFloat().div(tf.scalar(255));

    // Perform prediction using the loaded model
    const highestPrediction = await loadModel(input);

    // Output the highest prediction
    res.status(200).json(highestPrediction);

    // Delete the image file after the prediction is done
    fs.unlinkSync(imagePath, (error) => {
      if (error) {
        console.error(error);
      }
    });
  } catch (error) {
    console.error('Error during prediction:', error);
    res.status(500).json({ message: "Internal Server Error!" });
  }
};

const loadModel = async (img) => {
  const output = {};
  // Load class names
  const classesFilePath = path.join(__dirname, '..', 'SavedModel2', 'class_name.txt');
  const classesData = fs.readFileSync(classesFilePath, 'utf8');
  const classes = classesData.trim().split('\n');

  // Perform prediction using the loaded model
  let predictions = await model.predict(img).data();
  const probabilities = Array.from(predictions).map(prob => (prob * 10));

  // Find the index of the highest probability
  const maxProbabilityIndex = probabilities.indexOf(Math.max(...probabilities));

  const highestPrediction = {
    class: classes[maxProbabilityIndex],
    probability: parseInt(probabilities[maxProbabilityIndex]),
  };

  return highestPrediction;
};