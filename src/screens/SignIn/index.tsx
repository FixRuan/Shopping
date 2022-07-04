import React, { useState } from 'react';
import { Root, Popup } from "popup-ui";
import { Keyboard } from 'react-native';
import auth from '@react-native-firebase/auth';

import { Container, Account, Title, Subtitle } from './styles';
import { ButtonText } from '../../components/ButtonText';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Alert } from 'react-native';

import { popup } from '../../utils/popup';

export function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSignInAnonymously() {
    const { user } = await auth().signInAnonymously();
    console.log(user);
  }

  function handleCreateUserAccount(email: string, password: string) {
    if (email == '' || password == '') {

      popup({
        type: "Warning",
        title: "Cadastro",
        text: "Preencha todos os campos",
      });

      return;
    }


    auth().createUserWithEmailAndPassword(email, password)
      .then(() => {
        setEmail('');
        setPassword('');
        Keyboard.dismiss();

        popup({
          type: "Success",
          title: "Cadastro",
          text: "Usuário criado com sucesso",
        });

      }).catch(error => {

        if (error.code === 'auth/email-already-in-use') {
          setPassword('');
          Keyboard.dismiss();

          popup({
            type: "Danger",
            title: "Cadastro",
            text: "E-mail já cadastrado",
          })

          return;
        };

        if (error.code === 'auth/invalid-email') {
          setPassword('');
          Keyboard.dismiss();

          popup({
            type: "Danger",
            title: "Cadastro",
            text: "E-mail inválido",
          })

          return;
        };

        if (error.code === 'auth/weak-password') {
          setPassword('');
          Keyboard.dismiss();

          popup({
            type: "Danger",
            title: "Cadastro",
            text: "Senha muito fraca",
          })

          return;
        };

        if (error.code === 'auth/operation-not-allowed') {
          setPassword('');
          Keyboard.dismiss();

          popup({
            type: "Danger",
            title: "Cadastro",
            text: "Operação não permitida",
          })

          return;
        };
      });
  }

  function handleSignInWithEmail(email: string, password: string) {
    auth().signInWithEmailAndPassword(email, password)
      .then(({ user }) => {
        console.log(user);
      }).catch(error => {
        if (error.code === 'auth/invalid-email') {
          popup({
            type: "Danger",
            title: "Login",
            text: "E-mail inválido",
          })

          return;
        };

        if (error.code === 'auth/user-disabled') {
          popup({
            type: "Danger",
            title: "Login",
            text: "Usuário desabilitado",
          })

          return;
        };

        if (error.code === 'auth/user-not-found') {
          popup({
            type: "Danger",
            title: "Login",
            text: "Usuário não encontrado",
          })

          return;
        };

        if (error.code === 'auth/wrong-password') {
          popup({
            type: "Danger",
            title: "Login",
            text: "Senha incorreta",
          })

          return;
        };
      });

  }

  function handleForgotPassword() {
    auth().sendPasswordResetEmail(email)
      .then(() => {
        popup({
          type: "Success",
          title: "Recuperação de senha",
          text: "E-mail enviado com sucesso",
        });
      }).catch(error => {
        if (error.code === 'auth/invalid-email') {
          popup({
            type: "Danger",
            title: "Recuperação de senha",
            text: "E-mail inválido",
          })

          return;
        };

        if (error.code === 'auth/user-not-found') {
          popup({
            type: "Danger",
            title: "Recuperação de senha",
            text: "E-mail não cadastrado",
          })

          return;
        };
      });
  };


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

        <Button title="Entrar" onPress={() => handleSignInWithEmail(email, password)} />

        <Account>
          <ButtonText title="Recuperar senha" onPress={handleForgotPassword} />
          <ButtonText title="Criar minha conta" onPress={() => handleCreateUserAccount(email, password)} />
        </Account>
      </Container>
    </Root>
  );
}