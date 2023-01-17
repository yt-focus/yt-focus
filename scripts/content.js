(() => {

  let reqs;

  const blurRecommendations = () => {
    reqs = document.getElementsByClassName("metadata");
    reqs.array.forEach(element => {
      element.style.color = "blue";
    });
  }

  const focusMessage = async ({checked, tabId}) => {
    console.log("yo whats up brochachoooooo", checked, tabId )
    if(checked) {
      await chrome.scripting.insertCSS({
        files: ["/scripts/styles/focus-home.css"],
        target: { tabId },
      });
    } else {
      await chrome.scripting.removeCSS({
        files: ["/scripts/styles/focus-home.css"],
        target: { tabId: tabId },
      });
    }
  }

  chrome.runtime.onMessage.addListener((obj, sender, response) => {
    const { action, options } = obj;
    switch (action) {
      case "FOCUS":
        focusMessage(options);
        break;
    }
    return true;
  });


})();

