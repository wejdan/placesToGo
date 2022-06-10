import {locations} from '../data/locations';
import Config from 'react-native-config';

export const nameToCords = async name => {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${name}&key=${Config.API_KEY}`;
  console.log(url);
  const results = await fetch(url);
  const data = await results.json();
  if (data.status == 'OK') {
    return data.results;
  } else {
    return null;
  }
};
