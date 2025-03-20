import { useEffect } from 'react';
import * as GoogleSignIn from 'expo-google-sign-in';

export const useGoogleSignIn = () => {
  useEffect(() => {
    const initGoogleSignIn = async () => {
      await GoogleSignIn.initAsync({
        clientId: '480611276688-rjr0tq47bgehtti4vtk2j7lt69onp3a1.apps.googleusercontent.com',
      });
    };

    initGoogleSignIn();
  }, []);

  const signInWithGoogle = async () => {
    try {
      await GoogleSignIn.askForPlayServicesAsync();
      const { type, user } = await GoogleSignIn.signInAsync();
      if (type === 'success') {
        return user;
      } else {
        console.log('Login cancelado');
      }
    } catch (error) {
      console.error('Erro ao fazer login com Google:', error);
    }
  };

  return { signInWithGoogle };
};
