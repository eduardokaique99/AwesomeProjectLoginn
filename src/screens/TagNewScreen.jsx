import { View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { useState } from "react";
import styles from "../config/styles";
import { Image } from "expo-image";
import { signInWithEmailAndPassword } from "firebase/auth";
import auth from "../config/firebase";

export default function TagNewScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const fazerLogin = async () => {
    // console.log(email, senha);
    try {
      const usuario = await signInWithEmailAndPassword(auth, email, senha);
      console.log(usuario);
      navigation.navigate("HomeScreen");
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
          Faça seu login
        </Text>
        <Text variant="bodySmall" style={styles.selfCenter}>
          Utilize suas credenciais
        </Text>

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
        <Button textColor="black" onPress={() => navigation.navigate("RecuperarSenhaScreen")}>
          Recuperar senha
        </Button>
        <Button textColor="black" onPress={() => navigation.navigate("RegistroScreen")}>
          Registre-se
        </Button>
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
          Entrar
        </Button>
      </View>
    </View>
  );
}