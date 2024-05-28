import { View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { useState } from "react";
import styles from "../config/styles";


export default function TagNewScreen({ navigation }) {
  const [idUsuario, setIdUsuario] = useState("");
  const [email, setEmail] = useState("");
  const [nome, setNome] = useState("");
  const [cpf, setCPF] = useState("");
  const [telefone, setTelefone] = useState("");
  const [idResidencia, setIdResidencia] = useState("");
  const [idCondominio, setIdCondominio] = useState("");
  const [idTipo, setIdTipo] = useState("");
  const [situacao, setSituacao] = useState("");

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
          label="ID"
          mode="outlined"
          keyboardType="id"
          value={idUsuario}
          onChangeText={setIdUsuario}
        />
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
          keyboardType="tag"
          value={nome}
          onChangeText={setNome}
        />
        <TextInput
          label="CPF"
          mode="outlined"
          keyboardType="number-pad"
          value={cpf}
          onChangeText={setCPF}
        />
        <TextInput
          label="Telefone"
          mode="outlined"
          keyboardType="phone-pad"
          value={telefone}
          onChangeText={setTelefone}
        />
        <TextInput
          label="ID Residência"
          mode="outlined"
          keyboardType="id"
          value={idResidencia}
          onChangeText={setIdResidencia}
        />
        <TextInput
          label="ID Condomínio"
          mode="outlined"
          keyboardType="id"
          value={idCondominio}
          onChangeText={setIdCondominio}
        />
        <TextInput
          label="ID Tipo"
          mode="outlined"
          keyboardType="id"
          value={idTipo}
          onChangeText={setIdTipo}
        />
        <TextInput
          label="Situação"
          mode="outlined"
          keyboardType="tag"
          value={situacao}
          onChangeText={setSituacao}
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