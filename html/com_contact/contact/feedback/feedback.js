import pie from "pistacja/plugin";
import CustomSelect from "custom-select";

// Install Feedback plugin.
pie.plugin(function Feedback() {
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

  CustomSelect();
});
