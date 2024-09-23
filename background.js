let lastPath;

const getStyles = ({state}, isWatching) => {
  const blurAmount = isWatching? state.reqBlur : 0;
  if(state.onSwitch)
    return `
    yt-icon-button.ytd-notification-topbar-button-renderer {
      display: none;
    }

    img.yt-core-image, .ytp-videowall-still-image, .ytp-cued-thumbnail-overlay {
      filter: blur(${blurAmount}px) grayscale(${state.greyscale}%) ;
    }

    #logo-icon {
      filter:grayscale(${state.onSwitch? 100 : 0 }%)
    }

    #dismissible.ytd-video-renderer{
      filter: grayscale(${state.greyscale}%)
    }

    .video-stream.html5-main-video {
      filter: brightness(${state.brightness / 100.0}) sepia(${state.sepia / 100.0});
    }

    .ytd-comments {
      display: ${state.isCommentsHidden? "none": "block"};
      padding-bottom: 30rem;
    }



    #related, .ytp-endscreen-next, .ytp-endscreen-previous, .videowall-endscreen {
      display: ${state.isReqHidden? "none": "block"};
    }

    a#endpoint[title='Shorts'],
    .ytd-rich-section-renderer[is-shorts],
    .ytd-reel-shelf-renderer,
    #dismissible:has(span[aria-label="Shorts"]) {
      display: ${state.isShortsHidden? "none !important" : "flex !important"};
    }

    .ytd-item-section-renderer:has(.ytd-reel-shelf-renderer){
      ${
        state.isShortsHidden
        ? 'border-top: none; border-bottom: none; margin-top: 0'
        :'border-top: 1px solid var(--yt-spec-10-percent-layer); border-bottom: 1px solid var(--yt-spec-10-percent-layer); margin-top:0;'
        
      }
    }

    #video-title, #above-the-fold .ytd-watch-metadata {
      text-transform: ${state.lowercase? "lowercase" : "none"} 
    }

    #page-manager.ytd-app {
      overflow: hidden !important;
    }
    `
  return `
  yt-icon-button.ytd-notification-topbar-button-renderer {
      display: block;
  }
  
  img.yt-core-image, .ytp-videowall-still-image, .ytp-cued-thumbnail-overlay {
    filter: blur(0px) grayscale(0%)
  }

  #logo-icon {
    filter:grayscale(0%)
  }

  #dismissible.ytd-video-renderer{
    filter: grayscale(0%)
  }

  .video-stream.html5-main-video {
    filter: brightness(1) sepia(0);
  }

  .ytd-comments {
    display: block
    padding-bottom: 30rem;
  }

  #related, .ytp-endscreen-next, .ytp-endscreen-previous, .videowall-endscreen {
    display: block;
  }

  a#endpoint[title='Shorts'],
  .ytd-rich-section-renderer[is-shorts],
  .ytd-reel-shelf-renderer,
  #dismissible:has(span[aria-label="Shorts"]) {
    display: flex !important;
  }

  .ytd-item-section-renderer:has(.ytd-reel-shelf-renderer){
    margin-top: auto;
    border-top: 1px solid var(--yt-spec-10-percent-layer);
    border-bottom: 1px solid var(--yt-spec-10-percent-layer);
  }

  #video-title, #above-the-fold .ytd-watch-metadata {
    text-transform: none;
  }
  `
  
}

const applyFocusHome = (tab, pathname) => {

  

  chrome.storage.sync.get(["state"]).then(async (result) => {

    
    if(result.state?.focusHome && result.state.onSwitch && pathname === "") {

      await chrome.scripting.insertCSS({
        files: ["/scripts/styles/focus-home.css"],
        target: { tabId: tab.id },
      }, () => {
        chrome.tabs.query({active: true, currentWindow: true}, async function(tabs) {
          let tab = tabs[0];
          let url = new URL(tab.url);
          let pathname = url.pathname.split("/")[1];

          if (pathname !== "") {
            await chrome.scripting.removeCSS({
              files: ["/scripts/styles/focus-home.css"],
              target: { tabId: tab.id },
            });
          }
        });
      })

    } else {

      sliderControlsLoadIn(pathname === "watch", tab, result)
      await chrome.scripting.removeCSS({
        files: ["/scripts/styles/focus-home.css"],
        target: { tabId: tab.id },
      });
    }
  });
}

const sliderControlsLoadIn = async (isWatching, tab, result) => {
  
  const styles = getStyles(result, isWatching)

  await chrome.scripting.insertCSS({
    css: styles,
    target: { tabId: tab.id },
  });

}

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {

  if (changeInfo.status === "complete") {

    let url = new URL(tab.url);
    let pathname = url.pathname.split("/")[1];

    if (tab.url.includes("youtube.com")) {
  

      applyFocusHome(tab, pathname);

    }

  }
});

//live menu changes

const stylesUpdate = (result) => {
  chrome.tabs.query({active: true, currentWindow: true}, async function(tabs) {
    let tab = tabs[0];

      const styles = getStyles(result, tab.url.includes("youtube.com/watch"));
      await chrome.scripting.insertCSS({
        css: styles,
        target: { tabId: result.state.fromTab },
      });
  });
}

const focusHomePageUpdate = async (result) => {
  chrome.tabs.query({active: true, currentWindow: true}, async function(tabs) {
    let tab = tabs[0];
    let url = new URL(tab.url);
    let pathname = url.pathname.split("/")[1];

    
      if(pathname === "" && result.state.focusHome && result.state.onSwitch) {
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

const hideCommentOption = ({ state }) => {
  const commentSection =  document.getElementsByClassName('ytd-comments');
  if(state.isCommentsHidden) {
   commentSection.classList.add("hidden");
  } else {
    commentSection.classList.remove("hidden")
  }
}


chrome.storage.onChanged.addListener( () => {
  chrome.tabs.query({active: true, currentWindow: true}, async function(tabs) {
    let tab = tabs[0];
    let { origin } = new URL(tab.url);
    if (origin.includes("youtube.com")) {
      chrome.storage.sync.get(["state"]).then(async (result) => {

          stylesUpdate(result);
          focusHomePageUpdate(result);

      });
    }
  });
})


chrome.runtime.onInstalled.addListener((details) => {

  if(details.reason == "install") {

    chrome.tabs.create({
      url: "https://yt-focus.org/help"
    });
  }
  
});
  
//Only expecting a message on navigate from content script
chrome.runtime.onMessage.addListener(
  async function(request, sender, sendResponse) {
    
    let url = new URL(sender.tab.url);
    let pathname = url.pathname.split("/")[1];
    
    if(pathname !== "") {
      await chrome.scripting.removeCSS({
        files: ["/scripts/styles/focus-home.css"],
        target: { tabId: sender.tab.id },
      });
    }
  }
);

