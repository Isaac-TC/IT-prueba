
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import WelcomeScreen from "../screnns/WelcomeScreen";
import LogingScreen from "../screnns/LogingScreen";
import RegistroScreen from "../screnns/RegistroScreen";
import OperacionesScreens from "../screnns/OperacionesScreens";
import ProductosScreens from "../screnns/ProductosScreens";

const Tab = createBottomTabNavigator();

function MyTabs(){
    return(
        <Tab.Navigator>
            <Tab.Screen name="Productos" component={ProductosScreens}/>
            
        </Tab.Navigator>
    );
}


///
const Stack = createStackNavigator();

function MyStack(){
    return(
        <Stack.Navigator screenOptions={()=> ({headerShown: false})}>
            
            <Stack.Screen name= 'Welcome' component ={WelcomeScreen}/>
            <Stack.Screen name= 'Loging' component = {LogingScreen}/>
            <Stack.Screen name= 'Registro' component = {RegistroScreen}/>
            <Stack.Screen name= 'Productos' component = {MyTabs}/>
            
        </Stack.Navigator>
    );
}


//////////////////////////////

export default function MainNavigator(){
    return(
       <NavigationContainer>
        <MyStack/>
       </NavigationContainer> 

    );
}
