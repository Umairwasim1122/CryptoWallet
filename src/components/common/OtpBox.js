import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Platform,
  Dimensions,
} from 'react-native';
import * as React from 'react';
const HEIGHT = Dimensions.get('screen').height;

import {COLORS} from '../../buisnessLogics/constants';
import {
  FONT_SIZE,
  HEIGHT_BASE_RATIO,
  WIDTH_BASE_RATIO,
  wp,
} from '../../buisnessLogics/utils/helpers';

const OtpBox = ({
  reference,
  onChange,
  autoFocus,
  line_Color,
  opacity,
  defaultValue,
  borderColor,
  fontColor,
  err,
}) => {
  return (
    <View
      style={{
        width: HEIGHT > 600 ? WIDTH_BASE_RATIO(66.83) : WIDTH_BASE_RATIO(40),
        height: HEIGHT > 600 ? HEIGHT_BASE_RATIO(60.94) : HEIGHT_BASE_RATIO(40),
        backgroundColor: COLORS.OTP_INPUT,
        borderRadius: 12,
        // justifyContent: "space-between",z
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        alignSelf: 'center',
        backgroundColor: COLORS.primary,
        borderWidth: 1,
        borderColor: borderColor,

        // paddingBottom: HEIGHT_BASE_RATIO(5),
      }}>
      <TextInput
        ref={reference}
        // value={2}
        autoFocus={autoFocus}
        onChangeText={onChange}
        // defaultValue={defaultValue.toString()}
        // onChangeText
        keyboardType="number-pad"
        style={{
          width: WIDTH_BASE_RATIO(30),
          textAlign: 'center',
          fontSize: FONT_SIZE(20),
          // color: fontColor,
          color: fontColor,
        }}
        maxLength={1}
      />
      {/* <View
        style={{
          width: WIDTH_BASE_RATIO(16),
          height: HEIGHT_BASE_RATIO(5),
          backgroundColor: "yellow",
        }}
      /> */}
      {/* <View
        style={{
          width: WIDTH_BASE_RATIO(15),
          height: HEIGHT_BASE_RATIO(1.5),
          // backgroundColor: "#665458",
          // backgroundColor: "#A5A0A0",
          backgroundColor: line_Color,
          opacity: opacity,
          marginTop:
            Platform.OS === "ios"
              ? HEIGHT_BASE_RATIO(5)
              : HEIGHT_BASE_RATIO(-11),
        }}
      /> */}
    </View>
  );
};

export default OtpBox;
