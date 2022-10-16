# ⚠️⚠️⚠️ WIP ⚠️⚠️⚠️

# @alejandrocortell/react-native-multiswitch

---

[![npm version](https://badge.fury.io/js/@alejandrocortell%2Freact-native-multiswitch.svg)](https://badge.fury.io/js/@alejandrocortell%2Freact-native-multiswitch)
[![npm total downloads](https://img.shields.io/npm/dt/@alejandrocortell/react-native-multiswitch.svg)](https://img.shields.io/npm/dt/@alejandrocortell/react-native-multiswitch.svg)

![alt react-native-multiswitch example](./examples/example1.gif)

Device Information for [React Native](https://github.com/facebook/react-native).

---

## Install

Using npm:

```Shell
npm i @alejandrocortell/react-native-multiswitch
```

or using yarn:

```Shell
yarn add @alejandrocortell/react-native-multiswitch
```

## Usage

```javascript
import MultiSwitch from 'react-native-multiswitch'

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

| Prop           | Type                    | Default | Required |
| -------------- | ----------------------- | ------- | -------- |
| items          | string[]                |         | true     |
| value          | string                  |         | true     |
| onChange       | (value: string) => void |         | true     |
| disabled       | boolean                 | false   | false    |
| mediumHeight   | boolean                 | false   | false    |
| bigHeight      | boolean                 | false   | false    |
| containerStyle | ViewStyle               | {}      | false    |
| sliderStyle    | ViewStyle               | {}      | false    |
| textStyle      | TextStyle               | {}      | false    |

## Examples

![alt react-native-multiswitch](./examples/example2.gif)

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

If you would like to contribute to react-native-multiswitch:

1. Add a [GitHub Star](https://github.com/alejandrocortell/react-native-multiswitch) to the project (that help a lot!).
2. Determine whether you're raising a bug, feature request or question.
3. Raise your issue or PR.

## License

The code is available under the [MIT license](LICENSE.txt).
