import {View, Text, ScrollView} from 'react-native';
import React from 'react';
import ResturentItem from '../componenets/Card';
import {List} from 'react-native-paper';
import styled from 'styled-components/native';
import AddToFavBtn from '../componenets/AddToFavBtn';
const CardIcon = styled.View`
  position: absolute;
  right: 20px;
  top: 20px;
  flex-direction: row;
  justify-content: flex-end;
  z-index: 9999;
`;
const DetailsScreen = ({route}) => {
  /* 2. Get the param */
  const {restaurant} = route.params;
  const [expanded, setExpanded] = React.useState(true);
  const handlePress = () => setExpanded(!expanded);

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <CardIcon>
        <AddToFavBtn id={restaurant.placeId} restaurant={restaurant} />
      </CardIcon>
      <ResturentItem restaurant={restaurant} />
      <ScrollView style={{marginTop: 16}}>
        <List.Accordion
          style={{backgroundColor: 'white'}}
          title="Breakfast"
          left={props => <List.Icon {...props} icon="bread-slice" />}>
          <List.Item title="Eggs Benedict" />
          <List.Item title="Classic Breakfast" />
        </List.Accordion>

        <List.Accordion
          style={{backgroundColor: 'white'}}
          title="Lunch"
          left={props => <List.Icon {...props} icon="hamburger" />}>
          <List.Item title="Burger w/ Fries" />
          <List.Item title="Steak Sandwich" />
          <List.Item title="Mushroom Soup" />
        </List.Accordion>

        <List.Accordion
          style={{backgroundColor: 'white'}}
          title="Dinner"
          left={props => <List.Icon {...props} icon="food-variant" />}>
          <List.Item title="Spaghetti Bolognese" />
          <List.Item title="Veal Cutlet with Chicken Mushroom Rotini" />
          <List.Item title="Steak Frites" />
        </List.Accordion>

        <List.Accordion
          style={{backgroundColor: 'white'}}
          title="Drinks"
          left={props => <List.Icon {...props} icon="beer" />}>
          <List.Item title="Coffee" />
          <List.Item title="Tea" />
          <List.Item title="Modelo" />
          <List.Item title="Coke" />
          <List.Item title="Fanta" />
        </List.Accordion>
      </ScrollView>
    </View>
  );
};

export default DetailsScreen;
