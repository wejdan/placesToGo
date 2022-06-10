import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import styled from 'styled-components/native';
import AddToFavBtn from './AddToFavBtn';
import {useNavigation} from '@react-navigation/native';
const CardIcon = styled.View`
  position: absolute;
  right: 10px;
  top: 5px;
  flex-direction: row;
  justify-content: flex-end;
  z-index: 5000;
`;
const FavouriteSlider = ({favouriteList, showFavourite}) => {
  const navigation = useNavigation();

  return (
    <View
      style={{paddingHorizontal: 10, display: showFavourite ? 'flex' : 'none'}}>
      <Text
        style={{
          fontWeight: 'bold',
          fontSize: 12,
          marginBottom: 8,
          paddingHorizontal: 15,
        }}>
        Favourites
      </Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {favouriteList.map(resturent => {
          return (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('DetailsScreen', {
                  restaurant: resturent,
                });
              }}
              style={{width: 110, alignItems: 'center'}}
              key={resturent.id}>
              <CardIcon>
                <AddToFavBtn id={resturent.id} resturent={resturent} />
              </CardIcon>
              <Image
                source={{uri: resturent.photo}}
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
                {resturent.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default React.memo(FavouriteSlider);

const styles = StyleSheet.create({});
