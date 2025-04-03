import React, { useEffect } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { 
    Poppins_100Thin, 
    Poppins_200ExtraLight, 
    Poppins_300Light, 
    Poppins_400Regular, 
    Poppins_500Medium, 
    Poppins_600SemiBold, 
    Poppins_700Bold, 
    Poppins_800ExtraBold, 
    Poppins_900Black 
} from '@expo-google-fonts/poppins';
import { ReactNode } from 'react';

const FontLoader = ({ children }: { children: ReactNode }) => {
  const [loaded, error] = useFonts({
    'Poppins_100Thin': Poppins_100Thin,
    'Poppins_200ExtraLight': Poppins_200ExtraLight,
    'Poppins_300Light': Poppins_300Light,
    'Poppins_400Regular': Poppins_400Regular,
    'Poppins_500Medium': Poppins_500Medium,
    'Poppins_600SemiBold': Poppins_600SemiBold,
    'Poppins_700Bold': Poppins_700Bold,
    'Poppins_800ExtraBold': Poppins_800ExtraBold,
    'Poppins_900Black': Poppins_900Black,
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null; 
  }

  return <>{children}</>; 
};

export default FontLoader;
