import {StyleSheet, SafeAreaView, PermissionsAndroid} from 'react-native';
import React, {useEffect, useState} from 'react';
import TopBar from './TopBar';
import PdfContainer from './PdfContainer';
import AddBtn from './AddBtn';
import Actions from './Actions';
import DatePickerModal from './DatePickerModal';
import RNFS from 'react-native-fs';
import {useCustomer} from '../Utils/CustomerContext';

const Home = () => {
  //Tools state
  const [isIconClicked, setIsIconClicked] = useState(false);
  const [isActionVisible, setIsActionVisible] = useState(false);

  //Date Picker State
  const [date, setDate] = useState(new Date());
  const [openDate, setOpenDate] = useState(false);

  const {setSelectMode, selectMode} = useCustomer();

  // console.log(date);

  function toggleMultiSelection() {
    setIsIconClicked(true);
    setIsActionVisible(true);
    setSelectMode(true);
  }

  function openActionVisible() {
    setIsActionVisible(true);
  }

  function closeActionVisible() {
    setIsActionVisible(false);
    setIsIconClicked(false);
    setSelectMode(false);
  }

  //Write and read permissions

  const requestStoragePermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        // PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'Storage Permission',
          message: 'App needs access to storage to create directories.',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        // console.log('Storage permission granted');
        // Call the function to create directory
        // createTextFile();
      } else {
        // console.log('Storage permission denied');
      }
    } catch (err) {
      // console.log(err);
    }
  };

  const requestReadPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        // PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'Storage Permission',
          message: 'App needs access to storage to read directories.',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        // console.log('Read permission granted');
        // Call the function to create directory
        // createTextFile();
      } else {
        // console.log('Read permission denied');
      }
    } catch (err) {
      // console.log(err);
    }
  };

  // //create a directory

  useEffect(() => {
    requestStoragePermission();
    requestReadPermission();
  }, []);

  return (
    <SafeAreaView style={styles.home}>
      {isActionVisible ? (
        <Actions closeActionVisible={closeActionVisible} />
      ) : (
        <TopBar
          openActionVisible={openActionVisible}
          toggleMultiSelection={toggleMultiSelection}
        />
      )}
      <PdfContainer
        isIconClicked={isIconClicked}
        toggleMultiSelection={toggleMultiSelection}
        selectMode={selectMode}
      />

      <AddBtn />
      <DatePickerModal
        open={openDate}
        setOpen={setOpenDate}
        date={date}
        setDate={setDate}
      />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  home: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
