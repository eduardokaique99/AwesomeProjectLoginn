import React, { useState, useEffect } from "react";
import {
  ScrollView,
  Text,
  View,
} from "react-native";
import { useNavigation} from "@react-navigation/native";
import { Button } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "../config/styles";


export default function TermoAceiteScreen() {
  const navigation = useNavigation();
  const [nomeUser, setNomeUser] = useState("");
  const [cpf, setCpf] = useState("");
  const [condominio, setCondominio] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      const nomeUser = await AsyncStorage.getItem("name");
      const cpf = await AsyncStorage.getItem("cpf");
      const condominio = await AsyncStorage.getItem("condominioName");

      setNomeUser(nomeUser || "");
      setCpf(cpf || "");
      setCondominio(condominio || "");
    };

    fetchUserData();
  }, []);

  const handleAccept = async () => {
    try {
      await AsyncStorage.setItem("termsAccepted", "true");
      const token = await AsyncStorage.getItem("token");
      const idUserString = await AsyncStorage.getItem("idUser");
      const idUser = Number.parseInt(idUserString, 10);

      console.log("idUser:", idUser);

      const responseTermo = await fetch("https://apicondsecurity.azurewebsites.net/api/User/AceiteTermos", {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          idUser: idUser,
          input: "some input data" // Replace with actual input data if necessary
        }),
        mode: 'cors',
      });

      console.log("Response Status:", responseTermo.status);
      const responseText = await responseTermo.text();
      console.log("Response Text:", responseText);

      if (!responseTermo.ok) {
        throw new Error(`Erro ao aceitar termo: ${responseText}`);
      }
      
      navigation.navigate("HomeScreen");
    } catch (error) {
      console.error(error);
    }
  };

  const commonTextStyle = { fontFamily: 'Trebuchet MS' };
  const boldTextStyle = { ...commonTextStyle, fontWeight: 'bold' };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View>
        <Text style={[styles.selfCenter, commonTextStyle, { fontWeight: 'bold', fontSize: 24, textAlign: 'center', marginVertical: 20 }]}>
          Termo de Autorização para Inclusão de Dados no Aplicativo de Controle
          de Acesso Automatizado
        </Text>
        <Text style={[styles.selfCenter, commonTextStyle, { fontSize: 16 }]}>
          Eu, <Text style={boldTextStyle}>{nomeUser}</Text>, portador do documento de identidade nº <Text style={boldTextStyle}>{cpf}</Text>,
          residente no condomínio <Text style={boldTextStyle}>{condominio}</Text>, autorizo a inclusão dos meus
          dados pessoais no aplicativo mobile de controle de acesso automatizado
          para veículos, desenvolvido para o condomínio. Entendo e concordo que
          a finalidade da coleta e armazenamento dos meus dados é exclusivamente
          para garantir uma entrada eficaz e segura de veículos autorizados no
          condomínio. Declaro estar ciente de que os dados fornecidos, como
          placa do veículo e informações de contato, serão utilizados para
          identificação e autorização de acesso, bem como para o gerenciamento
          remoto de permissões a terceiros. Reconheço que a segurança dos meus
          dados é uma prioridade e que medidas estão sendo implementadas para
          proteger informações confidenciais, em conformidade com as
          regulamentações de privacidade, incluindo a Lei Geral de Proteção de
          Dados Pessoais (LGPD). Autorizo também o uso das tecnologias
          propostas, como leitura de placas de veículos, reconhecimento RFID e
          aplicativo mobile, para facilitar e tornar mais seguro o acesso de
          veículos no condomínio. Estou ciente de que a integração dessas
          tecnologias visa promover segurança, eficiência e comodidade nos
          acessos do condomínio. Por meio deste termo, manifesto meu
          consentimento para a inclusão e utilização dos meus dados no
          aplicativo mobile de controle de acesso automatizado, compreendendo os
          propósitos e os meios pelos quais serão tratados, conforme descrito no
          documento referente ao projeto. Estou ciente de que, além do
          condomínio, a empresa responsável pelo aplicativo também tratará os
          meus dados, atuando como operadora, enquanto o condomínio será o
          controlador.
        </Text>
        <Button
          mode="contained"
          onPress={handleAccept}
          style={{ marginTop: 20 }}
        >
          Aceitar
        </Button>
      </View>
    </ScrollView>
  );
}
