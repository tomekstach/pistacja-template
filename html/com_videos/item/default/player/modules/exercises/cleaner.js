// Module that handles exercise popup close event and makes sure to reset iframe "src"
// This is mainly for the video players to stop them form playing when modal is closed.

// FIXME: This need to be changed. It can only handle the exercises assigned to the video
//        it won't work with exercises in playlist that are interactive-video.
//        Solution for that would be actualt acces the player instance and stop move
//        instead forcing rsc reset.

export default function exerciseCleaner(modals) {
  modals &&
    modals.listen((name, state, modal) => {
      if (name === "exercises" && state === "hide") {
        const iframe = modal.querySelector("iframe");
        if (iframe) iframe.src = "";
      }
    });
}
