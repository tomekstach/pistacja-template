import pie from "pistacja/plugin";
import DataCopy from "data-copy";
import TabsManager from "tabs-manager";
import YTPlayer from "./modules/yt-player";
import Exercises from "./modules/exercises";
import UsppModal from "pistacja/uspp-modal";
import Transcript from "./modules/transcript";
import PerfectScrollbar from "perfect-scrollbar";

// Styles.
import "perfect-scrollbar/css/perfect-scrollbar.css";

pie.plugin(async function Player(props) {

  const { domain, modals } = props;

  // Manage Tabs.
  TabsManager(990);

  // Handle USPP Modal.
  UsppModal(domain);

  // Handle player.
  const playerInstance = await YTPlayer("yt-video").catch(() => false);
  Transcript(playerInstance);

  // Handle exercises.
  Exercises(modals);

  // Coopy links to clipboard.
  DataCopy();

  // Perfect scrollbar.
  const playlist = document.querySelector("#pie-player-playlist");
  if (playlist) {
    new PerfectScrollbar(playlist);
    const activeItem = playlist.querySelector("li.active");
    activeItem && (playlist.scrollTop = activeItem.offsetTop - 40);
  }

});
