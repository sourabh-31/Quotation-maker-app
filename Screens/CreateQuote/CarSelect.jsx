import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  Modal,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {useNavigation} from '@react-navigation/native';
import {Picker} from '@react-native-picker/picker';
import {carOptions} from '../Utils/CarOptions';
import {useCustomer} from '../Utils/CustomerContext';
import reactNativeHTMLToPdf from 'react-native-html-to-pdf';
import {logoBase64} from './base64Logo';
import {stampBase64} from './base64Stamp';
import RNFS from 'react-native-fs';
import {CarPrices} from '../Utils/CarPrices';

const CarSelect = () => {
  const navigation = useNavigation();

  const {
    car,
    setCar,
    variant,
    setVariant,
    color,
    setColor,
    model,
    setModel,
    title,
    name,
    address,
    phone,
    type,
    manager,
    managerPhone,
    dateText,
    setPdfSource,
    pdfName,
    setPdfName,
    setPdfSelected,
    pdfFiles,
    priceInfo,
    setPriceInfo,
  } = useCustomer();

  const [modalVisible, setModalVisible] = useState(false);
  const [modal2, setModal2] = useState(false);

  const [convertedWords, setConvertedWords] = useState('');

  const navigateToManager = () => {
    navigation.navigate('Manager');
  };

  const navigateToShowPdf = () => {
    setModalVisible(false);
    generatePdf();
    navigation.navigate('ShowPdf');
  };

  const handleModal = () => {
    setModalVisible(visible => !visible);
  };

  const updatePriceInfo = () => {
    if (car && variant && model) {
      const carInfo = CarPrices.variants[car][variant][model];
      setPriceInfo(carInfo);
    }
  };

  useEffect(() => {
    updatePriceInfo();
  }, [car, variant, model, type]);

  //Convert numbers to word function
  function numToIndianWords(amount) {
    var a = [
      '',
      'One ',
      'Two ',
      'Three ',
      'Four ',
      'Five ',
      'Six ',
      'Seven ',
      'Eight ',
      'Nine ',
      'Ten ',
      'Eleven ',
      'Twelve ',
      'Thirteen ',
      'Fourteen ',
      'Fifteen ',
      'Sixteen ',
      'Seventeen ',
      'Eighteen ',
      'Nineteen ',
    ];
    var b = [
      '',
      '',
      'Twenty',
      'Thirty',
      'Forty',
      'Fifty',
      'Sixty',
      'Seventy',
      'Eighty',
      'Ninety',
    ];
    var number = parseFloat(amount).toFixed(2).split('.');
    var num = parseInt(number[0]);
    var digit = parseInt(number[1]);
    //console.log(num);
    if (num.toString().length > 9) return 'overflow';
    var n = ('000000000' + num)
      .substr(-9)
      .match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
    var d = ('00' + digit).substr(-2).match(/^(\d{2})$/);
    if (!n) return;
    var str = '';
    str +=
      n[1] != 0
        ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'Crore '
        : '';
    str +=
      n[2] != 0
        ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'Lakh '
        : '';
    str +=
      n[3] != 0
        ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'Thousand '
        : '';
    str +=
      n[4] != 0
        ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'Hundred '
        : '';
    str +=
      n[5] != 0
        ? (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) + 'Rupees '
        : '';
    str +=
      d[1] != 0
        ? (str != '' ? 'and ' : '') +
          (a[Number(d[1])] || b[d[1][0]] + ' ' + a[d[1][1]]) +
          'Paise '
        : 'Only';
    return str;
  }

  useEffect(() => {
    if (priceInfo) {
      const amount =
        type === 'INDIVIDUAL'
          ? priceInfo.INDIVIDUAL.OnRoadWithAccessories
          : priceInfo.CORPORATE.OnRoadWithAccessories;
      const words = numToIndianWords(amount);
      setConvertedWords(words);
    }
  });

  const generatePdf = async () => {
    const options = {
      html: `
      <style>
      .container{
        border: 1px solid black;
        margin-right: 1.5rem;
        margin-left: 0.5rem;
        scale: 95%;
      }

      p {
        font-size: 0.9rem;
        line-height: 0.3rem;
      }

      .subHeadBold {
        font-weight: 500;
      }

      .part1 {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 1rem;
        margin-top: 0px;
      }

      .part1 h3 {
        text-decoration: underline;
        font-size: 1.1rem;
        margin-bottom: 0.5rem;
      }

      .quoteNumber {
        display: flex;
        justify-content: flex-end;
      }

      .quoteNumber div {
        display: flex;
        width: 45%;
        justify-content: space-between;
        align-items: center;
        margin-right: 2rem;
        margin-top: -10px;
        margin-bottom: -10px;
      }

      .quotation {
        padding: 0 1rem;
      }

      .quotation > div {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: -10px;
      }

      .quotation h3 {
        text-decoration: underline;
        font-size: 1.1rem;
        margin-bottom: 0.5rem;
        margin-top: 0px;
      }

      .quotation2,
      .quotation4 {
        margin-right: 5.5rem;
      }

      .quotationSub {
        padding: 0 1rem;
      }

      .quotationSub > div {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-right: 6.5rem;
      }

      .quotationSub h4 {
        text-decoration: underline;
        margin-top: 0.2rem;
        margin-bottom: 0.2rem;
        font-weight: 500;
      }
      .table1 {
        width: 97%;
        border-collapse: collapse;
        margin-left: auto;
        margin-right: auto;
      }
      th,
      td {
        border: 1px solid black;
        padding: 2px;
        text-align: left;
        font-size: 0.9rem;
      }

      .tableRow {
        width: 30%;
      }

      .inWords {
        text-align: center;
      }

      .table2 {
        width: 40%;
        border-collapse: collapse;
        margin-left: 0.75rem
      }

      .subTable {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .subTable img {
        margin-right: 5rem;
        margin-top: 0.5rem;
      }

      ol,
      li {
        font-size: 0.85rem;
      }

      .terms {
        padding: 0 0.3rem;
      }

      .terms h4{
        margin-top: 0px;
        margin-left: 0.5rem;
        text-decoration: underline;
      }

      .list{
        margin-top: -15px;
      }
      </style>
      <section class="container">
      <section class="part1">
        <div>
          <h3>NANGIA CARS PVT. LTD.</h3>
          <p>Plot No. 33/B MIDC Wadi Road Opp.</p>
          <p>Nangia Speciality Hospital Nagpur</p>
          <p>GST No. 27AAGCN4816N1Z0</p>
          <p>PAN No. AAGCN4816N</p>
        </div>
        <img src="${logoBase64}"/>
      </section>
      <section class="quoteNumber">
        <div>
          <p>Quotation No.</p>
          <p>MG/NANG/2022-23/${pdfFiles.length + 1}</p>
        </div>
      </section>
      <section class="quotation">
        <h3>QUOTATION</h3>
        <div>
          <div class="quotation1">
            <p class="subHeadBold">Name:</p>
            <p class="subHeadBold">Mobile No.:</p>
            <p class="subHeadBold">Address:</p>
          </div>

          <div class="quotation2">
            <p>${title ? title : '-'} ${name ? name : '-'}</p>
            <p>${phone ? phone : '-'}</p>
            <p>${address ? address : '-'}</p>
          </div>

          <div class="quotation3">
            <p class="subHeadBold">Date:</p>
            <p class="subHeadBold">Relationship Manager:</p>
            <p class="subHeadBold">Mobile No.:</p>
          </div>

          <div class="quotation4">
            <p>${dateText ? dateText : '-'}</p>
            <p>${manager ? manager : '-'}</p>
            <p>${managerPhone ? managerPhone : '-'}</p>
          </div>
        </div>
      </section>
      <section class="quotationSub">
        <h4>Price Quotation For :</h4>

        <div>
          <div>
            <p class="subHeadBold">MG ${car && car} ${variant && variant}</p>
            <p class="subHeadBold">${model ? model : '-'}</p>
            <p class="subHeadBold">Color - ${color ? color : '-'}</p>
          </div>

          <div></div>

          <div>
            <p class="subHeadBold">Customer:</p>
          </div>

          <div>
            <p class="subHeadBold">${type ? type : '-'}</p>
          </div>
        </div>
      </section>
      <section>
      <table class="table1">
        <tr>
          <th>Description</th>
          <td rowspan="9" class="tableRow"></td>
          <th>Amount</th>
        </tr>
        <tr>
          <td>Ex-showroom Price</td>
          <td>${priceInfo.ExShowroomPrice && priceInfo.ExShowroomPrice}</td>
        </tr>
        <tr>
          <td>T.C.S @ 1%</td>
          <td>${priceInfo.TCS && priceInfo.TCS}</td>
        </tr>
        <tr>
          <td>Registration Chrages (RTO)</td>
          <td>${
            type === 'INDIVIDUAL'
              ? priceInfo.INDIVIDUAL.RegistrationCharges
              : priceInfo.CORPORATE.RegistrationCharges
          }</td>
        </tr>
        <tr>
          <td>Insurance (Secure Elite 1+3)</td>
          <td>${priceInfo.Insurance && priceInfo.Insurance}</td>
        </tr>
        <tr>
          <td>Fastag</td>
          <td>${priceInfo.FastTag && priceInfo.FastTag}</td>
        </tr>
        <tr>
          <td>Essential Kit</td>
          <td>${priceInfo.EssentialKit && priceInfo.EssentialKit}</td>
        </tr>
        <tr>
          <td>Classic AMC</td>
          <td>${priceInfo.ClassicAmc && priceInfo.ClassicAmc}</td>
        </tr>
        <tr>
          <td>VAS</td>
          <td>${priceInfo.VAS && priceInfo.VAS}</td>
        </tr>
        <tr>
          <td>Total Onroad Price (Insurance 1+3)</td>
          <td class="tableRow"></td>
          <td>${
            type === 'INDIVIDUAL'
              ? priceInfo.INDIVIDUAL.OnRoadPrice
              : priceInfo.CORPORATE.OnRoadPrice
          }</td>
        </tr>
        <tr>
          <td>Carpet Lamination / Medklinn Kit</td>
          <td class="tableRow">Optional</td>
          <td>${priceInfo.CarpetLamination && priceInfo.CarpetLamination}</td>
        </tr>
        <tr>
          <td>Onroad Price With Accessories (Insurance 1+3)</td>
          <td class="tableRow"></td>
          <td>${
            type === 'INDIVIDUAL'
              ? priceInfo.INDIVIDUAL.OnRoadWithAccessories
              : priceInfo.CORPORATE.OnRoadWithAccessories
          }</td>
        </tr>
        <tr>
          <td colspan="3" class="inWords">
            ${convertedWords && convertedWords}
          </td>
        </tr>
      </table>
    </section>
    <section class="subTable">
        <table class="table2">
          <tr>
            <td>RTGS Details: STATE BANK OF INDIA</td>
          </tr>
          <tr>
            <td>Account No: 38591909496</td>
          </tr>
          <tr>
            <td>Name: Nangia Cars Pvt. Ltd</td>
          </tr>
          <tr>
            <td>IFSC Code: SBIN0001632</td>
          </tr>
        </table>
        <img src="${stampBase64}"/>
      </section>
      <section class="terms">
        <h4>Terms and Conditions</h4>
        <ol class="list">
          <li>
            The prices are subject to change without prior notice. Price
            prevailing at the time of Delivery of the vehicle will be
            applicable.
          </li>
          <li>
            Payment to be made by Pay Order/DD/RTGS in favour of NANGIA CARS PVT
            LTD. Account no:- 38591909496, IFSC CODE:- SBIN0001632, Branch:-
            Hingna MIDC.
          </li>
          <li>
            In case applicable, Temporary Registration Charges will be Rs 2000/-
          </li>
          <li>
            Registration and Issue of Registration Certificate is at the sole
            discretion of Local Transport Authority.
          </li>
          <li>
            Tax Collected at Source (TCS) is @1% of Ex-showroom price w.e.f 1st
            June 2016, where Ex-showroom price is more than Rs. 10 Lacs.
          </li>
          <li>
            Essential Kit comprises of Mud Flaps, Car Cover and 3D Mats (cabin +
            Boot)
          </li>
          <li>
            PAN Number & Address proof in original are necessary @ the time of
            booking.
          </li>
          <li>
            Insurance - Secure Prime Cover includes consumables, rodent
            coverage, NIL Dep., RTI, Engine Protection, RIM & Tyre.
          </li>
          <li>
            Packages other than MG Secure Prime are also available: Secure
            Classic, Secure Premium and Secure Elite. For more information,
            please contact your Relationship Manager.
          </li>
          <li>Hypothecation Charges if applicable - 1500 (INR)</li>
          <li>
            Any Payments will be valid only when they are supported by official
            stamp receipt.
          </li>
          <li>
            Including in VAS Acrylic Paint Sealent, Antirust, Rodent Coating,
            Silencer galvanizing coating.
          </li>
        </ol>
      </section>
      </section>
      `,
      fileName: pdfName,
      directory: '',
    };
    const file = await reactNativeHTMLToPdf.convert(options);
    // console.log(file);

    setPdfSource({uri: 'file://' + file.filePath});
    setPdfSelected(file.filePath);
  };

  const checkIfNameExists = name => {
    const lowerCaseName = name.toLowerCase().replace(/\.pdf$/, '');
    return pdfFiles.some(
      file => file.name.toLowerCase().replace(/\.pdf$/, '') === lowerCaseName,
    );
  };

  const handleDone = () => {
    if (checkIfNameExists(pdfName)) {
      // Show a warning that the name already exists
      setModal2(true);
      // Handle warning display or alert as needed
    } else {
      // Proceed with navigation or other actions
      navigateToShowPdf();
    }
  };

  return (
    <KeyboardAvoidingView style={styles.customerInfo} behavior="padding">
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.icon} onPress={navigateToManager}>
          <FontAwesome6 name={'angle-left'} size={20} color="#485460" />
        </TouchableOpacity>
        <Text style={styles.toptext}>Create</Text>
        <TouchableOpacity style={styles.topEmpty} onPress={handleModal}>
          <Text style={styles.nextText}>Done</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.detailSection}>
        <Text style={styles.heading}>Car Details</Text>

        <View>
          <Text style={styles.subHead}>Car Name</Text>
          <View style={styles.pickerContainer}>
            <Picker
              style={styles.picker}
              selectedValue={car}
              onValueChange={(itemValue, itemIndex) => setCar(itemValue)}>
              {carOptions.carNames.map((car, index) => (
                <Picker.Item
                  key={index}
                  label={car.label}
                  value={car.value}
                  style={styles.pickerItem}
                />
              ))}
            </Picker>
            <TouchableOpacity style={styles.downIcon}>
              <FontAwesome6 name={'caret-down'} size={20} color="#485460" />
            </TouchableOpacity>
          </View>
        </View>

        <View>
          <Text style={styles.subHead}>Car Variant</Text>
          <View style={styles.pickerContainer}>
            <Picker
              style={styles.picker}
              selectedValue={variant}
              onValueChange={(itemValue, itemIndex) => setVariant(itemValue)}>
              {car !== '' &&
                carOptions.variants[car] &&
                Object.keys(carOptions.variants[car]).map(
                  (variantType, index) => (
                    <Picker.Item
                      key={index}
                      label={variantType}
                      value={variantType}
                      style={styles.pickerItem}
                    />
                  ),
                )}
            </Picker>
            <TouchableOpacity style={styles.downIcon}>
              <FontAwesome6 name={'caret-down'} size={20} color="#485460" />
            </TouchableOpacity>
          </View>
        </View>

        <View>
          <Text style={styles.subHead}>Car Model</Text>
          <View style={styles.pickerContainer}>
            <Picker
              style={styles.picker}
              selectedValue={model}
              onValueChange={(itemValue, itemIndex) => setModel(itemValue)}>
              {car !== '' &&
                variant !== '' &&
                carOptions.variants[car]?.[variant] &&
                carOptions.variants[car][variant].map((carModel, index) => (
                  <Picker.Item
                    key={index}
                    label={carModel.label}
                    value={carModel.value}
                    style={styles.pickerItem}
                  />
                ))}
            </Picker>
            <TouchableOpacity style={styles.downIcon}>
              <FontAwesome6 name={'caret-down'} size={20} color="#485460" />
            </TouchableOpacity>
          </View>
        </View>

        <View>
          <Text style={styles.subHead}>Color</Text>
          <TextInput
            style={styles.input}
            value={color}
            onChangeText={data => setColor(data)}
          />
        </View>
      </ScrollView>

      {modal2 ? (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(false);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>File name already exists!</Text>
              <TouchableOpacity onPress={() => setModal2(false)}>
                <Text style={styles.modalBtnText}>Ok</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      ) : (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(false);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TouchableOpacity style={styles.xmark} onPress={handleModal}>
                <FontAwesome6 name={'xmark'} size={20} color="#000" />
              </TouchableOpacity>
              <Text style={styles.modalText}>Enter the file name</Text>
              <TextInput
                style={styles.modalInput}
                value={pdfName}
                onChangeText={data => setPdfName(data)}
              />
              <TouchableOpacity onPress={handleDone}>
                <Text style={styles.modalBtnText}>Done</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </KeyboardAvoidingView>
  );
};

export default CarSelect;

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
  detailSection: {
    flexGrow: 1,
  },
  nextText: {
    color: '#E0115F',
    fontFamily: 'Nunito-Bold',
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
  modalBtnText: {
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
  xmark: {
    position: 'absolute',
    right: 20,
    top: 15,
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
});
