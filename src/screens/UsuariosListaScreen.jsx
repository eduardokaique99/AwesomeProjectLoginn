import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import styles from "../config/styles";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";
import { List, Button, Card } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome5";
import { styles2 } from "../config/styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const UsuariosListaScreen = () => {
  const [usuarios, setUsers] = useState([]);
  const navigation = useNavigation();

  const handleButtonPress = (screenName) => {
    navigation.navigate(screenName);
  };

  const fetchData = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.get(
        "https://apicondsecurity.azurewebsites.net/api/Usuario/GetAll",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUsers(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Erro ao buscar usuários", error);
    }
  };
  /*
  const fetchData = async () => {
    const colRef = collection(db, "usuarios");
    const docSnap = await getDocs(colRef);
    const usuariosData = docSnap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setUsers(usuariosData);
    console.log(usuariosData);
  };

  */
  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

  //useEffect(() => {
  //  async function fetchData() {
  //    // Busca dados da coleção "usuarios"
  //    const colRef = collection(db, "usuarios");
  //    const docSnap = await getDocs(colRef);
  //    const usersData = docSnap.docs.map((doc) => doc.data());
  //    setUsers(usersData);
  //    console.log(usersData);
  //  }
  //  fetchData();
  //}, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.innerContainer}>
          <Text style={[styles.h1, { fontSize: 24 }]}>Usuários</Text>
          <Text style={{ textAlign: "justify", margin: 10 }}>
            Usuários cadastrados no sistema.
          </Text>

          <View style={styles.container}>
            <TouchableOpacity
              style={styles2}
              onPress={() => handleButtonPress("UsuariosNewScreen")}
            >
              <Icon
                name="plus"
                size={20}
                color="#fff"
                style={{ marginRight: 10 }}
              />
              <Text style={styles2.buttonText}>Novo Usuário</Text>
            </TouchableOpacity>
            <FlatList
              keyExtractor={(item) => item.idUsuario?.toString() ?? item.email}
              data={usuarios}
              renderItem={({ item }) => (
                <Card style={{ margin: 8 }} key={item.idUsuario?.toString() ?? item.email}>
                  <Card.Title title={`Id do usuário: ${item.idUsuario}`} />
                  <Card.Content>
                    <List.Item
                      title={`Nome: ${item.nome}`}
                      left={(props) => <List.Icon {...props} icon="account" />}
                    />
                    <List.Item
                      title={`Email: ${item.email}`}
                      left={(props) => <List.Icon {...props} icon="email" />}
                    />
                    <List.Item
                      title={`Telefone: ${item.telefone}`}
                      left={(props) => <List.Icon {...props} icon="phone" />}
                    />
                    <List.Item
                      title={`Tipo de usuário: ${item.idTipo}`}
                      left={(props) => <List.Icon {...props} icon="account" />}
                    />
                    <List.Item
                      title={`Situação: ${item.situacao}`}
                      left={(props) => <List.Icon {...props} icon="check" />}
                    />
                    {/* Não é recomendado exibir a senha */}
                  </Card.Content>
                  <Card.Actions>
                    <Button
                      onPress={() =>
                        navigation.navigate("UsuariosEditScreen", { item })
                      }
                    >
                      Editar
                    </Button>
                    <Button
                      onPress={() =>
                        navigation.navigate("UsuariosDeleteScreen", { item })
                      }
                    >
                      Deletar
                    </Button>
                  </Card.Actions>
                </Card>
              )}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default UsuariosListaScreen;
