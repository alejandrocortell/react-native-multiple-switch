"use strict";
exports.__esModule = true;
var react_native_1 = require("react-native");
var backgroundColor = '#BBBBBB';
var selectedColor = '#EEEEEE';
var backgroundColorDisabled = '#636363';
var selectedColorDisabled = '#787878';
var colorText = '#333333';
exports["default"] = react_native_1.StyleSheet.create({
    container: {
        width: '100%',
        padding: 1.5,
        borderRadius: 7,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 30,
        backgroundColor: backgroundColor,
        overflow: 'hidden'
    },
    slider: {
        position: 'absolute',
        height: '100%',
        borderRadius: 7,
        backgroundColor: selectedColor
    },
    item: {
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    itemText: {
        textAlign: 'center',
        color: colorText
    },
    // Disabled
    containerDisabled: {
        backgroundColor: backgroundColorDisabled
    },
    sliderDisabled: {
        backgroundColor: selectedColorDisabled
    },
    // Height
    mediumHeight: {
        height: 40
    },
    bigHeight: {
        height: 50
    }
});
