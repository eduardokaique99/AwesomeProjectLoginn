import React, { useState, useCallback } from "react";
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import styles from "../config/styles";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";
import { List, Button, Card } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome5";
import { styles2 } from "../config/styles";

const VeiculosListaScreen = () => {
  const [veiculos, setVeiculos] = useState([]);
  const navigation = useNavigation();

  const handleButtonPress = (screenName) => {
    navigation.navigate(screenName);
  };

  const fetchData = async () => {
    const colRef = collection(db, "veiculos");
    const docSnap = await getDocs(colRef);
    const veiculosData = docSnap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setVeiculos(veiculosData);
    console.log(veiculosData);
  };

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.innerContainer}>
          <Text style={[styles.h1, { fontSize: 24 }]}>Veículos</Text>
          <Text style={{ textAlign: "justify", margin: 10 }}>
            Local destinado para o CRUD de veículos.
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
              <Text style={styles2.buttonText}>Novo Veículo</Text>
            </TouchableOpacity>
            <FlatList
              keyExtractor={(item) => item.id}
              data={veiculos}
              renderItem={({ item }) => (
                <Card style={{ margin: 8 }}>
                  <Card.Title title={`Id do veículo: ${item.idVeiculo}`} />
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
                      title={`Modelo: ${item.modelo}`}
                      left={(props) => <List.Icon {...props} icon="car" />}
                    />
                    <List.Item
                      title={`Cor: ${item.cor}`}
                      left={(props) => <List.Icon {...props} icon="palette" />}
                    />
                    <List.Item
                      title={`Condomínio: ${item.idCondominio}`}
                      left={(props) => <List.Icon {...props} icon="home" />}
                    />
                    <List.Item
                      title={`Situação: ${item.situacao}`}
                      left={(props) => <List.Icon {...props} icon="check" />}
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
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default VeiculosListaScreen;
