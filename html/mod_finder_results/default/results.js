// Modules.
import { debounce } from "utils";
import pie from "pistacja/plugin";
import CustomSelect from "custom-select";
import revealContent from "reveal-content";
import UsppModal from "pistacja/uspp-modal";


// Install Results plugin.
pie.plugin(function Results({ domain }) {

  CustomSelect();

  // Handle USPP Modal.
  UsppModal(domain);

  // Search results overflow tooltip.
  const reveal = revealContent(".pie-results-result-row-description", 48);

  reveal &&
    window.addEventListener("resize", debounce(() => reveal.reset(), 400));
});
