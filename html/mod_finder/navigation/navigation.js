// Modules.
import pie from "pistacja/plugin";

// Local modules.
import NavigationSearch from "./modules/navigation-search";

// Install Naviation Search plugin.
pie.plugin(() => {
  NavigationSearch();
  document.addEventListener("click", event => {

    // Handle Drodown menu.
    if (event.target.matches(".drop-trigger")) {
      event.preventDefault();
    }

    // Handle OPP 1% popup;
    else if (event.target.matches("button.copy-krs")) {
      navigator.clipboard.writeText("0000558853");
      event.target.parentNode.classList.add("success");
      event.target.textContent = "SKOPIOWANO";
      setTimeout(() => {
        event.target.parentNode.classList.remove("success");
        event.target.textContent = "SKOPIUJ";
      }, 1200);

    }
  });
});
