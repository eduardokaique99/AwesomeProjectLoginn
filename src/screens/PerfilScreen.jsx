import { View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { useState } from "react";
import styles from "../config/styles";


export default function TagNewScreen({ navigation }) {
  const [tag, setTag] = useState("");
  const [nome, setNome] = useState("");

  const fazerLogin = async () => {
    console.log('Salvo');
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
          label="TAG"
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
        <Button textColor="black"
          mode="outlined"
          // style="margin-top: 10px;" html
          style={{
            // em react-native
            marginTop: 10,
            maxWidth: 260,
            alignSelf: "flex-end",
          }}
          onPress={fazerLogin}
        >
          Salvar
        </Button>
      </View>
    </View>
  );
}