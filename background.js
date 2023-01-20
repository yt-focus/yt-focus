let lastPath;

const getStyles = ({state}, isWatching) => {
  const blurAmount = isWatching? state.reqBlur : 0;
  if(state.onSwitch)
    return `
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
    }

    #related, .ytp-endscreen-next, .ytp-endscreen-previous, .videowall-endscreen {
      display: ${state.isReqHidden? "none": "block"};
    }

    #video-title, #above-the-fold .ytd-watch-metadata {
      text-transform: ${state.lowercase? "lowercase" : "none"} 
    }
    `
  return `
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
  }

  #related, .ytp-endscreen-next, .ytp-endscreen-previous, .videowall-endscreen {
    display: block;
  }

  #video-title, #above-the-fold .ytd-watch-metadata {
    text-transform: none;
  }
  `
  
}

const applyFocusHome = (tab, pathname) => {

  chrome.storage.sync.get(["state"]).then(async (result) => {

    
    if(result.state.focusHome && result.state.onSwitch && pathname === "") {

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
  
  

