// Components.
import { template } from "travrs";

// Search phrase.
export default function phraseSearch() {
  const metadata = {
    searchType: "phrase",
    userType: undefined,
  };

  const [root, refs] = template(`
    div.pie-search-popup
      div.pie-search-popup-searchbox[data-header="Szukaj po słowie kluczowym"]
        @form::form[method="GET" action="./wyniki-wyszukiwania"]
          @input::input[type="text" name="q" placeholder="np: ułamki"]
          button.searchbtn.pie-icon-right-arrow-18
        button.close-search
  `);

  document.body.appendChild(root);

  root.onclick = event => {
    event.target === root && root.classList.remove("open");
  };

  // Analytics tracking.
  refs.form.onsubmit = event => {
    const form = new FormData(event.target);
    const query = form.get("q");
    window.dataLayer.push({
      event: "context-search",
      searchPhrase: query,
      ...metadata,
    });
  };

  return {
    show: user => {
      metadata.userType = user;
      root.classList.add("open");
      refs.input.focus();
    },
  };
}
