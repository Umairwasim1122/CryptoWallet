import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Platform,
  StatusBar,
  Pressable,
  noIcon,
} from 'react-native';
import React from 'react';
import { COLORS, FONTS, SIZES } from '../../buisnessLogics/constants';
import * as ICONS from '../../Ui/assets/icons/index';
import * as SVGS from '../../Ui/assets/svgs/index';
import {
  HEIGHT_BASE_RATIO,
  WIDTH_BASE_RATIO,
  wp,
  FONT_SIZE,
  hp,
} from '../../buisnessLogics/utils/helpers';
const Header = ({
  text1,
  text2,
  text3,
  onPress,
  navigation,
  padding_Top,
  Icon,
  SVG,
  noIcon,
  space,
  marginLeft,
  SVG2,
  onPress2,
  backgroundColor,
}) => {
  return (
    <>
      <StatusBar
        translucent={true}
        backgroundColor={backgroundColor ? backgroundColor : 'white'}
        barStyle={backgroundColor ? backgroundColor : 'dark-content'}
      />
      <View
        style={[
          noIcon
            ? {
              justifyContent: 'center',
              marginLeft: marginLeft ? '15%' : '0%',
            }
            : null,
          {
            backgroundColor: backgroundColor ? backgroundColor : COLORS.WHITE,
            paddingVertical: HEIGHT_BASE_RATIO(10),
            flexDirection: 'row',
            // width: wp(100),
            alignItems: 'center', // Center items vertically
            paddingHorizontal: HEIGHT_BASE_RATIO(15),
            paddingTop: padding_Top
              ? padding_Top
              : Platform.OS === 'ios'
                ? HEIGHT_BASE_RATIO(20)
                : HEIGHT_BASE_RATIO(20),
            zIndex: 100,
          },
        ]}>
        {noIcon
          ? null
          : SVG && (
            <Pressable onPress={onPress} style={{ justifyContent: "center", height: HEIGHT_BASE_RATIO(30) }}>
              <SVG />
            </Pressable>
          )}

        <View
          style={{
            flex: 1, // Expand to take available space
            justifyContent: 'center',
            marginLeft: noIcon ? 'auto' : marginLeft ? marginLeft : 0, // Center text1 when no icon
            marginRight: SVG ? WIDTH_BASE_RATIO(40) : 0,
          }}>
          <Text
            style={[
              FONTS.Pulic_Sans_700_16,
              {
                textAlign: 'center',
                color: backgroundColor ? COLORS.WHITE : COLORS.LIGHT_BLACK,
              },
            ]}>
            {text1}
          </Text>
          {text2 && (
            <Text
              style={[
                {
                  textAlign: 'center',
                  color: COLORS.Gray,
                  fontSize: FONT_SIZE(14),
                  fontWeight: 500,
                },
              ]}>
              {text2}
            </Text>
          )}
        </View>
        {SVG2 && (
          <Pressable onPress={onPress2}>
            <SVG2 />
          </Pressable>
        )}
      </View>
    </>
  );
};

export default Header;
