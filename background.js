const getSliderStyles = ({state}, isWatching) => {
  const blurAmount = isWatching? state.reqBlur : 0;
  return `
  img.yt-core-image {
    filter: blur(${blurAmount}px) grayscale(${state.greyscale}%)
  }
  `
}

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

const sliderControlsLoadIn = async (isWatching, tab, result) => {
  
  const styles = getSliderStyles(result, isWatching)

  await chrome.scripting.insertCSS({
    css: styles,
    target: { tabId: tab.id },
  });

}

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {

  console.log("im the id", tabId)
  if (changeInfo.status === "complete") {

    chrome.tabs.query({active: true, currentWindow: true}, async function(tabs) {
        let tab = tabs[0];
        let url = new URL(tab.url);
        let pathname = url.pathname.split("/")[1];
        if (tab.url.includes("youtube.com")) {
          chrome.storage.sync.get(["state"]).then(async (result) => {
            
            if (pathname === "") {
              applyFocusHome(tab);
            } else {
              await chrome.scripting.removeCSS({
                files: ["/scripts/styles/focus-home.css"],
                target: { tabId: tab.id },
              });
  
              sliderControlsLoadIn(pathname === "watch", tab, result)

  
            }
        
          });
        }
    });
  }
});

//live menu changes

const sliderUpdate = (result) => {
  chrome.tabs.query({active: true, currentWindow: true}, async function(tabs) {
    let tab = tabs[0];

      console.log("Im reaching here for the love of glob")
      const styles = getSliderStyles(result, tab.url.includes("youtube.com/watch"));
      await chrome.scripting.insertCSS({
        css: styles,
        target: { tabId: result.state.fromTab },
      });
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


    sliderUpdate(result);
    focusOption(result);

  });
})



// chrome.runtime.onInstalled.addListener((reason) => {
//   if (reason === chrome.runtime.onInstalledReason.INSTALL) {
//     chrome.tabs.create({
//       url: "https://www.youtube.com/"
//     });
//   }

  
  

