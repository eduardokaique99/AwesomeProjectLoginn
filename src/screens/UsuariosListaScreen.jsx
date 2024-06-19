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

const UsuariosListaScreen = () => {
  const [usuarios, setUsers] = useState([]);
  const navigation = useNavigation();

  const handleButtonPress = (screenName) => {
    navigation.navigate(screenName);
  };

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
            Local destinado para o CRUD de usuários.
          </Text>

          <View style={styles.container}>
            <TouchableOpacity
              style={styles2}
              onPress={() => handleButtonPress("TagNewScreen")}
            >
              <Icon
                name="plus"
                size={20}
                color="#fff"
                style={{ marginRight: 10 }}
              />
              <Text style={styles2.buttonText}>Nova Usuário</Text>
            </TouchableOpacity>
            <FlatList
              keyExtractor={(item) => item.id}
              data={usuarios}
              renderItem={({ item }) => (
                <Card style={{ margin: 8 }}>
                  <Card.Title title={`Id do usuário: ${item.idUsuario}`} />
                  <Card.Content>
                    <List.Item
                      title={`Email: ${item.email}`}
                      left={(props) => <List.Icon {...props} icon="email" />}
                    />
                    <List.Item
                      title={`Nome: ${item.nome}`}
                      left={(props) => <List.Icon {...props} icon="account" />}
                    />
                    <List.Item
                      title={`CPF: ${item.cpf}`}
                      left={(props) => (
                        <List.Icon {...props} icon="card-account-details" />
                      )}
                    />
                    <List.Item
                      title={`Telefone: ${item.telefone}`}
                      left={(props) => <List.Icon {...props} icon="phone" />}
                    />
                    <List.Item
                      title={`Id da Residência: ${item.idResidencia}`}
                      left={(props) => <List.Icon {...props} icon="home" />}
                    />
                    <List.Item
                      title={`Id do Condomínio: ${item.idCondominio}`}
                      left={(props) => <List.Icon {...props} icon="home" />}
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
