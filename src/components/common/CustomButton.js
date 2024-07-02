import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  View,
} from 'react-native';
import React from 'react';
import {
  HEIGHT_BASE_RATIO,
  WIDTH_BASE_RATIO,
  wp,
  FONT_SIZE,
} from '../../buisnessLogics/utils/helpers';
import {COLORS, FONTS} from '../../buisnessLogics/constants';

const CustomButton = ({
  load,
  onPress,
  backgroundColor,
  text,
  width,
  loading,
  fontColor,
  boderColor,
  borderRadius,
  rightArrow,
  height,
  textColor,
  fontSize,
  fontWeight,
  SVG,
  fontFamily,
  ActivityColor,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[
        styles.container,
        {
          backgroundColor: backgroundColor,
          width: width ? width : '100%',
          height: height ? height : HEIGHT_BASE_RATIO(48),
          borderWidth: WIDTH_BASE_RATIO(1),
          borderColor: boderColor,
          borderRadius: borderRadius ? borderRadius : 8,
          flexDirection: 'row',
        },
      ]}
      onPress={onPress}>
      {SVG && <SVG style={{marginRight: WIDTH_BASE_RATIO(20)}} />}
      {load ? (
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text
            style={{
              color: textColor ? textColor : COLORS.WHITE,
              fontSize: fontSize ? fontSize : FONT_SIZE(16),
              fontFamily: typeof fontFamily === 'string' ? fontFamily : 'Raleway-Regular',
              marginRight: WIDTH_BASE_RATIO(10),
            }}>
            {text}
          </Text>
          <ActivityIndicator
            color={ActivityColor ? ActivityColor : '#FFFFFF'}
          />
        </View>
      ) : (
        <Text
          style={{
            color: textColor || COLORS.WHITE,
            fontFamily: typeof fontFamily === 'string' ? fontFamily : 'Raleway-Regular',
          }}>
          {text}
        </Text>
      )}
      {rightArrow && (
        <Image style={{marginLeft: WIDTH_BASE_RATIO(10)}} source={rightArrow} />
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  container: {
    height: HEIGHT_BASE_RATIO(56),
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    color: COLORS.WHITE,
  },
});
