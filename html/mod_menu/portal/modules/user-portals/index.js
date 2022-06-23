// Modules.
import anchorCatch from "anchor-catch";
import LevelSearch from "./components/level-search";
import PhraseSearch from "./components/phrase-search";
import SubjectSearch from "./components/subject-search";

// Styles.
import "./styles.scss";

// NOTE:
// Modules handles the interactions in user-portals: Dla ucznia, DLa nauczyciela, Dla rodzica
// along with searchboxe popups for different types of search.
export default function UserPortals() {
  const userPortals = anchorCatch(".pie-content");

  // Context Searchboxes.
  const levelContextSearch = LevelSearch();
  const phraseContextSearch = PhraseSearch();
  const subjectContextSearch = SubjectSearch();
  const levelMap = [
    "Szkoła podstawowa kl. IV-VI",
    "Szkoła podstawowa kl. VII-VIII",
    "Szkoła ponadpodstawowa",
  ];

  // Catch Collapse Menus.
  userPortals.catch("collapse", (_, target) => {
    // Set height.
    target.nextElementSibling.style.maxHeight =
      target.dataset.open !== "true" ? "300px" : "0px";
    // Toggle open flag.
    target.dataset.open =
      !target.dataset.open || target.dataset.open === "false"
        ? "true"
        : "false";
  });

  // Show Context Searchbox.
  userPortals.catch("search", options => {
    const { index, type, user } = options;
    switch (type) {
      case "levels":
        levelContextSearch.show(levelMap[+index], user);
        break;
      case "phrase":
        phraseContextSearch.show(user);
        break;
      case "subjects":
        return subjectContextSearch.show(user);
      default:
        throw new Error("Unknow context search type");
    }
  });
}
