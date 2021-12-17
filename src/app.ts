const keySounds: HTMLAudioElement[] = [];
let ActualSound: HTMLAudioElement | null = null;
const seekLimit = 2;

function clickOnKey(key: number) {
  if (ActualSound !== null) {
    ActualSound.pause();
    ActualSound.currentTime = 0;
  }
  keySounds[key].play();
  ActualSound = keySounds[key];
}

function seekTag(
  tag: HTMLBaseElement,
  tagName: string,
  limit: number = seekLimit
): number {
  const isTag = tag.tagName === tagName;
  if (!isTag && limit > 0) {
    return seekTag(tag.parentNode as HTMLBaseElement, tagName, --limit);
  }
  return isTag && tag.parentNode
    ? Array.prototype.indexOf.call(tag.parentNode.children, tag)
    : -1;
}

window.onload = () => {
  for (let i = 1; i < 24; i++) {
    keySounds[i] = new Audio(`audio/key-${i}.mp3`);
  }

  const piano = document.querySelector(".piano");

  if (piano) {
    piano.addEventListener("click", (e: Event): void => {
      e.preventDefault();
      const tagIndex = seekTag(e.target as HTMLBaseElement, "a");
      if (tagIndex === -1) return;
      clickOnKey(tagIndex + 1);
    });
  }
};
