import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import styles from "../config/styles";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";
import { List, Button, Card } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome5";
import { styles2 } from "../config/styles";

const TagListaScreen = () => {
  const [tags, setTags] = useState([]);
  const navigation = useNavigation();

  const handleButtonPress = (screenName) => {
    navigation.navigate(screenName);
  };

  const fetchData = async () => {
    const colRef = collection(db, "tags");
    const docSnap = await getDocs(colRef);
    const tagData = docSnap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setTags(tagData);
    console.log(tagData);
  };

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

  //useEffect(() => {
  //  async function fetchData() {
  //    // Busca dados da coleção "tags"
  //    const colRef = collection(db, "tags");
  //    const docSnap = await getDocs(colRef);
  //    const tagsData = docSnap.docs.map((doc) => doc.data());
  //    setTags(tagsData);
  //    console.log(tagsData);
  //  }
  //  fetchData();
  //}, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.innerContainer}>
          <Text style={[styles.h1, { fontSize: 24 }]}>TAG</Text>
          <Text style={{ textAlign: "justify", margin: 10 }}>
            Local destinado para o CRUD de TAG.
          </Text>

          <View style={styles.container}>
            <TouchableOpacity
              style={styles2}
              onPress={() => handleButtonPress("TagNewScreen")}
            >
              <Icon
                name="plus"
                size={20}
                color="#fff"
                style={{ marginRight: 10 }}
              />
              <Text style={styles2.buttonText}>Nova Tag</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles2}
              onPress={() => handleButtonPress("TagReportScreen")}
            >
              <Icon
                name="bar-chart"
                size={20}
                color="#fff"
                style={{ marginRight: 10 }}
              />
              <Text style={styles2.buttonText}>Relatório de Tags</Text>
            </TouchableOpacity>
            <FlatList
              keyExtractor={(item) => item.id}
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
                        navigation.navigate("TagEditScreen", { item })
                      }
                    >
                      Editar
                    </Button>
                    <Button
                      onPress={() =>
                        navigation.navigate("TagDeleteScreen", { item })
                      }
                    >
                      Deletar
                    </Button>
                  </Card.Actions>
                </Card>
              )}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default TagListaScreen;
