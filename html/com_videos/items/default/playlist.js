// Modules.
import pie from "pistacja/plugin";
import { debounce } from "utils";
import TabsManager from "tabs-manager";
import revealContent from "reveal-content";
import UsppModal from "pistacja/uspp-modal";


pie.plugin(function Playlist({ domain }) {

  // Handle Tabs.
  TabsManager(690);

  // Playlist description.
  let reveal;
  // For some reason on load ".text" height is measured incorectly thus setTimeout.
  setTimeout(() => reveal = revealContent(".pie-playlist-preview-description .text", 92), 50);
  reveal && window.addEventListener("resize", debounce(reveal.reset, 400));


  // Initialize USPP modal.
  UsppModal(domain);

});
