import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import LoadingScreen from '../components/LoadingScreen';
import { useGoogleSignIn } from '../hooks/useGoogleSignIn';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });
  const [isLoading, setIsLoading] = useState(true);
  const { signInWithGoogle } = useGoogleSignIn();

  useEffect(() => {
    const initializeApp = async () => {
      // Aguarda o carregamento da fonte e exibe a SplashScreen
      if (loaded) {
        await new Promise((resolve) => setTimeout(resolve, 3000)); // Simula tempo de carregamento
        setIsLoading(false);
        SplashScreen.hideAsync();
        await signInWithGoogle(); // Chama o login do Google após o carregamento
      }
    };

    initializeApp();
  }, [loaded]);

  if (!loaded || isLoading) {
    return <LoadingScreen />; // Exibe a tela de carregamento enquanto carrega
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}