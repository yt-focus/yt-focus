chrome.tabs.onUpdated.addListener((tabId, tab) => {
  if (tab.url && tab.url.includes("youtube.com/watch")) {
    chrome.tabs.sendMessage(tabId, {
      type: "WATCH",
    });
  } else if(tab.url && tab.url.includes("youtube.com/results")) {
    chrome.tabs.sendMessage(tabId, {
      type: "RESULTS",
    });
  } else if(tab.url && tab.url == "youtube.com") {
    chrome.tabs.sendMessage(tabId, {
      type: "HOME",
    });
    
  }
});
