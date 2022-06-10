import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, {useCallback} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import styled from 'styled-components/native';
import AddToFavBtn from '../componenets/AddToFavBtn';
import ResturentItem from '../componenets/Card';
import Spacer from '../componenets/Spacer';

const CardIcon = styled.View`
  position: absolute;
  right: 20px;
  top: 20px;
  flex-direction: row;
  justify-content: flex-end;
  z-index: 9999;
`;
const FavouriteScreen = ({navigation}) => {
  const favourite = useSelector(store => store.favourite.list);
  const favouriteList = [];
  for (var key in favourite) {
    favouriteList.push(favourite[key]);
  }
  const keyExtractor = useCallback(item => item.name, []);

  const _renderItem = useCallback(({item}) => {
    return (
      <View>
        <TouchableOpacity
          onPress={e => {
            navigation.navigate('DetailsScreen', {
              restaurant: item,
            });
          }}>
          <Spacer pos="bottom" size="large">
            <ResturentItem restaurant={item} />
          </Spacer>
        </TouchableOpacity>
        <CardIcon>
          <AddToFavBtn id={item.placeId} restaurant={item} />
        </CardIcon>
      </View>
    );
  }, []);

  if (favouriteList.length == 0) {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>No favourites yet</Text>
      </View>
    );
  }
  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      keyExtractor={keyExtractor}
      data={favouriteList}
      renderItem={_renderItem}
      contentContainerStyle={{padding: 16}}
      removeClippedSubviews={true} // Unmount components when outside of window
      initialNumToRender={5}
      windowSize={7} // Reduce the window size
    />
  );
};

export default FavouriteScreen;

const styles = StyleSheet.create({});
