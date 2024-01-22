import {TouchableOpacity, StyleSheet, Text, View, Modal} from 'react-native';
import React, {useState} from 'react';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Pdf from 'react-native-pdf';
import {useNavigation, useRoute} from '@react-navigation/native';
import RNFS from 'react-native-fs';
import Share from 'react-native-share';

const ViewPdf = () => {
  const navigation = useNavigation();

  const [modalVisible, setModalVisible] = useState(false);
  const [saveModalVisible, setSaveModalVisible] = useState(false);

  const handleModal = () => {
    setModalVisible(visible => !visible);
  };

  const handleSaveModal = () => {
    setSaveModalVisible(visible => !visible);
  };

  const route = useRoute();
  const {pdfPath, pdfName, pdfLink} = route.params || {};

  const navigateToHome = () => {
    navigation.navigate('Home');
  };

  const deletePdf = async () => {
    if (pdfLink) {
      await RNFS.unlink(pdfLink);
      setModalVisible(false);
      navigateToHome();
    }
  };

  const sharePdf = async () => {
    try {
      if (pdfLink) {
        const shareOptions = {
          title: 'Share PDF via',
          message: 'Please find the PDF attached',
          url: `file://${pdfLink}`, // File path
          failOnCancel: false,
        };

        await Share.open(shareOptions);
      }
    } catch (error) {
      // console.log('Error sharing file:', error);
    }
  };

  const downloadPdf = async () => {
    try {
      const sourcePath =
        '/storage/emulated/0/Android/data/com.nangia_quotepro/files/' + pdfName;

      const path =
        RNFS.ExternalStorageDirectoryPath + '/Download' + '/NangiaQuotePro';

      const folderExists = await RNFS.exists(path);

      if (!folderExists) {
        await RNFS.mkdir(path);
        // console.log('Folder created success');
      } else {
        // console.log('Folder already exists');
      }

      const exPath = path + '/' + pdfName;

      // // Copy the file
      await RNFS.copyFile(sourcePath, exPath);
      handleSaveModal();

      // console.log('PDF file copied successfully to Download folder.');
    } catch (error) {
      // console.log('Error copying PDF file:', error);
    }
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.topBar}>
          <TouchableOpacity style={styles.icon} onPress={navigateToHome}>
            <FontAwesome6 name={'angle-left'} size={20} color="#485460" />
          </TouchableOpacity>
          <Text style={styles.toptext}>{pdfName && pdfName}</Text>
          <View style={styles.topEmpty}></View>
        </View>

        <View style={styles.mainPart}>
          <Pdf
            trustAllCerts={false}
            source={pdfPath && pdfPath}
            style={{flex: 1, width: '100%'}}
          />
        </View>

        <View style={styles.tools}>
          <TouchableOpacity style={styles.iconTool} onPress={sharePdf}>
            <FontAwesome6 name={'share-nodes'} size={25} color="#00C853" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconTool} onPress={downloadPdf}>
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

        <Modal
          animationType="slide"
          transparent={true}
          visible={saveModalVisible}
          onRequestClose={() => {
            setSaveModalVisible(false);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>File Saved</Text>
              <TouchableOpacity onPress={handleSaveModal}>
                <Text style={styles.modalBtnTextNo}>Ok</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </>
  );
};

export default ViewPdf;

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
