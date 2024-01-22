import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {useNavigation} from '@react-navigation/native';
import DatePicker from 'react-native-date-picker';
import {useCustomer} from '../Utils/CustomerContext';

const Manager = () => {
  const navigation = useNavigation();

  const {
    manager,
    setManager,
    managerPhone,
    setManagerPhone,
    dateText,
    setDateText,
  } = useCustomer();

  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  const navigateToCustomer = () => {
    navigation.navigate('CustomerInfo');
  };

  const navigateToCarSelect = () => {
    navigation.navigate('CarSelect');
  };

  const formatDate = date => {
    const d = new Date(date);
    const month = d.getMonth() + 1;
    const day = d.getDate();
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <KeyboardAvoidingView style={styles.customerInfo} behavior="padding">
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.icon} onPress={navigateToCustomer}>
          <FontAwesome6 name={'angle-left'} size={20} color="#485460" />
        </TouchableOpacity>
        <Text style={styles.toptext}>Create</Text>
        <TouchableOpacity style={styles.topEmpty} onPress={navigateToCarSelect}>
          <Text style={styles.nextText}>Next</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.detailSection}>
        <Text style={styles.heading}>Manager Details</Text>
        <View>
          <Text style={styles.subHead}>Relationship Manager</Text>
          <TextInput
            style={styles.input}
            value={manager}
            onChangeText={data => setManager(data)}
          />
        </View>

        <View>
          <Text style={styles.subHead}>Phone no.</Text>
          <TextInput
            style={styles.input}
            value={managerPhone}
            onChangeText={data => setManagerPhone(data)}
          />
        </View>

        <View style={styles.container}>
          <Text style={styles.subHead}>Date</Text>
          <TouchableOpacity
            onPress={() => setOpen(true)}
            style={styles.pickerContainer}>
            <Text style={styles.dateText}>{formatDate(date)}</Text>
            <FontAwesome6
              name={'caret-down'}
              size={20}
              color="#485460"
              style={styles.downIcon}
            />
          </TouchableOpacity>
          {open && (
            <DatePicker
              modal
              mode="date"
              open={open}
              date={date}
              onConfirm={newDate => {
                setOpen(false);
                setDate(newDate);
                setDateText(formatDate(newDate));
              }}
              onCancel={() => setOpen(false)}
            />
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Manager;

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
  dateText: {
    color: 'gray',
    fontFamily: 'Nunito-Medium',
    fontSize: 16,
    marginTop: 12,
    marginLeft: 15,
  },
});
