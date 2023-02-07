(() => {

  document.addEventListener('yt-navigate-start', () => {
    chrome.runtime.sendMessage({type: "NAVIGATE"});

  })

})();

