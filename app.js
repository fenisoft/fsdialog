import { fsDialog, fsPrompt,fsAlert,fsSuccess } from './dist/fsdialogs.js';

//
function simpleDialog() {
    const buttons = [
        { text: `<i class="bi bi-check2"></i> <b>OK</b>`, value: 'OK', class: "btn btn-success btn-sm" }
    ];
    const options = {
        headClass: "bg-success  text-white",
        closeButton: false
    }
    fsDialog(buttons, /*html*/`The Force is with you, young <b class="text-primary">Skywalker</b>. 
    But you are not a <b class="text-success">Jedi</b> yet!`, 'Simple dialog', options);
}

//
async function confirmDialog() {
    const result = document.querySelector("#confirmResult");
    result.innerHTML = 'Result:';
    const buttons = [
        { text: /*html*/`<b>YES</b>`, value: 'YES', class: "btn btn-success btn-sm" },
        { text: /*html*/`<b>NO</b>`, value: 'NO', class: "btn btn-dark btn-sm" }
    ];
    const options = {
        headClass: "bg-danger text-white",
        closeButton: true,
    }

    const response = await fsDialog(buttons, 'Are you sure ?', 'Confirm dialog', options);
    result.innerHTML = `Result: ${response}`;

}

async function promptDialog() {
    const result = document.querySelector("#promptResult");
    const response = await fsPrompt(result.textContent, 'Insert value:', 'Prompt Dialog', { headClass: 'bg-warning text-white bg-gradient', });
    if (response.button == 'OK') {
        result.textContent = response.value;
    }
}

async function promptNumberDialog() {
    const result = document.querySelector("#promptNumberResult");
    const response = await fsPrompt(result.textContent, 'Insert value:', 'Prompt Dialog number', { headClass: 'bg-dark  text-white bg-gradient', inputType:'number' });
    if (response.button == 'OK') {
        result.textContent = response.value;
    }
}



globalThis.showInfo = function () {
    const buttons = [
        { text: `<b>CLOSE</b>`, value: 'OK', class: "btn btn-primary btn-sm" }
    ];
    const options = {
        width: 'auto',
        headClass: "bg-success  text-white",
        closeButton: false,
        container: document.querySelector("#innerDialog")
    }
    const html= /*html*/`<div class="font-8">
            <b>Dante Alighieri</b>, o Alighiero, battezzato Durante di Alighiero degli Alighieri e 
            anche noto con il solo nome di Dante, della famiglia Alighieri (Firenze, tra il 14 maggio e il 13 giugno 1265 – 
            Ravenna, notte tra il 13 e il 14 settembre[1][2][3] 1321), è stato un poeta, scrittore e politico italiano.
        </div>
    `;
    fsDialog(buttons, html, 'Dante Alighieri', options);
}





document.getElementById("testBtn").addEventListener('click', () => {
    simpleDialog();
});

document.getElementById("confirmBtn").addEventListener('click', () => {
    confirmDialog();
})

document.getElementById("promptBtn").addEventListener('click', () => {
    promptDialog();
});

document.getElementById("promptNumberBtn").addEventListener('click', () => {
    promptNumberDialog();
})

document.getElementById("innerBtn").addEventListener('click', () => {
    document.getElementById("innerDialog").showModal();
})

document.getElementById("successBtn").addEventListener('click', () => {
    fsSuccess(/*html*/`<b>Dante Alighieri</b>, o Alighiero, battezzato Durante di Alighiero degli Alighieri e 
    anche noto con il solo nome di Dante, della famiglia Alighieri (Firenze, tra il 14 maggio e il 13 giugno 1265 – 
    Ravenna, notte tra il 13 e il 14 settembre[1][2][3] 1321), è stato un poeta, scrittore e politico italiano.`)
})

document.getElementById("alertBtn").addEventListener('click', () => {
    fsAlert(/*html*/`<b>Dante Alighieri</b>, o Alighiero, battezzato Durante di Alighiero degli Alighieri e 
    anche noto con il solo nome di Dante, della famiglia Alighieri (Firenze, tra il 14 maggio e il 13 giugno 1265 – 
    Ravenna, notte tra il 13 e il 14 settembre[1][2][3] 1321), è stato un poeta, scrittore e politico italiano.`)
})