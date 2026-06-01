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

function generateWord(btn, options, type) { 
  document.querySelector(btn).addEventListener("click", () => {
    const word = generateSlug(1, {
      categories: options.categories,
      partsOfSpeech: options.partsOfSpeech,
    })

    if (type === "adjective") {
      currentAdj = word;
    } else if (type === 'noun') {
      currentNoun = word;
    }
    console.log("Username:", `${currentAdj} ${currentNoun}`);
  })
}
generateWord(".adjBtn", adjOptions, 'adjective');
generateWord(".nounBtn", nounOptions, 'noun');

