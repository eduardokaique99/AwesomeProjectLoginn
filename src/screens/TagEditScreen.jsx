import { View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { useEffect, useState } from "react";
import styles from "../config/styles";
import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function TagEditScreen({ navigation, route }) {
  const { item } = route.params;
  const [idTag, setIdTag] = useState("");
  const [numero, setNumero] = useState("");
  const [situacao, setNSituacao] = useState("");
  const [idCondominio, setIdCondominio] = useState("");

  const alterarTag = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      console.log('Token:', token);
  
      const response = await fetch('https://apicondsecurity.azurewebsites.net/api/Rfid/Alterar', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idRfid: idTag , numero: numero, situacao: situacao, idCondominio: idCondominio }),
        mode: 'cors',
      });

      console.log('Response Status:', response.status);
      const responseText = await response.text();
      console.log('Response Text:', responseText);
  
      if (!response.ok) {
        throw new Error(`Erro ao alterar tag: ${responseText}`);
      }

      // Aqui tratamos a resposta como texto simples, já que não é um JSON
      console.log('Tag alterada com sucesso:', responseText);
      navigation.pop();
    } catch (error) {
      console.log('Erro ao alterar tag', error);
    }
  };

  /*
    const cadastrarTag = async () => {
    console.log("Salvo");
    // Cria uma nova referência de documento com um ID gerado automaticamente
    // primeiro pegamos o objeto de coleção
    const docRef = doc(
      // depois passamos a referência do banco de dados
      collection(db, "tags")
    );
    // e então setamos o documento
    await setDoc(docRef, {
      idTag: idTag,
      numero: numero,
      situacao: situacao,
      idCondominio: idCondominio,
    });
  };

  useEffect(() => {
    console.log(item);
    console.log("estamos procurando a UID da coleção", item);

    setTag(item.tag);
    setNome(item.nome);
  }, []);

  */

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text variant="headlineLarge" style={styles.selfCenter}>
          Edição de Tag
        </Text>
        <Text variant="bodySmall" style={styles.selfCenter}>
          Insira as informações
        </Text>

        <TextInput
          label="ID"
          mode="outlined"
          keyboardType="id"
          value={idTag}
          onChangeText={setIdTag}
        />
        <TextInput
          label="Número"
          mode="outlined"
          keyboardType="number-pad"
          value={numero}
          onChangeText={setNumero}
        />
        <TextInput
          label="Situação"
          mode="outlined"
          keyboardType="tag"
          value={situacao}
          onChangeText={setNSituacao}
        />
        <TextInput
          label="ID Condomínio"
          mode="outlined"
          keyboardType="id"
          value={idCondominio}
          onChangeText={setIdCondominio}
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
          onPress={alterarTag}
        >
          Salvar
        </Button>
      </View>
    </View>
  );
}
