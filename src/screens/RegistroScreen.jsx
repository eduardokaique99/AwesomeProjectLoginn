import { View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { useState } from "react";
import styles from "../config/styles";
import { Image } from "expo-image";
import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from "../config/firebase";

export default function RegistroScreen({ navigation }) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const cadastrarUsuario = async () => {
    try {
      const usuario = await createUserWithEmailAndPassword(auth, email, senha);
      navigation.navigate("LoginScreen");
      console.log(usuario);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Image
          source={require("../../assets/LogoApp.png")}
          style={{ width: 260, height: 120, alignSelf: "center" }}
        />
        <Text variant="headlineLarge" style={styles.selfCenter}>
          Faça seu Cadastro
        </Text>
        <Text variant="bodySmall" style={styles.selfCenter}>
          Utilize seus dados pessoais
        </Text>

        <TextInput
          label="Nome"
          mode="outlined"
          value={nome}
          onChangeText={setNome}
        />

        <TextInput
          label="Email"
          mode="outlined"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          label="Senha"
          mode="outlined"
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
        />
        <Button
          mode="outlined"
          // style="margin-top: 10px;" html
          style={{
            marginTop: 10,
            maxWidth: 260,
            alignSelf: "flex-end",
          }}
          onPress={cadastrarUsuario}
        >
          Cadastrar
        </Button>
      </View>
    </View>
  );
}
