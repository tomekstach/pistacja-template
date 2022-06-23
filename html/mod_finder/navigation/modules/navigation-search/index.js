// Styles.
import "./styles.scss";

// Module handles navigation searchbox interactions.
export default function navigationSearch() {

  const $mobile = 1170;

  const search = document.querySelector("#pie-navigation-search");
  const button = document.querySelector("button.pie-navigation-search-toggle");
  const form = search.querySelector("form");
  const input = form.querySelector("input");

  // NOTICE: Code related to "navbar" contains FIX for issue with virtual keyboard on mobile phones
  // where when open, on some screens browser applies landscape styles to portrait orientation.
  // On pistacja.tv this results in disapearing of navigation bar in Player view when user clicks
  // on search input.

  const navbar = document.querySelector(".pie-top-navigation");

  // Searchbox sibling nodes.
  const siblings = Array.from(search.parentNode.children)
    .filter(child => child !== search)
    .map(child => (child.classList.add("search-sibling"), child));


  // Close on Escape key press.
  const escape = event => {
    if (event.key === "Escape" || event.keyCode === 27) {
      document.removeEventListener("keydown", escape);
      button.classList.remove("active");
      form.classList.remove("show-form");
      siblings.forEach(sibling => sibling.classList.remove("hide-sibling"));
      button.focus();
    }
  }

  button.addEventListener("click", event => {

    // Open seachbox.
    if (button.classList.toggle("active")) {
      document.addEventListener("keydown", escape);
      form.classList.add("show-form");
      input.focus();
      navbar.classList.add("on-top");
    }

    // Close seachbox.
    else {
      document.removeEventListener("keydown", escape);
      form.classList.remove("show-form");
      input.blur();
      button.blur();
      navbar.classList.remove("on-top");
    }

    // On desktop - hide menu items.
    window.innerWidth > $mobile &&
      siblings.forEach(sibling => sibling.classList.toggle("hide-sibling"));
  });

}
