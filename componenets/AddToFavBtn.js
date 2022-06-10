import {
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useSelector, useDispatch} from 'react-redux';
import {
  addToFavourite,
  removeFromFavourite,
} from '../store/actions/favouritesActions';

const AddToFavBtn = ({id, restaurant, map}) => {
  const dispatch = useDispatch();
  const [isInFav, setIsInFav] = React.useState(false);
  const favouriteList = useSelector(store => store.favourite.list);
  React.useEffect(() => {
    setIsInFav(isInFavourite(id));
  }, [favouriteList, id]);
  const isInFavourite = id => {
    return favouriteList[id];
  };
  const AddToFavouriteList = () => {
    const restaurantData = {
      id,
      ...restaurant,
    };
    dispatch(addToFavourite(restaurantData));
  };
  const removeFromFavouriteList = () => {
    dispatch(removeFromFavourite(id));
  };
  return (
    <View onStartShouldSetResponder={event => true}>
      {isInFav ? (
        <TouchableHighlight
          onPress={e => {
            removeFromFavouriteList();
          }}>
          <Icon name="heart" size={24} color="red" />
        </TouchableHighlight>
      ) : (
        <TouchableHighlight
          onPress={e => {
            AddToFavouriteList();
          }}>
          <Icon name="heart-o" size={24} color="white" />
        </TouchableHighlight>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#bbb',
    minWidth: 250,
    borderRadius: 50,
    paddingHorizontal: 10,
  },
});
export default AddToFavBtn;
