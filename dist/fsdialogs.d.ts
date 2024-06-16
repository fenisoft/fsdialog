/**
 * @author Alessandro Batisti <fenisoft@gmail.com>
 */
export interface IModalButton {
    value: string;
    text: string;
    class?: string;
}
export interface IModalOptions {
    headClass?: string;
    closeButton?: boolean;
    width?: string;
    closeOnEsc?: boolean;
    container?: HTMLElement | null;
}
export interface IPromptOptions {
    inputType?: string;
    headClass?: string;
    showClose?: boolean;
    min?: string;
    max?: string;
    step?: string;
    buttonOkClass?: string;
    buttonCloseClass?: string;
    buttonOkInnerHTML?: string;
    buttonCloseInnerHTML?: string;
    inputClass?: string;
    width?: string;
    placeholder?: string;
    container?: HTMLElement | null;
}
export interface IPromptResult {
    button: string;
    value?: string;
}
export declare function fsAlert(bodyHtml: string, head?: string): Promise<string>;
export declare function fsSuccess(bodyHtml: string, head?: string): Promise<string>;
/**
 *
 * @param {IModalButton[]} buttons
 * @param {string} body  - body html
 * @param {string} head - head plain text
 * @param {IModalOptions} options
 * @returns {Promise <string>}
 */
export declare function fsDialog(buttons: Array<IModalButton>, body: string, head: string, options?: IModalOptions): Promise<string>;
/**
 *
 * @param {string} value
 * @param {string} prompt
 * @param {string} head
 * @param {IPromptOptions} options
 * @returns {Promise<IPromptResult>}
 */
export declare function fsPrompt(value: string, prompt: string, head: string, options?: IPromptOptions): Promise<IPromptResult>;
