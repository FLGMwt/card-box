import React, { useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getCards } from './selectors/cards';
import { addCard, deleteCard } from './slices/cardsSlice';
import { Text, Button } from 'react-native';
import { useSelector } from './configureStore';

const MakeCardsButton = () => {
  const dispatch = useDispatch();
  const cardCount = useSelector(state => getCards(state).length);
  const cardCountRef = useRef(cardCount);
  useEffect(() => {
    cardCountRef.current = cardCount;
  }, [cardCount]);
  const onAddCard = () => {
    dispatch(addCard({ name: `This is Card #${cardCountRef.current + 1}` }));
  };
  return <Button title="Add a card" onPress={onAddCard} />;
};

const CardList = () => {
  const cards = useSelector(getCards);
  const dispatch = useDispatch();

  const onDeleteCard = (id: string) => {
    dispatch(deleteCard(id));
  };

  return (
    <>
      {cards.map(card => (
        <Text key={card.id} onPress={() => onDeleteCard(card.id)}>
          {card.name}
        </Text>
      ))}
    </>
  );
};

const CardListProto = () => {
  return (
    <>
      <MakeCardsButton />
      <CardList />
    </>
  );
};
export default CardListProto;
