// Components.
import highlight from "highlight";
import { template } from "travrs";

// Search within subject list.
export default function subjectSearch() {
  const metadata = {
    searchType: "subject",
    userType: undefined,
  };

  const subjectList = Array.from(
    document.querySelectorAll(".search-subject")
  ).map(element => {
    const anchor = element.querySelector("a");
    return {
      ui: anchor,
      ref: element,
      topic: anchor.textContent,
    };
  });

  const [root, refs] = template(`
    div.pie-search-popup
      @popup::div.pie-search-popup-searchbox[data-header="Wyszukaj temat na liście"]
        form[autocomplete="off" onSubmit="return false"]
          @input::input[type="text" placeholder="Zacznij pisać, aby rozpocząć wyszukiwanie np: liczby"]
        @results::div.pie-search-popup-filter-results
        button.close-search
  `);

  subjectList.forEach(entry => refs.results.appendChild(entry.ref));

  document.body.appendChild(root);

  refs.input.addEventListener("input", filterSubjects, false);

  function filterSubjects(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      return false;
    }
    const phrase = event.target.value.toLowerCase();
    subjectList.forEach(entry => {
      if (phrase.length && entry.topic.toLowerCase().includes(phrase)) {
        entry.ref.classList.add("filter-visible");
        entry.ui.innerHTML = highlight(entry.topic, phrase);
      } else entry.ref.classList.remove("filter-visible");
    });
  }

  root.onclick = event => {
    if (event.target === root) {
      root.classList.remove("open");
      // Clear results list when it's hidden.
      setTimeout(() => {
        filterSubjects({ target: { value: "" } });
        refs.input.value = "";
      }, 300);
    }
  };

  // Analytics.
  refs.results.addEventListener("click", event => {
    if (event.target.nodeName === "A") {
      window.dataLayer.push({
        event: "context-search",
        searchPhrase: event.target.textContent,
        ...metadata,
      });
    }
  });

  return {
    show: user => {
      metadata.userType = user;
      root.classList.add("open");
      refs.input.focus();
    },
  };
}
