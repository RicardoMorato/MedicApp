import React from "react";
import { View, Text, Image, TextInput, TouchableOpacity} from "react-native";
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import styles  from "./style";
import Logo from '../../assets/images/MedicApp-Logo.png';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from "react";
import { useFonts, Poppins_700Bold, Poppins_300Light} from '@expo-google-fonts/poppins';
import colors from "@/global/colors"

SplashScreen.preventAutoHideAsync();

export default function Signin() {
    const navigation = useNavigation<any>();
    const [loaded, error] = useFonts({
        'Poppins_700Bold': Poppins_700Bold,
        'Poppins_300Light': Poppins_300Light
      });
    
      useEffect(() => {
        if (loaded || error) {
          SplashScreen.hideAsync();
        }
      }, [loaded, error]);
    
      if (!loaded && !error) {
        return null;
      }
    return(
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image 
                source={Logo}
                style={{ width: '100%', height: 200}}
                resizeMode="contain"
                />
            </View>
            
            <View style={styles.formContainer}>
                <Text style={styles.title}>Entrar</Text>
                <View style={styles.formInput}>
                    <Ionicons name="mail" size={24} color={colors.primary} style={{ marginLeft: 10}} />
                    <TextInput
                        placeholder="Email"
                        style={{ height: 40, flex: 1, marginLeft: 10, color: colors.textPrimary }}
                    />
                </View>
                <View style={styles.formInput}>
                    <Ionicons name="lock-closed" size={24} color={colors.primary}  style={{ marginLeft: 10 }} />
                    <TextInput
                        placeholder="Senha"
                        secureTextEntry={true}
                        style={{ height: 40, flex: 1, marginLeft: 10, color: colors.textPrimary }}
                    />
                </View>
                <View style={{top: 20, display: 'flex', gap: 20, width: '100%', alignItems: 'center' }}>
                    <TouchableOpacity 
                        style={styles.formButton}
                    >
                        <Text style={{ color: colors.background, textAlign: 'center' }}>Acessar</Text>
                    </TouchableOpacity>
                    <Text onPress={() => navigation.navigate('Signup')} style={{color: colors.secondary, textDecorationLine: 'underline', fontFamily: 'Poppins_300Light'}}>Criar nova conta</Text>
                </View>
            </View>
            
        </View>
    );
}