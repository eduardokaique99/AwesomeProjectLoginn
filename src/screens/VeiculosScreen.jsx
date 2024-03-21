import { ScrollView, Text, View } from "react-native";
import styles from "../config/styles";

export default function VeiculosScreen() {
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.innerContainer}>
          <Text style={[styles.h1, { fontSize: 24 }]}>Veículos</Text>
          <Text style={{ textAlign: 'justify', margin: 10 }}>
            Local destinado para o CRUD de veículos.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
