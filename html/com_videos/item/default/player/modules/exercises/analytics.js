export default function analytics() {
  let exercise;
  let startTime;

  function startRecording(exerciseTitle) {
    startTime = Date.now();
    exercise = exerciseTitle;
  }

  function stopRecording() {
    const timeEllapsed = Date.now() - startTime;
    window.dataLayer.push({
      event: "player-exercise",
      timeValue: humanTime(timeEllapsed),
      customValue: exercise,
    });
  }

  document.addEventListener("click", ({ target }) => {
    if (target.matches("button.pie-player-playlist-button")) {
      startRecording(target.dataset.exercise);
    } else if (
      target.matches("div.pie-modal-root") ||
      target.matches("button.pie-player-exercises-modal-close")
    ) {
      stopRecording();
    }
  });

  return {
    start: title => startRecording(title),
  };
}

// ---- Helpers ----------------

function humanTime(millis) {
  const minutes = Math.floor(millis / 60000);
  const seconds = ((millis % 60000) / 1000).toFixed(0);
  return `${minutes < 10 ? "0" : ""}${minutes}:${
    seconds < 10 ? "0" : ""
  }${seconds}`;
}
