import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProperties } from './selectors/properties';
import {
  addProperty,
  Property,
  editProperty,
  deleteProperty,
} from './slices/propertiesSlice';
import { View, ScrollView, Dimensions } from 'react-native';
import { Input, Button } from '@ui-kitten/components';

type Props = {
  property: Property;
};

const PropertyEditor: React.FC<Props> = ({ property }) => {
  const dispatch = useDispatch();
  const makeOnEdit = (fieldName: keyof Property, isNumeric = false) => (
    value: string
  ) => {
    dispatch(
      editProperty({
        ...property,
        [fieldName]: isNumeric ? parseInt(value) || 0 : value,
      })
    );
  };
  const onDeleteProperty = () => {
    dispatch(deleteProperty(property.id));
  };
  return (
    <View>
      <Input
        label="Property Name"
        onChangeText={makeOnEdit('name')}
        value={property.name}
      />
      <Input
        label="Distance from Top"
        keyboardType="numeric"
        onChangeText={makeOnEdit('top', true)}
        value={property.top.toString()}
      />
      <Input
        label="Distance from left"
        keyboardType="numeric"
        onChangeText={makeOnEdit('left', true)}
        value={property.left.toString()}
      />
      <Button status="danger" onPress={onDeleteProperty}>
        Delete
      </Button>
    </View>
  );
};

const PropertiesEditor = () => {
  const [height, setHeight] = useState(Dimensions.get('window').height);
  Dimensions.addEventListener('change', ({ window }) =>
    setHeight(window.height)
  );
  const properties = useSelector(getProperties);
  const dispatch = useDispatch();

  const onAddProperty = () => {
    dispatch(addProperty({ name: '', top: 0, left: 0 }));
  };
  return (
    <ScrollView style={{ height }}>
      {properties.map((property, i) => (
        <View
          key={property.id}
          style={{
            margin: 8,
            padding: 8,
            borderWidth: 1,
            borderStyle: 'solid',
          }}
        >
          <PropertyEditor property={property} />
        </View>
      ))}
      <Button onPress={onAddProperty}>Add Property</Button>
    </ScrollView>
  );
};

export default PropertiesEditor;
