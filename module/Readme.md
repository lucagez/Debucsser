
![](/gif/debucsser.gif)

# DebuCSSer

CSS debugging tool with an unpronounceable name.

### [Codepen Demo](https://codepen.io/lucagez/full/LMEerQ)

## Installation

If you are using a bundler:

`npm install debucsser`

Alternatively: download debucsser.js in /module folder and link it in your HTML.

_**A chrome extension is under development**_

## Why

Debucsser is a simple CSS debugging tool made to be unobtrusive in your workflow.

I often find myself applying an "outline" to a lot of elements on the page to see their dimensions.

With Debucsser I simply hold **`CTRL`** and move my mouse around to see the dimensions in px and apply an outline class to every element I hover.

If you  hold **`CTRL`** + **`SHIFT`** you apply the outline class to all the elements on the page by adding a global class.

You can configure some parameters.

I find handy the possibility to specify a custom class I want to apply to different elements without the need to comment and uncomment the my css files.

## Usage

```javascript
// only if you installed via NPM
import Debucsser from 'debucsser';

// pass all the custom properties you want
const config = {
  color: 'palevioletred', // color of the outline
  width: '4px', // width of the outline
  grayscaleOnDebugAll: true, // apply grayscale filter to every element 
  customClass: 'exampleClass',  // a class existent in your stylesheet
}

// init the debugger
const debug = new Debucsser(config).init();
```

When you have done this, simply hold **`CTRL`** or **`CTRL`** + **`SHIFT`** and move the mouse around on the page.

## Props

|       property        |  propType    |    default    |                              description                              |
| :-------------------- | ------------  | ------------: | :-------------------------------------------------------------------- |
| `color`               | {string}   | palevioletred | Outline color.                                                        |
| `width`               | {string}   | 3px           | Outline width.                                                        |
| `style`               | {string}   | solid         | Outline style.                                                        |
| `grayscaleOnDebug`    | {bool}  | false         | Apply grayscale filter on hovered element while holding `CTRL`.       |
| `grayscaleOnDebugAll` | {bool}  | false         | Apply grayscale filter on all elements while holding `CTRL` + `SHIFT`.|
| `customClass`         | {string}   | null          | Apply custom class on hovered element while holding `CTRL`.           |
| `mainKey`             | {number}    | 17            | Set the key to use alternatively to `CTRL`.                           |
| `secondKey`           | {number}    | 16            | Set the key to use alternatively to `SHIFT`.                          |

## Contributing

Fork ➡ new branch ➡ PR 🎉

**TODO:**

- [ ] Make a usable chrome extension (very experimental by now)
- [ ] Improve default styling of label

If you have any idea on how to make Debucsser better don't hesitate 😎

#### License

MIT
