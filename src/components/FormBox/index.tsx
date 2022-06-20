import React, { useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import { Alert, Keyboard } from 'react-native';

import { Container } from './styles';
import { ButtonIcon } from '../ButtonIcon';
import { Input } from '../Input';

export function FormBox() {
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState(0);

  async function handleProductAdd() {

    firestore().collection('products').doc('my-custom-id').set({
      description,
      quantity,
      done: false,
      createdAt: firestore.FieldValue.serverTimestamp(),
    }).then(() => {

      Alert.alert('Produto adicionado com sucesso!');
    }).catch((error) => {
      console.log(error);
    })

    setDescription('');
    setQuantity(0);
    Keyboard.dismiss();
  }

  return (
    <Container>
      <Input
        placeholder="Nome do produto"
        size="medium"
        onChangeText={setDescription}
        value={description}
      />

      <Input
        placeholder="0"
        keyboardType="numeric"
        size="small"
        style={{ marginHorizontal: 8 }}
        onChangeText={(e) => setQuantity(Number(e))}
        value={String(quantity)}
      />

      <ButtonIcon
        size='large'
        icon="add-shopping-cart"
        onPress={handleProductAdd}
      />
    </Container>
  );
}
