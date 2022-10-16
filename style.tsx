import { StyleSheet } from 'react-native'

const backgroundColor = '#BBBBBB'
const selectedColor = '#EEEEEE'
const backgroundColorDisabled = '#636363'
const selectedColorDisabled = '#787878'
const colorText = '#333333'

export default StyleSheet.create({
  container: {
    width: '100%',
    padding: 1.5,
    borderRadius: 7,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 30,
    backgroundColor: backgroundColor,
  },
  slider: {
    position: 'absolute',
    height: '100%',
    borderRadius: 7,
    backgroundColor: selectedColor,
  },
  item: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemText: {
    textAlign: 'center',
    color: colorText,
  },

  // Disabled
  containerDisabled: {
    backgroundColor: backgroundColorDisabled,
  },
  sliderDisabled: {
    backgroundColor: selectedColorDisabled,
  },

  // Height
  mediumHeight: {
    height: 40,
  },
  bigHeight: {
    height: 50,
  },
})
