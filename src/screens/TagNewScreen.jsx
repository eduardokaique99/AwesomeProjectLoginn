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