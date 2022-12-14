# react-native-multiple-switch

[![npm version](https://badge.fury.io/js/react-native-multiple-switch.svg)](https://badge.fury.io/js/react-native-multiple-switch)
[![npm total downloads](https://img.shields.io/npm/dt/react-native-multiple-switch)](https://img.shields.io/npm/dt/react-native-multiple-switch)

![alt react-native-multiple-switch example](./examples/example1.gif)

Device Information for [React Native](https://github.com/facebook/react-native).

## Install

Using npm:

```Shell
npm i react-native-multiple-switch
```

or using yarn:

```Shell
yarn add react-native-multiple-switch
```

## Usage

```javascript
import MultiSwitch from 'react-native-multiple-switch'

export const App = () => {
  const items = ['On', 'Off']
  const [value, setValue] = useState(items[0])

  return (
    <MultiSwitch
      items={items}
      value={value}
      onChange={(val) => setValue(val)}
    />
  )
}
```

## Props

| Prop            | Type                    | Default | Required |
| --------------- | ----------------------- | ------- | -------- |
| items           | string[]                |         | true     |
| value           | string                  |         | true     |
| onChange        | (value: string) => void |         | true     |
| disabled        | boolean                 | false   | false    |
| mediumHeight    | boolean                 | false   | false    |
| bigHeight       | boolean                 | false   | false    |
| containerStyle  | ViewStyle               | {}      | false    |
| sliderStyle     | ViewStyle               | {}      | false    |
| textStyle       | TextStyle               | {}      | false    |
| activeTextStyle | TextStyle               | {}      | false    |

## Examples

![alt react-native-multiple-switch](./examples/example2.gif)

```javascript
<MultipleSwitch
  items={items}
  value={value}
  onChange={(val) => setValue(val)}
/>

// Medium height
<MultipleSwitch
  items={items}
  value={value}
  onChange={(val) => setValue(val)}
  mediumHeight
/>

// Big height and disabled
<MultipleSwitch
  items={items}
  value={value}
  onChange={(val) => setValue(val)}
  bigHeight
  disabled
/>

// Custom styles
<MultipleSwitch
  items={items}
  value={value}
  onChange={(val) => setValue(val)}
  containerStyle={{
    backgroundColor: '#f7ede2',
    height: 100
  }}
  sliderStyle={{
    backgroundColor: '#f6bd60'
  }}
  textStyle={{
    color: '#84a59d',
    textTransform: 'uppercase',
    fontSize: 40,
  }}
/>
```

## Contribute

If you would like to contribute to react-native-multiple-switch:

1. Add a [GitHub Star](https://github.com/alejandrocortell/react-native-multiple-switch) to the project (that help a lot!).
2. Determine whether you're raising a bug, feature request or question.
3. Raise your issue or PR.

## License

The code is available under the [MIT license](LICENSE.txt).
