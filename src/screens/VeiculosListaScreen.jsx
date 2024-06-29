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
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const VeiculosListaScreen = () => {
  const [veiculos, setVeiculos] = useState([]);
  const navigation = useNavigation();

  const handleButtonPress = (screenName) => {
    navigation.navigate(screenName);
  };

  const fetchData = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.get('https://apicondsecurity.azurewebsites.net/api/Veiculo/GetAll', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setVeiculos(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Erro ao buscar veículos', error);
    }
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
            Veículos cadastrados no sistema.
          </Text>

          <View style={styles.container}>
            <TouchableOpacity
              style={styles2}
              onPress={() => handleButtonPress("VeiculosNewScreen")}
            >
              <Icon
                name="plus"
                size={20}
                color="#fff"
                style={{ marginRight: 10 }}
              />
              <Text style={styles2.buttonText}>Novo Veículo</Text>
            </TouchableOpacity>
             <TouchableOpacity
              style={styles2}
              onPress={() => handleButtonPress("VeiculosTerceiroNewScreen")}
            >
              <Icon
                name="plus"
                size={20}
                color="#fff"
                style={{ marginRight: 10 }}
              />
              <Text style={styles2.buttonText}>Novo Veículo Terceiro</Text>
            </TouchableOpacity>
            <FlatList
              keyExtractor={(item) => item.idVeiculo.toString()}
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
                      title={`Usuário: ${item.idUser}`}
                      left={(props) => <List.Icon {...props} icon="home" />}
                    />
                    <List.Item
                      title={`Situação: ${item.situacao}`}
                      left={(props) => <List.Icon {...props} icon="check" />}
                    />
                    <List.Item
                      title={`Rfid: ${item.idTag}`}
                      left={(props) => <List.Icon {...props} icon="tag" />}
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
