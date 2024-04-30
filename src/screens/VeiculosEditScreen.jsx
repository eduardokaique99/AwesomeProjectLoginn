import { View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { useEffect, useState } from "react";
import styles from "../config/styles";
import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "../config/firebase";

export default function VeiculosEditScreen({ navigation, route }) {
  const { item } = route.params;
  const [placa, setPlaca] = useState("");
  const [marca, setMarca] = useState("");
  const [ano, setAno] = useState("");
  const [cor, setCor] = useState("");
  const [nome, setNome] = useState("");
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
      placa: placa,
      marca: marca,
      ano: ano,
      cor: cor,
      nome: nome,
    });
  };

  useEffect(() => {
    console.log(item);
    console.log("estamos procurando a UID da coleção", item);

    setPlaca(item.placa);
    setMarca(item.marca);
    setAno(item.ano);
    setCor(item.cor);
    setNome(item.nome);
  }, []);

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
          label="Responsável"
          mode="outlined"
          keyboardType="tag"
          value={nome}
          onChangeText={setNome}
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
