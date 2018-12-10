![](/gif/debucsser.gif)



# DebuCSSer

CSS debugging tool with an unpronounceable name



## Demo

https://codepen.io/lucagez/full/LMEerQ



## Installation

If you are using a bundler:

```npm install debucsser```


Alternatively download debucsser.js in /module folder and link it in your html

## Why

Debucsser is a simple CSS debugging tool made to be unobtrusive in your workflow.

I find myself often apply "outline" to a lot of elements on the page to see their dimensions.

With Debucsser I simply have to hold **CTRL** and move my mouse around to see the dimensions in px and apply an outline class to every element I hover.

If you  hold **CTRL** + **SHIFT** you apply the outline class to all the elements on the page by adding a global class.

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

When you have done this, simply hold CTRL  and move the mouse around on the page or hold CTRL + SHIFT.



## Props

### color

outline color.

Type: string. **Default:** palevioletred

### width

outline width.

Type: string. **Default:** 3px

### style 

outline style.

Type: string. **Default:** solid

### grayscaleOnDebug

Apply grayscale filter on hovered element while holding CTRL.

Type: bool. **Default:** false

### grayscaleOnDebugAll

Apply grayscale filter on all elements while holding CTRL + SHIFT.

Type: bool. **Default:** false

### customClass

Apply custom class on hovered element while holding CTRL.

Type: string. **Default:** null

### mainKey

Set the key to use alternatively to CTRL.

Type: number **Default:** 17

### secondKey

Set the key to use alternatively to SHIFT.

Type: number **Default:** 16





