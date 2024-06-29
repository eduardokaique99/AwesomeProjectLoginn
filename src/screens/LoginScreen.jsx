import { View } from "react-native"; 
import { Button, Text, TextInput } from "react-native-paper"; 
import { useEffect, useState } from "react"; 
import styles from "../config/styles";
import { Image } from "expo-image"; 
import AsyncStorage from '@react-native-async-storage/async-storage'; // importa o AsyncStorage para armazenar o token de autenticação
import React from "react";

export default function LoginScreen({ navigation }) { // passa a navegação como parâmetro
  const [email, setEmail] = useState(""); // cria o estado do email
  const [senha, setSenha] = useState(""); // cria o estado da senha
  const [loading, setLoading] = useState(true); // cria o estado de carregamento

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
      if (!response.ok) { // verifica se a resposta não está ok
        throw new Error('Erro ao fazer login'); // lança um erro
      }
      const data = await response.json(); // converte a resposta para JSON
      await AsyncStorage.setItem('termoAceite', JSON.stringify(data.termoAceite)); // armazena o termo de aceite no AsyncStorage
      await AsyncStorage.setItem('condominioName', data.condominioName); // armazena o nome do condomínio no AsyncStorage
      await AsyncStorage.setItem('name', data.name); // armazena o ID do condomínio no AsyncStorage
      await AsyncStorage.setItem('cpf', data.cpf); // armazena o CPF no AsyncStorage
      const termoAceite = JSON.parse(await AsyncStorage.getItem('termoAceite')); // pega o termo de aceite do AsyncStorage
      console.log(data); // exibe os dados no console
      await AsyncStorage.setItem('token', data.token); // armazena o token de autenticação no AsyncStorage
      const token = await AsyncStorage.getItem('token'); // pega o token de autenticação do AsyncStorage
      console.log('Usuário logado com sucesso!'); // exibe a mensagem de sucesso no console
      await AsyncStorage.setItem('idUser', data.userId.toString()); // armazena o ID do usuário no AsyncStorage
      const UserId = data.userId; // pega o ID do usuário logado que retornou da API
      const userResponse = await fetch(`https://apicondsecurity.azurewebsites.net/api/Usuario/Get?IdUser=${UserId}`,
      { method: 'GET', 
        headers: { 
          'Authorization': `Bearer ${token}`, // passa o token de autenticação no cabeçalho da requisição
          'Content-type': 'application/json', // define o tipo do conteúdo como JSON
          mode: 'cors', // Adiciona o modo CORS
        },
      }); // faz a requisição para a API com o ID do usuário
    
      console.log(userResponse); // exibe a resposta no console

      if (!userResponse.ok) { // verifica se a resposta não está ok
        throw new Error('Erro ao buscar usuário'); // lança um erro
      }
      const userData = await userResponse.json(); // converte a resposta para JSON
      const userType = userData.idTipoUsuario; // pega o tipo de usuário
      const userName = userData.name; // pega o nome do usuário logado
      await AsyncStorage.setItem('userType', userType.toString()); // armazena o tipo de usuário no AsyncStorage
      await AsyncStorage.setItem('userName', userName); // armazena o nome do usuário no AsyncStorage
      console.log(userData); // exibe os dados no console
      console.log(userType); // exibe o tipo de usuário no console
      console.log(userName); // exibe o nome do usuário no console
      console.log(termoAceite); // exibe o termo de aceite no console

      if (termoAceite === false) { // verifica se o termo de aceite é false
        navigation.navigate('TermoAceiteScreen'); // navega para a tela TermoAceiteScreen
      } else if (userType == 1) { // verifica se o tipo de usuário é 1 Administrador
        navigation.navigate('HomeScreen'); // navega para a tela HomeScreen
      } else {
        navigation.navigate('HomeScreen'); // trocar para a tela HomeScreenUser quando estiver pronta
      }
    } catch (error) { // captura o erro
      console.log('Erro ao fazer login', error); // exibe o erro no console
    }
  };

  useEffect(() => {
    const checkUserLoggedIn = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const userType = await AsyncStorage.getItem('userType');
        if (token && userType === '1') {
          navigation.navigate("HomeScreen");
        } else if (token && userType != '2') {
          navigation.navigate("HomeScreen"); // trocar para a tela HomeScreenUser quando estiver pronta
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
        <Button
          textColor="black"
          onPress={() => navigation.navigate("RecuperarSenhaScreen")}
        >
          Recuperar senha
        </Button>

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
          Entrar
        </Button>
      </View>
    </View>
  );
}
