import { Text, View } from "react-native";
import styles from "../config/styles";
import { Button } from "react-native-paper";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.h1}>Bem vindo ao App "Cond Segurity"</Text>
      <Button
        title="Conheça mais sobre o App"
        onPress={() => navigation.navigate("SobreScreen")}
      />
    </View>
  );
}
