export default function YTPlayer(id, width = 560, height = 315) {
  return new Promise((resolve, reject) => {
    let player;
    let playCallback;
    let stopCallback;

    // Run when YouTube player is ready.
    window.onYouTubePlayerAPIReady = function YTPlayerReady() {
      const container = document.getElementById(id);

      if (!container) {
        return reject(`No container found for id: "${id}"`);
      }

      // eslint-disable-next-line
      player = new YT.Player(id, {
        width,
        height,
        videoId: container.dataset.videoid,
        playerVars: {
          rel: 0,
          modestbranding: 1,
        },
        events: {
          onReady: playerIsReady,
          onStateChange: playerStateChange,
        },
      });
    };



    // sandbox="allow-forms allow-scripts allow-pointer-lock allow-same-origin allow-top-navigation"

    // Remove pistacja loader.
    function playerIsReady() {
      const loader = document.querySelector(".pie-loader");
      loader && loader.parentNode.removeChild(loader);

      // Attach handlers.
      player.onStop = callback => {
        stopCallback = callback;
      };

      player.onPlay = callback => {
        playCallback = callback;
      };

      player.fullscreen = () => {
        const requestFullScreen = iframe.requestFullScreen || iframe.mozRequestFullScreen || iframe.webkitRequestFullScreen;
        requestFullScreen && requestFullScreen.bind(container)();
      };

      resolve(player);
    }

    // Handle player's state change.
    function playerStateChange(event) {
      if (event.data === 1) {
        playCallback && playCallback(event.target.getCurrentTime());
      } else if (event.data === 2) {
        stopCallback && stopCallback(event.target.getCurrentTime());
      }
    }
  });
}
