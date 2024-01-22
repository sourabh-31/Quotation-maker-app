import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import RNFS from 'react-native-fs';
import {useCustomer} from '../Utils/CustomerContext';
import PdfSingle from './PdfSingle';
import {useNavigation} from '@react-navigation/native';

const PdfContainer = ({isIconClicked, toggleMultiSelection, selectMode}) => {
  const navigation = useNavigation();

  const {searchQuery, pdfFiles, setPdfFiles} = useCustomer();

  useEffect(() => {
    async function fetchPdfFiles() {
      try {
        const documentsDirectory =
          '/storage/emulated/0/Android/data/com.nangia_quotepro/files';
        const files = await RNFS.readDir(documentsDirectory);

        const pdfFiles = files.filter(
          file => file.isFile() && file.name.toLowerCase().endsWith('.pdf'),
        );

        setPdfFiles(pdfFiles);
      } catch (error) {
        // console.log('Error fetching PDF documents:', error);
      }
    }

    fetchPdfFiles();
  }, [pdfFiles]);

  const filteredFiles = pdfFiles.filter(file =>
    file.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handlePdfOpen = file => {
    const pdfSource = {uri: 'file://' + file.path};
    navigation.navigate('ViewPdf', {
      pdfPath: pdfSource,
      pdfName: file.name,
      pdfLink: file.path,
    });
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {filteredFiles.map((file, index) => (
        <PdfSingle
          key={index}
          file={file}
          isIconClicked={isIconClicked}
          toggleMultiSelection={toggleMultiSelection}
          handlePdfOpen={handlePdfOpen}
          selectMode={selectMode}
        />
      ))}
    </ScrollView>
  );
};

export default PdfContainer;

const styles = StyleSheet.create({});
