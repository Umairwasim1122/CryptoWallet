import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  Pressable,
} from 'react-native';
import React, {useState} from 'react';
import {
  FONT_SIZE,
  HEIGHT_BASE_RATIO,
  WIDTH_BASE_RATIO,
  wp,
} from '../../buisnessLogics/utils/helpers';
import {COLORS, FONTS} from '../../buisnessLogics/constants';
import * as ICONS from '../../Ui/assets/icons/index';

const CustomInputTitle = ({
  title,
  placeholder,
  onChangeText,
  countryCode,
  Correct,
  secureEntry,
  titleIcon,
  editable,
  onPress,
  borderWidth,
  password,
  isEye,
  borderColor,
  defaultValue,
  maxLength,
  height,
  noIcon,
  width,
  value,
  email,
  SVG,
  multiline,
  start,
  fontColor,
  SVG2,
  marginRight,
  maxWidth,
  keyboardType,
  textPosition,
  backgroundColor,
  marginLeft,
  borderRadius,
  font,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row'}}>
        {title && (
          <Text
            style={[
              FONTS.Nunito_Black_400_16,
              {
                paddingBottom: HEIGHT_BASE_RATIO(10),
                marginLeft: WIDTH_BASE_RATIO(5),
                // fontWeight: 500,
                // fontSize: 16,
                // color: COLORS.Gray,
              },
            ]}>
            {title}
          </Text>
        )}
        {/* {titleIcon && (
          <Image
            resizeMode="contain"
            style={{
              marginLeft: WIDTH_BASE_RATIO(10),
            }}
            source={titleIcon}
          />
        )} */}
      </View>
      <View
        style={{
          width: width ? width : '100%',
          height: height ? height : HEIGHT_BASE_RATIO(48),
          backgroundColor: backgroundColor ? backgroundColor : COLORS.WHITE,
          // alignSelf: 'center',
          borderRadius: borderRadius ? borderRadius : 25,
          color: COLORS.BLACK,
          fontSize: FONT_SIZE(11),
          fontWeight: '300',
          paddingHorizontal: WIDTH_BASE_RATIO(10),
          borderWidth: WIDTH_BASE_RATIO(1),
          borderColor: borderColor ? borderColor : COLORS.GRAY,
          //   marginBottom: '3%',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        {noIcon ? null : SVG2 ? (
          <View
            style={{
              paddingBottom: start ? 43 : 0,
            }}>
            <SVG2 width="20" height="20" />
          </View>
        ) : (
          <Image
            resizeMode="contain"
            // source={Icon}
            style={{
              width: email ? WIDTH_BASE_RATIO(22) : WIDTH_BASE_RATIO(20),
              height: email ? HEIGHT_BASE_RATIO(16) : HEIGHT_BASE_RATIO(21),
              marginRight: WIDTH_BASE_RATIO(5),
            }}
          />
        )}
        {/* 
        {countryCode && (
          <Text
            style={
              ({
                marginHorizontal: WIDTH_BASE_RATIO(10),
              },
              FONTS.AvenirLTStd_Black_400_15)
            }>
            {countryCode}
          </Text>
        )} */}

        <TextInput
          placeholder={placeholder}
          placeholderTextColor={fontColor ? fontColor : COLORS.BLACK}
          multiline={multiline}
          numberOfLines={3}
          onChangeText={onChangeText}
          color={COLORS.BLACK}
          editable={editable}
          defaultValue={defaultValue}
          keyboardType={keyboardType}
          autoCapitalize="none"
          maxLength={maxLength ? maxLength : null}
          value={value}
          secureTextEntry={secureEntry && !isPasswordVisible}
          style={[
            font ? font : FONTS.Nunito_Black_400_16,
            {
              width: '85%',
              marginLeft: WIDTH_BASE_RATIO(5),
              // marginTop: start ? "-16%" : null,
              marginRight: marginRight ? marginRight : null,
              // color: COLORS.LIGHT_BLACK,
              // fontSize: 16,
              // fontWeight: '500',
              maxWidth: maxWidth ? maxWidth : null,
              paddingLeft: textPosition ? WIDTH_BASE_RATIO(110) : 0,
            },
          ]}
        />
        {Correct && (
          <Image
            resizeMode="contain"
            source={ICONS.openeye}
            style={{
              marginRight: WIDTH_BASE_RATIO(15),
              width: WIDTH_BASE_RATIO(25),
              height: HEIGHT_BASE_RATIO(25),
            }}
          />
        )}
        {isEye ? (
          <Pressable onPress={togglePasswordVisibility}>
            <Image
              resizeMode="contain"
              source={isPasswordVisible ? ICONS.openeye : ICONS.closeeye}
              style={{
                marginRight: WIDTH_BASE_RATIO(15),
                width: WIDTH_BASE_RATIO(25),
                height: HEIGHT_BASE_RATIO(25),
              }}
            />
          </Pressable>
        ) : null}
        {SVG && (
          <Pressable onPress={onPress}>
            <View style={{}}>
              <SVG />
            </View>
          </Pressable>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    // marginBottom: HEIGHT_BASE_RATIO(22),
  },
});

export default CustomInputTitle;
