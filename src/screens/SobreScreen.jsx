import { ScrollView, Text, View } from "react-native";
import styles from "../config/styles";

export default function SobreScreen() {
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.innerContainer}>
          <Text style={styles.h1}>Sobre o App</Text>
          <Text>
          A Evolution foi fundada por um grupo de empreendedores apaixonados por resolver problemas urbanos através da tecnologia. A visão deles era criar uma solução simples, eficiente e amigável para melhorar a experiência de estacionamento na cidade. Assim, nasceu o aplicativo homônimo, que oferecia um sistema de gerenciamento de estacionamento automatizado.
          Para tornar o serviço ainda mais atraente, a Evolution equipou esses estabelecimentos com sensores inteligentes e câmeras para monitorar em tempo real. Isso garantia que os usuários do aplicativo sempre tivessem informações precisas sobre o estacionamento.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
