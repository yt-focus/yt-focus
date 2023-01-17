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

const applyFocusHome = (tab) => {
  chrome.storage.sync.get(["state"]).then(async (result) => {
    console.log("browhats up!!!",result.state)
    if(result.state.focusHome) {
      await chrome.scripting.insertCSS({
        files: ["/scripts/styles/focus-home.css"],
        target: { tabId: tab.id },
      });
    }
  });
}

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {

  console.log("im the id", tabId)
  if (changeInfo.status === "complete") {

    chrome.tabs.query({active: true, currentWindow: true}, async function(tabs) {
        let tab = tabs[0];

        if (tab.url.includes("youtube.com")) {

          let url = new URL(tab.url);
          let pathname = url.pathname.split("/")[1];
          
          if (pathname === "") {
            applyFocusHome(tab);
          } else {
            await chrome.scripting.removeCSS({
              files: ["/scripts/styles/focus-home.css"],
              target: { tabId: tab.id },
            });


          }
        }
    });
  }
});

chrome.storage.onChanged.addListener( () => {
  console.log("no way 3987239471923470923741239784")
  chrome.storage.sync.get(["state"]).then(async (result) => {
    console.log("browhats up!!!",result.state)
    if(result.state.focusHome) {
      await chrome.scripting.insertCSS({
        files: ["/scripts/styles/focus-home.css"],
        target: { tabId: result.state.fromTab },
      });
    } else {
      await chrome.scripting.removeCSS({
        files: ["/scripts/styles/focus-home.css"],
        target: { tabId: result.state.fromTab },
      });
    }
  });
})



// chrome.runtime.onInstalled.addListener((reason) => {
//   if (reason === chrome.runtime.onInstalledReason.INSTALL) {
//     chrome.tabs.create({
//       url: "https://www.youtube.com/"
//     });
//   }

  
  

