import { View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { useState } from "react";
import styles from "../config/styles";
import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "../config/firebase";


export default function TagNewScreen({ navigation }) {
  const [idTag, setIdTag] = useState("");
  const [numero, setNumero] = useState("");
  const [situacao, setNSituacao] = useState("");
  const [idCondominio, setIdCondominio] = useState("");

    //const cadastrarTag = async () => {
    //  console.log("Salvo");
    //  // primeiro pegamos o objeto de coleção
    //  const docRef = doc(collection(db, "tags"));
    //  // e então setamos o documento
    //  await setDoc(docRef, {
    //    idTag: idTag,
    //    numero: numero,
    //    situacao: situacao,
    //    idCondominio: idCondominio,
    //  });
    //  navigation.pop()
    //};

    const cadastrarTag = async () => {
      try {
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyIiwiZW1haWwiOiJqdXNzYW5AbWV1M2VtYWlsLmNvbSIsImp0aSI6ImY5OGVjZmEyLWYyYWYtNDUxOS04ODhmLWM3YjkyZDU5ZGRhYyIsImV4cCI6MTcxOTAxMDgzOSwiaXNzIjoiZXZvbHV0aW9udGVjaC5jb20uYnIiLCJhdWQiOiJodHRwOi8vZXZvbHV0aW9udGVjaC5jb20uYnIvY29uZHNlY3VyaXR5In0.hWilh8RKTYpDvJFlxTmZ9JjGsKDeivK1X83GuA5JRo4';//await AsyncStorage.getItem('token');
        const response = await fetch('https://apicondsecurity.azurewebsites.net/api/Rfid/Cadastrar', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ numero: numero, situacao: situacao, idCondominio: idCondominio }),
          mode: 'cors',
        });
        if(!response.ok){
          throw new Error('Erro ao cadastrar tag');
        }
        const data = await response.json();
        console.log(data);
        navigation.pop();
      } catch (error) {
        console.log('Erro ao cadastrar tag',error);
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
        <Button textColor="black"
          mode="outlined"
          // style="margin-top: 10px;" html
          style={{
            // em react-native
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