import {
  View,
  Text,
  ActivityIndicator,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import WebView from 'react-native-webview';
import {getRestaurentPhoto} from '../services/restaurants';
const FavouriteItem = ({restaurant}) => {
  const [loadingImg, setLoadingImg] = useState(true);
  const [photo, setPhoto] = useState('');

  useEffect(() => {
    if (restaurant.photos) {
      const img = getRestaurentPhoto(restaurant.photos[0].photoReference)
        .then(res => {
          //console.log('img', res);
          setPhoto(res);
          setLoadingImg(false);
        })
        .catch(err => {
          console.log('err,', err);
          setLoadingImg(false);
        });
    } else {
      setLoadingImg(false);
    }
  }, [restaurant]);
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('DetailsScreen', {
          restaurant: restaurant,
        });
      }}
      style={{width: 110, alignItems: 'center'}}
      key={resturent.id}>
      <CardIcon>
        <AddToFavBtn id={restaurant.id} resturent={restaurant} />
      </CardIcon>

      <Image
        source={{uri: restaurant.photos[0]}}
        style={{width: 100, height: 80, borderRadius: 10}}
      />
      <Text
        numberOfLines={3}
        style={{
          textAlign: 'center',
          fontSize: 12,
          marginTop: 4,
          maxWidth: 100,
        }}>
        {restaurant.name}
      </Text>
    </TouchableOpacity>
  );
};

export default FavouriteItem;
