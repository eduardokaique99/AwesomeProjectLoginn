import React from "react";
import { Text, View } from "react-native";
import styles from "../config/styles";
import { Button } from "react-native-paper";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={[styles.h1, { textAlign: 'center', margin: 10, fontSize: 24 }]}>Bem vindo ao App "Cond Segurity"</Text>
      <Text style={{ textAlign: 'justify', margin: 10 }}>
        Este é um aplicativo para controle de acesso de condomínios.
      </Text>
    </View>
  );
}
