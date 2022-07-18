// Components.
import { template } from "travrs";

// Search by Education Level.
export default function levelSearch() {
  const metadata = {
    searchType: "level",
    userType: undefined,
  };

  const [root, refs] = template(`
    div.pie-search-popup
      @header::div.pie-search-popup-searchbox[data-header="Wyszukaj dla poziomu edukacyjnego"]
        @form::form[method="GET" action="./wyniki-wyszukiwania"]
          @input::input[type="text" name="q" placeholder="np: ułamki"]
          @options::div.pie-search-popup-select[data-custom-select="tsubject" value="0" data-title="Przedmiot"]
          button.btn.searchbtn.pie-icon-right-arrow-18
        button.btn.close-search
  `);

  const c = Array.from(
    document.querySelectorAll(
      `div.pie-chalk-select[data-custom-select="tsubject"] button`
    )
  ).forEach(option => {
    const clone = option.cloneNode(true);
    clone.className = "";
    refs.options.appendChild(clone);
  });

  document.body.appendChild(root);

  root.onclick = event => {
    event.target === root && root.classList.remove("open");
  };

  function updateHeader(content) {
    refs.header.dataset.header = `Wyszukaj w: ${content}`;
  }

  refs.input.onkeydown = event => {
    if (event.code === "Enter") {
      event.preventDefault();
      refs.form.submit();
    }
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
    show: (level, user) => {
      metadata.userType = user;
      updateHeader(level);
      root.classList.add("open");
      refs.input.focus();
    },
  };
}
