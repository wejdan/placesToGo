import {View, Text} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

const Stars = props => {
  const starsCount = parseFloat(props.count) / 2;
  const filledStars = Math.floor(starsCount);
  const halfStars = starsCount % 1 ? 1 : 0;
  const EmptyStars = 5 - (filledStars + halfStars);
  if (parseInt(props.count) == 0) {
    return <Text></Text>;
  }
  const filledStarsList = Array(filledStars)
    .fill()
    .map((v, i) => i);

  const EmptyStarsList = Array(EmptyStars)
    .fill()
    .map((v, i) => i);

  return (
    <View style={{flexDirection: 'row'}}>
      {filledStarsList.map((star, index) => {
        return <Icon key={index} name="star" size={20} color={'#ffd45c'} />;
      })}

      {halfStars > 0 && (
        <Icon name="star-half-full" size={20} color={'#ffd45c'} />
      )}
      {EmptyStarsList.map((start, index) => {
        return <Icon key={index} name="star-o" size={20} color="#bbb" />;
      })}
    </View>
  );
};

export default Stars;
