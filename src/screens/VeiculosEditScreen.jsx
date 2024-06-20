import { View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { useEffect, useState } from "react";
import styles from "../config/styles";
import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function VeiculosEditScreen({ navigation, route }) {
  const { item } = route.params; // Correctly get the item from route params
  const [idVeiculo, setIdVeiculo] = useState("");
  const [placa, setPlaca] = useState("");
  const [marca, setMarca] = useState("");
  const [modelo, setModelo] = useState("");
  const [ano, setAno] = useState("");
  const [cor, setCor] = useState("");
  const [idUser, setidUser] = useState("");
  const [situacao, setSituacao] = useState("");

  const alterarVeiculo = async () => { 
    try {
      const token = await AsyncStorage.getItem("token");
      console.log("Token:", token);

      const response = await fetch('https://apicondsecurity.azurewebsites.net/api/Veiculo/Alterar', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idVeiculo: idVeiculo, placa: placa, marca: marca, modelo: modelo, ano: ano, cor: cor, idUsuario: idUser, situacao: situacao }),
        mode: 'cors',
      });

      console.log('Response Status:', response.status);
      const responseText = await response.text();
      console.log('Response Text:', responseText);

      if (!response.ok) {
        throw new Error(`Erro ao alterar veículo: ${responseText}`);
      }

      console.log('Veículo alterado com sucesso:', responseText);
      navigation.pop();
    } catch (error) {
      console.log('Erro ao alterar veículo', error);
    }
  };

  /*

  const cadastrarVeiculo = async () => {
    console.log("Salvo");
    // Cria uma nova referência de documento com um ID gerado automaticamente
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
      idUsuario: idUser,
      situacao: situacao,
    });
    navigation.goBack(); // Go back to the previous screen after saving
  };

  useEffect(() => {
    if (item) {
      console.log(item);
      console.log("estamos procurando a UID da coleção", item);

      setIdVeiculo(item.idVeiculo);
      setPlaca(item.placa);
      setMarca(item.marca);
      setModelo(item.modelo);
      setAno(item.ano);
      setCor(item.cor);
      setidUser(item.idUser);
      setSituacao(item.situacao);
    }
  }, [item]);
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
          label="ID"
          mode="outlined"
          keyboardType="default"
          value={idVeiculo}
          onChangeText={setIdVeiculo}
        />
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
          keyboardType="default"
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
          label="ID Usuário"
          mode="outlined"
          keyboardType="default"
          value={idUser}
          onChangeText={setidUser}
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
          onPress={cadastrarVeiculo}
        >
          Salvar
        </Button>
      </View>
    </View>
  );
}
