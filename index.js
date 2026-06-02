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
    console.log("Entries:", usernameEntries);
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
      currentNoun = word;  
    }
    btnSelector.disabled = true;
    console.log(`${currentAdj} ${currentNoun} ${currentAvatar}`);
    checkAndReset();
  });
}
generateWord(".adjBtn", adjOptions, "adjective");
generateWord(".nounBtn", nounOptions, "noun");

const avatarBtn = document.querySelector(".avatarBtn");
avatarBtn.addEventListener("click", () => {
  fetch("https://api.dicebear.com/10.x/pixel-art/svg")
    .then((res) => res.text())
    .then((svg) => {
      currentAvatar = svg;
      avatarBtn.disabled = true;
      console.log(`${currentAdj} ${currentNoun} ${currentAvatar}`);
      checkAndReset();
    });
});
