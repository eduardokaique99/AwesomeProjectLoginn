import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import RecuperarSenhaScreen from "../screens/RecuperarSenhaScreen";
import RegistroScreen from "../screens/RegistroScreen";
import SobreScreen from "../screens/SobreScreen";
import VeiculosNewScreen from "../screens/VeiculosNewScreen";
import TagNewScreen from "../screens/TagNewScreen";
import PerfilScreen from "../screens/PerfilScreen";
import UsuariosNewScreen from "../screens/UsuariosNewScreen";
import VeiculosListaScreen from "../screens/VeiculosListaScreen";
import VeiculosEditScreen from "../screens/VeiculosEditScreen";
import TagListaScreen from "../screens/TagListaScreen";
import TagEditScreen from "../screens/TagEditScreen";
import UsuariosListaScreen from "../screens/UsuariosListaScreen";
import UsuariosEditScreen from "../screens/UsuariosEditScreen";
import VeiculosDeleteScreen from "../screens/VeiculosDeleteScreen";
import TagDeleteScreen from "../screens/TagDeleteScreen";
import UsuariosDeleteScreen from "../screens/UsuariosDeleteScreen";
import RegistroListaScreen from "../screens/RegistroListaScreen";
import RegistroDeleteScreen from "../screens/RegistroDeleteScreen";
import TermoAceiteScreen from "../screens/TermoAceiteScreen";
import VeiculosTerceiroNewScreen from "../screens/VeiculosTerceiroNewScreen";

const Stack = createNativeStackNavigator();
const Tab = createMaterialBottomTabNavigator();

export default function AppNavigation() {
  return (
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
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="TermoAceiteScreen"
        component={TermoAceiteScreen}
        options={{
          title: "Logout",
          headerShown: false,
        }}
      />
    </Stack.Navigator>
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
      name="Registros"
      component={RegistroListaScreen}
      options={{
        tabBarLabel: "Registros",
        tabBarIcon: "comment",
        title: "Registros",
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
          title: "Usuários",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="UsuariosDeleteScreen"
        component={UsuariosDeleteScreen}
        options={{
          title: "Usuários",
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
        name="VeiculosTerceiroNewScreen"
        component={VeiculosTerceiroNewScreen}
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
      <Stack.Screen
        name="VeiculosDelete"
        component={VeiculosDeleteScreen}
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
      <Stack.Screen
        name="TagDeleteScreen"
        component={TagDeleteScreen}
        options={{
          title: "Tag",
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

function RegistroStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="RegistroScreen"
        component={RegistroListaScreen}
        options={{
          title: "Registro",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="RegistroDeleteScreen"
        component={RegistroDeleteScreen}
        options={{
          title: "Registro",
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

export { TabsNavigator };
