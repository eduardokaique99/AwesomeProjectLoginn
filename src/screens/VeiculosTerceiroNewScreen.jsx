import { View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { useState } from "react";
import styles from "../config/styles";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function VeiculosTerceiroNewScreen({ navigation }) {
  const [placa, setPlaca] = useState("");
  const [marca, setMarca] = useState("");
  const [modelo, setModelo] = useState("");
  const [ano, setAno] = useState("");
  const [cor, setCor] = useState(""); 
  const [situacao, setSituacao] = useState("");

  const cadastrarVeiculoTerceiro = async () => {
    try {
      const idUserString = await AsyncStorage.getItem("idUser");
      const idUser = Number.parseInt(idUserString, 10);
      const token = await AsyncStorage.getItem("token");
      console.log("Token:", token);

      const response = await fetch(
        "https://apicondsecurity.azurewebsites.net/api/LayoutUnificado/CadastroUnificadoVeiculo",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            placa: placa,
            marca: marca,
            modelo: modelo,
            cor: cor,
            ano: ano,
            situacao: situacao,
            idUsuario: idUser,
            idRfid: 0,
          }),
          mode: "cors",
        }
      );

      const responseText = await response.text();

      if (!response.ok) {
        throw new Error(`Erro ao cadastrar veículo: ${responseText}`);
      }

      console.log("Response Status:", response.status);
      console.log("Response Text:", responseText);

      const dataVeiculo = JSON.parse(responseText); // Corrected to parse the response text
      console.log("Data Veículo:", dataVeiculo);
      await AsyncStorage.setItem("idVeiculo", dataVeiculo.idVeiculo.toString()); // Convert idVeiculo to string
      const idVeiculoString = await AsyncStorage.getItem("idVeiculo");
      const idVeiculo = Number.parseInt(idVeiculoString, 10);
      console.log("ID Veículo:", idVeiculo);

      const responseTerceiro = await fetch(
        "https://apicondsecurity.azurewebsites.net/api/VeiculoTerceiro/Cadastrar",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            placa: placa,
            idVeiculo: idVeiculo,
            idUser: idUser,
          }),
          mode: "cors",
        }
      );

      const responseTextTerceiro = await responseTerceiro.text();
      console.log("Response Status Terceiro:", responseTerceiro.status);
      console.log("Response Text Terceiro:", responseTextTerceiro);

      if (!responseTerceiro.ok) {
        throw new Error(`Erro ao cadastrar veículo terceiro: ${responseTextTerceiro}`);
      }

      console.log("Veículo cadastrado com sucesso:", responseText);
      console.log("Veículo terceiro cadastrado com sucesso:", responseTextTerceiro);

      navigation.navigate("VeiculosListaScreen");

    } catch (error) {
      console.error("Erro ao cadastrar veículo", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text variant="headlineLarge" style={styles.selfCenter}>
          Cadastro de Veículo
        </Text>
        <Text variant="bodySmall" style={styles.selfCenter}>
          Insira as informações
        </Text>

        <TextInput
          label="Placa"
          mode="outlined"
          keyboardType="default"
          value={placa}
          onChangeText={setPlaca}
        />
        <TextInput
          label="Marca"
          mode="outlined"
          keyboardType="default"
          value={marca}
          onChangeText={setMarca}
        />
        <TextInput
          label="Modelo"
          mode="outlined"
          keyboardType="default"
          value={modelo}
          onChangeText={setModelo}
        />
        <TextInput
          label="Ano"
          mode="outlined"
          keyboardType="numeric"
          value={ano}
          onChangeText={setAno}
        />
        <TextInput
          label="Cor"
          mode="outlined"
          keyboardType="default"
          value={cor}
          onChangeText={setCor}
        />
        <TextInput
          label="Situação"
          mode="outlined"
          keyboardType="default"
          value={situacao}
          onChangeText={setSituacao}
        />
        <Button
          textColor="black"
          mode="outlined"
          style={{
            marginTop: 10,
            maxWidth: 260,
            alignSelf: "flex-end",
          }}
          onPress={cadastrarVeiculoTerceiro}
        >
          Salvar
        </Button>
      </View>
    </View>
  );
}
