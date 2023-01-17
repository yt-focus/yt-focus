(() => {

  let reqs;

  const blurRecommendations = () => {
    reqs = document.getElementsByClassName("metadata");
    reqs.array.forEach(element => {
      element.style.color = "blue";
    });
  }

  const focusHomePage = ({isOn}) => {
    if(isOn) {

    }
  }

  chrome.runtime.onMessage.addListener((obj, sender, response) => {
    const { type, pathname, options } = obj;

    switch (type) {
      case "FOCUS":
    }
    
  });


})();

