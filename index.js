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

const generateAdj = document.querySelector(".adjBtn");
generateAdj.addEventListener("click", () => {
  currentAdj = generateSlug(1, {
    categories: adjOptions.categories,
    partsOfSpeech: adjOptions.partsOfSpeech,
  });
  console.log("Adjective:", currentAdj);
  console.log("Username:", `${currentAdj} ${currentNoun}`);
});
const generateNoun = document.querySelector(".nounBtn");
generateNoun.addEventListener("click", () => {
  currentNoun = generateSlug(1, {
    categories: nounOptions.categories,
    partsOfSpeech: nounOptions.partsOfSpeech,
  });
  console.log("Noun:", currentNoun);
  console.log("Username:", `${currentAdj} ${currentNoun}`);
});
