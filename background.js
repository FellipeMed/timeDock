chrome.action.onClicked.addListener(() => {
    chrome.windows.create({
        url: "popup.html",
        type: "popup",
        width: 300,
        height: 600,
        left: 10,
        top: 10,
        focused: true
    }, (win) => {
        chrome.windows.update(win.id, { resizable: false });
    });
});

let startTime = null;
let elapsedTime = 0;
let interval = null;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "start") {
        startTime = Date.now() - elapsedTime;
        interval = setInterval(() => {
            elapsedTime = Date.now() - startTime;
            chrome.runtime.sendMessage({ action: "update", time: elapsedTime });
        }, 1000);
    } else if (request.action === "pause") {
        clearInterval(interval);
    } else if (request.action === "reset") {
        clearInterval(interval);
        elapsedTime = 0;
    }
});

chrome.alarms.create("keepAlive", { periodInMinutes: 1 });

chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === "keepAlive") {
        console.log("Mantendo a extensão ativa...");
    }
});