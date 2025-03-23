import React, { useState } from "react";
import { View, Text, Image, TextInput, TouchableOpacity, ActivityIndicator} from "react-native";
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import styles  from "./style";
import Logo from '../../assets/images/MedicApp-Logo.png';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from "react";
import { useFonts, Poppins_700Bold, Poppins_300Light} from '@expo-google-fonts/poppins';
import colors from "@/global/colors"
import { login } from "@/services/auth";
import { useForm, Controller } from "react-hook-form";

SplashScreen.preventAutoHideAsync();

export default function Signin() {
    const [loading, setLoading] = useState(false)
    const navigation = useNavigation<any>();
    const [loaded, error] = useFonts({
        'Poppins_700Bold': Poppins_700Bold,
        'Poppins_300Light': Poppins_300Light
      });
      const { control, handleSubmit, formState: { errors, isSubmitted } } = useForm({
        defaultValues: {
            Email: '',
            Senha: ''
        }
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
                <Controller
                    name="Email"
                    control={control}
                    rules={{
                        required: "O email é obrigatório.",
                       
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <View style={{ gap: 5 }}>
                            <View style={[styles.formInput, errors?.Email ? { borderColor: colors.error, borderWidth: 1 } 
                                            : isSubmitted && value 
                                                ? { borderColor: colors.primary, borderWidth: 1.5 } 
                                                : { borderColor: 'transparent', borderWidth: 0 }
                                    ]}>
                                <Ionicons name="mail" size={24} color={errors?.Email ? colors.error : colors.primary} style={{ marginLeft: 10 }} />
                                <TextInput
                                    placeholder="Email"
                                    style={{ height: 40, flex: 1, marginLeft: 10, color: colors.textPrimary }}
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                />
                            </View>
                            {errors?.Email && <Text style={{ color: colors.error }}>{errors?.Email.message}</Text>}
                        </View>
                    )}
                />
                <Controller
                    name="Senha"
                    control={control}
                    rules={{
                        required: "A senha é obrigatória.",
                      
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <View style={{ gap: 5 }}>
                            <View style={[styles.formInput, errors?.Senha ? { borderColor: colors.error, borderWidth: 1 } 
                                            : isSubmitted && value 
                                                ? { borderColor: colors.primary, borderWidth: 1.5 } 
                                                : { borderColor: 'transparent', borderWidth: 0 }
                                    ]}>
                                <Ionicons name="lock-closed" size={24} color={errors?.Senha ? colors.error : colors.primary} style={{ marginLeft: 10 }} />
                                <TextInput
                                    placeholder="Senha"
                                    secureTextEntry={true}
                                    style={{ height: 40, flex: 1, marginLeft: 10, color: colors.textPrimary }}
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                />
                            </View>
                            {errors?.Senha && <Text style={{ color: colors.error }}>{errors?.Senha.message}</Text>}
                        </View>
                    )}
                />
                <View style={{top: 20, display: 'flex', gap: 20, width: '100%', alignItems: 'center' }}>
                    <TouchableOpacity 
                        style={styles.formButton} 
                        onPress={handleSubmit((data) => login(data, navigation, setLoading))}
                    >
                        {loading 
                        ? <ActivityIndicator color="#fff"/> 
                        : <Text style={{ 
                            color: colors.background, 
                            textAlign: 'center' 
                            }}>Acessar</Text>}

                    </TouchableOpacity>
                    <Text onPress={() => navigation.navigate('Signup')} style={{color: colors.secondary, textDecorationLine: 'underline', fontFamily: 'Poppins_300Light'}}>Criar nova conta</Text>
                </View>
                <View style={{top: 20, display: 'flex', gap: 20, width: '100%', alignItems: 'center' }}>
                    <Text onPress={() => navigation.navigate('AddMedicine')} style={{color: colors.secondary, textDecorationLine: 'underline', fontFamily: 'Poppins_300Light'}}>Adicionar medicamento</Text>
                </View>
            </View>
            
        </View>
    );
}