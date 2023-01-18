const applyFocusHome = (tab) => {
  chrome.storage.sync.get(["state"]).then(async (result) => {
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

            if(pathname === "watch") {
              
            } else {
              await chrome.scripting.removeCSS({
                css: "img.yt-core-image {}",
                target: { tabId: result.state.fromTab },
              });
            }


          }
        }
    });
  }
});

//live menu changes

const recommendationBlurOption = (result) => {
  chrome.tabs.query({active: true, currentWindow: true}, async function(tabs) {
    let tab = tabs[0];

    if (tab.url.includes("youtube.com/watch")) {
      console.log("Im reaching here for the love of glob")
      await chrome.scripting.insertCSS({
        css: "img.yt-core-image {filter: blur("+result.state.reqBlur+"px)}",
        target: { tabId: result.state.fromTab },
      });
    }
});
  
  
}

const focusOption = async (result) => {
  chrome.tabs.query({active: true, currentWindow: true}, async function(tabs) {
    let tab = tabs[0];
    let url = new URL(tab.url);
    let pathname = url.pathname.split("/")[1];

    
      if(pathname === "" && result.state.focusHome) {
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
  })
}


chrome.storage.onChanged.addListener( () => {
  chrome.storage.sync.get(["state"]).then(async (result) => {
    console.log("browhats up!!!",result.state)


    console.log("ummm????")
    recommendationBlurOption(result);
    focusOption(result);

  });
})



// chrome.runtime.onInstalled.addListener((reason) => {
//   if (reason === chrome.runtime.onInstalledReason.INSTALL) {
//     chrome.tabs.create({
//       url: "https://www.youtube.com/"
//     });
//   }

  
  

