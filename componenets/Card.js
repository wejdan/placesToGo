import {View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import Stars from './Stars';
import AddToFavBtn from './AddToFavBtn';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import {useNavigation} from '@react-navigation/native';
import {
  ActivityIndicator,
  Avatar,
  Button,
  Card,
  Paragraph,
} from 'react-native-paper';
import styled from 'styled-components/native';
import star from '../assets/star';
import openIcon from '../assets/open';
import Spacer from './Spacer';
import {SvgXml} from 'react-native-svg';
import Text from './Text';
import {getRestaurentPhoto} from '../services/restaurants';
const Title = styled.Text`
  font-family: ${props => props.theme.fonts.heading};
  font-size: ${props => props.theme.fontSizes.title};
  color: ${props => props.theme.colors.text.primary};
`;

const ResturentCard = styled(Card)`
  background-color: ${props => props.theme.colors.bg.primary};
`;

const CardImage = styled(Card.Cover)`
  padding: ${props => props.theme.space[3]};

  background-color: ${props => props.theme.colors.bg.primary};
`;
const CardContent = styled.View`
  padding: ${props => props.theme.space[3]};
`;
const Address = styled.Text`
  font-size: ${props => props.theme.fontSizes.caption};
  font-family: ${props => props.theme.fonts.body};
`;

const RatingRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const Rating = styled.View`
  flex-direction: row;
  padding-top: ${props => props.theme.space[2]};
  padding-bottom: ${props => props.theme.space[2]};
  align-items: center;
`;
const isOpen = true;
const isClosedTemprorly = true;
const icon =
  'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/lodging-71.png';
const ResturentItem = ({restaurant}) => {
  console.log('ResturentItem re-renderd,', restaurant.name);
  const ratingArray = Array.from(new Array(Math.floor(restaurant.rating || 0)));
  const [loadingImg, setLoadingImg] = useState(false);
  const [photo, setPhoto] = useState('');
  const navigation = useNavigation();

  return (
    <>
      <ResturentCard elevation={5}>
        <CardImage source={{uri: restaurant.photo}} />

        <CardContent>
          <Text variant="label">{restaurant.name}</Text>

          <RatingRow>
            <Rating>
              {ratingArray.map((item, index) => (
                <SvgXml xml={star} width={20} height={20} key={index} />
              ))}
              {restaurant.rating ? (
                <Text variant="caption">
                  ({Math.floor(restaurant.rating).toFixed(1)})
                </Text>
              ) : (
                <Text variant="caption">not rated</Text>
              )}
            </Rating>

            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              {restaurant.isClosedTemprorly && (
                <Text variant="error">CLOSED TEMPRORLIY</Text>
              )}
              <Spacer pos="left" size="large" />
              {restaurant.isOpenNow && (
                <SvgXml xml={openIcon} width={20} height={20} />
              )}
              <Spacer pos="left" size="large" />
              <Image
                style={{width: 15, height: 15}}
                source={{uri: restaurant.icon}}
              />
            </View>
          </RatingRow>
          <Address> {restaurant.vicinity}</Address>
        </CardContent>
      </ResturentCard>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  fixedView: {
    position: 'absolute',
    right: 5,
    top: 5,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  card: {
    borderRadius: 0,
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 6,
    backgroundColor: 'white',
    elevation: 2,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
    padding: 15,
    marginVertical: 8,
  },
  title: {
    marginTop: 20,
    marginBottom: 5,
    fontFamily: 'Oswald-Bold',
  },
  location: {
    marginTop: 5,
    color: 'black',
    fontWeight: 'bold',
    fontSize: 12,
  },
  img: {
    width: '100%',
    height: 150,
  },
});
const areEqual = (prevProps, nextProps) => {
  const {restaurant} = nextProps;
  const {restaurant: prevRestaurant} = prevProps;

  /*if the props are equal, it won't update*/
  const isSelectedEqual = restaurant === prevRestaurant;

  return isSelectedEqual;
};
export default React.memo(ResturentItem, areEqual);
