import {View, Text, ActivityIndicator, Image} from 'react-native';
import React, {useState, useEffect} from 'react';
import WebView from 'react-native-webview';
import {getRestaurentPhoto} from '../services/restaurants';
const CompactCard = ({restaurant, inMap}) => {
  const [loadingImg, setLoadingImg] = useState(true);
  const [photo, setPhoto] = useState('');
  const ImgComponent = inMap ? WebView : Image;
  /*useEffect(() => {
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
  }, [restaurant]);*/
  return (
    <View style={{maxWidth: 120, padding: 10, alignItems: 'center'}}>
      <View
        style={{
          borderRadius: 10,
          overflow: 'hidden',
          width: 120,
          height: 100,
        }}>
        <WebView
          source={{
            uri: restaurant.photo,
          }}
        />
      </View>
      <Text style={{textAlign: 'center'}} numberOfLines={3}>
        {restaurant.name}
      </Text>
    </View>
  );
};

export default CompactCard;
