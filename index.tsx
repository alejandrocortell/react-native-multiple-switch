import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

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
} from 'react-native';


import styles from './style';


export type MultipleSwitchItem<D extends any> = {
  /**
   * The text to display in the GUI for this item.
   */
  displayName: string;
  /**
   * The ID that uniquely identifies this item.
   */
  uniqueId: string;
  /**
   * The value of this item.
   * 
   * This will not be used within this component, but rather can be used by the
   * parent component when the "onChange" function is called.
   */
  value: D;
};

export type Colors = {
  /**
   * The background color of the main component.
   */
  containerBackgroundColor: string;
  /**
   * The background color of the main component when it's disabled.
   */
  containerBackgroundDisabledColor: string;
  /**
   * The background color of the slider.
   */
  sliderColor: string;
  /**
   * The background color of the slider when the component is disabled.
   */
  sliderDisabledColor: string;
  /**
   * The color of the text.
   */
  textColor: string;
  /**
   * The color of the text for the selected item.
   */
  activeTextColor: string;
};

interface Props<D extends any> {
  /**
   * The array of "MultipleSwitchItem" elements.
   */
  items: MultipleSwitchItem<D>[];
  /**
   * The ID which uniquely identifies the item.
   * 
   * This must match the "uniqueId" property of the "MultipleSwitchItem"
   * element.
   */
  value: string;
  /**
   * This function will be called anytime that the user selects a new
   * "MultipleSwitchItem" element.
   * 
   * @param value
   * The newly selected "MultipleSwitchItem".
   */
  onChange: (value: MultipleSwitchItem<D>) => void;
  /**
   * The boolean flag to denote if this "MultipleSwitch" is disabled.
   */
  disabled?: boolean;

  // Sizes
  /**
   * The boolean flag to denote if this "MultipleSwitch" should be rendered at
   * "medium" height.
   * 
   * If both "mediumHeight" and "bigHeight" are set, "bigHeight" will take
   * precedence.
   * 
   * By default, it will be rendered at "small" height.
   */
  mediumHeight?: boolean;
  /**
   * The boolean flag to denote if this "MultipleSwitch" should be rendered at
   * "big" height.
   * 
   * If both "mediumHeight" and "bigHeight" are set, "bigHeight" will take
   * precedence.
   * 
   * By default, it will be rendered at "small" height.
   */
  bigHeight?: boolean;

  // Style
  /**
   * The style to be applied to the main container.
   */
  containerStyle?: StyleProp<ViewStyle>;
  /**
   * The style to be applied to the slider.
   */
  sliderStyle?: StyleProp<ViewStyle>;
  /**
   * The style to be applied to the text.
   */
  textStyle?: StyleProp<TextStyle>;
  /**
   * The style to be applied to the text that is currently active.
   */
  activeTextStyle?: StyleProp<TextStyle>;

  // Colors
  /**
   * The (optional) "Colors" that if defined, will override the default
   * "Colors".
   */
  colorOverrides?: Colors;
};


/**
 * The default "Colors" to be used if no overrides are specified.
 */
const DEFAULT__COLORS: Colors = {
  containerBackgroundColor: '#BBBBBB',
  sliderColor: '#EEEEEE',
  containerBackgroundDisabledColor: '#636363',
  sliderDisabledColor: '#787878',
  textColor: '#333333',
  activeTextColor: '#333333',
};


export const MultipleSwitch = <D extends any> (props: Props<D>) => {
  const { width } = useWindowDimensions();


  const [items, setItems] = useState<MultipleSwitchItem<D>[]>(props.items);
  const [elements, setElements] = useState<{ id: string; value: number }[]>([]);
  const [active, setActive] = useState<string>(props.value);


  const animatedValue = useRef(new Animated.Value(0)).current;
  const opacityValue = useRef(new Animated.Value(0)).current;


  const colors = useMemo<Colors>(() => ({
    ...DEFAULT__COLORS,
    ...props.colorOverrides,
  }), [props.colorOverrides]);


  /**
   * This effect will run when "width" or "props.items" change.
   * 
   * This will re-populate the items.
   */
  useEffect(() => {
    setItems(props.items)
    setElements([])
  }, [width, props.items]);

  /**
   * This effect will run when "props.value" changes.
   * 
   * This will ensure that the active item is selected if it changes due to
   * external factors.
   */
  useEffect(() => {
    setActive(props.value)
  }, [props.value]);

  /**
   * This effect will run when "elements", "items.length", "active" or "width"
   * change.
   * 
   * This will use an animation to move the slider to the active position.
   */
  useEffect(() => {
    if (elements.length !== items.length)
    {
      return;
    }

    // Find the active element.
    const activeElement = elements.find((el) => (el.id === active));

    if (!activeElement)
    {
      return;
    }

    Animated.timing(
      animatedValue,
      {
        toValue: activeElement
          ? activeElement.value
          : -width, // set position out of bounds if !position
        duration: 0,
        easing: Easing.linear,
        useNativeDriver: true,
      }
    ).start(() => {
      // keep transparent if out of bounds
      if (!activeElement)
      {
        return;
      }

      Animated.timing(
        opacityValue,
        {
          toValue: 1,
          duration: 100,
          easing: Easing.linear,
          useNativeDriver: true,
        }
      ).start();
    });
  }, [elements, items.length, active, width]);


  /**
   * This function will be called when the user presses one of the items.
   * 
   * This will begin the animation process.
   */
  const onStartAnimation = useCallback((newVal: MultipleSwitchItem<D>) => {
    const position = elements.find((el) => el.id === newVal.uniqueId);

    if (!position)
    {
      return;
    }

    Animated.timing(
      animatedValue,
      {
        toValue: position.value,
        duration: 200,
        easing: Easing.ease,
        useNativeDriver: true,
      }
    ).start(() => {
      setActive(newVal.uniqueId);

      const oldPosition = elements.find((el) => (el.id === active));

      // keep transparent if out of bounds
      if(oldPosition)
      {
        return;
      }

      Animated.timing(
        opacityValue,
        {
          toValue: 1,
          duration: 100,
          easing: Easing.linear,
          useNativeDriver: true,
        }
      ).start();
    });

    props.onChange(newVal);
  }, [elements, animatedValue, active, opacityValue, props.onChange]);

  /**
   * This function will build the styles to be applied to the main container.
   * 
   * @returns
   * The styles to be applied to the main container.
   */
  const getContainerStyle = useCallback((): StyleProp<ViewStyle> => ([
    props.disabled
      ? {
          backgroundColor: colors.containerBackgroundDisabledColor,
        }
      : {
          backgroundColor: colors.containerBackgroundColor,
        },
    styles.container,
    props.containerStyle,
    props.mediumHeight && styles.mediumHeight,
    props.bigHeight && styles.bigHeight,
  ]), [props.disabled, colors.containerBackgroundColor, colors.containerBackgroundDisabledColor, props.containerStyle, props.mediumHeight, props.bigHeight]);

  /**
   * This function will build the styles to be applied to the slider.
   * 
   * @returns
   * The styles to be applied to the slider.
   */
  const getSliderStyle = useCallback((): StyleProp<ViewStyle> => ([
    props.disabled
      ? {
          backgroundColor: colors.sliderDisabledColor,
        }
      : {
          backgroundColor: colors.sliderColor,
        },
    styles.slider,
    { width: `${100 / items.length}%` },
    { transform: [{ translateX: animatedValue }] },
    { opacity: opacityValue },
    props.sliderStyle && props.sliderStyle,
  ]), [props.disabled, colors.sliderColor, colors.sliderDisabledColor, items.length, animatedValue, opacityValue, props.sliderStyle]);

  /**
   * This function will build the styles to be applied to an item.
   * 
   * @param activeItem
   * The boolean flag to denote if the styles are being built for the active
   * item.
   * 
   * @returns
   * The styles to be applied to the item.
   */
  const getTextStyle = useCallback((activeItem: boolean): StyleProp<TextStyle> => ([
    activeItem
      ? {
          color: colors.activeTextColor,
        }
      : {
          color: colors.textColor,
        },
    styles.itemText,
    props.textStyle,
    activeItem && props.activeTextStyle,
  ]), [colors.activeTextColor, colors.textColor, props.textStyle, props.activeTextStyle]);


  return (
    <View
      style={getContainerStyle()}
    >
      <Animated.View
        style={[getSliderStyle()]}
      />
      {items.map((item, index) => {
        return (
          <TouchableOpacity
            key={index}
            activeOpacity={0.7}
            style={[
              styles.item,
              {
                width: `${100 / items.length}%`
              }
            ]}
            onPress={() => onStartAnimation(item)}
            onLayout={(e) => setElements([
              ...elements,
              {
                id: item.uniqueId,
                value: e.nativeEvent.layout.x
              },
            ])}
            disabled={props.disabled}
          >
            <Text
              style={getTextStyle((active === item.uniqueId))}
              numberOfLines={1}
            >
              {item.displayName}
            </Text>
          </TouchableOpacity>
        )
      })}
    </View>
  );
};


export default MultipleSwitch;
