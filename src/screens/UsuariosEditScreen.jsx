import { View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { useEffect, useState } from "react";
import styles from "../config/styles";
import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function UsuariosEditScreen({ navigation, route }) {
  const { item } = route.params;
  const [idUsuario, setIdUsuario] = useState("");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [telefone, setTelefone] = useState("");
  const [situacao, setSituacao] = useState("");
  const [idTipo, setIdTipo] = useState("");
  

  const alterarUsuario = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      console.log('Token:', token);

      const response = await fetch('https://apicondsecurity.azurewebsites.net/api/Usuario/Alterar', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idUsuario: idUsuario, nome: nome, email: email, senha: senha, telefone: telefone, situacao: situacao, idTipo: idTipo }),
        mode: 'cors',
      });

      console.log('Response Status:', response.status);
      const responseText = await response.text();
      console.log('Response Text:', responseText);

      if (!response.ok) {
        throw new Error(`Erro ao alterar usuário: ${responseText}`);
      }

      console.log('Usuário alterado com sucesso:', responseText);
      navigation.pop();
    } catch (error) {
      console.log('Erro ao alterar usuário', error);
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
      telefone: telefone,
      idResidencia: idResidencia,
      idCondominio: idCondominio,
      idTipo: idTipo,
      situacao: situacao,
    });
  };

  useEffect(() => {
    console.log(item);
    console.log("estamos procurando a UID da coleção", item);

    setIdUsuario(item.idUsuario);
    setEmail(item.email);
    setNome(item.nome);
    setSenha(item.senha);
    setTelefone(item.telefone);
    setIdResidencia(item.idResidencia);
    setIdCondominio(item.idCondominio);
    setIdTipo(item.idTipo);
    setSituacao(item.situacao);
  }, []);

  */


  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text variant="headlineLarge" style={styles.selfCenter}>
          Edição de Usuario
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
          label="ID Tipo"
          mode="outlined"
          keyboardType="id"
          value={idTipo}
          onChangeText={setIdTipo}
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
