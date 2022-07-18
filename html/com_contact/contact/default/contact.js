// Modules.
import pie from "pistacja/plugin";

// Install Contact plugin.
pie.plugin(function Contact() {
  Array.from(
    document.querySelectorAll("input[required], textarea[required]")
  ).forEach(input => {
    input.type === "checkbox"
      ? input.addEventListener("change", checkChekbox)
      : input.addEventListener("blur", checkValidity);
  });

  const submitButton = document.querySelector(".pie-contact-submit-button");

  function checkValidity(event) {
    event.target.checkValidity()
      ? event.target.parentNode.classList.remove("invalid")
      : event.target.parentNode.classList.add("invalid");
  }

  function checkChekbox(event) {
    submitButton.disabled = !event.target.checked;
  }
});
