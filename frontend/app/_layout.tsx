import {createNativeStackNavigator} from "@react-navigation/native-stack"

import Signin from "@/pages/Signin" 
import Signup from "@/pages/Signup"
import AddMedicine from "@/pages/AddMedicine"
const Stack = createNativeStackNavigator()

export default function Routes(){
    return(
        <Stack.Navigator>
            <Stack.Screen
            name="Signin"
            component={Signin}
            options={{headerShown: false}}

            />
            <Stack.Screen
            name="Signup"
            component={Signup}
            options={{headerShown: false}}
            />

            <Stack.Screen
            name="AddMedicine"
            component={AddMedicine}
            options={{headerShown: false}}
            />
            
        </Stack.Navigator>
    )
}