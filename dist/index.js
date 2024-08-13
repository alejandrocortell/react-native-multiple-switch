"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MultipleSwitch = void 0;
var react_1 = require("react");
////////////////////////////
// 3RD PARTY DEPENDENCIES //
////////////////////////////
var react_native_1 = require("react-native");
///////////////////////////
// INTERNAL DEPENDENCIES //
///////////////////////////
var style_1 = require("../src/style");
///////////////
// CONSTANTS //
///////////////
/**
 * The default "Colors" to be used if no overrides are specified.
 */
var DEFAULT__COLORS = {
    containerBackgroundColor: '#BBBBBB',
    sliderColor: '#EEEEEE',
    containerBackgroundDisabledColor: '#636363',
    sliderDisabledColor: '#787878',
    textColor: '#333333',
    activeTextColor: '#333333',
};
var DEFAULT__SLIDER_ANIMATION_CONFIG = {
    slidingDurationMs: 200,
    opacityDurationMs: 100,
    opacityStartingValue: 0.45,
};
/////////
// GUI //
/////////
var MultipleSwitch = function (props) {
    ////////////
    // STATES //
    ////////////
    var _a = (0, react_1.useState)(0), containerWidth = _a[0], setContainerWidth = _a[1];
    //////////
    // REFS //
    //////////
    var activeItemRef = (0, react_1.useRef)();
    var itemsRef = (0, react_1.useRef)([]);
    var containerWidthRef = (0, react_1.useRef)(0);
    var sliderAnimatedIndexRef = (0, react_1.useRef)(0);
    var selectedItemIndexRef = (0, react_1.useRef)(-1);
    var sliderAnimatedValue = (0, react_1.useRef)(new react_native_1.Animated.Value(0)).current;
    var sliderOpacityValue = (0, react_1.useRef)(new react_native_1.Animated.Value(0)).current;
    /////////////////////
    // ANIMATED VALUES //
    /////////////////////
    var sliderTranslateX = sliderAnimatedValue.interpolate({
        inputRange: [0, containerWidthRef.current],
        outputRange: [0, containerWidthRef.current],
    });
    var sliderOpacity = sliderOpacityValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
    });
    ///////////
    // MEMOS //
    ///////////
    var colors = (0, react_1.useMemo)(function () { return (__assign(__assign({}, DEFAULT__COLORS), props.colorOverrides)); }, [props.colorOverrides]);
    var sliderAnimationConfig = (0, react_1.useMemo)(function () { return (__assign(__assign({}, DEFAULT__SLIDER_ANIMATION_CONFIG), props.sliderAnimationConfig)); }, [props.sliderAnimationConfig]);
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
    var delay = function (ms) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve) { return setTimeout(resolve, ms); })];
        });
    }); };
    /**
     * This function will run the animations for the slider position and opacity.
     *
     * @param destinationItem
     * The "MultipleSwitchItem" that should be selected.
     * @param destinationItemIndex
     * The zero-based index of the "MultipleSwitchItem" that should be selected.
     */
    var runAnimation = (0, react_1.useCallback)(function (destinationItem, destinationItemIndex) {
        // If there are no items to display, then return.
        if (itemsRef.current.length <= 0) {
            return;
        }
        var itemCount = itemsRef.current.length;
        var initialPlacement = (selectedItemIndexRef.current < 0);
        if (initialPlacement) {
            selectedItemIndexRef.current = destinationItemIndex;
        }
        var startingItemIndex = selectedItemIndexRef.current;
        var startingPositionPercent = startingItemIndex / itemCount;
        var destinationPositionPercent = destinationItemIndex / itemCount;
        var startingPositionX = startingPositionPercent * containerWidthRef.current;
        var destinationPositionX = destinationPositionPercent * containerWidthRef.current;
        // If the slider is already in its destination position, if this is the
        // initial placement of the slider then set the slider position at the
        // starting position and allow the animation to run.
        if (startingItemIndex === destinationItemIndex) {
            if (!initialPlacement) {
                return;
            }
            sliderAnimatedValue.setValue(startingPositionX);
        }
        try {
            // Calculate the animation duration.
            var animationDuration = sliderAnimationConfig.slidingDurationMs * (Math.abs(destinationItemIndex - startingItemIndex) / (Math.max(1, itemCount) - 1));
            // Increment the change index.
            sliderAnimatedIndexRef.current += 1;
            /**
             * Copy the new change index to a constant.
             *
             * This is used to ensure that if another animation begins before the
             * previous animation completes, the completion of the previous animation
             * doesn't affect the outcome.
             */
            var currentSliderAnimatedIndex_1 = sliderAnimatedIndexRef.current;
            // Ensure that the slider starts off with the expected starting opacity
            // value.
            // This will make the slider somewhat transparent while it's
            // sliding/moving.
            sliderOpacityValue.setValue(sliderAnimationConfig.opacityStartingValue);
            // Perform the animations.
            // First perform the sliding/moving animation, followed by the opacity
            // reveal animation.
            // Once the animations are complete, "props.onChange" will be called.
            react_native_1.Animated.sequence([
                react_native_1.Animated.timing(sliderAnimatedValue, {
                    toValue: destinationPositionX,
                    duration: animationDuration,
                    easing: react_native_1.Easing.ease,
                    useNativeDriver: true,
                }),
                react_native_1.Animated.timing(sliderOpacityValue, {
                    toValue: 1,
                    duration: sliderAnimationConfig.opacityDurationMs,
                    easing: react_native_1.Easing.ease,
                    useNativeDriver: true,
                }),
            ]).start(function () {
                if (currentSliderAnimatedIndex_1 !== sliderAnimatedIndexRef.current) {
                    return;
                }
                selectedItemIndexRef.current = destinationItemIndex;
                props.onChange(destinationItem);
            });
        }
        catch (error) {
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
    var delayedRunAnimation = (0, react_1.useCallback)(function () { return __awaiter(void 0, void 0, void 0, function () {
        var itemIndex;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: 
                // Wait for a small delay.
                return [4 /*yield*/, delay(10)];
                case 1:
                    // Wait for a small delay.
                    _a.sent();
                    if (!activeItemRef.current) {
                        return [2 /*return*/];
                    }
                    itemIndex = itemsRef.current.findIndex(function (item) { var _a; return (item.uniqueId === ((_a = activeItemRef.current) === null || _a === void 0 ? void 0 : _a.uniqueId)); });
                    if (itemIndex < 0) {
                        return [2 /*return*/];
                    }
                    runAnimation(activeItemRef.current, itemIndex);
                    return [2 /*return*/];
            }
        });
    }); }, [runAnimation]);
    /**
     * This function will build the styles to be applied to the main container.
     *
     * @returns
     * The styles to be applied to the main container.
     */
    var getContainerStyle = (0, react_1.useCallback)(function () { return ([
        props.disabled
            ? {
                backgroundColor: colors.containerBackgroundDisabledColor,
            }
            : {
                backgroundColor: colors.containerBackgroundColor,
            },
        style_1.default.container,
        props.containerStyle,
        props.mediumHeight && style_1.default.mediumHeight,
        props.bigHeight && style_1.default.bigHeight,
    ]); }, [props.disabled, colors.containerBackgroundColor, colors.containerBackgroundDisabledColor, props.containerStyle, props.mediumHeight, props.bigHeight]);
    /**
     * This function will build the styles to be applied to the slider.
     *
     * @returns
     * The styles to be applied to the slider.
     */
    var getSliderStyle = (0, react_1.useCallback)(function () { return ([
        props.disabled
            ? {
                backgroundColor: colors.sliderDisabledColor,
            }
            : {
                backgroundColor: colors.sliderColor,
            },
        style_1.default.slider,
        { width: "".concat(100 / props.items.length, "%") },
        { transform: [{ translateX: sliderTranslateX }] },
        { opacity: sliderOpacity },
        props.sliderStyle && props.sliderStyle,
    ]); }, [containerWidth, props.disabled, colors.sliderColor, colors.sliderDisabledColor, props.items.length, props.sliderStyle, sliderTranslateX]);
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
    var getTextStyle = (0, react_1.useCallback)(function (activeItem) { return ([
        activeItem
            ? {
                color: colors.activeTextColor,
            }
            : {
                color: colors.textColor,
            },
        style_1.default.itemText,
        props.textStyle,
        activeItem && props.activeTextStyle,
    ]); }, [colors.activeTextColor, colors.textColor, props.textStyle, props.activeTextStyle]);
    /////////////
    // EFFECTS //
    /////////////
    /**
     * This effect will run when "props.items" or "delayedRunAnimation" change.
     *
     * This will re-populate the items.
     */
    (0, react_1.useEffect)(function () {
        itemsRef.current = props.items;
        delayedRunAnimation();
    }, [props.items, delayedRunAnimation]);
    /**
     * This effect will run when "props.value" or "delayedRunAnimation" change.
     *
     * This will ensure that the position of the slider is correct.
     */
    (0, react_1.useEffect)(function () {
        activeItemRef.current = itemsRef.current.find(function (item) { return (item.uniqueId === props.value); });
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
    (0, react_1.useEffect)(function () {
        // Set this value to "-1" to force the animation to be skipped.
        selectedItemIndexRef.current = -1;
        delayedRunAnimation();
    }, [containerWidth, delayedRunAnimation]);
    /////////
    // GUI //
    /////////
    return (<react_native_1.View style={getContainerStyle()} onLayout={function (event) {
            setContainerWidth(event.nativeEvent.layout.width);
            containerWidthRef.current = event.nativeEvent.layout.width;
        }}>
      <react_native_1.Animated.View style={[getSliderStyle()]}/>

      {props.items.map(function (item, index) {
            return (<react_native_1.TouchableOpacity key={index} activeOpacity={0.7} style={[
                    style_1.default.item,
                    {
                        width: "".concat(100 / props.items.length, "%")
                    }
                ]} onPress={function () { return runAnimation(item, index); }} disabled={props.disabled}>
            <react_native_1.Text style={getTextStyle((props.value === item.uniqueId))} numberOfLines={1}>
              {item.displayName}
            </react_native_1.Text>
          </react_native_1.TouchableOpacity>);
        })}
    </react_native_1.View>);
};
exports.MultipleSwitch = MultipleSwitch;
/////////////
// EXPORTS //
/////////////
exports.default = exports.MultipleSwitch;
