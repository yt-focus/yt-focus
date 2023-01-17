const DEFAULT = {
  onSwitch: true,
  reqBlur: "50%",
  greyscale: "100%",
  brightness: "0%",
  sepia: "0%",
  focus: true,
  comments: false,
  isReqHidden: false,
  lowercase: true,
  clickBaitHidden: true,
} 

console.log("yo")

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {

  if (changeInfo.status === "complete") {

    chrome.tabs.query({active: true, currentWindow: true}, async function(tabs) {
        let tab = tabs[0];

        if (tab.url.includes("youtube.com")) {

          let url = new URL(tab.url);
          let pathname = url.pathname.split("/")[1];
          
          if (pathname === "") {
            
            await chrome.scripting.insertCSS({
              files: ["focus-home.css"],
              target: { tabId: tab.id },
            });
          }
        }
    });
  }
});



// chrome.runtime.onInstalled.addListener((reason) => {
//   if (reason === chrome.runtime.onInstalledReason.INSTALL) {
//     chrome.tabs.create({
//       url: "https://github.com/yt-focus/yt-focus"
//     });
//     chrome.storage.sync.set({state: DEFAULT}, 
//       (result) => {
//         console.log("bruh")
//       });
//   }

  
  

