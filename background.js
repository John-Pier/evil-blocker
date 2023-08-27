chrome.runtime.onInstalled.addListener( () => {
    chrome.action.setBadgeText({
        text: "OFF",
    });
});

chrome.action.onClicked.addListener(async (tab) => {
    console.info(tab);
    const prevState = await chrome.action.getBadgeText({ tabId: tab.id });
    console.log(prevState)
    await chrome.action.setBadgeText({
        tabId: tab.id,
        text: prevState  === "OFF" ? 'ON' : 'OFF',
    });

    // await chrome.scripting.insertCSS({
    //     files: ['focus-mode.css'],
    //     target: { tabId: tab.id }
    // });
});
