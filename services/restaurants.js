import {mocks, mockImages} from '../data/restaurants';
import camelize from 'camelize';
import {nameToCords} from './locations';
//const API_KEY = 'AIzaSyC9qE9qZ_w7m3nlM-07EO-11N3934tbbb8';
import Config from 'react-native-config';
export const placesTypes = [
  'airport',
  'atm',
  'bakery',
  'bank',
  'beauty_salon',
  'book_store',
  'cafe',
  'convenience_store',
  'dentist',
  'doctor',
  'gym',
  'hair_care',
  'hospital',
  'laundry',
  'library',
  'mosque',
  'park',
  'pet_store',
  'pharmacy',
  'primary_school',
  'restaurant',
  'school',
  'shoe_store',
  'shopping_mall',
  'supermarket',
  'university',
  'zoo',
];
export const nearbyRestaurents = async ({lat, lng}, type) => {
  const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=15000&type=${type}&key=${Config.API_KEY}`;
  console.log(url);
  const results = await fetch(url);
  const data = await results.json();

  return data;
};
export const getRestaurentPhoto = async photo => {
  const url = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${photo}&key=${Config.API_KEY}`;

  const results = await fetch(url);

  return results.url;
};
export const searchForCords = async city => {
  const results = await nameToCords(city);
  if (!results) {
    return null;
  }
  const gio = results[0].geometry.location;

  return {...gio, viewport: results[0].geometry.viewport};
};
export const restaurantsRequest = (location = '37.7749295,-122.4194155') => {
  return new Promise((reslove, reject) => {
    const mock = mocks[location];
    if (!mock) {
      reject('not found');
    }
    reslove(mock);
  });
};

export const restaurantsTransform = async ({results = []}) => {
  const mappedResults = [];
  for (let index = 0; index < results.length; index++) {
    const restaurant = results[index];
    let img =
      'https://images.assetsdelivery.com/compings_v2/yehorlisnyi/yehorlisnyi2104/yehorlisnyi210400016.jpg';
    if (restaurant.photos) {
      const res = await getRestaurentPhoto(
        restaurant.photos[0].photo_reference,
      );

      //console.log('img', res);
      img = res;
    }
    mappedResults.push({
      ...restaurant,
      photo: img,
      isOpenNow: restaurant.opening_hours && restaurant.opening_hours.open_now,
      isClosedTemporarily: restaurant.business_status == 'CLOSED_TEMPORARILY',
    });
    //
  }

  return camelize(mappedResults);
};
