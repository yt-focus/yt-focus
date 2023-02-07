(() => {

  document.addEventListener('yt-page-type-changed', () => {
    chrome.runtime.sendMessage({type: "NAVIGATE"});
  })

})();

