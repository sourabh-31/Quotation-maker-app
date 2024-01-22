import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {useCustomer} from '../Utils/CustomerContext';
import RNFS from 'react-native-fs';
import Share from 'react-native-share';

const Actions = ({closeActionVisible}) => {
  const {pdfArray, setSelectMode, setPdfArray} = useCustomer();

  const [modalVisible, setModalVisible] = useState(false);

  const [saveModalVisible, setSaveModalVisible] = useState(false);

  const handleSaveModal = () => {
    setSaveModalVisible(visible => !visible);
    closeActionVisible();
  };

  const handleModal = () => {
    setModalVisible(visible => !visible);
  };

  const deletePdfs = async () => {
    try {
      if (pdfArray.length > 1) {
        const promises = pdfArray.map(async link => {
          if (link) {
            await RNFS.unlink(link);
          }
        });

        await Promise.all(promises);
        setPdfArray([]);
      } else if (pdfArray.length === 1) {
        await RNFS.unlink(pdfArray[0]);
        setPdfArray([]);
      }
      closeActionVisible();
      setSelectMode(false);
    } catch (error) {
      // console.log('Error deleting file:', error);
    }
  };

  const newArrayWithPrefix = pdfArray.map(url => `file://${url}`);

  const sharePdf = async () => {
    try {
      if (pdfArray) {
        const shareOptions = {
          title: 'Share PDF via',
          message: 'Please find the PDF attached',
          urls: newArrayWithPrefix, // File path
          failOnCancel: false,
        };

        await Share.open(shareOptions);
        closeActionVisible();
      }
    } catch (error) {
      // console.log('Error sharing file:', error);
    }
  };

  const regularArray = [...pdfArray];

  const downloadPdfArray = async pdfArray => {
    try {
      const basePath =
        RNFS.ExternalStorageDirectoryPath + '/Download' + '/NangiaQuotePro';

      const folderExists = await RNFS.exists(basePath);

      if (!folderExists) {
        await RNFS.mkdir(basePath);
        // console.log('Folder created successfully');
      } else {
        // console.log('Folder already exists');
      }

      // Iterate through the pdfArray and copy each file
      const promises = regularArray.map(async pdfFullPath => {
        const exPath = basePath + '/' + pdfFullPath.split('/').pop(); // Extract file name from path

        // console.log(pdfFullPath);
        // console.log(exPath);

        // Return the promise for each copy operation
        return RNFS.copyFile(pdfFullPath, exPath);
      });

      await Promise.all(promises);
      setSaveModalVisible(true);
      // console.log('PDF files copied successfully to Download folder.');
    } catch (error) {
      // console.log('Error copying PDF files:', error);
    }
  };

  return (
    <View style={styles.toolBar}>
      <View style={styles.toolLeft}>
        <TouchableOpacity style={styles.icon} onPress={sharePdf}>
          <FontAwesome6 name={'share-nodes'} size={25} color="#00C853" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon} onPress={handleModal}>
          <FontAwesome6 name={'trash-can'} size={25} color="#EF5350" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon} onPress={downloadPdfArray}>
          <FontAwesome6 name={'download'} solid size={25} color="#2980B9" />
        </TouchableOpacity>
        <Text style={styles.countText}>
          {pdfArray.length > 0 ? pdfArray.length : ' '}
        </Text>
      </View>

      <View>
        <TouchableOpacity style={styles.xmark} onPress={closeActionVisible}>
          <FontAwesome6 name={'xmark'} size={35} color="#424242" />
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
              Are you sure want to delete {pdfArray.length} file?
            </Text>
            <TouchableOpacity onPress={deletePdfs}>
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
            <Text style={styles.modalText}>{pdfArray.length} files saved</Text>
            <TouchableOpacity onPress={handleSaveModal}>
              <Text style={styles.modalBtnTextNo}>Ok</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Actions;

const styles = StyleSheet.create({
  toolBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // marginTop: 10,
    paddingVertical: 29.4,
    backgroundColor: '#fff',
    elevation: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    width: '100%',
    // backgroundColor: 'gray',
  },
  toolLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 30,
    gap: 48,
  },
  xmark: {
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20,
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
  countText: {
    color: 'orange',
    fontFamily: 'Nunito-Medium',
    fontSize: 28,
  },
});
