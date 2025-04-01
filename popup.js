let cronometroInterval;
let cronometroSegundos = 0;
let cronometroAtivo = false;

document.getElementById("startCron").addEventListener("click", function() {
    if (!cronometroAtivo) {
        cronometroAtivo = true;
        cronometroInterval = setInterval(() => {
            cronometroSegundos++;
            atualizarCronometro();
        }, 1000);
    }
});

document.getElementById("pauseCron").addEventListener("click", function() {
    clearInterval(cronometroInterval);
    cronometroAtivo = false;
});

document.getElementById("resetCron").addEventListener("click", function() {
    clearInterval(cronometroInterval);
    cronometroSegundos = 0;
    cronometroAtivo = false;
    atualizarCronometro();
});

function atualizarCronometro() {
    let horas = Math.floor(cronometroSegundos / 3600);
    let minutos = Math.floor((cronometroSegundos % 3600) / 60);
    let segundos = cronometroSegundos % 60;
    document.getElementById("cronometro").innerText =
        `${String(horas).padStart(2, "0")}:${String(minutos).padStart(2, "0")}:${String(segundos).padStart(2, "0")}`;
}

// -------------------- TIMER --------------------

let timerInterval;
let timerSegundos = 0;
let timerAtivo = false;

document.getElementById("startTimer").addEventListener("click", function() {
    if (!timerAtivo) {
        timerSegundos = parseInt(document.getElementById("timerInput").value);
        if (isNaN(timerSegundos) || timerSegundos <= 0) {
            alert("Insira um tempo válido!");
            return;
        }
        timerAtivo = true;
        atualizarTimer();
        timerInterval = setInterval(() => {
            if (timerSegundos > 0) {
                timerSegundos--;
                atualizarTimer();
            } else {
                clearInterval(timerInterval);
                timerAtivo = false;
                alert("Tempo finalizado!");
            }
        }, 1000);
    }
});

document.getElementById("pauseTimer").addEventListener("click", function() {
    clearInterval(timerInterval);
    timerAtivo = false;
});

document.getElementById("resetTimer").addEventListener("click", function() {
    clearInterval(timerInterval);
    timerSegundos = 0;
    timerAtivo = false;
    atualizarTimer();
});

function atualizarTimer() {
    let minutos = Math.floor(timerSegundos / 60);
    let segundos = timerSegundos % 60;
    document.getElementById("timer").innerText =
        `${String(minutos).padStart(2, "0")}:${String(segundos).padStart(2, "0")}`;
}


// Carregar valores salvos
chrome.storage.local.get(["cronometroSegundos", "timerSegundos"], function (data) {
    if (data.cronometroSegundos) {
        cronometroSegundos = data.cronometroSegundos;
        atualizarCronometro();
    }
    if (data.timerSegundos) {
        timerSegundos = data.timerSegundos;
        atualizarTimer();
    }
});

// Salvar valores sempre que forem atualizados
function salvarEstado() {
    chrome.storage.local.set({
        cronometroSegundos: cronometroSegundos,
        timerSegundos: timerSegundos
    });
}

// Modifique `atualizarCronometro` e `atualizarTimer` para chamar `salvarEstado()`
function atualizarCronometro() {
    let horas = Math.floor(cronometroSegundos / 3600);
    let minutos = Math.floor((cronometroSegundos % 3600) / 60);
    let segundos = cronometroSegundos % 60;
    document.getElementById("cronometro").innerText =
        `${String(horas).padStart(2, "0")}:${String(minutos).padStart(2, "0")}:${String(segundos).padStart(2, "0")}`;
    salvarEstado();
}

function atualizarTimer() {
    let minutos = Math.floor(timerSegundos / 60);
    let segundos = timerSegundos % 60;
    document.getElementById("timer").innerText =
        `${String(minutos).padStart(2, "0")}:${String(segundos).padStart(2, "0")}`;
    salvarEstado();
}