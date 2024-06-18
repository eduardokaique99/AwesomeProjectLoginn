import { View } from "react-native"; 
import { Button, Text, TextInput } from "react-native-paper"; 
import { useEffect, useState } from "react"; 
import styles from "../config/styles";
import { Image } from "expo-image"; 
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth"; // importa o método de autenticação do Firebase
import { auth } from "../config/firebase"; // importa a instância do Firebase
import AsyncStorage from '@react-native-async-storage/async-storage'; // importa o AsyncStorage para armazenar o token de autenticação

export default function LoginScreen({ navigation }) { // passa a navegação como parâmetro
  const [email, setEmail] = useState(""); // cria o estado do email
  const [senha, setSenha] = useState(""); // cria o estado da senha
  const [loading, setLoading] = useState(true); // cria o estado de carregamento

  /*const fazerLogin = async () => { // cria a função de fazer login
    // console.log(email, senha);
    try {
      const usuario = await signInWithEmailAndPassword(auth, email, senha); // tenta fazer login com o email e senha
      console.log(usuario); // exibe o usuário no console
      navigation.navigate("HomeScreen"); // navega para a tela HomeScreen
    } catch (error) { // captura o erro
      console.log(error); // exibe o erro no console
    }
  };*/

  const fazerLogin = async () => { // cria a função de fazer login
    try {
      const response = await fetch('https://apicondsecurity.azurewebsites.net/api/User/loginApp', { // faz a requisição para a API
        method: 'POST', // define o método como POST
        headers: { // define o cabeçalho da requisição
          'Content-Type': 'application/json', // define o tipo do conteúdo como JSON
        },
        body: JSON.stringify({ email: email, senha: senha }), // converte o email e senha para JSON
        mode: 'cors', // Adiciona o modo CORS
      }); 
      if(!response.ok){ // verifica se a resposta não está ok
        throw new Error('Erro ao fazer login'); // lança um erro
      }
      const data = await response.json(); // converte a resposta para JSON
      console.log(data); // exibe os dados no console
      await AsyncStorage.setItem('token', data.token); // armazena o token de autenticação no AsyncStorage
      console.log('Usuário logado com sucesso!'); // exibe a mensagem de sucesso no console
      navigation.navigate('HomeScreen'); // navega para a tela HomeScreen
    } catch (error) { // captura o erro
      console.log('Erro ao fazer login',error); // exibe o erro no console
    }
  };

  // check if user already logged in
/*  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigation.navigate("HomeScreen");
      } else {
        setLoading(false);
      }
    });
    return unsubscribe;
  }, []); */

  useEffect(() => {
    const checkUserLoggedIn = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token) {
          navigation.navigate("HomeScreen");
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.error("Erro ao verificar o token", error);
        setLoading(false);
      }
    };

    checkUserLoggedIn();
  }, []);

  return (
    <View style={styles.container}>
      {loading && <Text>Carregando...</Text>}
      {!loading && (
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
            // Conversar com o Fausto Para fazer o tratamento
            // de criptografar e descriptografar a senha aqui no App
          />
          <Button
            textColor="black"
            onPress={() => navigation.navigate("RecuperarSenhaScreen")}
          >
            Recuperar senha
          </Button>

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
            onPress={fazerLogin}
          >
            Entrar
          </Button>
        </View>
      )}
    </View>
  );
}
