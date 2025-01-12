# @fenisoft/fsdialog

[![npm version](https://img.shields.io/npm/v/@fenisoft/fsdialog.svg?style=flat?)](https://www.npmjs.com/package/@fenisoft/fsdialog "View this project on npm")

>Simple JS library for modal with html5 ```<dialog>``` element


## Install

```bash
npm install @fenisoft/fsdialog
```

## usage as esm module

```javascript
//  css
//  <link href="dist/fsdialogs.css" rel="stylesheet">

import {fsDialog,fsPrompt} from '@fsdialog/fsdialog';

/* fsDialog */
const buttons = [
    { text: `<b>YES</b>`, value: 'YES', class: "btn btn-success btn-sm" },
    { text: `<b>NO</b>`, value: 'NO', class: "btn btn-dark btn-sm" }
];

const options = {
    headClass: "bg-danger text-white",
    closeButton: true,
}

const response = await fsDialog(buttons, 'Are you sure ?', 'Confirm dialog', options);
// return a Promise
//response  = 'YES' if button 'YES' clicked
//response = 'NO' if button 'NO' clicked

/* fsPrompt */
const value = '';
const response = await fsPrompt(value, 'Insert value:', 'Prompt Dialog', { headClass: 'bg-warning text-white bg-gradient', });
// return a Promise
//response  = {button:'OK', 'value:?'}
if (response.button == 'OK') {
    result.textContent = response.value;
}


// see index.html app.js for examples
```

### usage as global

```html
<head>
    <link href="dist/fsdialogs.css" rel="stylesheet">
</head>
<script src="dist/fsdialog.global.js"></script>

<script>
  const buttons = [
    { text: `<b>YES</b>`, value: 'YES', class: "btn btn-success btn-sm" },
    { text: `<b>NO</b>`, value: 'NO', class: "btn btn-dark btn-sm" }
    ];

    const options = {
        headClass: "bg-danger text-white",
        closeButton: true,
    }

const response = await fsdialog.fsDialog(buttons, 'Are you sure ?', 'Confirm dialog', options);

</script>
```

### OPTIONS

```javascript
// fsModal options default
 const options  = {
    headClass :  '',  //  type <string>
    closeButton: false, //  <boolean>;
    width: '400px', // 'auto' = autosize type<string>
    container: body, // type<HTMLElement>
    closeOnEsc: false // if true close dialog when press ESC key and return Promise 'ESC'  
    borderRadius: '6px', //type <string>  
    buttonsPosition: 'left' // type <string> 'left' 'center' 'right'
 }

// fsPrompt options default
const options = {
    inputType: 'text',  // 'number' or 'text' or 'date' 
    headClass: '', // type <string>
    min: '',  // only inputType == 'number'  type <string|number>
    max: '',  // only inputType == 'number'  type <string|number>
    step: '', // only inputType == 'number'  type <string|number>
    buttonOkInnerHTML: 'OK', //type <string>
    buttonCloseInnerHTML: 'CLOSE', //type <string>
    buttonOkClass: 'btn btn-primary btn-sm', //class fron bootstrap  type <string>
    buttonCloseClass: 'btn btn-secondary btn-sm', //class from bootstrap type <string>
    invertButtons?: false, // button order    true  ? [CANCEL] [OK] : [OK] [CANCEL]  type <boolean>,
    inputClass:'fs-dialog-input', // fs-dialog-input definited in fsdialog.css
    width: '400px', // 'auto' = autosize type<string>
    placeholder: '', // placehiolder input type<string>
    container: body // type<HTMLElement>
};


```