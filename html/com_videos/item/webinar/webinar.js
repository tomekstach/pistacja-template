import pie from "pistacja/plugin";
import DataCopy from "data-copy";
import countdown from "countdown";
import TabsManager from "tabs-manager";

pie.plugin(function Webinar({ remoteClassToggle }) {
  TabsManager(620);

  // Dismiss Share menu.
  remoteClassToggle.listener(({ targetName, target }) => {
    if (targetName === "share") {
      function dismissMenu() {
        document.removeEventListener("click", dismissMenu);
        target.classList.remove("show");
      }
      document.addEventListener("click", dismissMenu);
    }
  });

  // Coopy links to clipboard.
  DataCopy();

  const timer = document.getElementById("countdown-timer");
  timer &&
    countdown(timer.dataset.time, time => {
      timer.innerHTML = time.toString();
    });

});
