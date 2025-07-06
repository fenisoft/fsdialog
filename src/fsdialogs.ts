
/**
 * @author Alessandro Batisti <fenisoft@gmail.com>
 * @version 0.2.5
 */

export interface IModalButton {
	value: string,
	text: string,
	class?: string
}


export interface IModalOptions {
	headClass?: string,
	closeButton?: boolean,
	width?: string,
	closeOnEsc?: boolean,
	borderRadius?: string,
	buttonsPosition?: string,
	container?: HTMLElement | null,
}


export interface IPromptOptions {
	inputType?: string,
	headClass?: string,
	showClose?: boolean,
	min?: string,
	max?: string,
	step?: string,
	buttonOkClass?: string,
	buttonCloseClass?: string,
	buttonOkInnerHTML?: string,
	buttonCloseInnerHTML?: string,
	invertButtons?: boolean,
	inputClass?: string,
	width?: string,
	placeholder?: string
	container?: HTMLElement | null
}

export interface IPromptResult {
	button: string,
	value?: string
}


//import './fsdialogs.css';

export function fsAlert(bodyHtml: string, head: string = 'Alert') {
	return fsDialog([{ text: 'OK', value: 'OK', class: 'btn btn-sm btn-danger' }], bodyHtml, head, { headClass: 'bg-danger text-white', closeButton: true, width: 'auto' });
}

export function fsSuccess(bodyHtml: string, head: string = 'Success') {
	return fsDialog([{ text: 'OK', value: 'OK', class: 'btn btn-sm btn-success' }], bodyHtml, head, { headClass: 'bg-success text-white', closeButton: true, width: 'auto' });
}

/**
 * 
 * @param {IModalButton[]} buttons 
 * @param {string} body  - body html
 * @param {string} head - head plain text
 * @param {IModalOptions} options 
 * @returns {Promise <string>}  
 */

export function fsDialog(buttons: Array<IModalButton>, body: string, head: string, options: IModalOptions = {}): Promise<string> {
	if (options === null || options === undefined) {
		options = {};
	}

	const modalOptions: IModalOptions = { headClass: '', closeButton: false, closeOnEsc: false, buttonsPosition: 'right' };

	if (options.headClass) {
		modalOptions.headClass = options.headClass;
	}

	if (options.closeButton) {
		modalOptions.closeButton = options.closeButton
	}

	if (options.container) {
		modalOptions.container = options.container
	}

	if (options.closeOnEsc) {
		modalOptions.closeOnEsc = options.closeOnEsc
	}

	if (options.buttonsPosition) {
		modalOptions.buttonsPosition = options.buttonsPosition
	}

	let width = '400px';
	if (options.width) {
		width = options.width;
	}

	let btns: Array<IModalButton> = [];

	if (buttons.length == 0) {
		btns = [{ value: 'OK', text: 'OK', class: 'btn btn-sm btn-light' }];
	} else {
		for (let b of buttons) {
			const temp = {
				value: '',
				text: '',
				class: 'btn btn-sm'
			}

			if (b.value) {
				temp.value = b.value;
			} else {
				temp.value = 'OK';
			}

			if (b.text) {
				temp.text = b.text;
			} else {
				temp.text = b.value;
			}

			if (b.class) {
				temp.class = b.class;
			} else {
				temp.class = 'btn btn-sm'
			}
			btns.push(temp);
		}
	}


	const element = document.createElement('dialog');
	if (!modalOptions.closeOnEsc) {
		element.setAttribute("closedby", "none");
	}

	element.classList.add("fs-dialog-modal");
	if (width != 'auto') {
		element.style.width = width;
	} else {
		element.classList.add('fs-dialog-auto');
	}

	if (options.borderRadius) {
		element.style.borderRadius = options.borderRadius;
	}

	element.innerHTML = htmlDialog(btns, body, head, modalOptions);

	if (modalOptions.container) {
		(modalOptions.container as HTMLElement)?.append(element);
	} else {
		document.body.append(element);
	}

	return new Promise((resolve) => {
		element.showModal();
		element.addEventListener('cancel', event => {
			if (options.closeOnEsc) {
				element.close();
				element.remove();
				resolve('CLOSE');
			} else {
				event.preventDefault();
			}
		});

		document.querySelectorAll(".fs-close-modal").forEach(button => {
			button.addEventListener('click', (event) => {
				const r = (event.currentTarget as HTMLElement).dataset?.return;
				element.close();
				element.remove();
				if (r !== undefined) {
					resolve(r);
				}
			})
		});
	});
}

//
function htmlDialog(buttons: Array<IModalButton>, body: string, head: string, options: IModalOptions) {
	const htmlButtons = buttons.map(item => /*html*/`<button data-return="${item.value}"
				class="fs-close-modal ${item.class}" type="button">${item.text}</button>`).join(/*html*/`<span style="margin-left:4px"></span>`);

	let buttonClass = 'fs-dialog-buttons';
	let buttonsContent = /*html*/`<div class="fs-dialog-margin-auto"></div>${htmlButtons}`;
	if (options.buttonsPosition) {
		if (options.buttonsPosition == 'left') {
			buttonsContent = htmlButtons;
		}

		if (options.buttonsPosition == 'center') {
			buttonClass = `fs-dialog-buttons fs-dialog-buttons-center`;
			buttonsContent = htmlButtons;
		}

	}

	let closeButton = '';
	if (options.closeButton) {
		closeButton = /*html*/`<div class="fs-dialog-margin-auto"></div>
		<div class="fs-close-modal fs-dialog-pointer" role="button" data-return="CLOSE">&#10761;</div>`;
	}
	return /*html*/`
	<div class="fs-dialog-title ${options.headClass}" >
		<div>${head}</div>
		${closeButton}	    
 	</div>  

	 <div class="fs-dialog-body">
		${body}
 	</div>
 
	<hr class="fs-dialog-hr">
	<div class="${buttonClass}">
		${buttonsContent}
	</div>
	`
}



//
/**
 * 
 * @param {string} value
 * @param {string} prompt 
 * @param {string} head 
 * @param {IPromptOptions} options 
 * @returns {Promise<IPromptResult>}
 */
export function fsPrompt(value: string, prompt: string, head: string, options: IPromptOptions = {}): Promise<IPromptResult> {
	if (head === null || head === undefined) {
		head = '';
	}

	if (options === null || options === undefined || Object.keys(options).length === 0) {
		options = {
			inputType: 'text',
			headClass: '',
			min: '',
			max: '',
			step: '',
			buttonOkInnerHTML: 'OK',
			buttonCloseInnerHTML: 'CLOSE',
			buttonOkClass: 'btn btn-primary btn-sm',
			buttonCloseClass: 'btn btn-secondary btn-sm',
			inputClass: 'fs-dialog-input',
			width: '400px',
			placeholder: '',
			invertButtons: false
		};
	}



	let width = '400px'
	if (options.width) {
		width = options.width;
	}

	const valueId = `${new Date().getTime()}`;
	const element = document.createElement('dialog');

	element.classList.add("fs-dialog-modal");
	if (width != 'auto') {
		element.style.width = width;
	} else {
		element.classList.add('fs-dialog-auto');
	}
	//element.style.width = width;
	element.innerHTML = htmlPrompt(value, prompt, head, valueId, options);


	if (options.container) {
		(options.container as HTMLElement)?.append(element);
	} else {
		document.body.append(element);
	}

	return new Promise((resolve) => {
		const input = element.querySelector(`#v${valueId}`);
		element.showModal();
		if (input) {
			if ((input as HTMLInputElement).type != 'number') {
				const end = (input as HTMLInputElement)?.value.length;
				(input as HTMLInputElement)?.setSelectionRange(end, end);
				(input as HTMLInputElement)?.focus();
			}
		}
		document.querySelector(`#form_${valueId}`)?.addEventListener('submit', event => {
			event.preventDefault();
			const el = document.getElementById(`v${valueId}`);
			const value = (el as HTMLInputElement).value;
			element.close();
			element.remove();
			resolve({ button: 'OK', value });
		});

		document.querySelector(`#close_${valueId}`)?.addEventListener('click', event => {
			element.close();
			element.remove();
			resolve({ button: 'CLOSE' });
		});

		element.addEventListener('cancel', event => {
			resolve({ button: 'CLOSE' });
		});
	});
}


/**
 * 
 * @param {string} value 
 * @param {string} prompt 
 * @param {string} head 
 * @param {string} valueId 
 * @param {IPromptOptions} options 
 * @returns {string} 
 */
function htmlPrompt(value: string, prompt: string, head: string, valueId: string, options: IPromptOptions): string {

	const modalOptions: IPromptOptions = {
		inputType: 'text',
		headClass: '',
		min: '',
		max: '',
		step: '',
		buttonOkInnerHTML: 'OK',
		buttonCloseInnerHTML: 'CLOSE',
		buttonOkClass: 'btn btn-primary btn-sm',
		buttonCloseClass: 'btn btn-secondary btn-sm',
		inputClass: 'fs-dialog-input',
		width: '400px',
		placeholder: '',
		invertButtons: false
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

	if (Object.hasOwn(options, 'invertButtons')) {
		modalOptions.invertButtons = options.invertButtons;
	}


	let numberOptions = '';
	if (modalOptions.inputType == 'number') {
		if (value == '') {
			value = '0';
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

	let placeholder = '';
	if (options.placeholder) {
		placeholder = ` placeholder="${options.placeholder}" `;
	}

	let hiddenLabel = '';
	if (prompt === '') {
		hiddenLabel = ' hidden ';
	}

	let buttons = /*html*/`<button class="${modalOptions.buttonOkClass}" type="submit" >
			${modalOptions.buttonOkInnerHTML}
		</button>
		<button data-return="CLOSE" type="button" class="fs-dialog-ml-2 ${modalOptions.buttonCloseClass}" id="close_${valueId}">
			${modalOptions.buttonCloseInnerHTML}
		</button>`;

	if (modalOptions.invertButtons) {
		buttons = /*html*/`<button data-return="CLOSE" type="button" class="${modalOptions.buttonCloseClass}" id="close_${valueId}">
			${modalOptions.buttonCloseInnerHTML}
		</button>
		<button class="fs-dialog-ml-2 ${modalOptions.buttonOkClass}" type="submit" >
			${modalOptions.buttonOkInnerHTML}
		</button>`;
	}

	return /*html*/`
    <div class="fs-dialog-title ${modalOptions.headClass}">
	   ${head}
	</div>  
		
	<form id="form_${valueId}">
		<div class="fs-dialog-body">
			<div class="mb-1">
				<label for="v${valueId}" ${hiddenLabel} >
					${prompt}
				</label>
				<input class="${modalOptions.inputClass}"  type="${modalOptions.inputType}" name="name_${valueId}" required
							id="v${valueId}" ${numberOptions} ${placeholder}
							value="${value}" maxlength="50" />
			</div>
		</div>
		
		<div class="fs-dialog-buttons">
			<div class="fs-dialog-margin-auto"></div>
			 ${buttons}
		</div>
	<form>
</div>
	`;
}