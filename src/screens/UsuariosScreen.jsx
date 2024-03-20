import { ScrollView, Text, View } from "react-native";
import styles from "../config/styles";

export default function UsuariosScreen() {
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.innerContainer}>
          <Text style={styles.h1}>Usuários</Text>
          <Text>
            Local destinado para o CRUD de usuário.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
