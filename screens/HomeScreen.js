import {View, Text, StyleSheet, FlatList, ScrollView} from 'react-native';
import React, {useState, useEffect, useCallback} from 'react';
import ResturentItem from '../componenets/Card';
import {Searchbar} from 'react-native-paper';
import {searchForRestaurants} from '../utils/services';
import {nearbyRestaurents} from '../services/restaurants';
import LoadingOverlay from '../componenets/LoadingOverlay';
import {placesTypes} from '../services/restaurants';
import Spacer from '../componenets/Spacer';
import {
  retrieveRestaurants,
  searchRestaurants,
  setLocation,
  setSearchQuery,
  setType,
} from '../store/actions/RestaurantsActions';
import FavouriteSlider from '../componenets/FavouriteSlider';
import {useSelector, useDispatch} from 'react-redux';
import LottieView from 'lottie-react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import styled from 'styled-components/native';
import AddToFavBtn from '../componenets/AddToFavBtn';
import FadeInView from '../componenets/FadeInView';
import Geolocation from '@react-native-community/geolocation';
import {
  Button,
  Paragraph,
  Dialog,
  Portal,
  Provider,
  RadioButton,
} from 'react-native-paper';
import {panGestureHandlerCustomNativeProps} from 'react-native-gesture-handler/lib/typescript/handlers/PanGestureHandler';
const CardIcon = styled.View`
  position: absolute;
  right: 20px;
  top: 20px;
  flex-direction: row;
  justify-content: flex-end;
  z-index: 9999;
`;
const HomeScreen = ({navigation}) => {
  const [visible, setVisible] = React.useState(false);
  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  const dispatch = useDispatch();
  const restaurantsList = useSelector(
    store => store.restaurants.restaurantsList,
  );
  const type = useSelector(store => store.restaurants.type);
  const [checked, setChecked] = React.useState(type);

  const loading = useSelector(store => store.restaurants.isLoading);
  const initlized = useSelector(store => store.restaurants.initlized);
  const userLocation = useSelector(store => store.restaurants.location);
  const favourite = useSelector(store => store.favourite.list);
  const favouriteList = [];
  for (var key in favourite) {
    favouriteList.push(favourite[key]);
  }

  const [coords, setCoords] = useState(null);
  const getLocation = async () => {
    Geolocation.getCurrentPosition(info => {
      console.log(info);
      setCoords({
        latitude: userLocation.lat,
        longitude: userLocation.lng,
      });
    });

    console.log('Location permission granted');
  };

  useEffect(() => {
    if (userLocation) {
      dispatch(retrieveRestaurants(userLocation, type));
    }
  }, [userLocation, type]);
  const searchQuery = useSelector(store => store.restaurants.searchQuery);
  const onChangeSearch = query => dispatch(setSearchQuery(query));
  const keyExtractor = useCallback(item => item.placeId, []);

  const handleSearch = () => {
    //setLoading(true);
    if (searchQuery.length > 0) {
      dispatch(searchRestaurants(searchQuery, type));
    } else {
      Geolocation.getCurrentPosition(info => {
        console.log(info);
        const Currentlocation = {
          lat: info.coords.latitude,
          lng: info.coords.longitude,
        };

        if (
          Currentlocation.lat != userLocation.lat ||
          Currentlocation.lng != userLocation.lng
        ) {
          dispatch(setLocation(Currentlocation));
        }
      });
    }
  };

  const _renderItem = useCallback(({item}) => {
    return (
      <FadeInView>
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
      </FadeInView>
    );
  }, []);

  return (
    <Provider>
      <View style={styles.container}>
        <View style={{padding: 16}}>
          <Searchbar
            icon="cog"
            placeholder="Search"
            onChangeText={onChangeSearch}
            value={searchQuery}
            onSubmitEditing={handleSearch}
            onIconPress={showDialog}
          />
        </View>

        <View>
          <Portal>
            <Dialog visible={visible} onDismiss={hideDialog}>
              <ScrollView>
                <Dialog.Title>Serach For</Dialog.Title>
                <Dialog.Content>
                  <RadioButton.Group
                    onValueChange={newValue => setChecked(newValue)}
                    value={checked}>
                    {placesTypes.map(type => {
                      return (
                        <View key={type} style={styles.item}>
                          <Text style={styles.itemTitle}>
                            {type.replace('_', ' ')}
                          </Text>
                          <RadioButton value={type} />
                        </View>
                      );
                    })}
                  </RadioButton.Group>
                </Dialog.Content>
                <Dialog.Actions>
                  <Button
                    onPress={() => {
                      dispatch(setType(checked));
                      hideDialog();
                    }}>
                    Done
                  </Button>
                </Dialog.Actions>
              </ScrollView>
            </Dialog>
          </Portal>
        </View>

        {loading || initlized == false ? (
          <View
            style={{
              height: '100%',
              width: '100%',
              backgroundColor: '#eaeaea',
            }}>
            <LottieView
              source={require('../assets/98745-search.json')}
              autoPlay
              loop
              resizeMode="contain"
            />
          </View>
        ) : restaurantsList.length == 0 && searchQuery.length > 0 ? (
          <View
            style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
            <Text>No Places where found</Text>
          </View>
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            keyExtractor={keyExtractor}
            data={restaurantsList}
            renderItem={_renderItem}
            contentContainerStyle={{padding: 16}}
            removeClippedSubviews={true} // Unmount components when outside of window
            initialNumToRender={5}
            windowSize={7} // Reduce the window size
          />
        )}
      </View>
    </Provider>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F2',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 15,
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  itemTitle: {
    color: 'black',
  },
  highlight: {
    fontWeight: '700',
  },
});
