import React, { useState } from 'react';
import storage from '@react-native-firebase/storage';
import * as ImagePicker from 'expo-image-picker';

import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { Photo } from '../../components/Photo';

import { Container, Content, Progress, Transferred } from './styles';
import { Alert } from 'react-native';

export function Upload() {
  const [image, setImage] = useState('');
  const [bytesTransferred, setBytesTransferred] = useState('');
  const [progress, setProgress] = useState('0');

  async function handlePickImage() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status == 'granted') {
      const result: any = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        aspect: [4, 4],
        quality: 1,
      });

      if (!result.cancelled) {
        setImage(result.uri);
      }
    }
  };

  async function handleUpload() {
    const fileName = new Date().getTime();
    const reference = storage().ref(`images/${fileName}`);
    const uploadTask = reference.putFile(image);

    uploadTask.on('state_changed', taskSnapshot => {
      const percentage = (
        (taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100
      ).toFixed(0);


      setProgress(percentage);
      setBytesTransferred(`${taskSnapshot.bytesTransferred} transferidos de ${taskSnapshot.totalBytes}`);
    })

    uploadTask.then(() => {
      Alert.alert('Upload concluído com sucesso!');
    });
  }

  return (
    <Container>
      <Header title="Upload de Fotos" />

      <Content>
        <Photo uri={image} onPress={handlePickImage} />

        <Button
          title="Fazer upload"
          onPress={handleUpload}
        />

        <Progress>
          {progress}%
        </Progress>

        <Transferred>
          {bytesTransferred}
        </Transferred>
      </Content>
    </Container>
  );
}
