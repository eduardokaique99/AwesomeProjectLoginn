import React from "react";
import { Text, View } from "react-native";
import styles from "../config/styles";
import { Image } from "react-native";
import { auth } from "../config/firebase";



export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Image
          source={require("../../assets/LogoApp.png")}
          style={{ width: 260, height: 120, alignSelf: "center" }}
        />
      <Text style={[styles.h1, { textAlign: 'center', margin: 10, fontSize: 36 }]}>Olá, </Text>
      <Text style={[styles.h1, { textAlign: 'center', margin: 10, fontSize: 24 }]}>Bem vindo ao App "Cond Segurity"</Text>
      <Text style={{ textAlign: 'justify', margin: 10 }}>
      O propósito essencial deste projeto é conceber um sistema de controle de acesso automatizado para veículos direcionado a condomínios residenciais na cidade de Joinville - SC, o objetivo principal é garantir uma entrada eficaz e segura para veículos autorizados.
      </Text>
      
    </View>
  );
}