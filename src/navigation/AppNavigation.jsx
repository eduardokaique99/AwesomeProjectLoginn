import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import RecuperarSenhaScreen from "../screens/RecuperarSenhaScreen";
import RegistroScreen from "../screens/RegistroScreen";
import SobreScreen from "../screens/SobreScreen";
import VeiculosScreen from "../screens/VeiculosScreen";
import UsuariosScreen from "../screens/UsuariosScreen";
import TagScreen from "../screens/TagScreen";


const Stack = createNativeStackNavigator();
const Tab = createMaterialBottomTabNavigator();


export default function AppNavigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="LoginScreen"
                    component={LoginScreen}
                    options={{
                        title: "Login",
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="RegistroScreen"
                    component={RegistroScreen}
                    options={{
                        title: "Registrar-se",
                        // headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="RecuperarSenhaScreen"
                    component={RecuperarSenhaScreen}
                    options={{
                        title: "Recuperar senha",
                        // headerShown: false,
                    }}
                />
                {/* <Stack.Screen
                    name="HomeScreen"
                    component={HomeScreen}
                    options={{
                        title: "Página Inicial",
                        headerShown: false,
                    }}
                /> */}
                <Stack.Screen
                    name="HomeScreen"
                    component={TabsNavigator}
                    options={{
                        title: "Sair",
                        headerShown: true,
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}


const TabsNavigator = () => (
    <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} options={{
          tabBarLabel: "Início",
          tabBarIcon: "home",
          title: "Página Inicial",
        }}/>
        <Tab.Screen name="Veiculos" component={VeiculosScreen} options={{
                        tabBarLabel: "Veículos",
                        tabBarIcon: "car",
                        title: "Veículos",
                    }}/>
        <Tab.Screen name="Usuarios" component={UsuariosScreen} options={{
                        tabBarLabel: "Usuários",
                        tabBarIcon: "account",
                        title: "Usuários",
                    }}/>
        <Tab.Screen name="TAG" component={TagScreen} options={{
                        tabBarLabel: "TAG",
                        tabBarIcon: "barcode",
                        title: "TAG",
                    }}/>
        <Tab.Screen name="Sobre" component={SobreScreen} options={{
                        tabBarLabel: "Sobre",
                        tabBarIcon: "check",
                        title: "Sobre",
                    }}/>
    </Tab.Navigator>
);

export { TabsNavigator };