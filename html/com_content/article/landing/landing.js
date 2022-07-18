// Modules.
import pie from "pistacja/plugin";
import typewriter from "typewriter";

// Install Landing plugin.
pie.plugin(() => typewriter(document.querySelector("[data-typewriter]")));
