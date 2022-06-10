import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import styled from 'styled-components/native';

const TopSmall = styled.View`
  margin-top: ${props => props.theme.space[1]};
`;
const TopMeduim = styled.View`
  margin-top: ${props => props.theme.space[2]};
`;

const TopLarge = styled.View`
  margin-top: ${props => props.theme.space[3]};
`;

const LeftSmall = styled.View`
  margin-left: ${props => props.theme.space[1]};
`;
const LeftMeduim = styled.View`
  margin-left: ${props => props.theme.space[2]};
`;

const LeftLarge = styled.View`
  margin-left: ${props => props.theme.space[3]};
`;

const sizeVariant = {
  small: 1,
  meduim: 2,
  large: 3,
};
const postionVariant = {
  top: 'margin-top',
  left: 'marginLeft',
  right: 'margin-right',
  bottom: 'margin-bottom',
};
const getVariant = (postion, size, theme) => {
  const sizeIndex = sizeVariant[size];
  const property = postionVariant[postion];
  const value = theme.space[sizeIndex];
  return `margin-top:16px;`;
};
const Spacer = styled.View`
  ${props => postionVariant[props.pos]}:${props =>
    props.theme.space[sizeVariant[props.size]]};
`;

Spacer.defaultProps = {
  pos: 'top',
  size: 'small',
};
export default Spacer;
