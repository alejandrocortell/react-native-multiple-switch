import React, { FC, useEffect, useRef, useState } from 'react'
import {
  Animated,
  Easing,
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
  useWindowDimensions,
  View,
  ViewStyle,
} from 'react-native'
// import useStyle from './style'
import styles from './style'

interface Props {
  items: Array<string>
  value: string
  onChange: (value: any) => void
  disabled?: boolean

  // Sizes
  mediumHeight?: boolean
  bigHeight?: boolean

  // Style
  containerStyle?: StyleProp<ViewStyle>
  sliderStyle?: StyleProp<ViewStyle>
  textStyle?: StyleProp<TextStyle>
  activeTextStyle?: StyleProp<TextStyle>
}

const MultipleSwitch: FC<Props> = (props) => {
  // const { styles } = useStyle()
  const { width } = useWindowDimensions()
  const [items, setItems] = useState(props.items)
  const [elements, setElements] = useState<{ id: string; value: number }[]>([])
  const [active, setActive] = useState(props.value)
  const animatedValue = useRef(new Animated.Value(0)).current
  const opacityValue = useRef(new Animated.Value(0)).current

  useEffect(() => {
    setItems(props.items)
    setElements([])
  }, [width])

  useEffect(() => {
    if (elements.length === props.items.length) {
      const position = elements.find((el) => el.id === props.value)
      if (!position) {
        return
      }
      Animated.timing(animatedValue, {
        toValue: position.value,
        duration: 0,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start(() => {
        Animated.timing(opacityValue, {
          toValue: 1,
          duration: 100,
          easing: Easing.linear,
          useNativeDriver: true,
        }).start()
      })
    }
  }, [elements])

  const getContainerStyle = () => {
    return [
      styles.container,
      props.containerStyle,
      props.mediumHeight ? styles.mediumHeight : {},
      props.bigHeight ? styles.bigHeight : {},
      props.disabled ? styles.containerDisabled : {},
    ]
  }

  const getSliderStyle = () => {
    return [
      styles.slider,
      { width: getSliderWidth() },
      { transform: [{ translateX: animatedValue }] },
      { opacity: opacityValue },
      props.sliderStyle ? props.sliderStyle : {},
      props.disabled ? styles.sliderDisabled : {},
    ]
  }

  const getSliderWidth = () => {
    return 100 / props.items.length + '%'
  }

  const startAnimation = (newVal: string) => {
    const position = elements.find((el) => el.id === newVal)
    if (!position) {
      return
    }
    Animated.timing(animatedValue, {
      toValue: position.value,
      duration: 200,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start()
    setActive(newVal)
    props.onChange(newVal)
  }

  return (
    <View style={getContainerStyle()}>
      <Animated.View style={[getSliderStyle()]} />
      {items.map((item: string) => {
        return (
          <TouchableOpacity
            activeOpacity={0.7}
            style={[styles.item, { width: 100 / props.items.length + '%' }]}
            onPress={() => {
              startAnimation(item)
            }}
            key={item}
            onLayout={(e) =>
              setElements([
                ...elements,
                { id: item, value: e.nativeEvent.layout.x },
              ])
            }
            disabled={props.disabled}
          >
            <Text
              style={[
                styles.itemText,
                props.textStyle,
                active === item && props.activeTextStyle,
              ]}
              numberOfLines={1}
            >
              {item}
            </Text>
          </TouchableOpacity>
        )
      })}
    </View>
  )
}

export default MultipleSwitch
