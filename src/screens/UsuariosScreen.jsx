import React, { useState, useEffect } from 'react';
import styles from '../config/styles';
import { View, Text, FlatList } from 'react-native';
import firebase from 'firebase/app';
import 'firebase/database';

const UsersList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersCollection = await firebase.firestore().collection('usuarios').get();
        const usersData = usersCollection.docs.map(doc => doc.data());
        setUsers(usersData);
      } catch (error) {
        console.error('Erro ao buscar usuários:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <View style={styles.innerContainer}>
          <Text style={[styles.h1, { fontSize: 24 }]}>Usuários</Text>
          <Text style={{ textAlign: 'justify', margin: 10 }}></Text>
      <Text>Lista de Usuários:</Text>
      <FlatList
        data={users}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>Email: {item.email}</Text>
            <Text>Nome: {item.nome}</Text>
            {/* Não é recomendado exibir a senha */}
          </View>
        )}
      />
    </View>
  );
};

export default UsersList;