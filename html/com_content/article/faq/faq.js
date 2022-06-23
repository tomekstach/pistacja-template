// Modules.
import pie from "pistacja/plugin";
import anchorCatch from "anchor-catch";

// Install Landing plugin.
pie.plugin(function Faq() {
  const faqContent = document.querySelector(".pie-faq-content");
  if (!faqContent) return;
  const entries = anchorCatch(faqContent.parentNode);

  // Catch Collapse Menus.
  entries.catch("collapse", (options, target) => {
    // Set height.
    target.parentNode.nextElementSibling.style.height =
      target.dataset.open !== "true"
        ? `${target.parentNode.nextElementSibling.scrollHeight}px`
        : "0px";
    // Toggle open flag.
    target.dataset.open =
      !target.dataset.open || target.dataset.open === "false"
        ? "true"
        : "false";
  });
});
