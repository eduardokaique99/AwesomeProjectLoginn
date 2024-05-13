import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import RecuperarSenhaScreen from "../screens/RecuperarSenhaScreen";
import RegistroScreen from "../screens/RegistroScreen";
import SobreScreen from "../screens/SobreScreen";
// import VeiculosScreen from "../screens/VeiculosListaScreen";
import VeiculosNewScreen from "../screens/VeiculosNewScreen";
import UsuariosScreen from "../screens/UsuariosListaScreen";
// import TagScreen from "../screens/TagScreen";
import TagNewScreen from "../screens/TagNewScreen";
import PerfilScreen from "../screens/PerfilScreen";
import UsuariosNewScreen from "../screens/UsuariosNewScreen";
import VeiculosListaScreen from "../screens/VeiculosListaScreen";
import VeiculosEditScreen from "../screens/VeiculosEditScreen";
import TagListaScreen from "../screens/TagListaScreen";
import TagEditScreen from "../screens/TagEditScreen";
import UsuariosListaScreen from "../screens/UsuariosListaScreen";
import UsuariosEditScreen from "../screens/UsuariosEditScreen";

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
        <Stack.Screen
          name="HomeScreen"
          component={TabsNavigator}
          options={{
            title: "Logout",
            headerShown: true,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const TabsNavigator = () => (
  <Tab.Navigator>
    <Tab.Screen
      name="Home"
      component={HomeScreen}
      options={{
        tabBarLabel: "Início",
        tabBarIcon: "home",
        title: "Página Inicial",
      }}
    />
    <Tab.Screen
      name="Veiculos"
      component={VeiculosStack}
      options={{
        tabBarLabel: "Veículos",
        tabBarIcon: "car",
        title: "Veículos",
      }}
    />
    {/* <Tab.Screen name="Usuarios" component={UsuariosScreen} options={{
                        tabBarLabel: "Usuários",
                        tabBarIcon: "account",
                        title: "Usuários",
                    }}/> */}
    <Tab.Screen
      name="Usuarios"
      component={UsuariosStack}
      options={{
        tabBarLabel: "Usuários",
        tabBarIcon: "account",
        title: "Usuários",
      }}
    />
    <Tab.Screen
      name="TAG"
      component={TagStack}
      options={{
        tabBarLabel: "TAG",
        tabBarIcon: "barcode",
        title: "TAG",
      }}
    />
    <Tab.Screen
      name="Sobre"
      component={SobreScreen}
      options={{
        tabBarLabel: "Sobre",
        tabBarIcon: "check",
        title: "Sobre",
      }}
    />
    <Tab.Screen
      name="Perfil"
      component={PerfilScreen}
      options={{
        tabBarLabel: "Perfil",
        tabBarIcon: "check",
        title: "Perfil",
      }}
    />
  </Tab.Navigator>
);

function UsuariosStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="UsuariosScreen"
        component={UsuariosListaScreen}
        options={{
          title: "Usuários",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="UsuariosNewScreen"
        component={UsuariosNewScreen}
        options={{
          title: "Usuários",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="UsuariosEditScreen"
        component={UsuariosEditScreen}
        options={{
          title: "Veículos",
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

function VeiculosStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="VeiculosScreen"
        component={VeiculosListaScreen}
        options={{
          title: "Veículos",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="VeiculosNewScreen"
        component={VeiculosNewScreen}
        options={{
          title: "Veículos",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="VeiculosEditScreen"
        component={VeiculosEditScreen}
        options={{
          title: "Veículos",
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

function TagStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="TagScreen"
        component={TagListaScreen}
        options={{
          title: "Tag",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="TagNewScreen"
        component={TagNewScreen}
        options={{
          title: "Tag",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="TagEditScreen"
        component={TagEditScreen}
        options={{
          title: "Tag",
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

export { TabsNavigator };
