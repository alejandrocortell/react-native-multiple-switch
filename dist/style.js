"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_native_1 = require("react-native");
exports.default = react_native_1.StyleSheet.create({
    container: {
        width: '100%',
        padding: 1.5,
        borderRadius: 7,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 30,
        overflow: 'hidden'
    },
    slider: {
        position: 'absolute',
        height: '100%',
        borderRadius: 7,
    },
    item: {
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemText: {
        textAlign: 'center',
    },
    // Height
    mediumHeight: {
        height: 40,
    },
    bigHeight: {
        height: 50,
    },
});
