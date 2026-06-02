import { generateSlug } from "https://esm.sh/random-word-slugs@0.1.7";

const adjOptions = {
  partsOfSpeech: ["adjective"],
  categories: {
    adjective: ["colors", "emotions", "appearance"],
  },
};
const nounOptions = {
  partsOfSpeech: ["noun"],
  categories: {
    noun: ["animals", "thing", "food"],
  },
};

let currentAdj = "";
let currentNoun = "";
let currentAvatar = "";

const usernameEntries = [];

function checkAndReset() {
  if (currentAdj && currentNoun && currentAvatar) {
    usernameEntries.push({
      adjective: currentAdj,
      noun: currentNoun,
      avatar: currentAvatar,
    });
    const resultsContainer = document.getElementById("results");
    const entryP = document.createElement("p");
    entryP.textContent = `${currentAdj}${currentNoun}`;
    entryP.insertAdjacentHTML("beforeend", currentAvatar);

    resultsContainer.appendChild(entryP);
    reset();
  }
}

function reset() {
  currentAdj = "";
  currentNoun = "";
  currentAvatar = "";
  document.querySelector(".adjBtn").disabled = false;
  document.querySelector(".nounBtn").disabled = false;
  document.querySelector(".avatarBtn").disabled = false;
}

function generateWord(btn, options, type) {
  const btnSelector = document.querySelector(btn);
  btnSelector.addEventListener("click", () => {
    const word = generateSlug(1, {
      categories: options.categories,
      partsOfSpeech: options.partsOfSpeech,
    });

    if (type === "adjective") {
      currentAdj = word;
    } else if (type === "noun") {
      currentNoun = word.slice(0, 1).toUpperCase() + word.slice(1); 
    }
    btnSelector.disabled = true;
    checkAndReset();
  });
}
generateWord(".adjBtn", adjOptions, "adjective");
generateWord(".nounBtn", nounOptions, "noun");

const avatarBtn = document.querySelector(".avatarBtn");
avatarBtn.addEventListener("click", () => {
  fetch(`https://api.dicebear.com/10.x/adventurer-neutral/svg?seed=${Math.random()}`,)
    .then((res) => res.text())
    .then((svg) => {
      currentAvatar = svg;
      avatarBtn.disabled = true;
      checkAndReset();
    });
});
