import React from "react";
import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons';
import styles from "./style";
import Logo from '../../assets/images/MedicApp-Logo.png';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from "react";
import { useFonts, Poppins_700Bold} from '@expo-google-fonts/poppins';

SplashScreen.preventAutoHideAsync();

export default function Signup() {
    const navigation = useNavigation<any>();
    const [loaded, error] = useFonts({
            'Poppins_700Bold': Poppins_700Bold,
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
                style={{ width: 300, alignSelf: 'center'}}
                resizeMode="contain"
                />
            </View>
            <View style={styles.formContainer}>
                <Text style={styles.title}>Cadastrar</Text>
                <View style={styles.formInput}>
                    <Ionicons name="person" size={24} color="#BDBDBD" style={{ marginLeft: 10}} />
                    <TextInput
                        placeholder="Nome completo"
                        style={{ height: 40, flex: 1, marginLeft: 10}}
                    />
                </View>
                <View style={styles.formInput}>
                    <Ionicons name="mail" size={24} color="#BDBDBD" style={{ marginLeft: 10 }} />
                    <TextInput
                        placeholder="Email"
                        style={{ height: 40, flex: 1, marginLeft: 10 }}
                    />
                </View>
                <View style={styles.formInput}>
                    <Ionicons name="lock-closed" size={24} color="#BDBDBD" style={{ marginLeft: 10 }} />
                    <TextInput
                        placeholder="Senha"
                        secureTextEntry
                        style={{ height: 40, flex: 1, marginLeft: 10 }}
                    />
                </View>
                <View style={{top: 20, display: 'flex', gap: 15, width: '100%', alignItems: 'center' }}>
                <TouchableOpacity 
                    style={styles.formButton}
                >
                    <Text style={{ color: 'white', textAlign: 'center' }}>Cadastrar</Text>
                </TouchableOpacity>
                <Text style={{ textAlign: 'center', color: '#0057B3' }} onPress={() => navigation.navigate('Signin')}>Já tem uma conta? Entrar</Text>
                </View>
            </View>
        </View>
    );
}
