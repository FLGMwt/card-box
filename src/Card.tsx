import React from 'react';
import { Card as CardType, editCard } from './slices/cardsSlice';
import { View } from 'react-native';
import { Input } from '@ui-kitten/components';
import { useSelector } from './configureStore';
import { getProperties } from './selectors/properties';
import { Property } from './slices/propertiesSlice';
import { useDispatch } from 'react-redux';

type Props = {
  card: CardType;
};

const playingCardHeight = 3.5;
const playingCardWidth = 2.5;
const playingCardBorderRadius = 0.125;

const multiplier = 100;
const scale = (x: number) => x * multiplier;

const ValueEditor: React.FC<{ card: CardType; property: Property }> = ({
  card,
  property,
}) => {
  const dispatch = useDispatch();
  const onEdit = (value: string) => {
    dispatch(
      editCard({
        ...card,
        values: {
          ...card.values,
          [property.id]: value,
        },
      })
    );
  };
  return (
    <View
      style={{ margin: 8, padding: 8, borderWidth: 1, borderStyle: 'solid' }}
    >
      <Input
        label={property.name}
        onChangeText={onEdit}
        value={card.values[property.id] || ''}
      />
    </View>
  );
};

const ValuesEditor: React.FC<{ card: CardType }> = ({ card }) => {
  const properties = useSelector(getProperties);
  return (
    <>
      {properties.map(property => (
        <ValueEditor
          key={`${property.id}${card.id}`}
          property={property}
          card={card}
        />
      ))}
    </>
  );
};

const Card: React.FC<Props> = ({ card }) => {
  return (
    <View style={{ flexDirection: 'row' }}>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: 40,
        }}
      >
        <ValuesEditor card={card} />
      </View>
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
    </View>
  );
};

export default Card;
