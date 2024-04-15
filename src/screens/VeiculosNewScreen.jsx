import { View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { useState } from "react";
import styles from "../config/styles";
//import { Image } from "expo-image";
//import { signInWithEmailAndPassword } from "firebase/auth";
//import auth from "../config/firebase";


export default function TagNewScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [senha, setSenha] = useState("");

/*  const fazerLogin = async () => {
    // console.log(email, senha);
    try {
      const usuario = await signInWithEmailAndPassword(auth, email, senha);
      console.log(usuario);
      navigation.navigate("HomeScreen");
    } catch (error) {
      console.log(error);
    }
  };
 */ 

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
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
          label="Nome"
          mode="outlined"
          keyboardType="name"
          value={nome}
          onChangeText={setNome}
        />
        <TextInput
          label="Telefone"
          mode="outlined"
          keyboardType="phone-pad"
          value={telefone}
          onChangeText={setTelefone}
        />
        <TextInput
          label="Senha"
          mode="outlined"
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
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
          onPress={() => navigation.navigate("HomeScreen")}
        >
          Cancelar
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