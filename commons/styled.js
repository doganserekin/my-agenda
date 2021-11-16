import styled from 'styled-components';

export const InputContainer = styled.View`
  height: 80px;
  width: 100%;
  padding: 10px;
  margin-top: 5px;
`;

export const InputTitle = styled.Text`
  color: #000;
  font-weight: 400;
  font-size: 15px;
  margin-bottom: 5px;
`;

export const CustomInput = styled.TextInput`
  background-color: #fff;
  border-radius: 5px;
  border-width: 2px;
  border-color: #efefef;
  width: 100%;
  text-align: left;
  color: #000;
`;

export const BlueBarcode = styled.TouchableOpacity`
  background-color: #2e86de;
  border-radius: 5px;
  height: 50px;
  margin-top: 30px;
  margin-left: 10px;
  margin-right: 10px;
  margin-bottom: 5px;
  align-items: center;
  justify-content: center;
`;

export const BarcodeText = styled.Text`
  color: #fff;
  font-weight: 400;
  font-size: 16px;
`;
