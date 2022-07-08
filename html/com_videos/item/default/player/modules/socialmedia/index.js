export default function socialMedia() {
  const root = document.querySelector(".top-menu");
  const media = document.querySelector(".pie-social-media-mobile");
  media && root && root.insertBefore(media, root.lastElementChild);
}
