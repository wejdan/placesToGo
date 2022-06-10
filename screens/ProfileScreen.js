import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Alert,
  TouchableOpacity,
  PermissionsAndroid,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {useState, useCallback, useRef, useMemo, useEffect} from 'react';
import {Surface} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {logoutAction} from '../store/actions/userActions';
import {useSelector, useDispatch} from 'react-redux';
import {Avatar} from 'react-native-paper';
import colors from '../constants/colors';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import RNFS from 'react-native-fs';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import LoadingOverlay from '../componenets/LoadingOverlay';
import {List} from 'react-native-paper';

const ProfileScreen = ({navigation}) => {
  const [image, setImage] = useState(null);
  const prevImage = useRef();
  const [isDisabled, setIsDisabled] = useState(false);

  const [imageLoaded, setImageLoaded] = useState(false);

  const dispatch = useDispatch();

  const userInfo = useSelector(store => store.user.userInfo);
  const takePhotoFromCamera = () => {
    openPicker(launchImageLibrary);
  };
  const choosePhotoFromLibrary = () => {
    openPicker(launchCamera);
  };

  useEffect(() => {
    loadProfilePicture();
  }, []);

  async function delteFiles(filepath) {
    let exists = await RNFS.exists(filepath);

    if (exists) {
      // exists call delete

      await RNFS.unlink(filepath);

      console.log('File Deleted');
    } else {
      console.log('File Not Available');
    }
  }
  const loadProfilePicture = async () => {
    const picture = await AsyncStorage.getItem(`profile-${userInfo.localId}`);

    console.log('picture ', picture);
    prevImage.current = picture;
    setImage(picture);
    setImageLoaded(true);
  };
  useEffect(() => {
    if (image != null) {
      AsyncStorage.setItem(`profile-${userInfo.localId}`, image);
    }
  }, [image]);
  const renderContent = () => {
    return (
      <View style={styles.panel}>
        <View style={{alignItems: 'center'}}>
          <Text style={styles.panelTitle}>Upload Photo</Text>
          <Text style={styles.panelSubtitle}>Choose Your Profile Picture</Text>
        </View>
        <TouchableOpacity
          style={styles.panelButton}
          onPress={takePhotoFromCamera}>
          <Text style={styles.panelButtonTitle}>Choose From Library</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.panelButton}
          onPress={choosePhotoFromLibrary}>
          <Text style={styles.panelButtonTitle}>Take Photo</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.panelButton}
          onPress={() => {
            sheetRef.current.snapTo(1);
            setIsDisabled(false);
            console.log('prev', prevImage.current);
            console.log('new', image);
            setImage(prevImage.current);
          }}>
          <Text style={styles.panelButtonTitle}>Cancel</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle} />
      </View>
    </View>
  );
  const sheetRef = React.useRef(null);
  const fall = useRef(new Animated.Value(1)).current;

  const openPicker = async mehod => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'App Camera Permission',
          message: 'App needs access to your camera ',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Camera permission given');
        let options = {
          title: 'Select Image',
          customButtons: [
            {
              name: 'customOptionKey',
              title: 'Choose Photo from Custom Option',
            },
          ],
          storageOptions: {
            skipBackup: true,
            path: 'images',
          },
        };

        const response = await mehod(options);

        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        } else {
          const source = {uri: response.assets[0].uri};
          console.log('img', response.assets[0].uri);
          const uri = response.assets[0].uri;
          // You can also display the image using data:
          // const source = { uri: 'data:image/jpeg;base64,' + response.data };
          let filename = uri.substring(uri.lastIndexOf('/') + 1);

          const dest = RNFS.ExternalDirectoryPath + `/${filename}.jpg`;
          console.log(dest);
          RNFS.moveFile(response.assets[0].uri, dest)
            .then(() => {
              console.log('new img', filename);
              setImage(dest);
            })
            .catch(error => {
              console.log(error);
            });
        }
      } else {
        alert('Camera permission denied');
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };
  const logoutHandler = () => {
    Alert.alert('Confirmation', 'Are you sure you want to logout', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          dispatch(logoutAction());
        },
      },
    ]);
  };
  if (!imageLoaded) {
    return <LoadingOverlay />;
  }
  return (
    <View style={styles.container}>
      <BottomSheet
        ref={sheetRef}
        snapPoints={[370, 0]}
        borderRadius={10}
        renderContent={renderContent}
        renderHeader={renderHeader}
        initialSnap={1}
        callbackNode={fall}
        enabledGestureInteraction={true}
      />
      <TouchableWithoutFeedback
        onPress={() => {
          sheetRef.current.snapTo(1);
          setIsDisabled(false);

          if (prevImage.current) {
            console.log('prev', prevImage.current);

            delteFiles(prevImage.current);
            prevImage.current = image;
            console.log('prev new val', prevImage.current);
          }
        }}>
        <Animated.View
          style={{
            opacity: Animated.add(0.1, Animated.multiply(fall, 1.0)),
          }}>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => {
                sheetRef.current.snapTo(0);
                setIsDisabled(true);
              }}>
              {image != null ? (
                <Avatar.Image size={180} source={{uri: 'file://' + image}} />
              ) : (
                <Avatar.Icon
                  size={180}
                  icon="account"
                  style={{backgroundColor: colors.primary}}
                />
              )}
            </TouchableOpacity>

            <Text style={styles.email}>{userInfo.email}</Text>
          </View>

          <List.Section>
            <List.Item
              style={styles.item}
              disabled={isDisabled}
              onPress={() => {
                navigation.navigate('FavouritesScreen');
              }}
              title="Favourite"
              description="View your favourites"
              left={() => <List.Icon color="red" icon="heart" />}
            />
            <List.Item
              style={[styles.item, {borderBottomWidth: 0}]}
              title="Logout"
              onPress={logoutHandler}
              left={() => <List.Icon icon="logout" />}
            />
          </List.Section>
        </Animated.View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,

    justifyContent: 'center',
  },
  item: {
    backgroundColor: '#fff',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  email: {
    marginTop: 5,
  },
  icon: {
    marginRight: 20,
  },
  title: {
    fontSize: 18,
  },
  surface: {
    marginTop: 5,
    paddingHorizontal: 20,
    paddingVertical: 20,
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    height: 75,
  },
  subtitle: {
    fontSize: 12,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: '#FF6347',
    alignItems: 'center',
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
  header: {
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 10,
  },
  panel: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    // shadowColor: '#000000',
    // shadowOffset: {width: 0, height: 0},
    // shadowRadius: 5,
    // shadowOpacity: 0.4,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: 10,
  },
});
