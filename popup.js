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

const getActiveTabURL = async () => {
  const tabs = await chrome.tabs.query({
      currentWindow: true,
      active: true
  });

  return tabs[0];
}

const addListeners = () => {
  const lightSwitch = document.getElementById("on-off");
  console.log(lightSwitch)
  lightSwitch.addEventListener('change', function() {
    if(!this.checked) {
      document.getElementById("cover").style.display = "block";
    } else {
      document.getElementById("cover").style.display = "none";
    }
  })
}

document.addEventListener("DOMContentLoaded", async () => {
  // const activeTab = await getActiveTabURL();
  // let pathname = activeTab.pathname.split("/")[1];

  
  addListeners();

});

