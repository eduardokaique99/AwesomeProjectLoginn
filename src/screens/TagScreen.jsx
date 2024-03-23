import { ScrollView, Text, View } from "react-native";
import styles from "../config/styles";

export default function TagScreen() {
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.innerContainer}>
          <Text style={[styles.h1, { fontSize: 24 }]}>TAG</Text>
          <Text style={{ textAlign: 'justify', margin: 10 }}>
            Local destinado para o CRUD de TAG.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
