import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import styles from "../config/styles";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";
import { List, Button, Card } from "react-native-paper";

const UsuariosListaScreen = () => {
  const [users, setUsers] = useState([]);
  const navigation = useNavigation();

  const handleButtonPress = (screenName) => {
    navigation.navigate(screenName);
  }

  useEffect(() => {
    async function fetchData() {
      // Busca dados da coleção "usuarios"
      const colRef = collection(db, "usuarios");
      const docSnap = await getDocs(colRef);
      const usersData = docSnap.docs.map((doc) => doc.data());
      setUsers(usersData);
      console.log(usersData);
    }
    fetchData();
  }, []);


  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.innerContainer}>
          <Text style={[styles.h1, { fontSize: 24 }]}>Usuários</Text>
          <Text style={{ textAlign: "justify", margin: 10 }}>
            Local destinado para o CRUD de usuários.
          </Text>
          
          <View style={styles.container}>
            <FlatList
              data={usuarios}
              renderItem={({ item }) => (
                <Card style={{ margin: 8 }}>
                  <Card.Title title={`Usuário: ${item.nome}`} />
                  <Card.Content>
                    <List.Item
                      title={`Email: ${item.email}`}
                      left={(props) => <List.Icon {...props} icon="email" />}
                    />
                    {/* Não é recomendado exibir a senha */}
                  </Card.Content>
                  <Card.Actions>
                    <Button
                      onPress={() => handleButtonPress("UsuariosEditScreen")}
                    >
                      Editar
                    </Button>
                    <Button
                      onPress={() => handleButtonPress("UsuariosEditScreen")}
                    >
                      Excluir
                    </Button>
                  </Card.Actions>
                </Card>
              )}
              keyExtractor={(item) => item.email}
            />
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleButtonPress("UsuariosNewScreen")}
            >
              <Text style={styles.buttonText}>Cadastrar Usuário</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleButtonPress("UsuariosReportScreen")}>
              <Text style={styles.buttonText}>Relatório de Usuários</Text>
              </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default UsuariosListaScreen;