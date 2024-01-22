import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {useNavigation} from '@react-navigation/native';

const AddBtn = () => {
  const navigation = useNavigation();

  const navigateToCustomer = () => {
    navigation.navigate('CustomerInfo');
  };

  return (
    <TouchableOpacity style={styles.addBtn} onPress={navigateToCustomer}>
      <FontAwesome6 name={'plus'} size={40} color="#fff" />
    </TouchableOpacity>
  );
};

export default AddBtn;

const styles = StyleSheet.create({
  addBtn: {
    backgroundColor: '#E0115F',
    width: 75,
    height: 75,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 50,
    alignSelf: 'center',
    elevation: 10,
  },
});
