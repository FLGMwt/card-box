import React from 'react';
import { Card as CardType } from './slices/cardsSlice';
import { View } from 'react-native';

type Props = {
  card: CardType;
};

const playingCardHeight = 3.5;
const playingCardWidth = 2.5;
const playingCardBorderRadius = 0.125;

const multiplier = 100;
const scale = (x: number) => x * multiplier;

const Card: React.FC<Props> = ({ card }) => {
  return (
    <View
      style={{
        height: scale(playingCardHeight),
        width: scale(playingCardWidth),
        borderRadius: scale(playingCardBorderRadius),
        borderStyle: 'solid',
        borderColor: 'black',
        borderWidth: 2,
      }}
    ></View>
  );
};

export default Card;
