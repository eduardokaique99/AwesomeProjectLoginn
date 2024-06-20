import { View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { useState } from "react";
import styles from "../config/styles";
import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function VeiculosNewScreen({ navigation }) {
  
  const [placa, setPlaca] = useState("");
  const [marca, setMarca] = useState("");
  const [modelo, setModelo] = useState("");
  const [ano, setAno] = useState("");
  const [cor, setCor] = useState("");
  const [idUser, setIdUser] = useState("");
  const [situacao, setSituacao] = useState("");
  const [idTag, setIdTag] = useState("");

  const cadastrarVeiculo = async () => {
    try {
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
            idRfid: idTag,
          }),
          mode: "cors",
        }
      );

      console.log("Response Status:", response.status);
      const responseText = await response.text();
      console.log("Response Text:", responseText);

      if (!response.ok) {
        throw new Error(`Erro ao cadastrar veículo: ${responseText}`);
      }

      console.log("Veículo cadastrado com sucesso:", responseText);
      navigation.pop();

    } catch (error) {
      console.log('Erro ao cadastrar veículo', error);
    }
  };

  /*
    const cadastrarVeiculo = async () => {
    console.log("Salvo");
    // Cria uma nova referência de documento com um ID gerado automaticamente
    // primeiro pegamos o objeto de coleção
    const docRef = doc(
      // depois passamos a referência do banco de dados
      collection(db, "veiculos")
    );
    // e então setamos o documento
    await setDoc(docRef, {
      idVeiculo: idVeiculo,
      placa: placa,
      marca: marca,
      modelo: modelo,
      ano: ano,
      cor: cor,
      idCondominio: idCondominio,
      situacao: situacao,
    });
    navigation.pop()
  };
  */

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
          keyboardType="tag"
          value={placa}
          onChangeText={setPlaca}
        />
        <TextInput
          label="Marca"
          mode="outlined"
          keyboardType="tag"
          value={marca}
          onChangeText={setMarca}
        />
        <TextInput
          label="Modelo"
          mode="outlined"
          keyboardType="tag"
          value={modelo}
          onChangeText={setModelo}
        />
        <TextInput
          label="Ano"
          mode="outlined"
          keyboardType="tag"
          value={ano}
          onChangeText={setAno}
        />
        <TextInput
          label="Cor"
          mode="outlined"
          keyboardType="tag"
          value={cor}
          onChangeText={setCor}
        />
        <TextInput
          label="ID Usuário"
          mode="outlined"
          keyboardType="tag"
          value={idUser}
          onChangeText={setIdUser}
        />
        <TextInput
          label="Situação"
          mode="outlined"
          keyboardType="tag"
          value={situacao}
          onChangeText={setSituacao}
        />
        <TextInput
          label="ID TAG"
          mode="outlined"
          keyboardType="tag"
          value={idTag}
          onChangeText={setIdTag}
        />
        <Button
          textColor="black"
          mode="outlined"
          // style="margin-top: 10px;" html
          style={{
            // em react-native
            marginTop: 10,
            maxWidth: 260,
            alignSelf: "flex-end",
          }}
          onPress={cadastrarVeiculo}
        >
          Salvar
        </Button>
      </View>
    </View>
  );
}
