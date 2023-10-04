"use strict";
var fsdialog = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // src/index.ts
  var src_exports = {};
  __export(src_exports, {
    fsAlert: () => fsAlert,
    fsDialog: () => fsDialog,
    fsPrompt: () => fsPrompt,
    fsSuccess: () => fsSuccess
  });

  // src/fsdialogs.ts
  function fsAlert(bodyHtml, head = "Alert") {
    return fsDialog([{ text: "OK", value: "OK", class: "btn btn-sm btn-danger" }], bodyHtml, head, { headClass: "bg-danger text-white", closeButton: true });
  }
  function fsSuccess(bodyHtml, head = "Success") {
    return fsDialog([{ text: "OK", value: "OK", class: "btn btn-sm btn-success" }], bodyHtml, head, { headClass: "bg-success text-white", closeButton: true });
  }
  function fsDialog(buttons, body, head, options = {}) {
    if (options === null || options === void 0) {
      options = {};
    }
    const modalOptions = { headClass: "", closeButton: false };
    if (options.headClass) {
      modalOptions.headClass = options.headClass;
    }
    if (options.closeButton) {
      modalOptions.closeButton = options.closeButton;
    }
    if (options.container) {
      modalOptions.container = options.container;
    }
    let width = "400px";
    if (options.width) {
      width = options.width;
    }
    let btns = [];
    if (buttons.length == 0) {
      btns = [{ value: "OK", text: "OK", class: "btn btn-sm btn-light" }];
    } else {
      for (let b of buttons) {
        const temp = {
          value: "",
          text: "",
          class: "btn btn-sm"
        };
        if (b.value) {
          temp.value = b.value;
        } else {
          temp.value = "OK";
        }
        if (b.text) {
          temp.text = b.text;
        } else {
          temp.text = b.value;
        }
        if (b.class) {
          temp.class = b.class;
        } else {
          temp.class = "btn btn-sm";
        }
        btns.push(temp);
      }
    }
    const element = document.createElement("dialog");
    element.classList.add("fs-dialog-modal");
    if (width != "auto") {
      element.style.width = width;
    } else {
      element.classList.add("fs-dialog-auto");
    }
    element.innerHTML = htmlDialog(btns, body, head, modalOptions);
    if (modalOptions.container) {
      modalOptions.container?.append(element);
    } else {
      document.body.append(element);
    }
    return new Promise((resolve) => {
      element.showModal();
      element.addEventListener("cancel", (event) => {
        event.preventDefault();
      });
      document.querySelectorAll(".fs-close-modal").forEach((button) => {
        button.addEventListener("click", (event) => {
          const r = event.currentTarget.dataset?.return;
          element.close();
          element.remove();
          if (r !== void 0) {
            resolve(r);
          }
        });
      });
    });
  }
  function htmlDialog(buttons, body, head, options) {
    const htmlButtons = buttons.map((item) => (
      /*html*/
      `<button data-return="${item.value}"
				class="fs-close-modal ${item.class}" type="button">${item.text}</button>`
    )).join(
      /*html*/
      `<span style="margin-left:4px"></span>`
    );
    let closeButton = "";
    if (options.closeButton) {
      closeButton = /*html*/
      `<div class="fs-dialog-margin-auto"></div>
		<div class="fs-close-modal" role="button" data-return="CLOSE">&#10761;</div>`;
    }
    return (
      /*html*/
      `
	<div class="title ${options.headClass}" >
		<div>${head}</div>
		${closeButton}	    
 	</div>  

	 <div class="body">
		${body}
 	</div>
 
	<hr style="margin-top:0px;margin-bottom:0px;margin-left:4px;margin-right:4px; color:##eeeeee">
	<div class="buttons">
		<div class="fs-dialog-margin-auto"></div>
		${htmlButtons}
	</div>
	`
    );
  }
  function fsPrompt(value, prompt, head, options = {}) {
    if (head === null || head === void 0) {
      head = "";
    }
    if (options === null || options === void 0 || Object.keys(options).length === 0) {
      options = {
        inputType: "text",
        headClass: "",
        min: "",
        max: "",
        step: "",
        buttonOkInnerHTML: "OK",
        buttonCloseInnerHTML: "CLOSE",
        buttonOkClass: "btn btn-primary btn-sm",
        buttonCloseClass: "btn btn-secondary btn-sm",
        inputClass: "fs-dialog-input",
        width: "400px",
        placeholder: ""
      };
    }
    let width = "400px";
    if (options.width) {
      width = options.width;
    }
    const valueId = `${(/* @__PURE__ */ new Date()).getTime()}`;
    const element = document.createElement("dialog");
    element.classList.add("fs-dialog-modal");
    if (width != "auto") {
      element.style.width = width;
    } else {
      element.classList.add("fs-dialog-auto");
    }
    element.innerHTML = htmlPrompt(value, prompt, head, valueId, options);
    if (options.container) {
      options.container?.append(element);
    } else {
      document.body.append(element);
    }
    return new Promise((resolve) => {
      element.showModal();
      document.querySelector(`#form_${valueId}`)?.addEventListener("submit", (event) => {
        event.preventDefault();
        const el = document.getElementById(`v${valueId}`);
        const value2 = el.value;
        element.close();
        element.remove();
        resolve({ button: "OK", value: value2 });
      });
      document.querySelector(`#close_${valueId}`)?.addEventListener("click", (event) => {
        element.close();
        element.remove();
        resolve({ button: "CLOSE" });
      });
      element.addEventListener("cancel", (event) => {
        resolve({ button: "CLOSE" });
      });
    });
  }
  function htmlPrompt(value, prompt, head, valueId, options) {
    const modalOptions = {
      inputType: "text",
      headClass: "",
      min: "",
      max: "",
      step: "",
      buttonOkInnerHTML: "OK",
      buttonCloseInnerHTML: "CLOSE",
      buttonOkClass: "btn btn-primary btn-sm",
      buttonCloseClass: "btn btn-secondary btn-sm",
      inputClass: "fs-dialog-input",
      width: "400px",
      placeholder: ""
    };
    if (options.buttonOkClass) {
      modalOptions.buttonOkClass = options.buttonOkClass;
    }
    if (options.buttonCloseClass) {
      modalOptions.buttonCloseClass = options.buttonCloseClass;
    }
    if (options.headClass) {
      modalOptions.headClass = options.headClass;
    }
    if (options.placeholder) {
      modalOptions.placeholder = options.placeholder;
    }
    if (options.inputType) {
      modalOptions.inputType = options.inputType;
    }
    if (options.min) {
      modalOptions.min = options.min;
    }
    if (options.max) {
      modalOptions.max = options.max;
    }
    if (options.step) {
      modalOptions.step = options.step;
    }
    if (options.buttonOkInnerHTML) {
      modalOptions.buttonOkInnerHTML = options.buttonOkInnerHTML;
    }
    if (options.buttonCloseInnerHTML) {
      modalOptions.buttonCloseInnerHTML = options.buttonCloseInnerHTML;
    }
    if (options.inputClass) {
      modalOptions.inputClass = options.inputClass;
    }
    let numberOptions = "";
    if (modalOptions.inputType == "number") {
      if (value == "") {
        value = "0";
      }
      if (modalOptions.min) {
        numberOptions += ` min="${modalOptions.min}" `;
      }
      if (modalOptions.max) {
        numberOptions += ` max="${modalOptions.max}" `;
      }
      if (modalOptions.step) {
        numberOptions += ` step="${modalOptions.step}" `;
      }
    }
    let placeholder = "";
    if (options.placeholder) {
      placeholder = ` placeholder="${options.placeholder}" `;
    }
    let hiddenLabel = "";
    if (prompt === "") {
      hiddenLabel = " hidden ";
    }
    return (
      /*html*/
      `
    <div class="title ${modalOptions.headClass}">
	   ${head}
	</div>  
		
	<form id="form_${valueId}">
		<div class="body">
			<div class="mb-1">
				<label for="v${valueId}" ${hiddenLabel} >
					${prompt}
				</label>
				<input class="${modalOptions.inputClass}"  type="${modalOptions.inputType}" name="name_${valueId}" required
							id="v${valueId}" ${numberOptions} ${placeholder}
							value="${value}"  maxlength="50" />
			</div>
		</div>
		
		<div class="buttons">
			<div class="fs-dialog-margin-auto"></div>
			<button class="${modalOptions.buttonOkClass}" type="submit" >
				${modalOptions.buttonOkInnerHTML}
			</button>
			<button data-return="CLOSE" type="button" class="fs-dialog-ml-2 ${modalOptions.buttonCloseClass}" id="close_${valueId}">
				${modalOptions.buttonCloseInnerHTML}
			</button>
		</div>
	<form>
</div>
	`
    );
  }
  return __toCommonJS(src_exports);
})();
