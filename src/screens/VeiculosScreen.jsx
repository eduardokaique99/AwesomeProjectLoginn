import { ScrollView, Text, View, TouchableOpacity } from "react-native";
import styles from "../config/styles";
import { styles2 } from "../config/styles";

const MyComponent = () => {
  //const navigation = useNavigation();
  const handleButtonPress = (buttonName) => {
    navigation.navigate("VeiculosNewScreen");
    // Função para lidar com o pressionamento do botão
    console.log(`Botão ${buttonName} pressionado`);
  };

  function VeiculosScreen() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.innerContainer}>
            <Text style={[styles.h1, { fontSize: 24 }]}>Veículos</Text>
            <Text style={{ textAlign: 'justify', margin: 10 }}>
              Local destinado para o CRUD de veículos.
            </Text>

            <View style={styles2.container}>
            <TouchableOpacity style2={styles2.button} onPress={() => handleButtonPress("Adicionar")}>
              <Text style={styles2.buttonText}>Adicionar</Text>
            </TouchableOpacity>
            <TouchableOpacity style2={styles2.button} onPress={() => handleButtonPress("Editar")}>
              <Text style={styles2.buttonText}>Editar</Text>
            </TouchableOpacity>
            <TouchableOpacity style2={styles2.button} onPress={() => handleButtonPress("Remover")}>
              <Text style={styles2.buttonText}>Remover</Text>
            </TouchableOpacity>
            <TouchableOpacity style2={styles2.button} onPress={() => handleButtonPress("Relatório")}>
              <Text style={styles2.buttonText}>Relatório</Text>
            </TouchableOpacity>
          </View>

          </View>
        </ScrollView>
      </View>
    );
  }

  return <VeiculosScreen />;
}

export default MyComponent;
