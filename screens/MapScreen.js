import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import MapView, {Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {Dimensions} from 'react-native';
import {Searchbar} from 'react-native-paper';
import {useFocusEffect} from '@react-navigation/native';
import {
  retrieveRestaurants,
  searchRestaurants,
  setSearchQuery,
} from '../store/actions/RestaurantsActions';
import {useSelector, useDispatch} from 'react-redux';
import {LoadingOverlay} from '../componenets/LoadingOverlay';
import AddToFavBtn from '../componenets/AddToFavBtn';
import styled from 'styled-components/native';
import CompactCard from '../componenets/CompactCard';
import {setLocation} from '../store/actions/RestaurantsActions';
const CardIcon = styled.View`
  position: absolute;
  right: 10px;
  top: 20px;
  flex-direction: row;
  justify-content: flex-end;
  z-index: 5000;
`;
let {width, height} = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 5; //Increase or decrease the zoom level dynamically
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const MapScreen = ({route, navigation}) => {
  const _map = useRef(null);

  const dispatch = useDispatch();
  const [latDelta, setLatDelta] = useState(0);
  const searchQuery = useSelector(store => store.restaurants.searchQuery);
  const initlized = useSelector(store => store.restaurants.initlized);
  const userLocation = useSelector(store => store.restaurants.location);
  const type = useSelector(store => store.restaurants.type);

  const restaurantsList = useSelector(
    store => store.restaurants.restaurantsList,
  );
  const location = useSelector(store => store.restaurants.location);
  const loading = useSelector(store => store.restaurants.isLoading);
  const favouriteList = useSelector(store => store.favourite.list);
  const markers = useRef({});
  const onChangeSearch = query => dispatch(setSearchQuery(query));
  useEffect(() => {
    //const northeastLat = location.viewport.northeast.lat;
    //const southwestLat = location.viewport.southwest.lat;

    //setLatDelta(northeastLat - southwestLat);

    let region = {
      latitude: location.lat,
      longitude: location.lng,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.05,
    };
    console.log('markers,', markers);

    _map.current.animateToRegion(region, 1000);
  }, [location]);

  useFocusEffect(() => {
    for (const key in markers.current) {
      markers.current[key]?.hideCallout();
    }
  });

  const handleSearch = () => {
    //setLoading(true);
    for (const key in markers.current) {
      markers.current[key]?.hideCallout();
    }

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
  useEffect(() => {
    if (restaurantsList.length == 0 && initlized) {
      alert('no places were found');
    }
  }, [restaurantsList]);
  if (location == null) {
    return <LoadingOverlay message="Location is not set yet" />;
  }
  return (
    <View style={styles.container}>
      {loading && (
        <View
          style={{
            position: 'absolute',
            top: 0,
            width: '100%',
            height: '100%',
            zIndex: 4000,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(255,255,255,0.30)',
          }}>
          <ActivityIndicator />
        </View>
      )}
      <View style={styles.searchContainer}>
        <Searchbar
          icon="map-outline"
          placeholder="Search"
          onChangeText={onChangeSearch}
          value={searchQuery}
          style={{width: '90%', alignSelf: 'center'}}
          onSubmitEditing={handleSearch}
        />
      </View>

      <MapView
        style={styles.map}
        ref={_map}
        initialRegion={{
          latitude: location.lat,
          longitude: location.lng,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.02,
        }}>
        {restaurantsList.map((restaurant, index) => {
          let img =
            'https://archive.org/download/no-photo-available/no-photo-available.png';

          return (
            <Marker
              key={index}
              title={restaurant.name}
              ref={ref => {
                markers.current[restaurant.placeId] = ref;
              }}
              coordinate={{
                latitude: restaurant.geometry.location.lat,
                longitude: restaurant.geometry.location.lng,
              }}>
              <MapView.Callout
                onPress={() => {
                  // markers.current[restaurant.placeId].hideCallout();
                  navigation.navigate('DetailsScreen', {
                    restaurant: restaurant,
                  });
                }}
                key={index}
                style={{backgroundColor: '#ffffff'}}>
                <CardIcon>
                  <AddToFavBtn
                    id={restaurant.placeId}
                    restaurant={restaurant}
                  />
                </CardIcon>
                <CompactCard inMap={true} restaurant={restaurant} />
              </MapView.Callout>
            </Marker>
          );
        })}
      </MapView>
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center',
  },
  map: {
    position: 'relative',
    width: '100%',
    height: '100%',
  },
  btn: {
    position: 'absolute',
    bottom: 10,

    left: '50%',
    marginLeft: -50,

    width: 100,
  },
  highlight: {
    fontWeight: '700',
  },
  container: {
    position: 'relative',
    flex: 1,
  },
  searchContainer: {
    position: 'absolute',
    top: 20,
    left: 0,
    width: '100%',
    zIndex: 3000,
  },
});
