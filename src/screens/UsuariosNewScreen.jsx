import { View } from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Button, Text, TextInput } from "react-native-paper";
import { useState } from "react";
import styles from "../config/styles";
import { collection, doc, setDoc } from "firebase/firestore";
import { db, auth } from "../config/firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function UsuariosNewScreen({ navigation }) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [cpf, setCPF] = useState("");
  const [telefone, setTelefone] = useState("");
  const [situacao, setSituacao] = useState("");
  const [numero, setnumero] = useState("");
  const [bloco, setbloco] = useState("");
  const [quadra, setQuadra] = useState("");
  const [rua, setRua] = useState("");
  const [tipo, setTipo] = useState("");
  const [idTipo, setIdTipo] = useState("");
  const [idResidencia, setIdResidencia] = useState("");
  const [idCondominio, setIdCondominio] = useState("");
  //https://github.com/faustort/ADS-5f-MeuApp/blob/74dc424f21578b68fedc8157f36108123aa60cb8/src/screens/RegisterScreen.jsx

  const cadastrarUsuario = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      console.log("Token:", token);

      const response = await fetch(
        "https://apicondsecurity.azurewebsites.net/api/LayoutUnificado/CadastroUnificadoDeUsuario",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nome: nome,
            email: email,
            senha: senha,
            cpf: cpf,
            telefone: telefone,
            situacao: situacao,
            numero: numero,
            bloco: bloco,
            quadra: quadra,
            rua: rua,
            idTipo: idTipo,
            idResidencia: idResidencia,
            idCondominio: idCondominio,
          }),
          mode: "cors",
        }
      );

      console.log("Response Status:", response.status);
      const responseText = await response.text();
      console.log("Response Text:", responseText);

      if (!response.ok) {
        throw new Error(`Erro ao cadastrar usuário: ${responseText}`);
      }

      // Aqui tratamos a resposta como texto simples, já que não é um JSON
      console.log("Usuário cadastrado com sucesso:", responseText);
      navigation.pop();
    } catch (error) {
      console.log("Erro ao cadastrar usuário", error);
    }
  };

    /*
  const cadastrarUsuario = async () => {
    console.log("Salvo");
    // Cria uma nova referência de documento com um ID gerado automaticamente
    // primeiro pegamos o objeto de coleção
    const docRef = doc(
      // depois passamos a referência do banco de dados
      collection(db, "usuarios")
    );

    // e então setamos o documento
    await setDoc(docRef, {
      idUsuario: idUsuario,
      email: email,
      nome: nome,
      senha: senha,
      cpf: cpf,
      telefone: telefone,
      numero: numero,
      bloco: bloco,
      idTipo: idTipo,
      situacao: situacao,
    });

    
    createUserWithEmailAndPassword(auth, email, senha).then(
      async (userCredential) => {
        console.log(userCredential, "Usuário registrado com sucesso");
        const usuarios = userCredential.user.email;
        }
        );
        navigation.pop();
        };
        
        */
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text variant="headlineLarge" style={styles.selfCenter}>
          Cadastro de Usuário
        </Text>
        <Text variant="bodySmall" style={styles.selfCenter}>
          Insira as informações
        </Text>

        <TextInput
          label="Nome"
          mode="outlined"
          keyboardType="tag"
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
          keyboardType="password"
          value={senha}
          onChangeText={setSenha}
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
          label="Situação"
          mode="outlined"
          keyboardType="tag"
          value={situacao}
          onChangeText={setSituacao}
        />
        <TextInput
          label="Número da Residência"
          mode="outlined"
          keyboardType="number-pad"
          value={numero}
          onChangeText={setnumero}
        />
        <TextInput
          label="Bloco"
          mode="outlined"
          keyboardType="number-pad"
          value={bloco}
          onChangeText={setbloco}
        />
        <TextInput
          label="Quadra"
          mode="outlined"
          keyboardType="number-pad"
          value={quadra}
          onChangeText={setQuadra}
        />
        <TextInput
          label="Rua"
          mode="outlined"
          keyboardType="number-pad"
          value={rua}
          onChangeText={setRua}
        />
        <TextInput
          label="ID Tipo"
          mode="outlined"
          keyboardType="id"
          value={idTipo}
          onChangeText={setIdTipo}
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
          onPress={cadastrarUsuario}
        >
          Salvar
        </Button>
      </View>
    </View>
  );
}
