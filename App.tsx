import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from 'styled-components/native';

import { Routes } from './src/routes';
import theme from './src/theme';
import useFont from './src/hooks/useFont';

export default function App() {
  const isLoadingComplete = useFont();

  if (!isLoadingComplete) {
    return null;
  }

  return (
    <ThemeProvider theme={theme}>
      <StatusBar style="light" />
      <Routes />
    </ThemeProvider>
  );
}
