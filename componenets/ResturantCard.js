import {View, Image, StyleSheet, Text} from 'react-native';
import React from 'react';

import {useNavigation} from '@react-navigation/native';
import {Card} from 'react-native-paper';
import star from '../assets/star';
import openIcon from '../assets/open';
import Spacer from './Spacer';
import {SvgXml} from 'react-native-svg';

const PureComponent = React.memo(function PureComponent({url}) {
  console.log('pure component render', url);
  //even if I do React.useCallback(fn,[url]) that would mean
  //  it creates onClick when url changes but it would already
  //  only create onClick when url changes because memo will
  //  memoize the component result and not execute PureComponent
  //  unless the url changes
  const onClick = () => console.log('url is', url);
  return <SubComponent onClick={onClick} />;
});
class ResturentCard extends React.PureComponent {
  isOpen = true;
  isClosedTemprorly = true;
  icon =
    'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/lodging-71.png';
  render() {
    const {restaurant} = this.props;

    return (
      <Card elevation={5}>
        <View style={styles.ratingRow}>
          <Text variant="label">{restaurant.name}</Text>

          <View>
            <View style={{flexDirection: 'row'}}>
              {ratingArray.map((item, index) => (
                <SvgXml xml={star} width={20} height={20} key={index} />
              ))}
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              {restaurant.isClosedTemprorly && (
                <Text variant="error">CLOSED TEMPRORLIY</Text>
              )}
              <Spacer pos="left" size="large" />
              {restaurant.isOpenNow && (
                <SvgXml xml={openIcon} width={20} height={20} />
              )}
              <Spacer pos="left" size="large" />
              <Image style={{width: 15, height: 15}} source={{uri: icon}} />
            </View>
          </View>
          <Text> {restaurant.vicinity}</Text>
        </View>
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  ratingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
export default ResturentCard;
