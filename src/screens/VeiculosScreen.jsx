import { ScrollView, Text, View } from "react-native";
import styles from "../config/styles";

export default function VeiculosScreen() {
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.innerContainer}>
          <Text style={styles.h1}>Veículos</Text>
          <Text>
            Local destinado para o CRUD de veículos.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
