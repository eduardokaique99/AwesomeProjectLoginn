import React, { useState, useCallback } from "react";
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  StyleSheet
} from "react-native";
import { styles2 } from '../config/styles';
//import styles from "../config/styles";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { List, Button, Card, TextInput } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome5";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const RegistroListaScreen = () => {
  const [registros, setRegistros] = useState([]);
  const [filteredRegistros, setFilteredRegistros] = useState([]);
  const [placaFiltro, setPlacaFiltro] = useState("");
  const [idUsuarioFiltro, setIdUsuarioFiltro] = useState("");
  const [dataFiltro, setDataFiltro] = useState("");
  const navigation = useNavigation();

  const fetchData = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.get('https://apicondsecurity.azurewebsites.net/api/Registros/GetAll', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setRegistros(response.data);
      setFilteredRegistros(response.data);
    } catch (error) {
      console.error('Erro ao buscar registros', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

  const filtrarPorPlaca = () => {
    const filtrados = registros.filter(registro => 
      registro.placa && registro.placa.includes(placaFiltro)
    );
    setFilteredRegistros(filtrados);
  };

  const filtrarPorIdUsuario = () => {
    const filtrados = registros.filter(registro => 
      registro.idUsuario && registro.idUsuario.toString().includes(idUsuarioFiltro)
    );
    setFilteredRegistros(filtrados);
  };

  const filtrarPorData = () => {
    const filtrados = registros.filter(registro => 
      (registro.dataHoraEntrada && registro.dataHoraEntrada.includes(dataFiltro)) ||
      (registro.dataHoraSaida && registro.dataHoraSaida.includes(dataFiltro))
    );
    setFilteredRegistros(filtrados);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.innerContainer}>
          <Text style={[styles.h1, { fontSize: 24 }]}>Registros de Entrada e Saída</Text>
          <Text style={{ textAlign: "justify", margin: 10 }}>
            Lista de registros de entrada e saída no condomínio.
          </Text>

          <TextInput
            label="Placa"
            value={placaFiltro}
            onChangeText={setPlacaFiltro}
            style={styles.input}
          />
          <Button onPress={filtrarPorPlaca}>Filtrar por Placa</Button>

          <TextInput
            label="ID Usuário"
            value={idUsuarioFiltro}
            onChangeText={setIdUsuarioFiltro}
            style={styles.input}
          />
          <Button onPress={filtrarPorIdUsuario}>Filtrar por ID Usuário</Button>

          <TextInput
            label="Data (YYYY-MM-DD)"
            value={dataFiltro}
            onChangeText={setDataFiltro}
            style={styles.input}
          />
          <Button onPress={filtrarPorData}>Filtrar por Data</Button>

          <TouchableOpacity
            style={styles2.button}
            onPress={() => navigation.navigate("RegistroNewScreen")}
          >
            <Icon
              name="plus"
              size={20}
              color="#fff"
              style={{ marginRight: 10 }}
            />
            <Text style={styles2.buttonText}>Novo Registro</Text>
          </TouchableOpacity>
          <FlatList
            keyExtractor={(item) => item.idRegistros.toString()}
            data={filteredRegistros}
            renderItem={({ item }) => (
              <Card style={{ margin: 8 }}>
                <Card.Title title={`Registro ID: ${item.idRegistros}`} />
                <Card.Content>
                  <List.Item
                    title={`Data e Hora Entrada: ${item.dataHoraEntrada || 'Não registrado'}`}
                    left={(props) => <List.Icon {...props} icon="clock" />}
                  />
                  <List.Item
                    title={`Data e Hora Saída: ${item.dataHoraSaida || 'Não registrado'}`}
                    left={(props) => <List.Icon {...props} icon="clock" />}
                  />
                  <List.Item
                    title={`Placa: ${item.placa}`}
                    left={(props) => <List.Icon {...props} icon="car" />}
                  />
                  <List.Item
                    title={`ID Veículo Usuário: ${item.idVeiculoUsuario || 'N/A'}`}
                    left={(props) => <List.Icon {...props} icon="account" />}
                  />
                  <List.Item
                    title={`ID Portão: ${item.idPortao}`}
                    left={(props) => <List.Icon {...props} icon="gate" />}
                  />
                  <List.Item
                    title={`ID Veículo Terceiro: ${item.idVeiculoTerceiro}`}
                    left={(props) => <List.Icon {...props} icon="car-side" />}
                  />
                  <List.Item
                    title={`ID Usuário: ${item.idUsuario}`}
                    left={(props) => <List.Icon {...props} icon="account" />}
                  />
                  <List.Item
                    title={`ID Veículo: ${item.idVeiculo}`}
                    left={(props) => <List.Icon {...props} icon="car" />}
                  />
                  <List.Item
                    title={`Tag: ${item.tag || 'N/A'}`}
                    left={(props) => <List.Icon {...props} icon="tag" />}
                  />
                </Card.Content>
                <Card.Actions>
                  <Button
                    onPress={() =>
                      navigation.navigate("RegistroDeleteScreen", { item })
                    }
                  >
                    Deletar
                  </Button>
                </Card.Actions>
              </Card>
            )}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  innerContainer: {
    padding: 20,
  },
  h1: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  input: {
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  button: {
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
  },
});

export default RegistroListaScreen;
