---
templateKey: blog-post
draft: true
path: /testing
title: test page
cover: /img/chemex.jpg
date: '2018-05-10T20:40:48+10:00'
tags:
  - eslint
  - unit-testing
  - miscellaneous
hashtags:
  - eslint
  - unit-testing
category: programming
description: A testing page desc
---
A testing page body
![Clear Sans typeface](clear-sans.png)

There are In general, I've felt that it gets in the way more than it helps. In a large teams, and especially if there are inexperienced JavaScript developers in the team, having static types does help in finding some bugs early and helps with refactoring, but the value it brings very marginal. 







## Drawer Menu Button

The functionality that we were aiming for works. Although we can open the drawer by swiping from the left, we would like to have a menu button on all the main screens. For this, we'll use static `navigationOptions` property from React Navigation. The `navigationOptions` property on a screen components should be an object or a function returning an object containing the different configurations for the screen component. We'll just add a title for now. You can see the full list of con options in the [StackNavigator API reference](https://reactnavigation.org/docs/en/stack-navigator.html#stacknavigatorconfig). Since we've added the `navigationOptions` property on our component, we now have to export a `StackNavigator`:


```js
class AuthorScreen extends React.Component {
  static navigationOptions = {
    title: 'Authors',
  }

  render() {
    // ...
  }
}

export default createStackNavigator({
  AuthorScreen,
})
```

We also want a menu button in the title bar to open the drawer by calling `navigation.openDrawer()`. But we don't have access to `navigation` since `navigationOptions` is a static property. However, if we change the `navigationOptions` property to a function, React Navigation will call it with an object containing `navigation`, and we can then call `openDrawer()` on it. We'll use the `headerLeft` property in `navigationOptions` since we want the menu to appear on the right. We'll call `openDrawer()` when the button is pressed.

```js
class AuthorScreen extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title: 'Authors',
    headerLeft: <Button onPress={() => navigation.openDrawer()} title="Menu" />,
  })
  //...
```

Since we want the header with a title and menu button to appear on all the screens, we'll create a partial function that takes the header `title` text as input, and . Let's create a new file `src/shared/header.js` for this function. 

```javascript
export default title => ({ navigation }) => ({
  title,
  headerLeft: <Button onPress={() => navigation.openDrawer()} title="Menu" />,
})
```

Now we, can use the header in the `AuthorScreen`:

```javascript
class AuthorScreen extends React.Component {
  static navigationOptions = header('Authors')
  // ...
```

We'll use this header for our Book list and Book detail components. 




// ---------------------------------------------



We should also add a title on every screen to identify the currently selected screen. 

We can do that using the static `navigationOptions` property on a screen component. The `navigationOptions` property should be an object or a function returning an object containing the different configurations for the screen component. We'll just add a title for now. You can see the full list of con options in the [StackNavigator API reference](https://reactnavigation.org/docs/en/stack-navigator.html#stacknavigatorconfig). Since we've added the `navigationOptions` property on our component, we now have to export a `StackNavigator`:

```js
class AuthorScreen extends React.Component {
  static navigationOptions = {
    title: 'Authors',
  }

  render() {
    // ...
  }
}

export default createStackNavigator({
  AuthorScreen,
})
```

We can open the drawer from the button inside the AuthorScreen, but we should have a menu button in the title bar to open the drawer. But we have to call `navigation.openDrawer()` but `navigation` is not available in `navigationOptions` since it's a static property. But if we change the `navigationOptions` property to a function, React Navigation will call it with an object containing `navigation`, and we can then call `openDrawer()` on it.

Let's create a separate directory `src/components` for all the shared components, and create a file for a separate for our drawer button component. We'll call `openDrawer()` when the button is pressed.

```js
// src/components/DrawerMenuButton.js
import React from 'react'
import { Button } from 'react-native'

export default ({ navigation }) => (
  <Button onPress={() => navigation.openDrawer()} title="Menu" />
)
```

We'll add the `Title` to each view component, providing the title `text` in the props. Also, since Authors view just contains a list of authors, we don't need a StackNavigator for it, so we'll change it to a plain React component. Here's what our `src/views/author/index.js` file looks like now:

```js
import MenuButton from '../../components/DrawerMenuButton'

class AuthorScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Authors',
    headerLeft: <MenuButton navigation={navigation} />,
  })

  render() {
    // ...
  }
}

export default createStackNavigator({
  AuthorScreen,
})
```
