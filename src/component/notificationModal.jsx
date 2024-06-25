import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Modal, Portal, Button, Text } from 'react-native-paper';
import axios from 'axios';

const NotificationModal = ({ visible, notificationDetails, onClose }) => {
  const handleAccept = async () => {
    try {
      const response = await axios.post('https://apicondsecurity.azurewebsites.net/api/Permissao/Cadastrar', {
        situacao: 'aceitar',
        idNotificacao: notificationDetails?.Id
      });

      const idPermissao = response.data.idPermissao;

      await axios.post('https://apicondsecurity.azurewebsites.net/api/AbrePortao/AberturaPortaoTerceiro', {
        idPermissao
      });

      console.log('Portão aberto para terceiro');
      onClose();
    } catch (error) {
      console.error('Erro ao aceitar notificação', error);
    }
  };

  const handleDeny = async () => {
    try {
      await axios.post('https://apicondsecurity.azurewebsites.net/api/Permissao/Cadastrar', {
        situacao: 'negar',
        idNotificacao: notificationDetails?.Id
      });

      console.log('Permissão negada');
      onClose();
    } catch (error) {
      console.error('Erro ao negar notificação', error);
    }
  };

  return (
    <Portal>
      <Modal visible={visible} onDismiss={onClose} contentContainerStyle={styles.modalContainer}>
        {notificationDetails ? (
          <>
            <Text style={styles.modalTitle}>Nova Notificação</Text>
            <Text style={styles.modalContent}>{notificationDetails.Mensagem}</Text>
            <View style={styles.modalButtons}>
              <Button mode="contained" onPress={handleAccept} style={styles.modalButton}>Aceitar</Button>
              <Button mode="contained" onPress={handleDeny} style={styles.modalButton}>Negar</Button>
            </View>
          </>
        ) : (
          <Text style={styles.modalContent}>Carregando...</Text>
        )}
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalContent: {
    fontSize: 16,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    marginHorizontal: 5,
  },
});

export default NotificationModal;
