(() => {

  document.addEventListener('yt-page-type-changed', () => {
    chrome.runtime.sendMessage({type: "NAVIGATE"});
  })

})();

// --- Shorts timer feature -------------------------------------------------
// Adds a small elapsed-time timer next to the element with id `shorts-container`
// whenever the user navigates to a /shorts/* URL. Cleans up when navigating away.

(function() {
  const TIMER_ID = 'yt-focus-shorts-timer';
  const STYLE_ID = 'yt-focus-shorts-timer-style';

  let state = {
    intervalId: null,
    startTime: null,
    observer: null
  };

  function isShortsPage() {
    try {
      return location.pathname.startsWith('/shorts');
    } catch (e) {
      return false;
    }
  }

  function formatDuration(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    if (hours > 0) {
      return `${String(hours).padStart(2,'0')}:${String(minutes).padStart(2,'0')}:${String(seconds).padStart(2,'0')}`;
    }
    return `${String(minutes).padStart(2,'0')}:${String(seconds).padStart(2,'0')}`;
  }

  function ensureStyle() {
    if (document.getElementById(STYLE_ID)) return;
    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = `
      #${TIMER_ID} {
        opacity: .9;
        display: inline-block;
        font-family: Roboto, Arial, sans-serif;
        font-size: 4rem;
        color: #ffffff; /* base color: white, mix-blend-mode will invert visually */
        background: transparent;
        padding: 6px 10px;
        border-radius: 15px;
        vertical-align: middle;
        line-height: 1;
        position: absolute;
        left: 10%;
        top: 50%;
        transform: translateY(-50%);
        z-index: 999999;
        border: 1px solid currentColor;
        mix-blend-mode: difference; /* inverts against underlying pixels */
        pointer-events: none; /* don't block clicks */
      }
    `;
    document.head.appendChild(style);
  }

  // Insert the timer as a positioned child of #page-manager (left, vertically centered).
  function insertTimerNear(container) {
    // container parameter is the shorts container (kept for compatibility) but
    // we'll attach the timer to #page-manager so it's positioned over the page.
    const pageManager = document.getElementById('page-manager');
    // Avoid duplicate
    if (document.getElementById(TIMER_ID)) return document.getElementById(TIMER_ID);

    ensureStyle();

    const timer = document.createElement('div');
    timer.id = TIMER_ID;
    timer.setAttribute('role','status');
    timer.setAttribute('aria-live','polite');
    timer.textContent = '00:00';

    // Attach to page-manager when available, otherwise append to body
    const parent = pageManager || document.body;
    // Ensure parent is positioned so absolute works: if static, set relative temporarily
    const computed = parent === document.body ? null : window.getComputedStyle(parent);
    if (parent !== document.body && computed && computed.position === 'static') {
      parent.style.position = 'relative';
      // mark we changed it (we won't revert to avoid layout thrash)
    }
    parent.appendChild(timer);

  // We rely on CSS mix-blend-mode to invert the timer's visual color against
  // the page background. No JS color manipulation required.

    return timer;
  }


  function startTimerUI() {
    if (state.intervalId) return; // already running
    state.startTime = Date.now();
    const timerEl = document.getElementById(TIMER_ID);
    if (!timerEl) return;
    // update immediately
    timerEl.textContent = formatDuration(0);

    state.intervalId = setInterval(() => {
      const elapsed = Date.now() - state.startTime;
      const text = formatDuration(elapsed);
      timerEl.textContent = text;
      // log every second so developer can see it's running
    }, 1000);
  }

  function stopTimerUI() {
    if (state.intervalId) {
      clearInterval(state.intervalId);
      state.intervalId = null;
    }
    state.startTime = null;
  }

  function removeTimerElement() {
    const el = document.getElementById(TIMER_ID);
    if (el && el.parentNode) el.parentNode.removeChild(el);
    const style = document.getElementById(STYLE_ID);
    if (style && style.parentNode) style.parentNode.removeChild(style);
  }

  function clearObserver() {
    if (state.observer) {
      try { state.observer.disconnect(); } catch (e) {}
      state.observer = null;
    }
  }

  function setupObserverToWaitForContainer() {
    clearObserver();
    const root = document.documentElement || document.body;
    state.observer = new MutationObserver((mutations) => {
      for (const m of mutations) {
        // Try to find the page-manager whenever DOM changes (we attach timer there)
        const pageManager = document.getElementById('page-manager');
        if (pageManager) {
          // insert timer and start
          insertTimerNear(pageManager);
          startTimerUI();
          clearObserver();
          return;
        }
      }
    });
    state.observer.observe(root, { childList: true, subtree: true });
  }

  function clearShortsTimer() {
    stopTimerUI();
    removeTimerElement();
    clearObserver();
  }

  function ensureShortsTimer() {
    if (!isShortsPage()) {
      clearShortsTimer();
      return;
    }
    // If shorts, try to find page-manager now (we attach timer there)
    const pageManager = document.getElementById('page-manager');
    if (pageManager) {
      insertTimerNear(pageManager);
      startTimerUI();
      return;
    }

    // If not present yet, observe DOM for it
    setupObserverToWaitForContainer();
  }

  // Run on initial load
  try {
    // read user setting for shorts timer (default true)
    chrome.storage && chrome.storage.sync && chrome.storage.sync.get(['state'], (res) => {
      const enabled = !(res && res.state && typeof res.state.shortsTimer !== 'undefined') || (res.state && res.state.shortsTimer === true);
      if (enabled) ensureShortsTimer();
      else clearShortsTimer();
    });
  } catch (e) {}

  // Listen for YouTube's in-page navigation events (existing listener already
  // sends NAVIGATE to the extension background). Reuse same event to update UI.
  document.addEventListener('yt-page-type-changed', () => {
    // Give YouTube a short moment to update DOM then reconcile
    setTimeout(() => {
      ensureShortsTimer();
    }, 200);
  });

  // Also respond to history changes in case the page doesn't fire the event
  window.addEventListener('locationchange', ensureShortsTimer);
  // Fallback: detect pushState/replaceState and dispatch locationchange
  (function(history){
    const pushState = history.pushState;
    const replaceState = history.replaceState;
    history.pushState = function() {
      const ret = pushState.apply(this, arguments);
      window.dispatchEvent(new Event('locationchange'));
      return ret;
    };
    history.replaceState = function() {
      const ret = replaceState.apply(this, arguments);
      window.dispatchEvent(new Event('locationchange'));
      return ret;
    };
  })(window.history);

  // When unloading (e.g., extension/page refresh), ensure timers stop
  window.addEventListener('beforeunload', clearShortsTimer);

  // Listen for settings changes from popup and update timer accordingly
  if (chrome && chrome.storage && chrome.storage.onChanged) {
    chrome.storage.onChanged.addListener((changes, area) => {
      if (area === 'sync' && changes.state) {
        const newState = changes.state.newValue || {};
        const enabled = !(newState && typeof newState.shortsTimer !== 'undefined') || newState.shortsTimer === true;
        if (enabled) ensureShortsTimer();
        else clearShortsTimer();
      }
    });
  }

})();


