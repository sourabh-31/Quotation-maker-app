import React, {createContext, useContext, useState} from 'react';

export const CustomerContext = createContext(null);

export const CustomerProvider = ({children}) => {
  const formatDate = date => {
    const d = new Date(date);
    const month = d.getMonth() + 1;
    const day = d.getDate();
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const [title, setTitle] = useState('Mr.');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [type, setType] = useState('INDIVIDUAL');

  //   Manager Details

  const [manager, setManager] = useState('');
  const [managerPhone, setManagerPhone] = useState('');
  const [dateText, setDateText] = useState(formatDate(new Date()));

  // Car Details

  const [car, setCar] = useState('');
  const [color, setColor] = useState('');
  const [variant, setVariant] = useState('');
  const [model, setModel] = useState('');

  const [pdfSource, setPdfSource] = useState(null);
  const [pdfSelected, setPdfSelected] = useState(null);
  const [pdfName, setPdfName] = useState('');

  const [searchQuery, setSearchQuery] = useState('');

  const [pdfArray, setPdfArray] = useState([]);

  const [selectMode, setSelectMode] = useState(false);

  const [pdfFiles, setPdfFiles] = useState([]);

  const [priceInfo, setPriceInfo] = useState(null);

  const contextValues = {
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
    manager,
    setManager,
    managerPhone,
    setManagerPhone,
    dateText,
    setDateText,
    car,
    setCar,
    color,
    setColor,
    variant,
    setVariant,
    model,
    setModel,
    pdfSource,
    setPdfSource,
    pdfName,
    setPdfName,
    searchQuery,
    setSearchQuery,
    pdfSelected,
    setPdfSelected,
    pdfArray,
    setPdfArray,
    selectMode,
    setSelectMode,
    pdfFiles,
    setPdfFiles,
    priceInfo,
    setPriceInfo,
  };

  return (
    <CustomerContext.Provider value={contextValues}>
      {children}
    </CustomerContext.Provider>
  );
};

export const useCustomer = () => {
  const context = useContext(CustomerContext);
  if (!context) {
    throw new Error('useCustomer must be used within a CustomerProvider');
  }
  return context;
};
