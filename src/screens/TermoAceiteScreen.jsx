import React from "react";
import { View, ScrollView } from "react-native";
import { Button, Text } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "../config/styles";

export default function TermoAceiteScreen({ navigation }) {
  const nomeUser = "";
  const cpf = "";
  const condominio = "";

  const handleAccept = async () => {
    await AsyncStorage.setItem("termsAccepted", "true");
    navigation.navigate("LoginScreen");
    nomeUser = await AsyncStorage.getItem("name");
    cpf = await AsyncStorage.getItem("cpf");
    condominio = await AsyncStorage.getItem("condominioName");
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.innerContainer}>
        <Text variant="headlineLarge" style={styles.selfCenter}>
          Termo de Autorização para Inclusão de Dados no Aplicativo de Controle
          de Acesso Automatizado
        </Text>
        <Text variant="bodyMedium" style={styles.selfCenter}>
          Eu, {nomeUser}, portador do documento de identidade nº {cpf},
          residente no condomínio {condominio}, autorizo a inclusão dos meus
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
