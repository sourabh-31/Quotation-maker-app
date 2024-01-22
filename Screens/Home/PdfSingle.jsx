import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import pdfImage from '../../images/doc.png';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {useCustomer} from '../Utils/CustomerContext';

const PdfSingle = ({
  isIconClicked,
  toggleMultiSelection,
  file,
  index,
  handlePdfOpen,
  selectMode,
}) => {
  const [isSelected, setIsSelected] = useState(false);

  const {setPdfArray} = useCustomer();

  useEffect(() => {
    setIsSelected(false);
    setPdfArray([]);
  }, [selectMode]);

  const handlePdfSelected = path => {
    setIsSelected(prev => !prev); // Toggle isSelected
    setPdfArray(prevArray => {
      if (prevArray.includes(path)) {
        return prevArray.filter(item => item !== path); // Remove path if already present
      } else {
        return [...prevArray, path]; // Add path if not present
      }
    });
  };

  const selectFile = path => {
    handlePdfSelected(path);
    toggleMultiSelection();
  };

  // const onPressHandler = selectMode
  //   ? () => handlePdfSelected(file.path)
  //   : () => handlePdfOpen(file);

  return (
    <TouchableOpacity
      key={index}
      onLongPress={() => selectFile(file.path)}
      onPress={
        selectMode
          ? () => handlePdfSelected(file.path)
          : () => handlePdfOpen(file)
      }>
      <View style={styles.pdfContainer}>
        <View style={styles.pdfPart1}>
          {isIconClicked && (
            <>
              {isSelected ? (
                <FontAwesome6
                  name={'square-check'}
                  solid
                  size={22}
                  color="blue"
                  style={styles.checkBox}
                />
              ) : (
                <FontAwesome6
                  name={'square'}
                  size={22}
                  color="darkgray"
                  style={styles.checkBox}
                />
              )}
            </>
          )}
          <Image source={pdfImage} style={styles.pdfImage} />
          <View style={styles.pdfTextPart}>
            <Text style={styles.pdfName}>{file.name}</Text>
            <View style={styles.DateTime}>
              <Text style={styles.DateTimeName}>
                {file.mtime.toDateString()}
              </Text>
              <Text style={styles.DateTimeName}> | </Text>
              <Text style={styles.DateTimeName}>
                {file.mtime.toLocaleTimeString()}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default PdfSingle;

const styles = StyleSheet.create({
  DateTime: {
    flexDirection: 'row',
  },
  DateTimeName: {
    fontFamily: 'Nunito-Regular',
    color: 'gray',
  },
  pdfName: {
    color: '#1B1B1B',
    fontFamily: 'Nunito-Regular',
    fontSize: 18,
  },
  pathName: {
    fontFamily: 'Nunito-Regular',
    color: 'gray',
  },
  pdfImage: {
    width: 50,
    height: 50,
  },
  pdfContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
  },
  pdfPart1: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  icon: {
    marginRight: 15,
  },
});
