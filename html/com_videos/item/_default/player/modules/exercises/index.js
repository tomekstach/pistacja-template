import { template } from "travrs";
import { queryToObject } from "utils";
import { remoteModal } from "pistacja/modals";
import analytics from "./analytics";
import cleaner from "./cleaner";

import "./styles.scss";

export default function Exercises(modals) {
  const { exercise } = queryToObject(window.location.search);
  const modalController = remoteModal("exercises");
  const model = window.pie_video_exercises;
  delete window.pie_video_exercises;

  // Initialize Analytics for exercises.
  const tracker = analytics();

  // Install Exercise cleaner.
  cleaner(modals);

  // For Exercises in playlist.
  if (modalController.modal.dataset.exUrl) {
    const { exUrl, exTitle } = modalController.modal.dataset;
    modalController.modal.appendChild(videoExercise(exTitle, exUrl));
    tracker.start(exTitle);
  }

  // For Exercises in video (URL).
  else if (exercise) {
    const { title, url, video } = model[exercise];
    modalController.modal.appendChild(videoExercise(title, url, video));
    modalController.on();
    tracker.start(title);
  }
}


function videoExercise(title, url, video) {
  const [content, refs] = template(`
    div.pie-player-exercises-modal-container.stack.--medium
      div.rail.--h-spread.--stretch
        @header::h2.KGSolid.text-green.font-xl > "Zadanie"
        div.rail.--zero
          @fullscreen::button.pie-icon-fullscreen-18
          button.pie-player-exercises-modal-close.pie-icon-close-18[data-pie-modal-close="true"]
      @video::div.subheader
      @player::iframe[width="100%" height="100%" scrolling="yes" frameborder="0" allowfullscreen]
    `);

  // Set content.
  refs.player.src = url;
  refs.header.textContent = title;
  refs.fullscreen.addEventListener("click", () => {
    if (content.parentNode.classList.toggle("fullscreen")) {
      refs.fullscreen.classList.add("pie-icon-smallscreen-18");
      refs.fullscreen.classList.remove("pie-icon-fullscreen-18");
    } else {
      refs.fullscreen.classList.add("pie-icon-fullscreen-18");
      refs.fullscreen.classList.remove("pie-icon-smallscreen-18");
    }
  });

  if (video) {
    refs.video.textContent = `Zadanie do wideo: ${video}`;
  } else {
    refs.video.remove();
  }

  return content;
}
