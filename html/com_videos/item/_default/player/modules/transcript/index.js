import { timeToSeconds } from "utils";
import anchorCatch from "anchor-catch";

// Higlihghts video's subtitles accordign to display time and allows to jump
// to specific moment in the video by cllicking on the subtitle link.
export default function Transcript(player) {
  const transcriptContent = document.querySelector(".pie-tabs-transcript");

  // Exit if no transcript.
  if (!player || !transcriptContent) {
    return;
  }

  const videoTranscript = anchorCatch(transcriptContent);

  const clock = createClock(
    collectTranscriptiom(transcriptContent),
    transcriptContent
  );

  // Catch click event on a subtitle link.
  videoTranscript.catch("seek", options => {
    player.seekTo(timeToSeconds(options.time));
    player.playVideo();
  });

  player.onStop(() => clock.stop());
  player.onPlay(time => clock.play(Math.floor(time)));

  // Create map object from all transcription links.
  function collectTranscriptiom(root) {
    return Array.from(root.querySelectorAll("a")).reduce((acc, link) => {
      const time = timeToSeconds(link.href.slice(-8));
      acc[time] = link;
      return acc;
    }, {});
  }

  // Timing mechanism.
  function createClock(timetable, content) {
    let timer;

    // NOTE:
    // This will activate fiest element if it starts at 00:00:00
    // For better experience "time" in play() method need to be updated before selecting
    // transcription link - this will however exclude link with time: 00:00:00.
    let active = timetable[0];
    active && active.classList.add("active");

    // API.
    return {
      play: playTime => {
        let time = playTime;
        active && time !== 0 && active.classList.remove("active");
        timer && clearInterval(timer);
        timer = setInterval(() => {
          time += 1;
          if (timetable[time]) {
            active && active.classList.remove("active");
            active = timetable[time];
            active.classList.add("active");
            content.scrollTop = active.offsetTop;
          }
        }, 1000);
      },

      stop: () => {
        timer && clearInterval(timer);
      },
    };
  };
}
