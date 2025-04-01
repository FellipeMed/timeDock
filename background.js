chrome.action.onClicked.addListener(() => {
    chrome.windows.create({
        url: "popup.html",
        type: "popup",
        width: 300,
        height: 400,
        left: 10,
        top: 10
    });
});