import { styles2 } from "../config/styles";
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import styles from "../config/styles";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";
import { List, Button, Card } from "react-native-paper";

const TagListaScreen = () => {
  const [tags, setTags] = useState([]);
  const navigation = useNavigation();
  
  const handleButtonPress = (screenName) => {
    navigation.navigate(screenName);
  };

  useEffect(() => {
    async function fetchData() {
      // Busca dados da coleção "tags"
      const colRef = collection(db, "tags");
      const docSnap = await getDocs(colRef);
      const tagsData = docSnap.docs.map((doc) => doc.data());
      setTags(tagsData);
      console.log(tagsData);
    }
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.innerContainer}>
          <Text style={[styles.h1, { fontSize: 24 }]}>TAG</Text>
          <Text style={{ textAlign: 'justify', margin: 10 }}>
            Local destinado para o CRUD de TAG.
          </Text>

          <View style={styles.container}>
            <FlatList
              data={tags}
              renderItem={({ item }) => (
                <Card style={{ margin: 8 }}>
                  <Card.Title title={`Id do TAG: ${item.idTag}`} />
                  <Card.Content>
                    <List.Item
                      title={`Número: ${item.numero}`}
                      left={(props) => <List.Icon {...props} icon="tag" />}
                    />
                    <List.Item
                      title={`Situação: ${item.situacao}`}
                      left={(props) => <List.Icon {...props} icon="tag" />}
                    />
                    <List.Item
                      title={`Id do Condomínio: ${item.idCondominio}`}
                      left={(props) => <List.Icon {...props} icon="tag" />}
                    />
                  </Card.Content>
                  <Card.Actions>
                    <Button
                      onPress={() =>
                        navigation.navigate("TagEdit", { item: item })
                      }
                    >
                      Editar
                    </Button>
                    <Button
                      onPress={() =>
                        navigation.navigate("TagDelete", { item: item })
                      }
                    >
                      Deletar
                    </Button>
                  </Card.Actions>
                </Card>
              )}
              keyExtractor={(item) => item.tag}
            />
            <TouchableOpacity 
              style={styles.button} onPress={() => handleButtonPress("TagNewScreen")}>
              <Text style={styles.buttonText}>Adicionar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => handleButtonPress("TagReportScreen")}>
              <Text style={styles.buttonText}>Relatório</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

export default TagListaScreen;