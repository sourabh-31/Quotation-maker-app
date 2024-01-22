import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {useCustomer} from '../Utils/CustomerContext';

const TopBar = ({openActionVisible, toggleMultiSelection}) => {
  const {searchQuery, setSearchQuery} = useCustomer();

  return (
    <View style={styles.topBar}>
      <TextInput
        placeholder="Search here..."
        placeholderTextColor="gray"
        style={styles.searchBar}
        value={searchQuery}
        onChangeText={text => setSearchQuery(text)}
      />
      <TouchableOpacity
        style={styles.settings}
        onPress={() => {
          openActionVisible(), toggleMultiSelection();
        }}>
        <FontAwesome6 name={'gear'} size={23} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

export default TopBar;

const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: '#fff',
    elevation: 10,
    paddingVertical: 23,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    width: '100%',
  },
  searchBar: {
    borderWidth: 1.2,
    borderColor: '#485460',
    borderRadius: 25,
    width: '78%',
    height: 48,
    paddingHorizontal: 20,
    color: '#000',
    backgroundColor: '#fff',
    fontFamily: 'Nunito-SemiBold',
  },
  settings: {
    backgroundColor: '#6C7A89',
    width: 45,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
  },
});
