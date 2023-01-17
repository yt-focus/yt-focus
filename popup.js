const DEFAULT = {
  onSwitch: true,
  reqBlur: 50,
  greyscale: 100,
  brightness: 100, //0 - 200 | 100 = 0
  sepia: 0,
  focusHome: true,
  isCommentsHidden: false,
  isReqHidden: false,
  lowercase: true,
  clickBaitHidden: true,
} 

let 
onSwitch, 
reqBlur,
greyscale, 
brightness,
sepia,
focusHome,
isCommentsHidden,
isReqHidden,
lowercase,
clickBaitHidden;

const getActiveTabURL = async () => {
  const tabs = await chrome.tabs.query({
      currentWindow: true,
      active: true
  });

  return tabs[0];
}

const addMenuSaveActivity = () => {

  const elements = document.getElementsByClassName('menu-item');
  for (let i = 0; i < elements.length; i++) {
    if (i === 0)
      elements[i].addEventListener('change', () => saveState());
    else
      elements[i].shadowRoot.querySelector("input")
      .addEventListener('change', saveState);
  }
}

async function focusToggle () {
  const activeTab = await getActiveTabURL();
  console.log("im being called",activeTab.id);
  
  chrome.tabs.sendMessage(activeTab.id, {
    action: "FOCUS",
    options: {
      element: this,
      checked: this.checked,
      tabId: activeTab.id,
    }
  });
}

const addListeners = () => {
  const lightSwitch = document.getElementById("on-off");

  lightSwitch.addEventListener('change', function() {
    if(!this.checked) {
      document.getElementById("cover").style.display = "block";
    } else {
      document.getElementById("cover").style.display = "none";
    }
  })

  addMenuSaveActivity();

  focusHome.addEventListener('change', focusToggle);



}

const setState = (state) => {

  onSwitch.checked = state.onSwitch;
  reqBlur.value = state.reqBlur;
  greyscale.value = state.greyscale;
  brightness.value = state.brightness;
  sepia.value = state.sepia;
  focusHome.checked = state.focusHome;
  isCommentsHidden.checked = state.isCommentsHidden;
  isReqHidden.checked = state.isReqHidden;
  lowercase.checked = state.lowercase;
  clickBaitHidden.checked = state.clickBaitHidden;

  const elements = document.querySelectorAll('option-slider');
  for (let i = 0; i < elements.length; i++) {
      elements[i].shadowRoot.querySelector("input")
        .dispatchEvent(new Event('input'));
  }

  if(!onSwitch.checked) {
    document.getElementById("cover").style.display = "block"
  }
}

const saveState = async () => {

  const activeTab = await getActiveTabURL();

  const state = {
    onSwitch: onSwitch.checked, 
    reqBlur: reqBlur.value,
    greyscale: greyscale.value, 
    brightness: brightness.value,
    sepia: sepia.value,
    focusHome: focusHome.checked,
    isCommentsHidden: isCommentsHidden.checked,
    isReqHidden: isReqHidden.checked,
    lowercase: lowercase.checked,
    clickBaitHidden: clickBaitHidden.checked,
    fromTab: activeTab.id, 
  }

  chrome.storage.sync.set({ state })
}

const loadState = () => {
  chrome.storage.sync.get(["state"]).then((result) => {
    
    if(!result.state) {
      setState(DEFAULT);
    } else {
      setState(result.state);
    }
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  // const activeTab = await getActiveTabURL();
  // let pathname = activeTab.pathname.split("/")[1];

  onSwitch = document.getElementById("on-off");
  reqBlur = document.querySelector('option-slider[name="recommendation blur"]')
    .shadowRoot.querySelector("input");
  greyscale = document.querySelector('option-slider[name="thumbnail greyscale"]')
    .shadowRoot.querySelector("input");
  brightness = document.querySelector('option-slider[name="brightness"]')
    .shadowRoot.querySelector("input");
  sepia = document.querySelector('option-slider[name="sepia"]')
    .shadowRoot.querySelector("input");
  focusHome = document.querySelector('option-checkbox[id="focus-page"]')
    .shadowRoot.querySelector("input");
  isCommentsHidden = document.querySelector('option-checkbox[id="hide-comments"]')
    .shadowRoot.querySelector("input");
  isReqHidden = document.querySelector('option-checkbox[id="hide-reqs"]')
    .shadowRoot.querySelector("input");
  lowercase = document.querySelector('option-checkbox[id="lowercase"]')
    .shadowRoot.querySelector("input");
  clickBaitHidden = document.querySelector('option-checkbox[id="click-bait"]')
    .shadowRoot.querySelector("input");

  
  loadState();
  addListeners();

});

