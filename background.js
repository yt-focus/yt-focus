const DEFAULT = {
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
console.log("hello")
// chrome.tabs.onUpdated.addListener( async (tab) => {
//   console.log("bruhbruh");
//   console.log(await tab.url)
//   console.log(tab.url && tab.url.includes("youtube.com"), tab, tab.url.includes("youtube.com"))
//   if(tab.url && tab.url.includes("youtube.com")) {
//     let url = new URL(tab.url);
//     let pathname = url.pathname.split("/")[1];
//     console.log("lol", pathname, !pathname)
//     if (!pathname) {
//       await chrome.scripting.insertCSS({
//         files: ["./styles/focus-home.css"],
//         target: { tabId: tab.id },
//       });
//     }
//     // console.log("lol")
//     // chrome.tabs.sendMessage(tabId, {
//     //   type: "NEW",
//     //   pathname,
//     // });
    
//   }
// });

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete") {
    chrome.tabs.query({active: true, currentWindow: true}, async function(tabs) {
        let tab = tabs[0];
        if (tab.url.includes("youtube.com")) {
          let url = new URL(tab.url);
          let pathname = url.pathname.split("/")[1];
          console.log("pathsss:",pathname, "tab:", tab, "jomba",pathname === "")
          if (pathname === "") {
            console.log("path:",pathname)            

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

  
  
// });
