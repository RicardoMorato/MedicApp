import React from "react";
import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons';
import styles from "./style";
import Logo from '../../assets/images/MedicApp-Logo.png';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from "react";
import { useFonts, Poppins_700Bold, Poppins_300Light} from '@expo-google-fonts/poppins';
import colors from "@/global/colors"
import { useForm, Controller} from "react-hook-form";
import { emailValidationPattern } from "@/components/utils/dataValidation";
import passwordValidation from "@/utils/passwordValidation";

type FormData = {
    Nome: string
    Email: string
}

export default function Signup() {
    const { control, handleSubmit, formState: { errors, isSubmitted } } = useForm({
        defaultValues: {
          Nome: '',
          Email: '',
          Senha: ''
        }
      });
      const onSubmit = (data: FormData) => {
        console.log(data)
      }
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
                <Text style={styles.title}>Cadastrar</Text>
                <Controller
                    name="Nome"
                    control={control}
                    rules={{ 
                        required: "O nome é obrigatório."
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <View style={{ gap: 5 }}>
                            <View style={[styles.formInput, errors?.Nome ? { borderColor: colors.error, borderWidth: 1 } 
                                    : isSubmitted && value 
                                        ? { borderColor: colors.primary, borderWidth: 1.5 } 
                                        : { borderColor: 'transparent', borderWidth: 0 }
                            ]}>
                                <Ionicons name="person" size={24} color={errors?.Nome ? colors.error : colors.primary} style={{ marginLeft: 10 }} />
                                <TextInput
                                    placeholder="Nome completo"
                                    style={{ height: 40, flex: 1, marginLeft: 10 }}
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                />
                            </View>
                            {errors?.Nome && <Text style={{ color: colors.error }}>{errors?.Nome.message}</Text>}
                        </View>
                    )}
                />
                <Controller
                name="Email"
                control={control}
                rules={{
                    required: "O email é obrigatório.",
                    pattern: {
                        value: emailValidationPattern,
                        message: "Email inválido."
                    }
                }}
                
                render={({field: { onChange, onBlur, value }}) => (
                <View style={{ gap: 5 }}>
                    <View style={[styles.formInput, errors?.Email ? { borderColor: colors.error, borderWidth: 1 } 
                                    : isSubmitted && value 
                                        ? { borderColor: colors.primary, borderWidth: 1.5 } 
                                        : { borderColor: 'transparent', borderWidth: 0 }
                            ]}>
                        <Ionicons name="mail" size={24} color={errors?.Email ? colors.error : colors.primary} style={{ marginLeft: 10 }} />
                        <TextInput
                            placeholder="Email"
                            style={{ height: 40,  flex: 1, marginLeft: 10 }}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    </View>
                    {errors?.Email && <Text style={{ color: colors.error }}>{errors?.Email?.message}</Text>}
                    </View>
                    )}
                />

            <Controller 
            control={control}
            name="Senha"
            rules={{
                required: "A senha é obrigatória.",
                minLength: {
                    value: 8,
                    message: "A senha deve ter no mínimo 8 caracteres."
                },
                validate: passwordValidation
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
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            style={{ height: 40, flex: 1, marginLeft: 10 }}
                        />
                    </View>
                    {errors?.Senha && <Text style={{color: colors.error}}>{errors?.Senha?.message}</Text>}
                    </View>
            )}
            />
            
            
                <View style={{top: 20, display: 'flex', gap: 20, width: '100%', alignItems: 'center' }}>
                <TouchableOpacity 
                    style={styles.formButton} onPress={handleSubmit(onSubmit)}
                >
                    <Text style={{ color: colors.background, textAlign: 'center' }}>Cadastrar</Text>
                </TouchableOpacity>
                <Text style={{ textAlign: 'center', color: colors.primary, fontFamily: 'Poppins_300Light' }} >Já tem uma conta? <Text onPress={() => navigation.navigate('Signin')} style={{ color: colors.secondary, 
                    textDecorationLine: 'underline' }}>{`Entrar`}</Text></Text>
                </View>
            </View>
        </View>
    );
}
