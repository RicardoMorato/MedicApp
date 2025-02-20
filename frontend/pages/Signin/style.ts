import { StyleSheet } from "react-native"


const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        display: "flex",
        height: "100%",
        alignItems: "center", 
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
        flex: 1, 
        width: '100%', 
        height: '100%',
        top: '5%'
    },
    formContainer: {
        display: "flex",
        flex: 6, 
        alignContent: 'center', 
        justifyContent: 'center', 
        width: '100%', 
        height: '100%',
        alignItems: 'center',
        paddingBottom: 90, 
        gap: 20
    },
    formInput: { 
        flexDirection: 'row', 
        alignItems: 'center',  
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
         boxShadow: '1px 2px 6px rgba(0, 0, 0, 0.25)'
    }
})

export default styles