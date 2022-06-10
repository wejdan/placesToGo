import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import {setSearchQuery} from '../store/actions/RestaurantsActions';
import HomeScreen from '../screens/HomeScreen';
import DetailsScreen from '../screens/DetailsScreen';
import FavouritesScreen from '../screens/FavouritesScreen';
import CartScreen from '../screens/CartScreen';
import ProfileScreen from '../screens/ProfileScreen';
import CameraScreen from '../screens/CameraScreen';
import MapScreen from '../screens/MapScreen';
import {setLocation} from '../store/actions/RestaurantsActions';
import colors from '../constants/colors';
import Geolocation from '@react-native-community/geolocation';

import {useSelector, useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {loginAction} from '../store/actions/userActions';
import LoadingOverlay from '../componenets/LoadingOverlay';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {ImageBackground, StyleSheet} from 'react-native';
import {loadFavourite} from '../store/actions/favouritesActions';

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'transparent',
  },
};

const nativeStack = createNativeStackNavigator();

function AuthStack() {
  return (
    <nativeStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <nativeStack.Screen name="WelcomeScreen" component={WelcomeScreen} />
      <nativeStack.Screen name="RegisterScreen" component={RegisterScreen} />

      <nativeStack.Screen name="Login" component={LoginScreen} />
    </nativeStack.Navigator>
  );
}
const Stack = createStackNavigator();
function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        ...TransitionPresets.ModalPresentationIOS,
      }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />

      <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
    </Stack.Navigator>
  );
}

function CartSack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="CartScreen" component={CartScreen} />
    </Stack.Navigator>
  );
}

function ProfileStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="CameraScreen" component={CameraScreen} />
      <Stack.Screen
        options={{
          headerShown: true,
          title: 'Favourites',
          headerShadowVisible: false,
        }}
        name="FavouritesScreen"
        component={FavouritesScreen}
      />
    </Stack.Navigator>
  );
}

function MapStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="MapScreen" component={MapScreen} />
    </Stack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

function AuthenticatedTab() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'HomeStack') {
            iconName = 'fast-food';
          } else if (route.name === 'CartStack') {
            iconName = 'cart';
          } else if (route.name === 'MapStack') {
            iconName = 'map';
          } else if (route.name === 'ProfiletStack') {
            iconName = 'settings';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.primary,
      })}>
      <Tab.Screen
        name="HomeStack"
        options={{tabBarLabel: 'Restaurants', title: 'Restaurants'}}
        component={HomeStack}
      />
      <Tab.Screen
        name="CartStack"
        options={{tabBarLabel: 'Cart', title: 'Cart'}}
        component={CartSack}
      />

      <Tab.Screen
        name="MapStack"
        options={{tabBarLabel: 'Map', title: 'Map'}}
        component={MapStack}
      />

      <Tab.Screen
        name="ProfiletStack"
        options={{tabBarLabel: 'Settings', title: 'Settings'}}
        component={ProfileStack}
      />
    </Tab.Navigator>
  );
}
export default function Navigation() {
  const dispatch = useDispatch();
  const [loading, setloading] = useState(true);
  const [loadingFavourite, setloadingFavourite] = useState(false);
  const [loadingUserlocation, setLoadingUserLocation] = useState(false);

  const getLocation = async () => {
    setLoadingUserLocation(true);
    Geolocation.getCurrentPosition(info => {
      console.log(info);

      dispatch(
        setLocation({
          lat: info.coords.latitude,
          lng: info.coords.longitude,
        }),
      );
      setLoadingUserLocation(false);
    });

    console.log('Location permission granted');
  };
  const getData = async () => {
    try {
      const token = await AsyncStorage.getItem('token');

      const userData = await AsyncStorage.getItem('userData');
      const userObj = userData != null ? JSON.parse(userData) : null;
      if (token !== null) {
        dispatch(loginAction(token, userObj));
      }
    } catch (e) {
      // error reading value
    }

    setloading(false);
  };
  const getUserFavourites = async () => {
    if (user.authToken) {
      setloadingFavourite(true);

      const favourite = await AsyncStorage.getItem(
        `favourite-${user.userInfo.localId}`,
      );
      if (favourite !== null) {
        dispatch(
          loadFavourite(
            `favourite-${user.userInfo.localId}`,
            JSON.parse(favourite),
          ),
        );
      } else {
        dispatch(loadFavourite(`favourite-${user.userInfo.localId}`, {}));
      }
      setloadingFavourite(false);
    }
  };
  const user = useSelector(store => store.user);
  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (user.authToken) {
      getUserFavourites();
      getLocation();
    }
    // dispatch(setSearchQuery('San Francisco'));
  }, [user]);
  if (loading || loadingFavourite || loadingUserlocation) {
    return <LoadingOverlay message="" />;
  }

  if (user.authToken) {
    return (
      <NavigationContainer>
        <AuthenticatedTab />
      </NavigationContainer>
    );
  }
  return (
    <ImageBackground
      style={styles.image}
      imageStyle={{opacity: 0.5}}
      source={require('../assets/home_bg.jpg')}>
      <NavigationContainer theme={MyTheme}>
        <AuthStack />
      </NavigationContainer>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    opacity: 1,
  },
});
