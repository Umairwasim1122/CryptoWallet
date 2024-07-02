import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  Platform,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";

import {
  FONT_SIZE,
  HEIGHT_BASE_RATIO,
  WIDTH_BASE_RATIO,
  wp,
} from "../../buisnessLogics/utils/helpers";
import { COLORS, FONTS } from "../../buisnessLogics/constants/appTheme/theme";
import * as ICONS from "../../Ui/assets/icons/index";
import PhoneInput from "react-native-phone-number-input";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import { useFocusEffect } from "@react-navigation/native";

const EmailPhoneTextInput = ({
  title,
  placeholder,
  onChangeText,
  Icon,
  countryCode,
  secureEntry,
  titleIcon,
  borderColor,
  defaultValue,
  maxLength,
  password,
  value,
  SVG,
  number,
  editable,
  backgroundColor,
}) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (text) => {
    onChangeText(text);
    setInputValue(text);
  };
  const isPhoneNumber = (value) => {
    return Number.isInteger(parseInt(value));
  };
  useFocusEffect(
    React.useCallback(() => {
      return () => {
        setInputValue("");
      };
    }, [])
  );

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row" }}>
        <Text
          style={[
            {
              marginBottom: HEIGHT_BASE_RATIO(7),
            },
            FONTS.AvenirLTStd_Black_900_14,
          ]}
        >
          {title}
        </Text>
        {titleIcon && (
          <Image
            style={{ marginLeft: WIDTH_BASE_RATIO(10) }}
            source={titleIcon}
          />
        )}
      </View>
      {number ? (
        <View
          style={{
            width: "100%",
            height: HEIGHT_BASE_RATIO(48),
            backgroundColor: COLORS.WHITE,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 25,
          }}
        >
          <PhoneInput
            // ref={phoneInput}
            // defaultValue={defaultValue}
            editable={editable}
            defaultCode="AU"
            layout="first"
            keyboardType="phone-pad"
            textInputProps={{ maxLength: 10 }}
            onChangeText={handleInputChange}
            onChangeFormattedText={handleInputChange}
            defaultValue={inputValue}
            //   withDarkTheme
            // withShadow
            // autoFocus
            // countryPickerButtonStyle={{
            //   backgroundColor: COLORS.WHITE,
            //   // backgroundColor:'green',
            //   borderRadius: 8,
            // }}
            // containerStyle={styles.phoneInputContainer}
            // // textContainerStyle={styles.phoneInputTextContainer}
            // textContainerStyle={{
            //   // backgroundColor:'green',
            //   backgroundColor: COLORS.WHITE,
            //   borderRadius: 8,
            // }}
            // // textInputStyle={styles.phoneInputText}
            // textInputStyle={{
            //   // backgroundColor:'gray',
            //   fontSize: FONT_SIZE(15),
            //   // height: Platform.OS === "ios" ? 15 : 25,
            //   height: HEIGHT_BASE_RATIO(40),
            //   width: WIDTH_BASE_RATIO(30),
            //   // paddingTop:5,
            //   paddingTop: Platform.OS === 'ios' ? 1 : 5,
            //   paddingLeft: 5,
            //   fontWeight: '400',
            // }}
            // codeTextStyle={{
            //   // backgroundColor:'blue',

            //   fontSize: FONT_SIZE(15),
            //   // height: Platform.OS === "ios" ? 15 : 25,
            //   height: HEIGHT_BASE_RATIO(40),
            //   width: WIDTH_BASE_RATIO(30),
            //   paddingTop: Platform.OS === 'ios' ? 10 : 5,
            //   paddingLeft: 5,
            //   fontWeight: '400',

            //   // alignItems:'flex-end',
            //   // backgroundColor: COLORS.WHITE,
            //   // color:'black'
            // }}
            containerStyle={styles.phoneInputContainer}
            textContainerStyle={styles.phoneInputTextContainer}
            textInputStyle={[
              FONTS.Montserrat_Black_400_16,
              styles.phoneInputText,
            ]}
            codeTextStyle={[
              FONTS.Montserrat_Black_400_16,
              {
                height: Platform.OS === "ios" ? 15 : moderateScale(16),
                backgroundColor: COLORS.WHITE,
                alignItems: "center",
                // marginTop: 4,
              },
            ]}
            //   countryPickerButtonStyle={{backgroundColor:'green'}}
          />
        </View>
      ) : isPhoneNumber(inputValue) ? (
        <View
          style={{
            width: "100%",
            height: HEIGHT_BASE_RATIO(48),
            backgroundColor: COLORS.WHITE,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <PhoneInput
            // ref={phoneInput}
            // defaultValue={value}
            defaultCode="US"
            layout="first"
            keyboardType="phone-pad"
            textInputProps={{ maxLength: 10 }}
            // onChangeText={handleInputChange}
            editable={editable}
            onChangeFormattedText={handleInputChange}
            defaultValue={inputValue}
            //   withDarkTheme
            // withShadow
            // autoFocus
            // countryPickerButtonStyle={{
            //   backgroundColor: COLORS.WHITE,
            //   // backgroundColor:'green',
            //   borderRadius: 8,
            // }}
            // containerStyle={styles.phoneInputContainer}
            // // textContainerStyle={styles.phoneInputTextContainer}
            // textContainerStyle={{
            //   // backgroundColor:'green',
            //   backgroundColor: COLORS.WHITE,
            //   borderRadius: 8,
            // }}
            // // textInputStyle={styles.phoneInputText}
            // textInputStyle={{
            //   // backgroundColor:'gray',
            //   fontSize: FONT_SIZE(15),
            //   // height: Platform.OS === "ios" ? 15 : 25,
            //   height: HEIGHT_BASE_RATIO(40),
            //   width: WIDTH_BASE_RATIO(30),
            //   // paddingTop:5,
            //   paddingTop: Platform.OS === 'ios' ? 1 : 5,
            //   paddingLeft: 5,
            //   fontWeight: '400',
            // }}
            // codeTextStyle={{
            //   // backgroundColor:'blue',

            //   fontSize: FONT_SIZE(15),
            //   // height: Platform.OS === "ios" ? 15 : 25,
            //   height: HEIGHT_BASE_RATIO(40),
            //   width: WIDTH_BASE_RATIO(30),
            //   paddingTop: Platform.OS === 'ios' ? 10 : 5,
            //   paddingLeft: 5,
            //   fontWeight: '400',

            //   // alignItems:'flex-end',
            //   // backgroundColor: COLORS.WHITE,
            //   // color:'black'
            // }}
            containerStyle={styles.phoneInputContainer}
            textContainerStyle={styles.phoneInputTextContainer}
            textInputStyle={[
              styles.phoneInputText,
              FONTS.AvenirLTStd_Gray_400_15,
            ]}
            codeTextStyle={[
              {
                // fontSize: FONT_SIZE(12),
                height: Platform.OS === "ios" ? 15 : 20,
                backgroundColor: COLORS.WHITE,
                alignItems: "center",
                // marginTop: 4,
              },
              FONTS.AvenirLTStd_Gray_400_15,
            ]}
            //   countryPickerButtonStyle={{backgroundColor:'green'}}
          />
        </View>
      ) : (
        <View
          style={{
            width: wp(85),
            height: HEIGHT_BASE_RATIO(48),
            // alignSelf: 'center',
            borderRadius: Platform.OS === "ios" ? 25 : 25,
            color: COLORS.BLACK,
            fontSize: FONT_SIZE(11),
            fontWeight: "300",
            paddingHorizontal: WIDTH_BASE_RATIO(10),
            // borderWidth: 0.5,
            borderColor: COLORS.SEMI_WHITE,
            borderWidth: 1, //   marginBottom: '3%',
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: backgroundColor ? COLORS.Gray : "",
          }}
        >
          {/* <View style={{marginRight: WIDTH_BASE_RATIO(5)}}>
            <SVG width="20" height="20" />
          </View> */}

          {countryCode && (
            <Text style={{ marginHorizontal: WIDTH_BASE_RATIO(10) }}>
              {countryCode}
            </Text>
          )}

          <TextInput
            placeholder={placeholder}
            //   onChangeText={onChangeText}
            editable={editable}
            onChangeText={handleInputChange}
            secureTextEntry={secureEntry}
            defaultValue={defaultValue}
            placeholderTextColor={COLORS.LIGHT_GRAY}
            // placeholderTextColor={COLORS.LIGHT_GRAY}
            color={COLORS.LIGHT_GRAY}
            autoCapitalize="none"
            maxLength={maxLength ? maxLength : 100}
            keyboardType={title === "Phone Number" ? "number-pad" : "default"}
            value={value}
            style={[
              FONTS.AvenirLTStd_Gray_400_15,
              {
                width: password ? wp(65) : wp(75),
                // color: COLORS.BLACK,
                marginLeft: 3,
              },
            ]}
          />

          {password && (
            <Image
              source={ICONS.openeye}
              style={{ marginRight: WIDTH_BASE_RATIO(5) }}
            />
          )}
        </View>
      )}

      {/* <Text>Error</Text> */}
    </View>
  );
};

export default EmailPhoneTextInput;

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    marginBottom: HEIGHT_BASE_RATIO(10),
    marginTop: HEIGHT_BASE_RATIO(5),
  },
  phoneInputContainer: {
    borderColor: COLORS.SEMI_WHITE,
    borderWidth: 1,
    borderRadius: Platform.OS === "ios" ? 25 : 25,
    backgroundColor: COLORS.WHITE,
    width: "100%",
    height: HEIGHT_BASE_RATIO(49),
  },
  phoneInputTextContainer: {
    backgroundColor: "#fff",
    // backgroundColor:'green',
    borderRadius: 25,
    // height:48
  },
  phoneInputText: {
    // fontSize: 16,
    // color: COLORS.LIGHT_BLACK,
    // textAlignVertical: 'top'
    backgroundColor: "transparent",
    height: HEIGHT_BASE_RATIO(45),
    marginTop: moderateScale(1.5),
  },
});
