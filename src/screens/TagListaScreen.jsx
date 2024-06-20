import React, { useState, useCallback } from 'react';
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import styles from '../config/styles';
import { List, Button, Card } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';
import { styles2 } from '../config/styles';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TagListaScreen = () => {
  const [tags, setTags] = useState([]);
  const navigation = useNavigation();

  const handleButtonPress = (screenName) => {
    navigation.navigate(screenName);
  };

  const fetchData = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await axios.get('https://apicondsecurity.azurewebsites.net/api/Rfid/GetAll', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setTags(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Erro ao buscar tags', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.innerContainer}>
          <Text style={[styles.h1, { fontSize: 24 }]}>TAG</Text>
          <Text style={{ textAlign: 'justify', margin: 10 }}>
            Tags cadastradas no sistema.
          </Text>

          <View style={styles.container}>
            <TouchableOpacity
              style={styles2.button}
              onPress={() => handleButtonPress('TagNewScreen')}
            >
              <Icon
                name="plus"
                size={20}
                color="#fff"
                style={{ marginRight: 10 }}
              />
              <Text style={styles2.buttonText}>Nova Tag</Text>
            </TouchableOpacity>
            <FlatList
              keyExtractor={(item) => item.id}
              data={tags}
              renderItem={({ item }) => (
                <Card style={{ margin: 8 }}>
                  <Card.Title title={`Id do TAG: ${item.idRfid}`} />
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
                        navigation.navigate('TagEditScreen', { item })
                      }
                    >
                      Editar
                    </Button>
                    <Button
                      onPress={() =>
                        navigation.navigate('TagDeleteScreen', { item })
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
