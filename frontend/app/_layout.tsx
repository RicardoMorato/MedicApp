import {createNativeStackNavigator} from "@react-navigation/native-stack"

import Signin from "@/pages/Signin" 
import Signup from "@/pages/Signup"
import Home from "@/pages/Home"
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
            name="Home"
            component={Home}
            options={{headerShown: false}}
            />
            
        </Stack.Navigator>
    )
}