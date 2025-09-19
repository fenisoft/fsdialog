import { fsDialog, fsPrompt } from '@fenisoft/fsdialog';

//
function simpleDialog() {
    const buttons = [
        { text: /*html*/`<i class="bi bi-check2"></i> <b>OK</b>`, value: 'OK', class: "btn btn-success btn-sm" }
    ];
    const options = {
        headClass: "bg-success  text-white",
        closeButton: false,
    }
    fsDialog(buttons, /*html*/`The Force is with you, young <b class="text-primary">Skywalker</b>. 
    But you are not a <b class="text-success">Jedi</b> yet!`, 'Simple dialog', options);
}

function simpleDialog2() {
    const buttons = [
        { text: /*html*/`<b class="text-primary">OK</b>`, value: 'OK', class: "btn btn-light btn-sm" }
    ];
    const options = {
        headClass: "justify-content-center",
        borderRadius: '14px',
        buttonsPosition: 'center'

    }
    fsDialog(buttons, /*html*/`The Force is with you, young <b class="text-primary">Skywalker</b>. 
    But you are not a <b class="text-success">Jedi</b> yet!`, 'Simple dialog2', options);
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
        closeOnEsc: false
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
    const response = await fsPrompt(result.textContent, 'Insert value:', 'Prompt Dialog number', { headClass: 'bg-dark  text-white bg-gradient', inputType: 'number', invertButtons: true });
    if (response.button == 'OK') {
        result.textContent = response.value;
    }
}




globalThis.showInfo = function () {
    const buttons = [
        { text: `<b>CLOSE</b>`, value: 'OK', class: "btn btn-primary btn-sm" }
    ];
    const options = {
        width: '400px',
        headClass: "bg-success  text-white",
        closeButton: false,
        container: document.querySelector("#innerDialog")
    }
    const html = /*html*/`<div class="font-8">
            <p>
                <b>Dante Alighieri</b>, o Alighiero, battezzato Durante di Alighiero degli Alighieri e 
                anche noto con il solo nome di Dante, della famiglia Alighieri (Firenze, tra il 14 maggio e il 13 giugno 1265 – 
                Ravenna, notte tra il 13 e il 14 settembre[1][2][3] 1321), è stato un poeta, scrittore e politico italiano.
            </p>
            <p>
                    Il nome "Dante", secondo la testimonianza di Jacopo Alighieri, è un ipocoristico di Durante[N 1]; nei documenti era seguito dal patronimico Alagherii o dal gentilizio de Alagheriis, mentre la variante "Alighieri" si affermò solo con l'avvento di Boccaccio.
            </p>
            <p>
                Viene considerato il padre della lingua italiana; la sua fama è dovuta alla paternità della Comedìa, divenuta celebre come Divina Commedia e universalmente considerata la più grande opera scritta in lingua italiana e uno dei maggiori capolavori della letteratura mondiale[4]. Espressione della cultura medievale, filtrata attraverso la lirica del Dolce stil novo, la Commedia è anche veicolo allegorico della salvezza umana, che si concretizza nel toccare i drammi dei dannati, le pene purgatoriali e le glorie celesti, permettendo a Dante di offrire al lettore uno spaccato di morale ed etica.
            </p>
            <p>
                    Importante linguista, teorico politico e filosofo, Dante spaziò all'interno dello scibile umano, segnando profondamente la letteratura italiana dei secoli successivi e la stessa cultura occidentale, tanto da essere soprannominato il "Sommo Poeta" o, per antonomasia, il "Poeta"[5]. Dante, le cui spoglie si trovano a Ravenna nella tomba costruita nel 1780 da Camillo Morigia, in epoca romantica divenne il principale simbolo dell'identità nazionale italiana[6]. Da lui prende il nome il principale ente della diffusione della lingua italiana nel mondo, la Società Dante Alighieri[7], mentre gli studi critici e filologici sono mantenuti vivi dalla Società dantesca.
            </p>

            </div>
    `;
    fsDialog(buttons, html, 'Dante Alighieri', options);
}


document.getElementById("testBtn").addEventListener('click', () => {
    simpleDialog();
});

document.getElementById("testBtn2").addEventListener('click', () => {
    simpleDialog2();
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
