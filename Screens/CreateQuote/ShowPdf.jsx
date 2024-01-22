import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Modal,
} from 'react-native';
import React, {useState} from 'react';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Pdf from 'react-native-pdf';
import {useCustomer} from '../Utils/CustomerContext';
import {useNavigation} from '@react-navigation/native';
import RNFS from 'react-native-fs';
import Share from 'react-native-share';

const ShowPdf = () => {
  const {
    setTitle,
    setName,
    setAddress,
    setPhone,
    setType,
    setManager,
    setManagerPhone,
    setDateText,
    setCar,
    setColor,
    setVariant,
    setModel,
    setPdfSource,
    pdfName,
    setPdfName,
  } = useCustomer();

  const formatDate = date => {
    const d = new Date(date);
    const month = d.getMonth() + 1;
    const day = d.getDate();
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const {pdfSource, pdfSelected} = useCustomer();

  const [modalVisible, setModalVisible] = useState(false);

  const handleModal = () => {
    setModalVisible(visible => !visible);
  };

  const navigation = useNavigation();

  const navigateToCarSelect = () => {
    navigation.navigate('CarSelect');
  };

  const navigateToHome = () => {
    setTitle('Mr.');
    setName('');
    setAddress('');
    setPhone('');
    setType('INDIVIDUAL');
    setManager('');
    setManagerPhone('');
    setDateText(formatDate(new Date()));
    setCar('');
    setColor('');
    setVariant('');
    setModel('');
    setPdfSource(null);
    setPdfName('');
    navigation.navigate('Home');
  };

  const deletePdf = async () => {
    if (pdfSelected) {
      await RNFS.unlink(pdfSelected);
      navigateToHome();
    }
  };

  const sharePdf = async () => {
    if (pdfSelected) {
      const shareOptions = {
        title: 'Share PDF via',
        message: 'Please find the PDF attached',
        url: `file://${pdfSelected}`, // File path
        failOnCancel: false,
      };

      await Share.open(shareOptions);
    }
  };

  return (
    <>
      {pdfSource ? (
        <View style={styles.container}>
          <View style={styles.topBar}>
            <TouchableOpacity style={styles.icon} onPress={navigateToCarSelect}>
              {/* <Text style={styles.nextText}>Save</Text> */}
            </TouchableOpacity>
            <Text style={styles.toptext}>{pdfName && pdfName}</Text>
            <View style={styles.topEmpty}></View>
          </View>

          <View style={styles.mainPart}>
            <Pdf
              trustAllCerts={false}
              source={pdfSource && pdfSource}
              style={{flex: 1, width: '100%'}}
            />
          </View>

          <View style={styles.tools}>
            <TouchableOpacity style={styles.iconTool} onPress={navigateToHome}>
              <FontAwesome6 name={'check'} size={25} color="gray" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconTool} onPress={sharePdf}>
              <FontAwesome6 name={'share-nodes'} size={25} color="#00C853" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconTool}>
              <FontAwesome6 name={'download'} solid size={25} color="#2980B9" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconTool} onPress={handleModal}>
              <FontAwesome6 name={'trash'} size={25} color="#E0115F" />
            </TouchableOpacity>
          </View>

          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(false);
            }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>
                  Are you sure want to delete the file?
                </Text>
                <TouchableOpacity onPress={deletePdf}>
                  <Text style={styles.modalBtnTextYes}>Yes</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleModal}>
                  <Text style={styles.modalBtnTextNo}>No</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      ) : (
        <View style={styles.loadContainer}>
          <View style={styles.indicatorContainer}>
            <ActivityIndicator size="large" color="#2980B9" />
          </View>
        </View>
      )}
    </>
  );
};

export default ShowPdf;

const styles = StyleSheet.create({
  container: {
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
  mainPart: {
    backgroundColor: 'red',
    height: 500,
  },
  tools: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 30,
    marginTop: 30,
  },
  iconTool: {
    backgroundColor: '#fff',
    width: 55,
    height: 55,
    borderRadius: 50,
    elevation: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'lightgray',
  },
  nextText: {
    color: '#E0115F',
    fontFamily: 'Nunito-Bold',
  },
  loadContainer: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  indicatorContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    elevation: 20,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
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
    fontSize: 16,
    textAlign: 'center',
    color: '#485460',
    fontFamily: 'Nunito-Bold',
  },
  modalBtnTextYes: {
    color: 'green',
    fontFamily: 'Nunito-Bold',
    marginTop: 20,
  },
  modalBtnTextNo: {
    color: '#E0115F',
    fontFamily: 'Nunito-Bold',
    marginTop: 20,
  },
  modalInput: {
    borderWidth: 1,
    borderColor: '#485460',
    width: 260,
    height: 40,
    borderRadius: 10,
    paddingHorizontal: 15,
    color: 'gray',
  },
});
