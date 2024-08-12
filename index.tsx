import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

////////////////////////////
// 3RD PARTY DEPENDENCIES //
////////////////////////////
import {
  Animated,
  Easing,
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';


///////////////////////////
// INTERNAL DEPENDENCIES //
///////////////////////////
import styles from './style';


///////////
// TYPES //
///////////
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

export type SliderAnimationConfig = {
  /**
   * The number of milliseconds that it should take for the sliding animation
   * to complete from one end of the switch to the other.
   * 
   * Example:
   * If this is set to 1000, and there are 5 items in the switch, then the
   * animation duration to go from the 1st item to the last item would be
   * 1000 ms.
   * 
   * But the animation duration to go from the 1st item to the 3rd item would
   * be 500 ms since we're only moving the distance of 2 items rather than all
   * 4.
   */
  slidingDurationMs?: number;
  /**
   * The number of milliseconds that it should take for the opacity change
   * animation to complete once the slider completes sliding.
   */
  opacityDurationMs?: number;
  /**
   * The value that should be used for the opacity of the slider when it's
   * moving.
   * 
   * This value must be between [0, 1].
   * - "0" would mean that the slider would be fully transparent during the animation.
   * - "0.5" would mean that the slider would be 50% transparent during the animation.
   * - "1" would mean that the slider would be fully opaque during the animation.
   * 
   * When the animated movement is complete, the opacity of the slider will be 
   * set back to "1".
   */
  opacityStartingValue?: number;
};

export type MultipleSwitchProps<D extends any> = {
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
   * The (optional) boolean flag to denote if this "MultipleSwitch" is
   * disabled.
   */
  disabled?: boolean;

  // Sizes
  /**
   * The (optional) boolean flag to denote if this "MultipleSwitch" should be
   * rendered at "medium" height.
   * 
   * If both "mediumHeight" and "bigHeight" are set, "bigHeight" will take
   * precedence.
   * 
   * By default, it will be rendered at "small" height.
   */
  mediumHeight?: boolean;
  /**
   * The (optional) boolean flag to denote if this "MultipleSwitch" should be
   * rendered at "big" height.
   * 
   * If both "mediumHeight" and "bigHeight" are set, "bigHeight" will take
   * precedence.
   * 
   * By default, it will be rendered at "small" height.
   */
  bigHeight?: boolean;

  // Style
  /**
   * The (optional) style to be applied to the main container.
   */
  containerStyle?: StyleProp<ViewStyle>;
  /**
   * The (optional) style to be applied to the slider.
   */
  sliderStyle?: StyleProp<ViewStyle>;
  /**
   * The (optional) style to be applied to the text.
   */
  textStyle?: StyleProp<TextStyle>;
  /**
   * The (optional) style to be applied to the text that is currently active.
   */
  activeTextStyle?: StyleProp<TextStyle>;

  // Colors
  /**
   * The (optional) "Colors" that if defined, will override the default
   * "Colors".
   */
  colorOverrides?: Colors;

  // Animation Config
  /**
   * The (optional) "SliderAnimationConfig".
   * 
   * Only the values specified will be used to override the default values.
   */
  sliderAnimationConfig?: SliderAnimationConfig;
};


///////////////
// CONSTANTS //
///////////////
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
const DEFAULT__SLIDER_ANIMATION_CONFIG: SliderAnimationConfig = {
  slidingDurationMs: 200,
  opacityDurationMs: 100,
  opacityStartingValue: 0.45,
};


/////////
// GUI //
/////////
export const MultipleSwitch = <D extends any> (
  props: MultipleSwitchProps<D>
) => {
  ////////////
  // STATES //
  ////////////
  const [items, setItems] = useState<MultipleSwitchItem<D>[]>(props.items);
  const [active, setActive] = useState<string>(props.value);
  const [containerWidth, setContainerWidth] = useState<number>(0);


  //////////
  // REFS //
  //////////
  const activeItemRef = useRef<MultipleSwitchItem<D>>();
  const itemsRef = useRef<MultipleSwitchItem<D>[]>([]);
  const containerWidthRef = useRef<number>(0);
  const sliderAnimatedIndexRef = useRef<number>(0);
  const selectedItemIndexRef = useRef<number>(-1);
  const sliderAnimatedValue = useRef(new Animated.Value(0)).current;
  const sliderOpacityValue = useRef(new Animated.Value(0)).current;


  /////////////////////
  // ANIMATED VALUES //
  /////////////////////
  const sliderTranslateX = sliderAnimatedValue.interpolate({
      inputRange: [0, containerWidthRef.current],
      outputRange: [0, containerWidthRef.current],
  });
  const sliderOpacity = sliderOpacityValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });


  ///////////
  // MEMOS //
  ///////////
  const colors = useMemo<Colors>(() => ({
    ...DEFAULT__COLORS,
    ...props.colorOverrides,
  }), [props.colorOverrides]);
  const sliderAnimationConfig = useMemo<SliderAnimationConfig>(() => ({
    ...DEFAULT__SLIDER_ANIMATION_CONFIG,
    ...props.sliderAnimationConfig,
  }), [props.sliderAnimationConfig]);


  ///////////////
  // FUNCTIONS //
  ///////////////
  /**
   * This function will simply add a delay of the specified number
   * of milliseconds.
   * 
   * As this function is asynchronous, it must be called using the
   * "await" keyword and from within an "async" function.
   * 
   * @param ms
   * The number of milliseconds to delay by.
   */
  const delay = async (ms : number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  };
  
  /**
   * This function will run the animations for the slider position and opacity.
   * 
   * @param destinationItem
   * The "MultipleSwitchItem" that should be selected.
   * @param destinationItemIndex
   * The zero-based index of the "MultipleSwitchItem" that should be selected.
   */
  const runAnimation = useCallback((
    destinationItem: MultipleSwitchItem<D>,
    destinationItemIndex: number
  ) => {
    // If there are no items to display, then return.
    if (itemsRef.current.length <= 0)
    {
      return;
    }

    const itemCount = itemsRef.current.length;

    const initialPlacement = (selectedItemIndexRef.current < 0);

    if (initialPlacement)
    {
      selectedItemIndexRef.current = destinationItemIndex;
    }

    const startingItemIndex = selectedItemIndexRef.current;
    const startingPositionPercent = startingItemIndex / itemCount;
    const destinationPositionPercent = destinationItemIndex / itemCount;
    const startingPositionX = startingPositionPercent * containerWidthRef.current;
    const destinationPositionX = destinationPositionPercent * containerWidthRef.current;

    // If the slider is already in its destination position, if this is the
    // initial placement of the slider then set the slider position at the
    // starting position and allow the animation to run.
    if (startingItemIndex === destinationItemIndex)
    {
      if (!initialPlacement)
      {
        return;
      }

      sliderAnimatedValue.setValue(startingPositionX);
    }

    try
    {
      // Calculate the animation duration.
      const animationDuration = sliderAnimationConfig.slidingDurationMs! * (Math.abs(destinationItemIndex - startingItemIndex) / (Math.max(1, itemCount) - 1));

      // Increment the change index.
      sliderAnimatedIndexRef.current += 1;
      /**
       * Copy the new change index to a constant.
       * 
       * This is used to ensure that if another animation begins before the
       * previous animation completes, the completion of the previous animation
       * doesn't affect the outcome.
       */
      const currentSliderAnimatedIndex = sliderAnimatedIndexRef.current;

      // Ensure that the slider starts off with the expected starting opacity
      // value.
      // This will make the slider somewhat transparent while it's
      // sliding/moving.
      sliderOpacityValue.setValue(sliderAnimationConfig.opacityStartingValue!);

      // Perform the animations.
      // First perform the sliding/moving animation, followed by the opacity
      // reveal animation.
      // Once the animations are complete, "props.onChange" will be called.
      Animated.sequence([
        Animated.timing(
          sliderAnimatedValue,
          {
            toValue: destinationPositionX,
            duration: animationDuration,
            easing: Easing.ease,
            useNativeDriver: true,
          }
        ),
        Animated.timing(
          sliderOpacityValue,
          {
            toValue: 1,
            duration: sliderAnimationConfig.opacityDurationMs,
            easing: Easing.ease,
            useNativeDriver: true,
          }
        ),
      ]).start(() => {
        if (currentSliderAnimatedIndex !== sliderAnimatedIndexRef.current)
        {
          return;
        }

        selectedItemIndexRef.current = destinationItemIndex;

        props.onChange(destinationItem);
      });
    }
    catch (error)
    {
      console.error('(MultipleSwitch) runAnimation - Animation failed.', error);

      selectedItemIndexRef.current = destinationItemIndex;
      sliderAnimatedValue.setValue(destinationPositionX);
      sliderOpacityValue.setValue(1);

      props.onChange(destinationItem);
    }
  }, [
    sliderAnimatedValue,
    sliderAnimationConfig.slidingDurationMs,
    sliderAnimationConfig.opacityDurationMs,
    sliderAnimationConfig.opacityStartingValue
  ]);

  /**
   * This function will delay the calling of the "runAnimation" function.
   * 
   * This will only call the "runAnimation" function after determining which
   * item is selected by using the "activeItemRef" and "itemsRef" refs.
   * 
   * The delay is required as this function will be called from several
   * different "useEffect" instances, the execution order of which cannot be
   * guaranteed. So adding this delay just ensures that we wait until all
   * "useEffect" instances are complete.
   */
  const delayedRunAnimation = useCallback(async (
  ) => {
    // Wait for a small delay.
    await delay(10);

    if (!activeItemRef.current)
    {
      return;
    }

    const itemIndex = itemsRef.current.findIndex((item) => (item.uniqueId === activeItemRef.current?.uniqueId));

    if (itemIndex < 0)
    {
      return;
    }

    runAnimation(
      activeItemRef.current,
      itemIndex
    );
  }, [runAnimation]);

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
    { transform: [{ translateX: sliderTranslateX }] },
    { opacity: sliderOpacity },
    props.sliderStyle && props.sliderStyle,
  ]), [containerWidth, props.disabled, colors.sliderColor, colors.sliderDisabledColor, items.length, props.sliderStyle, sliderTranslateX]);

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


  /////////////
  // EFFECTS //
  /////////////
  /**
   * This effect will run when "props.items" or "delayedRunAnimation" change.
   * 
   * This will re-populate the items.
   */
  useEffect(() => {
    setItems(props.items);
    itemsRef.current = props.items;

    delayedRunAnimation();
  }, [props.items, delayedRunAnimation]);

  /**
   * This effect will run when "props.value" or "delayedRunAnimation" change.
   * 
   * This will ensure that the position of the slider is correct.
   */
  useEffect(() => {
    setActive(props.value);
    activeItemRef.current = itemsRef.current.find((item) => (item.uniqueId === props.value));

    delayedRunAnimation();
  }, [props.value, delayedRunAnimation]);

  /**
   * This effect will run when "containerWidth" or "delayedRunAnimation"
   * changes.
   * 
   * This will ensure that the position of the slider is correct but will also
   * force the animation to be skipped since this is only being redrawn due to
   * a device rotation.
   */
  useEffect(() => {
    // Set this value to "-1" to force the animation to be skipped.
    selectedItemIndexRef.current = -1;

    delayedRunAnimation();
  }, [containerWidth, delayedRunAnimation]);


  /////////
  // GUI //
  /////////
  return (
    <View
      style={getContainerStyle()}
      onLayout={(event) => {
        setContainerWidth(event.nativeEvent.layout.width);
        containerWidthRef.current = event.nativeEvent.layout.width;
      }}
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
            onPress={() => runAnimation(item, index)}
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


/////////////
// EXPORTS //
/////////////
export default MultipleSwitch;
