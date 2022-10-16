'use strict'
var __assign =
  (this && this.__assign) ||
  function () {
    __assign =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i]
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p]
        }
        return t
      }
    return __assign.apply(this, arguments)
  }
var __spreadArray =
  (this && this.__spreadArray) ||
  function (to, from, pack) {
    if (pack || arguments.length === 2)
      for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
          if (!ar) ar = Array.prototype.slice.call(from, 0, i)
          ar[i] = from[i]
        }
      }
    return to.concat(ar || Array.prototype.slice.call(from))
  }
exports.__esModule = true
var jsx_runtime_1 = require('react/jsx-runtime')
var react_1 = require('react')
var react_native_1 = require('react-native')
var style_1 = require('../style')
var MultipleSwitch = function (props) {
  var _a = (0, react_1.useState)([]),
    elements = _a[0],
    setElements = _a[1]
  var animatedValue = (0, react_1.useRef)(
    new react_native_1.Animated.Value(0)
  ).current
  var opacityValue = (0, react_1.useRef)(
    new react_native_1.Animated.Value(0)
  ).current
  ;(0, react_1.useEffect)(
    function () {
      if (elements.length === props.items.length) {
        var position = elements.find(function (el) {
          return el.id === props.value
        })
        if (!position) return
        react_native_1.Animated.timing(animatedValue, {
          toValue: position.value,
          duration: 0,
          easing: react_native_1.Easing.linear,
          useNativeDriver: true,
        }).start(function () {
          react_native_1.Animated.timing(opacityValue, {
            toValue: 1,
            duration: 100,
            easing: react_native_1.Easing.linear,
            useNativeDriver: true,
          }).start()
        })
      }
    },
    [elements]
  )
  var getContainerStyle = function () {
    return [
      style_1['default'].container,
      props.containerStyle,
      props.mediumHeight ? style_1['default'].mediumHeight : {},
      props.bigHeight ? style_1['default'].bigHeight : {},
      props.disabled ? style_1['default'].containerDisabled : {},
    ]
  }
  var getSliderStyle = function () {
    return [
      style_1['default'].slider,
      { width: getSliderWidth() },
      { transform: [{ translateX: animatedValue }] },
      { opacity: opacityValue },
      props.sliderStyle ? props.sliderStyle : {},
      props.disabled ? style_1['default'].sliderDisabled : {},
    ]
  }
  var getItemStyle = function () {
    return [style_1['default'].item, { width: 100 / props.items.length + '%' }]
  }
  var getItemTextStyle = function () {
    return [style_1['default'].itemText, props.textStyle ? props.textStyle : {}]
  }
  var getSliderWidth = function () {
    return 100 / props.items.length + '%'
  }
  var startAnimation = function (newVal) {
    var position = elements.find(function (el) {
      return el.id === newVal
    })
    if (!position) return
    react_native_1.Animated.timing(animatedValue, {
      toValue: position.value,
      duration: 200,
      easing: react_native_1.Easing.ease,
      useNativeDriver: true,
    }).start()
    props.onChange(newVal)
  }
  return (0, jsx_runtime_1.jsxs)(
    react_native_1.View,
    __assign(
      { style: getContainerStyle() },
      {
        children: [
          (0, jsx_runtime_1.jsx)(react_native_1.Animated.View, {
            style: [getSliderStyle()],
          }),
          props.items.map(function (item) {
            return (0, jsx_runtime_1.jsx)(
              react_native_1.TouchableOpacity,
              __assign(
                {
                  activeOpacity: 0.7,
                  style: getItemStyle(),
                  onPress: function () {
                    return startAnimation(item)
                  },
                  onLayout: function (e) {
                    return setElements(
                      __spreadArray(
                        __spreadArray([], elements, true),
                        [{ id: item, value: e.nativeEvent.layout.x }],
                        false
                      )
                    )
                  },
                  disabled: props.disabled,
                },
                {
                  children: (0, jsx_runtime_1.jsx)(
                    react_native_1.Text,
                    __assign(
                      { style: getItemTextStyle(), numberOfLines: 1 },
                      { children: item }
                    )
                  ),
                }
              ),
              item
            )
          }),
        ],
      }
    )
  )
}
exports['default'] = MultipleSwitch
