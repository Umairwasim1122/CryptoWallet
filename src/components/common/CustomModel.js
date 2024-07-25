import React from "react";
import { Modal, View, Text, Pressable, Image } from "react-native";
import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '../../buisnessLogics/constants/appTheme/theme';
import * as SVGS from '../../Ui/assets/svgs/index';
import * as ICONS from '../../Ui/assets/icons/index';
import * as IMAGES from '../../Ui/assets/images/index';
import { FONT_SIZE, HEIGHT_BASE_RATIO, WIDTH_BASE_RATIO } from "../../buisnessLogics/utils/helpers";

const CustomModal = ({ visible, onClose }) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={() => {
                onClose
            }}>
            <View style={styles.centeredView2}>
                <View style={[styles.viewPosition8,
                {
                    elevation: 5,
                },
                ]}>
                    <View style={{
                        alignItems: "flex-end",
                        padding: WIDTH_BASE_RATIO(10)
                    }}>
                        <Pressable onPress={onClose}>
                            <Image
                                source={ICONS.cross}
                                style={{
                                    width: WIDTH_BASE_RATIO(30),
                                    height: HEIGHT_BASE_RATIO(30),
                                }}
                                resizeMode="contain"
                            />
                        </Pressable>
                    </View>
                    <View style={{ alignItems: "center", paddingVertical: HEIGHT_BASE_RATIO(50) }}>
                        <SVGS.success width={WIDTH_BASE_RATIO(120)} height={HEIGHT_BASE_RATIO(120)} />
                        <Text style={[styles.textStyle8, { paddingTop: HEIGHT_BASE_RATIO(29) }]}>Payment has been completed successfully</Text>
                    </View>
                </View>
            </View>
            {visible ? (
                <View style={styles.overlay} />
            ) : null}
        </Modal>
    );
};

export default CustomModal;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.WHITE,
        marginRight: WIDTH_BASE_RATIO(10),
        borderRadius: 20,
        marginTop: HEIGHT_BASE_RATIO(10),
        width: WIDTH_BASE_RATIO(370),
        height: HEIGHT_BASE_RATIO(650),
    },
    viewPosition9: {
        flexDirection: "row",
        alignItems: "center"
    },
    textStyle10: {
        ...FONTS.Montserrat_Black_600_20,
        color: COLORS.WHITE,
        textAlign: "center",
        marginBottom: HEIGHT_BASE_RATIO(30),
        paddingHorizontal: WIDTH_BASE_RATIO(20)
    },
    modalContent3: {
        position: 'absolute',
        width: '100%',
        padding: WIDTH_BASE_RATIO(20),
    },
    absolute: {
        position: "absolute",
        bottom: 0,
        top: 0,
        left: 0,
        right: 0,
        alignItems: "center",
        zIndex: 20,
        // backgroundColor: 'rgba(0, 0, 0, 0.8)',
        justifyContent: "center",
        borderRadius: 20,
    },
    imageStyle: {
        marginTop: HEIGHT_BASE_RATIO(5),
        marginLeft: HEIGHT_BASE_RATIO(5),
        width: WIDTH_BASE_RATIO(30),
        height: HEIGHT_BASE_RATIO(30)
    },
    imageStyle2: {
        marginLeft: HEIGHT_BASE_RATIO(5),
        width: WIDTH_BASE_RATIO(30),
        height: HEIGHT_BASE_RATIO(30)
    },
    viewPosition: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: WIDTH_BASE_RATIO(25),
        alignItems: 'center',
        paddingVertical: HEIGHT_BASE_RATIO(15),
        // paddingTop: HEIGHT_BASE_RATIO(10),
        zIndex: -10,
    },
    overlay2: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        // backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    loaderContainer: {
        // Adjust the width and height based on your loader size
        width: WIDTH_BASE_RATIO(100),
        height: HEIGHT_BASE_RATIO(100),
        // backgroundColor: 'rgba(0, 0, 0, 0.7)',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    innerContainer: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: COLORS.LIGHT_BLUE,
        borderRadius: 30,
        marginTop: HEIGHT_BASE_RATIO(30),
    },

    innerTransitionContainer: {
        width: WIDTH_BASE_RATIO(350),
        borderRadius: 5,
        backgroundColor: COLORS.WHITE,
        alignSelf: 'center',
        marginTop: HEIGHT_BASE_RATIO(22),
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    TransitionParaLeft: {
        paddingLeft: WIDTH_BASE_RATIO(12),
        paddingTop: HEIGHT_BASE_RATIO(12),
        paddingBottom: HEIGHT_BASE_RATIO(12),
    },
    innerContainer2: {
        width: WIDTH_BASE_RATIO(350),
        height: HEIGHT_BASE_RATIO(143),
        borderRadius: 10,
        backgroundColor: COLORS.BLUE,
        alignSelf: 'center',
        overflow: 'hidden',
        marginTop: HEIGHT_BASE_RATIO(40),
    },
    innerContainer3: {
        flexDirection: 'row',
        width: WIDTH_BASE_RATIO(350),
        height: HEIGHT_BASE_RATIO(81),
        backgroundColor: COLORS.WHITE,
        alignSelf: 'center',
        borderRadius: 10,
        marginVertical: HEIGHT_BASE_RATIO(20),
        alignItems: 'center',
        paddingHorizontal: WIDTH_BASE_RATIO(35),
    },
    viewImage: {
        position: 'absolute',
        top: -HEIGHT_BASE_RATIO(-35) / 2 + HEIGHT_BASE_RATIO(9), // 8
        left: -WIDTH_BASE_RATIO(0) / 2 + HEIGHT_BASE_RATIO(9),
    },
    viewPosition2: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    viewPosition3: {
        paddingHorizontal: WIDTH_BASE_RATIO(20),
        paddingTop: HEIGHT_BASE_RATIO(25),
        paddingBottom: HEIGHT_BASE_RATIO(20),
        flexDirection: 'row',
        justifyContent: 'space-between',
        zIndex: -5
    },
    viewPosition5: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: HEIGHT_BASE_RATIO(20),
    },
    otpPosition: {
        width: '100%',
        position: 'absolute',
        paddingTop: HEIGHT_BASE_RATIO(40),
    },
    underlineStyleHighLighted: {
        // borderColor: "#03DAC6",
        color: 'black',
    },


    btn_Container: {
        position: 'absolute',
        // top: 0,
        bottom: HEIGHT_BASE_RATIO(50),
        alignSelf: 'center',
    },
    btn_Container2: {
        paddingHorizontal: WIDTH_BASE_RATIO(20),
        paddingTop: HEIGHT_BASE_RATIO(30),
        flex: 0.4,
    },

    textStyle: {
        fontSize: FONT_SIZE(26),
        fontWeight: '600',
        color: COLORS.BLACK,
        marginTop: HEIGHT_BASE_RATIO(5),
    },
    textStyle6: {
        fontSize: FONT_SIZE(16),
        fontWeight: '500',
        color: COLORS.Gray,
        alignItems: 'center',
    },
    textStyle9: {
        fontSize: FONT_SIZE(14),
        fontWeight: '500',
        color: COLORS.BLACK,
        textAlign: 'center',
        paddingHorizontal: WIDTH_BASE_RATIO(40),
    },
    textStyle7: {
        fontSize: FONT_SIZE(18),
        fontWeight: '600',
        color: COLORS.BLACK,
    },
    textStyle8: {
        fontSize: FONT_SIZE(18),
        fontWeight: '700',
        color: COLORS.BLACK,
        marginTop: HEIGHT_BASE_RATIO(10),
        marginBottom: HEIGHT_BASE_RATIO(10),
        textAlign: "center"
    },
    textStyle2: {
        fontSize: FONT_SIZE(20),
        fontWeight: '600',
        color: COLORS.BLACK,
        // textAlign: 'center',
    },

    textStyle3: {
        fontSize: FONT_SIZE(14),
        fontWeight: '500',
        color: COLORS.BLUE,
        marginRight: WIDTH_BASE_RATIO(5),
    },
    textStyle4: {
        fontSize: FONT_SIZE(18),
        fontWeight: '600',
        color: COLORS.BLACK,
    },
    textStyle5: {
        fontSize: FONT_SIZE(14),
        fontWeight: '500',
        color: COLORS.Gray,
    },
    viewPosition4: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingHorizontal: WIDTH_BASE_RATIO(40),
        paddingVertical: WIDTH_BASE_RATIO(10),
    },
    line: {
        borderBottomWidth: WIDTH_BASE_RATIO(0.3),
        borderBottomColor: COLORS.Gray,
        width: '100%',
        height: HEIGHT_BASE_RATIO(1),
    },

    loaderContainer2: {
        ...StyleSheet.absoluteFillObject,
        zIndex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
    },

    loader: {
        width: WIDTH_BASE_RATIO(250),
        height: WIDTH_BASE_RATIO(250),
    },
    // button: {
    //   backgroundColor: "blue",
    //   justifyContent: "center",
    //   alignItems: "center",
    // },
    // buttonText: {
    //   color: "white",
    //   fontSize: 16,
    // },
    // item: {
    //   padding: 16,
    //   borderBottomWidth: 1,
    //   borderBottomColor: "#ccc",
    // },
    button: {
        backgroundColor: COLORS.BLUE,
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row',
        alignSelf: 'center',
        borderRadius: 100,
    },
    buttonText: {
        color: 'white',
        fontSize: FONT_SIZE(16),
        justifyContent: 'center',
        alignItems: 'center',
    },
    item: {
        padding: WIDTH_BASE_RATIO(16),
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    centeredView: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    centeredView2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    viewPosition7: {
        backgroundColor: COLORS.WHITE,
        width: WIDTH_BASE_RATIO(330),
        height: HEIGHT_BASE_RATIO(400),
        borderRadius: 15,
        borderColor: COLORS.BLUE,
        alignSelf: 'center',
        alignItems: 'center',
        paddingVertical: HEIGHT_BASE_RATIO(40),
    },
    viewPosition8: {
        backgroundColor: COLORS.WHITE,
        width: WIDTH_BASE_RATIO(330),
        // height: HEIGHT_BASE_RATIO(300),
        borderRadius: 15,
        borderColor: COLORS.BLUE,
        paddingBottom: HEIGHT_BASE_RATIO(30),
    },
    modalOverlay: {
        flex: 1,
    },
    modalOverlay2: {
        flex: 1,
        zIndex: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent gray color
    },
    modalContent: {
        position: 'absolute',
        marginTop: HEIGHT_BASE_RATIO(70),
        width: '100%',
        padding: WIDTH_BASE_RATIO(20),
    },
    modalContent2: {
        position: 'absolute',
        marginTop: HEIGHT_BASE_RATIO(200),
        // alignSelf: 'center',
        padding: WIDTH_BASE_RATIO(20),
    },

    viewPosition6: {
        paddingTop: HEIGHT_BASE_RATIO(30),
    },

    modalView: {
        marginHorizontal: WIDTH_BASE_RATIO(20),
        width: WIDTH_BASE_RATIO(310),
        backgroundColor: 'white',
        borderRadius: 20,
        paddingBottom: HEIGHT_BASE_RATIO(40),
        // alignItems: 'flex-end',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: HEIGHT_BASE_RATIO(2),
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },

    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Light black with 50% opacity
        zIndex: -270,
    },

    line: {
        borderBottomWidth: 0.3,
        borderBottomColor: COLORS.Gray,
        width: '100%',
        height: HEIGHT_BASE_RATIO(1),
    },
});