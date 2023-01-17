(() => {

  let reqs;

  const blurRecommendations = () => {
    reqs = document.getElementsByClassName("metadata");
    console.log("here", reqs);
    reqs.array.forEach(element => {
      element.style.color = "blue";
    });
  }
  console.log("bro")
  console.log("content script running");
  chrome.runtime.onMessage.addListener((obj, sender, response) => {
    const { type, pathname } = obj;
    if (type === "NEW") {
      console.log("pathname", pathname);
    }
  });


})();

