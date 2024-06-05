import { View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { useEffect, useState } from "react";
import styles from "../config/styles";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../config/firebase"; // Certifique-se de que 'auth' está sendo importado corretamente
import { collection, doc, where, setDoc, query, getDocs } from "firebase/firestore";

export default function PerfilScreen({ navigation, route }) {
  const [idUsuario, setIdUsuario] = useState("");
  const [email, setEmail] = useState("");
  const [nome, setNome] = useState("");
  const [senha, setSenha] = useState("");
  const [cpf, setCPF] = useState("");
  const [telefone, setTelefone] = useState("");
  const [idResidencia, setIdResidencia] = useState("");
  const [idCondominio, setIdCondominio] = useState("");
  const [idTipo, setIdTipo] = useState("");
  const [situacao, setSituacao] = useState("");

  const fazerLogin = async () => {
    console.log("Salvo");

    const docRef = doc(collection(db, "usuarios"), idUsuario);

    await setDoc(docRef, {
      idUsuario,
      email,
      nome,
      senha,
      cpf,
      telefone,
      idResidencia,
      idCondominio,
      idTipo,
      situacao,
    });

    console.log("Dados salvos com sucesso");
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("id", idUsuario)

      if (user) {
        console.log("Usuário logado", user);
   
        const getUser = async () => {
          const userEmail = user.email; // Obtém o e-mail do usuário autenticado
          const usersRef = collection(db, "usuarios");
          const querySnapshot = await getDocs(query(usersRef, where("email", "==", userEmail)));


          if (!querySnapshot.empty) {
            querySnapshot.docs.forEach((doc) => {
              const userData = doc.data();
              setIdUsuario(userData.idUsuario);
              setEmail(userData.email);
              setNome(userData.nome);
              setSenha(userData.senha);
              setCPF(userData.cpf);
              setTelefone(userData.telefone);
              setIdResidencia(userData.idResidencia);
              setIdCondominio(userData.idCondominio);
              setIdTipo(userData.idTipo);
              setSituacao(userData.situacao);
             });
            // console.log("Documento encontrado:", querySnapshot.data());
            // const userData = docSnap.data();
            // setIdUsuario(userData.idUsuario);
            // setEmail(userData.email);
            // setNome(userData.nome);
            // setSenha(userData.senha);
            // setCPF(userData.cpf);
            // setTelefone(userData.telefone);
            // setIdResidencia(userData.idResidencia);
            // setIdCondominio(userData.idCondominio);
            // setIdTipo(userData.idTipo);
            // setSituacao(userData.situacao);
          } else {
            console.log("Nenhum documento encontrado!");
          }
        };
        getUser();
      } else {
        navigation.navigate("LoginScreen");
      }
    });

    if (route.params?.item) {
      const item = route.params.item;
      console.log("Preenchendo dados com:", item);

      setIdUsuario(item.idUsuario);
      setEmail(item.email);
      setNome(item.nome);
      setSenha(item.senha);
      setCPF(item.cpf);
      setTelefone(item.telefone);
      setIdResidencia(item.idResidencia);
      setIdCondominio(item.idCondominio);
      setIdTipo(item.idTipo);
      setSituacao(item.situacao);
    }

    return () => unsubscribe();
  }, [route.params]);

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text variant="headlineLarge" style={styles.selfCenter}>
          Perfil do Usuário
        </Text>

        <TextInput
          label="ID"
          mode="outlined"
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
          value={nome}
          onChangeText={setNome}
        />
        <TextInput
          label="Senha"
          mode="outlined"
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
          label="ID Residência"
          mode="outlined"
          value={idResidencia}
          onChangeText={setIdResidencia}
        />
        <TextInput
          label="ID Condomínio"
          mode="outlined"
          value={idCondominio}
          onChangeText={setIdCondominio}
        />
        <TextInput
          label="ID Tipo"
          mode="outlined"
          value={idTipo}
          onChangeText={setIdTipo}
        />
        <TextInput
          label="Situação"
          mode="outlined"
          value={situacao}
          onChangeText={setSituacao}
        />
        <Button
          textColor="black"
          mode="outlined"
          style={{
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
