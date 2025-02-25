import { Dimensions, StyleSheet } from "react-native"
import colors from "@/global/colors"

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.background,
        flex: 1,
        justifyContent: 'center'
    }, 
    title: {
        fontFamily: 'Poppins_700Bold',
        fontSize: 36, 
        color: colors.textPrimary, 
        marginBottom: 20
    },
    imageContainer: {
        display: "flex", 
        justifyContent: 'center',
        width: '100%',
        height: Dimensions.get('window').height/8,
    },
    formContainer: {
        alignContent: 'center', 
        justifyContent: 'center', 
        width: '100%', 
        alignItems: 'center',
        gap: 20,
        height: Dimensions.get('window').height/1.3,
    },
    formInput: { 
        flexDirection: 'row', 
        alignItems: 'center',  
        width: '70%', 
        alignSelf: 'center', 
        backgroundColor: colors.inputLoginBackground,
        borderRadius: 10,
        padding: 5
    },
    formButton: {
        alignSelf: 'center',
         backgroundColor: colors.primary, 
         padding: 12, 
         borderRadius: 50, 
         width: '40%', 
         boxShadow: '1px 2px 6px rgba(0, 0, 0, 0.25)'
    }
})

export default styles