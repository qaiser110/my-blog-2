---
templateKey: blog-post
path: /react-native-tutorial/prettier-eslint-airbnb-styleguide
series: /react-native-tutorial
cover: /img/ReactNativeLogo.png
title: Setup prettier, eslint, and airbnb style guide
date: 2018-05-03T15:04:10.000Z
description: In this tutorial, we'll setup prettier, eslint, and arirbnb style guide to make sure our code not only looks pretty, but also runs code linting.
category: programming
tags:
    - eslint
    - react-native
hashtags:
    - prettier
    - eslint
    - ReactNative
    - React
    - JavaScript
---
If you don't have the project initialized, you can either follow the instructions in the [series intro](/react-native-tutorial) to initialize our CRNA project. Otherwise, just run these few commands to get started:

```sh
npm install -g create-react-native-app
create-react-native-app bookstore-app
cd bookstore-app
npm start
```

## Why linting tool

JavaScript is a dynamic language, and doesn't have static type system unlike languages such as C++ and Java. Because of this dynamic nature, JavaScript lacked the kind of tools available for static analysis in many other languages like Java and C# have to offer. Consequently, this caused hard to find bugs related to data types, and required more effort in debugging and troubleshooting these issues, especially for an inexperienced JavaScript developers. Since it's not a compiled language, error are discovered when the JavaScript code is executed at runtime. There are tools like TypeScript and flow that help catching these kind of errors by adding static type system to JavaScript, but we won't be going into either of these tools in this tutorial. On the other hand, there are linting tools like ESLint available that perform static analysis of the JavaScript code based on configurable rules, and highlight the problems in code that may be potential bugs, helping the developers discover problems in their code before it is executed.


## Install and Setup ESLint

ESLint allow developers to discover potential errors by performing static analysis and flagging suspicious code that is likely to introduce bugs. This is why a good linting tool is extremely important to ensure that quality is baked in from the beginning and errors are found early. ESLint also helps you in implementing style guidelines. To ensure code quality and having the right tools from the very beginning of our Bookstore project, we'll start our tutorial series by first implementing linting tools. You can learn more about [ESLint on their website](https://eslint.org/docs/about/).

ESLint is fully configurable and customizable. You can set your rules according to your preferences. However different linting rules configuration have have been provided by the community. One of the popular ones is the airbnb styles guide. We'll use the airbnb styles guide. This will include airbnb ESLint rules, including ECMAScript 6+ and React.

First, we'll install eslint by running this command in the terminal:

We'll use Airbnb's [eslint-config-airbnb](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb), which contains Airbnb's ESLint rules, including ECMAScript 6+ and React. It requires specific versions of eslint, eslint-plugin-import, eslint-plugin-react, and eslint-plugin-jsx-a11y. To list the peer dependencies and versions, run this command

```sh
npm info "eslint-config-airbnb@latest" peerDependencies
```

At the time of this writing, these are the versions shown in the output from the above command:

```sh
{ eslint: '^4.9.0',
  'eslint-plugin-import': '^2.7.0',
  'eslint-plugin-jsx-a11y': '^6.0.2',
  'eslint-plugin-react': '^7.4.0' }
```

So let's install these specific dependencies versions by running this command:

```sh
npm install -D eslint@^4.9.0 eslint-plugin-import@^2.7.0 eslint-plugin-jsx-a11y@^6.0.2 eslint-plugin-react@^7.4.0
```

This would install the necessary dependencies and generate the `.eslintrc.js` file in the project root directory. The .eslintrc.js file should have the following configurations:

```js
module.exports = {
  "extends": "airbnb"
};
```

## Code styling

While we have the linting covered with ESLint and Airbnb Style Guide, a big part of code quality is consistent code styling. When you're working in a team, you want to make sure that the code formatting and indentation is consistent throughout the team. Prettier is just the tool for that. It ensures that all the code conforms to a consistent style.

We'll also add the [ESLint plugin for prettier](https://github.com/prettier/eslint-plugin-prettier), which will add Prettier as an ESLint rule and report differences as individual ESLint issues.

Now, there may be conflicts between the ESLint rules and the code formatting done by prettier. Fortunately, there is a plugin available called [eslint-config-prettier](https://github.com/prettier/eslint-config-prettier) that turns off all rules that are unnecessary or might conflict with prettier.

## Install and Setup Prettier with ESLint

Let's install all the necessary packages, prettier and eslint-plugin-prettier. We'll also need to install eslint-config-airbnb for this:

```sh
npm install -D prettier prettier-eslint eslint-plugin-prettier eslint-config-prettier eslint-config-airbnb
```

NOTE: If ESLint is installed globally, then make sure eslint-plugin-prettier is also installed globally. A globally-installed ESLint cannot find a locally-installed plugin.

To enable eslint-plugin-prettier plugin, update your .eslintrc.js file to add the "prettier" plugin. And to show linting error on Prettier formatting rules, add the "rule" to show error on "prettier/prettier". Here's our updated .eslintrc.js:

```js
module.exports = {
  "extends": [
    "airbnb",
    "prettier"
  ],
  rules: {
    "prettier/prettier": "error",
  },
}
```

[eslint-config-prettier](https://github.com/prettier/eslint-config-prettier also ships with a CLI tool to help you check if your configuration contains any rules that are unnecessary or conflict with Prettier. Let's be proactive and do just that.

First, add a script for it to package.json:

```json
{
  "scripts": {
    "eslint-check": "eslint --print-config .eslintrc.js | eslint-config-prettier-check"
  }
}
```

Now, run the "eslint-check" command to see eslint and prettier conflicting rules:

```sh
npm run eslint-check
```

This will list the conflicting rules in the terminal. Let's turn off the conflicting rules by updating the .eslintrc.js file. I also prefer singleQuote and trailingComma, so I'll configure those rules as well. This is what our .eslintrc.js file looks like now:

```js
module.exports = {
  "parser": "babel-eslint",
  "extends": [
    "airbnb",
    "prettier"
  ],
  "plugins": [
    "prettier"
  ],
  "rules": {
    "prettier/prettier": "error",
    "react/jsx-closing-bracket-location": "off",
    "react/jsx-closing-tag-location": "off",
    "react/jsx-curly-spacing": "off",
    "react/jsx-equals-spacing": "off",
    "react/jsx-first-prop-new-line": "off",
    "react/jsx-indent": "off",
    "react/jsx-indent-props": "off",
    "react/jsx-max-props-per-line": "off",
    "react/jsx-tag-spacing": "off",
    "react/jsx-wrap-multilines": "off"
  }
}
```

If you now run `eslint` with the `--fix` flag, the code will be automatically formatted according to the prettier styles.

## Configure VS Code to run eslint on save

We can configure any IDE to automatically run eslint on Save or as we type, and since we have also configured prettier along with eslint, our code will automatically be pretiffied. VS Code is an IDE popular in the JavaScript community, so I'll show how to setup eslint auto-fix on save using VS Code, but the steps would be similar in any IDE.

To configure VS Code to automatically run eslint on Save, we first need to install the eslint extension. Go to Extensions, search for "ESLint" extension, and install it. Once the ESLint extension is installed, go to `Preferences > User Settings`, and set "eslint.autoFixOnSave" to true. Also make sure that "files.autoSave" is either "off", "onFocusChange" or "onWindowChange".

Now, open the file App.js. If the eslint is configured correctly, you should see some linting error, like the "react/prefer-stateless-function", "react/jsx-filename-extension", and "no-use-before-define" errors. Let's turn those "off" in the .eslintrc.js file. I also prefer singleQuote and trailingComma, so I'll configure those rules as well. Here is the updated .eslintrc.js file.

```js
module.exports = {
  "parser": "babel-eslint",
  "extends": [
    "airbnb",
    "prettier"
  ],
  "plugins": [
    "prettier"
  ],
  "rules": {
    "prettier/prettier": [
      "error",
      {
        "singleQuote": true,
        "trailingComma": "all",
      }
    ],
    "react/prefer-stateless-function": "off",
    "react/jsx-filename-extension": "off",
    "no-use-before-define": "off",
    "react/jsx-closing-bracket-location": "off",
    "react/jsx-curly-spacing": "off",
    "react/jsx-equals-spacing": "off",
    "react/jsx-first-prop-new-line": "off",
    "react/jsx-indent": "off",
    "react/jsx-indent-props": "off",
    "react/jsx-max-props-per-line": "off",
    "react/jsx-tag-spacing": "off",
    "react/jsx-wrap-multilines": "off"
  }
}
```

I know this was a lot of work, considering that we haven't even started working on our app yet, but trust me, this setup would be very beneficial for your projects in the long run, even if you're a one person team, and when you're working with other developers, linting and programming standards will go a long way in reducing code defects and ensuring consistency in code style.

You can find the changes made in this part in <a href="https://github.com/qaiser110/ReactNative-Bookstore-App-Tutorial/tree/1-prettier-eslint-airbnb-styleguide-setup" target="_blank">this branch</a> of the tutorial repository. 
