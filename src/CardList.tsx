import React, { useRef, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getCards } from './selectors/cards';
import { addCard, deleteCard } from './slices/cardsSlice';
import { Text, Button, View } from 'react-native';
import { useSelector } from './configureStore';
import Card from './Card';
import LinkButton from './components/LinkButton';

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
  const [cardIndex, setCardIndex] = useState(0);
  const currentCard = cards[cardIndex];

  const dispatch = useDispatch();
  const currentCardRef = useRef(currentCard);
  useEffect(() => {
    currentCardRef.current = currentCard;
  }, [currentCard]);
  const onDeleteCard = () => {
    dispatch(deleteCard(currentCardRef.current.id));
    setCardIndex(0);
  };

  if (!cards.length) {
    return <Text>No Cards Found : (</Text>;
  }

  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: 250,
        }}
      >
        <LinkButton
          title="Previous"
          onPress={() => setCardIndex(index => index - 1)}
          disabled={cardIndex === 0}
        />
        <Text>
          {cardIndex + 1} of {cards.length}
        </Text>
        <LinkButton
          title="Next"
          onPress={() => setCardIndex(index => index + 1)}
          disabled={cardIndex === cards.length - 1}
        />
      </View>
      <Card card={cards[cardIndex]} />
      <Button title="Delete this card" onPress={onDeleteCard} />
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
