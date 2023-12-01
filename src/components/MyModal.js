import React from 'react';
import { Modal, StyleSheet, Text, Pressable, View, TouchableWithoutFeedback } from 'react-native';
import {COLORS} from "../colors";
import {IconButton} from "react-native-paper";

export const MyModal = ({children, modalVisible = false, setModalVisible, headerTitle }) => {

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={{fontWeight: 'bold', fontSize: 16}} variant="headlineLarge">{headerTitle}</Text>
              <IconButton
                icon="close"
                iconColor={COLORS.secondary}
                size={32}
                onPress={() => setModalVisible(false)}
              />
            </View>
            <View style={styles.modalContent}>
              {children}
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: 'white',
    borderRadius: 20,
    // paddingHorizontal: 20,
    paddingBottom: 10,
    // alignItems: 'center',
    width: '80%',
    maxWidth: 400,
    maxHeight: '80%',
  },
  modalHeader: {
    width: '100%',
    paddingLeft: 20,
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  modalContent: {
    paddingHorizontal: 20
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginVertical: 10,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
