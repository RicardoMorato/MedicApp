import { Dimensions, StyleSheet } from "react-native"

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        flex: 1,
        justifyContent: 'center'
    }, 
    title: {
        fontFamily: 'Poppins_700Bold',
        fontSize: 36, 
        color: '#000', 
        marginBottom: 20
    },
    imageContainer: {
        display: "flex", 
        justifyContent: 'center',
        width: '100%',
        height: Dimensions.get('window').height / 8,
    },
    imageContainerSmall: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        padding: 10,
    },
    formContainer: {
        alignContent: 'center', 
        justifyContent: 'center', 
        width: '100%', 
        alignItems: 'center',
        gap: 20,
        height: Dimensions.get('window').height / 1.3,
    },
    formInput: { 
        flexDirection: 'row', 
        alignItems: 'center',  
        justifyContent: 'center',
        width: '70%', 
        alignSelf: 'center', 
        backgroundColor: '#D9D9D9',
        borderRadius: 10,
        padding: 5
    },
    formButton: {
        alignSelf: 'center',
         backgroundColor: '#419DFF', 
         padding: 12, 
         borderRadius: 50, 
         width: '40%', 
         boxShadow: '1px 2px 6px rgba(0, 0, 0, 0.25)',
    }
})

export default styles