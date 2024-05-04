import { View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { useEffect, useState } from "react";
import styles from "../config/styles";
import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "../config/firebase";

export default function TagEditScreen({ navigation, route }) {
  const { item } = route.params;
  const [tag, setTag] = useState("");
  const [nome, setNome] = useState("");

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
      tag: tag,
      nome: nome,
    });
  };

  useEffect(() => {
    console.log(item);
    console.log("estamos procurando a UID da coleção", item);

    setTag(item.tag);
    setNome(item.nome);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text variant="headlineLarge" style={styles.selfCenter}>
          Cadastro de Tag
        </Text>
        <Text variant="bodySmall" style={styles.selfCenter}>
          Insira as informações
        </Text>

        <TextInput
          label="Tag"
          mode="outlined"
          keyboardType="tag"
          value={tag}
          onChangeText={setTag}
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
          onPress={cadastrarTag}
        >
          Salvar
        </Button>
      </View>
    </View>
  );
}
