import { View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { useState } from "react";
import styles from "../config/styles";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function TagNewScreen({ navigation }) {
  //const [idRfid, setidRfid] = useState("");
  const [numero, setNumero] = useState("");
  const [situacao, setNSituacao] = useState("");
  const [idCondominio, setIdCondominio] = useState("");

  const cadastrarTag = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      console.log('Token:', token);
  
      const response = await fetch('https://apicondsecurity.azurewebsites.net/api/Rfid/Cadastrar', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ numero: numero, situacao: situacao, idCondominio: idCondominio }),
        mode: 'cors',
      });
  
      console.log('Response Status:', response.status);
      const responseText = await response.text();
      console.log('Response Text:', responseText);
  
      if (!response.ok) {
        throw new Error(`Erro ao cadastrar tag: ${responseText}`);
      }
  
      // Aqui tratamos a resposta como texto simples, já que não é um JSON
      console.log('Tag cadastrada com sucesso:', responseText);
      navigation.pop();
    } catch (error) {
      console.log('Erro ao cadastrar tag', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text variant="headlineLarge" style={styles.selfCenter}>
          Cadastro de TAG
        </Text>
        <Text variant="bodySmall" style={styles.selfCenter}>
          Insira as informações
        </Text>

        
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
          keyboardType="default"
          value={situacao}
          onChangeText={setNSituacao}
        />
        <TextInput
          label="ID Condomínio"
          mode="outlined"
          keyboardType="default"
          value={idCondominio}
          onChangeText={setIdCondominio}
        />
        <Button textColor="black"
          mode="outlined"
          style={{
            marginTop: 10,
            maxWidth: 260,
            alignSelf: "flex-end",
          }}
          onPress={cadastrarTag}
        >
          Salvar
        </Button>
      </View>
    </View>
  );
}
