import { useState, useEffect } from 'react'; // Apenas importe useState e useEffect, não é necessário importar React novamente
import { Text, View, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../config/styles';

export default function HomeScreen() {
  const [userName, setUserName] = useState(''); // cria o estado do nome do usuário
  
  useEffect(() => {
    const getUserName = async () => {
      try {
        const storedName = await AsyncStorage.getItem('userName');
        if (storedName) {
          setUserName(storedName);
        }
      } catch (error) {
        console.error("Erro ao buscar nome do usuário", error);
      }
    };

    getUserName();
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/LogoApp.png")}
        style={{ width: 260, height: 120, alignSelf: "center" }}
      />
      <Text style={[styles.h1, { textAlign: 'center', margin: 10, fontSize: 36 }]}>Olá, {userName}</Text>
      <Text style={[styles.h1, { textAlign: 'center', margin: 10, fontSize: 24 }]}>Bem vindo ao App "Cond Segurity"</Text>
      <Text style={{ textAlign: 'justify', margin: 10 }}>
        O propósito essencial deste projeto é conceber um sistema de controle de acesso automatizado para veículos direcionado a condomínios residenciais na cidade de Joinville - SC, o objetivo principal é garantir uma entrada eficaz e segura para veículos autorizados.
      </Text>
    </View>
  );
}