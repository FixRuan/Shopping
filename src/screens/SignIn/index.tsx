import React, { useState } from 'react';
import { Root, Popup } from "popup-ui";
import { Keyboard } from 'react-native';
import auth from '@react-native-firebase/auth';

import { Container, Account, Title, Subtitle } from './styles';
import { ButtonText } from '../../components/ButtonText';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Alert } from 'react-native';

export function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSignInAnonymously() {
    const { user } = await auth().signInAnonymously();
    console.log(user);
  }

  function handleCreateUserAccount(email: string, password: string) {
    if (email == '' || password == '') {
      Popup.show({
        type: "Warning",
        title: "Cadastro",
        button: true,
        textBody: "Preencha todos os campos",
        buttonText: "Ok",
        callback: () => Popup.hide(),
      });

      return;
    }


    auth().createUserWithEmailAndPassword(email, password)
      .then(() => {
        setEmail('');
        setPassword('');
        Keyboard.dismiss();

        Popup.show({
          type: "Success",
          title: "Cadastro",
          button: true,
          textBody: "Usuário criado com sucesso",
          buttonText: "Ok",
          callback: () => Popup.hide(),
        });

      }).catch(error => {

        if (error.code === 'auth/email-already-in-use') {
          setPassword('');
          Keyboard.dismiss();

          Popup.show({
            type: "Danger",
            title: "Cadastro",
            button: true,
            textBody: "E-mail já cadastrado",
            buttonText: "Ok",
            callback: () => Popup.hide(),
          });
        };

        if (error.code === 'auth/invalid-email') {
          setPassword('');
          Keyboard.dismiss();

          Popup.show({
            type: "Danger",
            title: "Cadastro",
            button: true,
            textBody: "E-mail inválido",
            buttonText: "Ok",
            callback: () => Popup.hide(),
          });

          return;
        };

        if (error.code === 'auth/weak-password') {
          setPassword('');
          Keyboard.dismiss();

          Popup.show({
            type: "Danger",
            title: "Cadastro",
            button: true,
            textBody: "Senha muito fraca",
            buttonText: "Ok",
            callback: () => Popup.hide(),
          });

          return;
        };

        if (error.code === 'auth/operation-not-allowed') {
          setPassword('');
          Keyboard.dismiss();

          Popup.show({
            type: "Danger",
            title: "Cadastro",
            button: true,
            textBody: "Operação não permitida",
            buttonText: "Ok",
            callback: () => Popup.hide(),
          });

          return;
        };
      });
  }


  return (
    <Root>
      <Container>
        <Title>MyShopping</Title>
        <Subtitle>monte sua lista de compra te ajudar nas compras</Subtitle>

        <Input
          value={email}
          placeholder="e-mail"
          keyboardType="email-address"
          onChangeText={setEmail}
        />

        <Input
          value={password}
          placeholder="senha"
          secureTextEntry
          onChangeText={setPassword}
        />

        <Button title="Entrar" onPress={handleSignInAnonymously} />

        <Account>
          <ButtonText title="Recuperar senha" onPress={() => { }} />
          <ButtonText title="Criar minha conta" onPress={() => handleCreateUserAccount(email, password)} />
        </Account>
      </Container>
    </Root>
  );
}