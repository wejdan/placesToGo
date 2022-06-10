const functions = require('firebase-functions');
const {mocks} = require('./data/restaurants');
const locations = require('./data/locations');
const url = require('url');
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info('Hello logs!', {structuredData: true});
  response.send('Hello from Firebase!');
});
exports.nameToCords = functions.https.onRequest((request, response) => {
  const {city, mock} = url.parse(request.url, true).query;

  if (locations[city.toLocaleLowerCase()]) {
    response.json(locations[city.toLocaleLowerCase()]);
  } else {
    response.send('not found');
  }
});

exports.restaurantsRequest = functions.https.onRequest((request, response) => {
  let location = request.url.split('/');
  location = location[location.length - 1];
  console.log(location);
  const mock = mocks[location];
  if (!mock) {
    response.send('not found');
  }

  response.send(mock);
});
