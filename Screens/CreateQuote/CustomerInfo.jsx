import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import React from 'react';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {useNavigation} from '@react-navigation/native';
import {Picker} from '@react-native-picker/picker';
import {useCustomer} from '../Utils/CustomerContext';

const CustomerInfo = () => {
  const navigation = useNavigation();

  const {
    title,
    setTitle,
    name,
    setName,
    address,
    setAddress,
    phone,
    setPhone,
    type,
    setType,
  } = useCustomer();

  const navigateToHome = () => {
    navigation.navigate('Home');
  };

  const navigateToManager = () => {
    navigation.navigate('Manager');
  };

  return (
    <KeyboardAvoidingView style={styles.customerInfo} behavior="padding">
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.icon} onPress={navigateToHome}>
          <FontAwesome6 name={'angle-left'} size={20} color="#485460" />
        </TouchableOpacity>
        <Text style={styles.toptext}>Create</Text>
        <TouchableOpacity style={styles.topEmpty} onPress={navigateToManager}>
          <Text style={styles.nextText}>Next</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.detailSection}>
        <Text style={styles.heading}>Customer Details</Text>
        <View>
          <Text style={styles.subHead}>Title</Text>
          <View style={styles.pickerContainer}>
            <Picker
              style={styles.picker}
              selectedValue={title}
              onValueChange={(itemValue, itemIndex) => setTitle(itemValue)}>
              <Picker.Item label="Mr." value="Mr." style={styles.pickerItem} />
              <Picker.Item
                label="Mrs."
                value="Mrs."
                style={styles.pickerItem}
              />
              <Picker.Item label="Ms." value="Ms." style={styles.pickerItem} />
            </Picker>
            <TouchableOpacity style={styles.downIcon}>
              <FontAwesome6 name={'caret-down'} size={20} color="#485460" />
            </TouchableOpacity>
          </View>
        </View>

        <View>
          <Text style={styles.subHead}>Full Name</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={data => setName(data)}
          />
        </View>

        <View>
          <Text style={styles.subHead}>Address</Text>
          <TextInput
            style={styles.input}
            value={address}
            onChangeText={data => setAddress(data)}
          />
        </View>

        <View>
          <Text style={styles.subHead}>Phone no.</Text>
          <TextInput
            style={styles.input}
            value={phone}
            onChangeText={data => setPhone(data)}
          />
        </View>

        <View>
          <Text style={styles.subHead}>Customer Type</Text>
          <View style={styles.pickerContainer}>
            <Picker
              style={styles.picker}
              selectedValue={type}
              onValueChange={(itemValue, itemIndex) => setType(itemValue)}>
              <Picker.Item
                label="INDIVIDUAL"
                value="INDIVIDUAL"
                style={styles.pickerItem}
              />
              <Picker.Item
                label="CORPORATE"
                value="CORPORATE"
                style={styles.pickerItem}
              />
            </Picker>
            <TouchableOpacity style={styles.downIcon}>
              <FontAwesome6 name={'caret-down'} size={20} color="#485460" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default CustomerInfo;

const styles = StyleSheet.create({
  customerInfo: {
    flex: 1,
    backgroundColor: '#fff',
  },
  icon: {
    marginLeft: 25,
    // backgroundColor: 'red',
    width: 35,
    height: 30,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // marginTop: 15,
    paddingVertical: 20,
    backgroundColor: '#fff',
    elevation: 10,
  },
  toptext: {
    color: '#485460',
    fontFamily: 'Nunito-Bold',
    fontSize: 20,
  },
  topEmpty: {
    width: 35,
    height: 35,
    marginRight: 25,
    marginBottom: -5,
    // backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    color: '#485460',
    fontFamily: 'Nunito-Bold',
    fontSize: 22,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  subHead: {
    color: '#485460',
    fontFamily: 'Nunito-Medium',
    fontSize: 18,
    marginLeft: 20,
    marginTop: 20,
  },
  pickerContainer: {
    borderWidth: 2,
    borderColor: 'gray',
    borderRadius: 10,
    width: '90%',
    alignSelf: 'center',
    marginTop: 12,
    height: 50,
  },
  picker: {
    color: 'gray',
    marginTop: -4,
  },
  pickerItem: {
    fontFamily: 'Nunito-Medium',
  },
  downIcon: {
    position: 'absolute',
    right: 20,
    top: 12,
  },
  input: {
    borderWidth: 2,
    borderColor: 'gray',
    borderRadius: 10,
    width: '90%',
    alignSelf: 'center',
    marginTop: 12,
    color: 'gray',
    paddingHorizontal: 15,
    fontSize: 16,
  },
  detailSection: {
    flexGrow: 1,
  },
  nextText: {
    color: '#E0115F',
    fontFamily: 'Nunito-Bold',
  },
});
