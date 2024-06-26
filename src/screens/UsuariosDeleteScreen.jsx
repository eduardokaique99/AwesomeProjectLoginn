import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Modal, Portal, Provider, Button, Text } from "react-native-paper";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const UsuariosDeleteScreen = ({ route, navigation }) => {
  const { item } = route.params;
  const [visible, setVisible] = useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const handleDelete = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      await axios.delete(`https://apicondsecurity.azurewebsites.net/api/Usuario/Excluir?idUsuario=${item.idUsuario}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log("Usuário deletado!");
      navigation.goBack();
    } catch (e) {
      console.error('Erro ao deletar usuário', e);
    }
  }
  
/*
  const handleDelete = async () => {
    try {
      await deleteDoc(doc(db, "usuarios", item.id));
      console.log("Usuário deletado!");
      navigation.goBack();
    } catch (e) {
      console.error(e);
    }
  };

*/
 
  return (
    <Provider>
      <View style={styles.container}>
        <Text style={styles.title}>Confirmar exclusão do usuário:</Text>
        <Text style={styles.detail}>Nome: {item.nome}</Text>
        <Text style={styles.detail}>E-mail: {item.email}</Text>
        <Button
          mode="contained"
          onPress={showModal}
          color="red"
          style={styles.button}
        >
          Excluir
        </Button>
        <Button
          mode="contained"
          onPress={() => navigation.goBack()}
          style={styles.button}
        >
          Cancelar
        </Button>
      </View>

      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={styles.modalContainer}
        >
          <Text style={styles.modalTitle}>Confirmar Exclusão</Text>
          <View style={styles.modalButtons}>
            <Button
              onPress={hideModal}
              mode="contained"
              style={styles.modalButton}
            >
              Cancelar
            </Button>
            <Button
              mode="contained"
              onPress={handleDelete}
              style={styles.modalButton}
            >
              Excluir
            </Button>
          </View>
        </Modal>
      </Portal>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  detail: {
    fontSize: 16,
    marginBottom: 10,
  },
  button: {
    marginTop: 10,
    width: "80%",
    alignSelf: "center",
  },
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    margin: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  modalButton: {
    marginTop: 10,
    flex: 1,
    marginHorizontal: 5,
  },
});

export default UsuariosDeleteScreen;
