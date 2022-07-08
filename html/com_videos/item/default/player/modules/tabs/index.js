import { memoElement, insertCSS, isPrevious } from "utils";

// WARNING:
// This module is tightly coupled with Player HTML code in "src/joomla/html/com_videos/item/default.html.twig".
// All changes in the HTML should be also reflected in this module.

// This module ensure porper TABS switching on desktop and mobile devices.
export default function PlayerTabs(remoteClassToggle, device) {
  const $ = document.querySelector.bind(document);
  const $$ = document.querySelectorAll.bind(document);

  const ytBtn = document.getElementById("yt-share-button");
  const pistacjaBtn = document.getElementById("pistacja-share-button");

  // Devide tracking (desktop/mobile).
  let currentDevice;
  const isSameDevice = isPrevious(currentDevice);

  // Mobile scroll-to-tab settings.
  const embed = $(".pie-player-embed");
  const tabletOffset = embed.offsetHeight + 48;
  const mobileOffset = 48;

  // Active state tracking.
  const avtivateTab = memoElement(null, "active", true);
  const avtivateTrigger = memoElement(null, "active", true);

  // Player mode.
  const isExercise = isExerciseMode();

  // Settings.
  function mobileSettings() {
    insertCSS(
      Array.from($$(".pie-mobile-tab-btn")).reduce((acc, tab, index) => {
        // start from -1 - playlist button is outside tabs container.
        tab.dataset.index = index - 1;
        const trigger = tab.dataset.rctTrigger;
        const heightClass = `mobile-${trigger}`;
        const target = $(`div[data-rct-target="${trigger}"]`);
        const targetHeight = target.scrollHeight + 15; // + 15px of bottom padding.
        target.classList.add(heightClass);
        // Tabs need to be visible first to be mesured.
        // This class make tab "display: none." when we finsh mesure it.
        target.classList.add("display-tab");
        return (acc += `.${heightClass}.active {height: ${targetHeight}px;}`);
      }, ""),
      "pistacja-mobile",
      true
    );

    const initActiveTab = $(
      !isExercise
        ? `div.pie-player-tab[data-rct-target="info-tab"]`
        : `div.pie-player-tab[data-rct-target="exercises-tab"]`
    );

    const initActiveTrigger = $(
      !isExercise
        ? `button.pie-mobile-tab-btn[data-rct-trigger="info-tab"]`
        : `button.pie-mobile-tab-btn[data-rct-trigger="exercises-tab"]`
    );
    avtivateTab(initActiveTab);
    avtivateTrigger(initActiveTrigger);
  }

  function desktopSettings() {
    Array.from($$(".pie-player-tab")).forEach(tab => {
      tab.classList.add("display-tab");
    });

    const initActiveTab = $(
      !isExercise
        ? `div.pie-player-tab[data-rct-target="info-tab"]`
        : `div.pie-player-tab[data-rct-target="exercises-tab"]`
    );

    const initActiveTrigger = $(
      !isExercise
        ? `button.pie-desktop-tab-btn[data-rct-trigger="info-tab"]`
        : `button.pie-desktop-tab-btn[data-rct-trigger="exercises-tab"]`
    );

    avtivateTab(initActiveTab);
    avtivateTrigger(initActiveTrigger);
  }

  // Toggle tabs.
  remoteClassToggle.listener(({ targetName, trigger, target }) => {
    if (targetName.includes("tab")) {
      avtivateTab(target);
      avtivateTrigger(trigger);
      // Scroll tab content into view.
      if (currentDevice === "mobile") {
        if (device.getDevice().screenWidth < 640) {
          window.scrollTo(
            0,
            parseInt(trigger.dataset.index) * 50 + mobileOffset
          );
        } else {
          window.scrollTo(
            0,
            parseInt(trigger.dataset.index) * 50 + tabletOffset
          );
        }
      }
    }
  });

  // When device changes orientation.
  device.onChange(({ desktop, orientation, screenWidth }) => {
    currentDevice = screenWidth > 990 ? "desktop" : "mobile";

    // On all mobile devices in landscape mode set video to fullscreen.
    if (!desktop && orientation === "landscape") {
      embed.classList.add("mobile-fs");
    } else {
      embed.classList.remove("mobile-fs");
    }

    // Reset setup if device changes.
    if (!isSameDevice(currentDevice)) {
      currentDevice === "mobile" ? mobileSettings() : desktopSettings();
    }
  }, true);

  const copyUrlToClipboard = url => {
    navigator.clipboard.writeText(url);
  };

  ytBtn.addEventListener("click", e =>
    copyUrlToClipboard(`https://www.youtube.com/watch?v=${e.target.title}`)
  );

  pistacjaBtn.addEventListener("click", () =>
    copyUrlToClipboard(window.location.href)
  );

  document.querySelectorAll(".integration-button").forEach(item => {
    item.href += window.location.href;
  });
}

// ---- HELPERS ----------------

function isExerciseMode() {
  return new URLSearchParams(window.location.search).has("exercise");
}
