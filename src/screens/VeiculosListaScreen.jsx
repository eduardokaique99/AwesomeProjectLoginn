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

const VeiculosListaScreen = () => {
  const [veiculos, setVeiculos] = useState([]);
  const navigation = useNavigation();

  const handleButtonPress = (screenName) => {
    navigation.navigate(screenName);
  };

  useEffect(() => {
    async function fetchData() {
      // Busca dados da coleção "veiculos"
      const colRef = collection(db, "veiculos");
      const docSnap = await getDocs(colRef);
      const veiculosData = docSnap.docs.map((doc) => doc.data());
      setVeiculos(veiculosData);
      console.log(veiculosData);
    }
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.innerContainer}>
          <Text style={[styles.h1, { fontSize: 24 }]}>Veículos</Text>
          <Text style={{ textAlign: "justify", margin: 10 }}>
            Local destinado para o CRUD de veículos.
          </Text>
          <View style={styles.container}>
            <FlatList
              data={veiculos}
              renderItem={({ item }) => (
                <Card style={{ margin: 8 }}>
                  <Card.Title title={`Veículo: ${item.nome}`} />
                  <Card.Content>
                    <List.Item
                      title={`Placa: ${item.placa}`}
                      left={(props) => <List.Icon {...props} icon="car" />}
                    />
                    <List.Item
                      title={`Marca: ${item.marca}`}
                      left={(props) => <List.Icon {...props} icon="tag" />}
                    />
                    <List.Item
                      title={`Ano: ${item.ano}`}
                      left={(props) => <List.Icon {...props} icon="calendar" />}
                    />
                    <List.Item
                      title={`Cor: ${item.cor}`}
                      left={(props) => <List.Icon {...props} icon="palette" />}
                    />
                  </Card.Content>
                  <Card.Actions>
                    <Button
                      onPress={() =>
                        navigation.navigate("VeiculosEditScreen", { item })
                      }
                    >
                      Editar
                    </Button>
                    <Button
                      onPress={() =>
                        navigation.navigate("VeiculosDelete", { item })
                      }
                    >
                      Deletar
                    </Button>
                  </Card.Actions>
                </Card>
              )}
              keyExtractor={(item) => item.placa}
            />
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleButtonPress("VeiculosNewScreen")}
            >
              <Text style={styles.buttonText}>Adicionar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleButtonPress("VeiculosEditScreen")}
            >
              <Text style={styles.buttonText}>Editar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleButtonPress("VeiculosRemoveScreen")}
            >
              <Text style={styles.buttonText}>Remover</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleButtonPress("VeiculosReportScreen")}
            >
              <Text style={styles.buttonText}>Relatório</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default VeiculosListaScreen;
