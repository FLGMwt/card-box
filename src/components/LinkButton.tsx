import React from 'react';
import { Text, TouchableOpacity, GestureResponderEvent } from 'react-native';

type Props = {
  title?: string;
  disabled?: boolean;
  onPress: (event: GestureResponderEvent) => void;
};

const LinkButton: React.FC<Props> = ({ onPress, disabled, title }) => {
  return (
    <TouchableOpacity onPress={onPress} disabled={disabled}>
      <Text
        style={{
          textDecorationLine: disabled ? 'none' : 'underline',
          color: disabled ? 'gray' : 'black',
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default LinkButton;
