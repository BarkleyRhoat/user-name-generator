import { generateSlug } from "https://esm.sh/random-word-slugs@0.1.7";
import { adjOptions, nounOptions, myApi } from "./config.js";

let currentAdj = "";
let currentNoun = "";
let currentAvatar = "";

const adjBtn = document.querySelector(".adjBtn");
const nounBtn = document.querySelector(".nounBtn");
const avatarBtn = document.querySelector(".avatarBtn");
const resultsContainer = document.getElementById("results");
const savedContainer = document.getElementById("savedResults");

function fetchUsername() {
  return fetch(myApi)
    .then((res) => res.json());
}

function saveUsername(adj, noun, avatar) {
  return fetch(myApi, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      adjective: adj,
      noun: noun,
      avatar: avatar,
      fullName: `${adj}${noun}`,
    })
  })
    .then((res) => res.json());
}

function deleteUsername(id) {
	return fetch(`${myApi}/${id}`, {
		method: "DELETE",
	});
}

function entryElement(adj, noun, avatar) {
	const entryDiv = document.createElement("div");
	entryDiv.textContent = `${adj}${noun}`;
	entryDiv.insertAdjacentHTML("beforeend", avatar);

	const svg = entryDiv.querySelector("svg");
	svg.addEventListener("mouseover", () => {
		const preview = document.createElement("div");
		preview.classList.add("avatar-preview");
		preview.appendChild(svg.cloneNode(true));
		document.body.appendChild(preview);
	});
	svg.addEventListener("mouseout", () => {
		const preview = document.querySelector(".avatar-preview");
		if (preview) preview.remove();
  });
  
	return entryDiv;
}

function addSaved(adj, noun, avatar, id) {
  const savedDiv = entryElement(adj, noun, avatar);

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.addEventListener("click", () => {
    deleteUsername(id)
      .then(() => savedDiv.remove());
  })
  savedDiv.appendChild(deleteBtn);
  savedContainer.appendChild(savedDiv)
}

function checkAndReset() {
  if (currentAdj && currentNoun && currentAvatar) {
    
		const adj = currentAdj;
		const noun = currentNoun;
		const avatar = currentAvatar;

		const previewEntry = entryElement(adj, noun, avatar);
		previewEntry.addEventListener("click", () => {
				saveUsername(adj, noun, avatar).then((data) => {
					addSaved(adj, noun, avatar, data.id);
				});
			},
			{ once: true },
		);

		resultsContainer.appendChild(previewEntry);
		reset();
	}
}

function reset() {
	currentAdj = "";
	currentNoun = "";
	currentAvatar = "";
	adjBtn.disabled = false;
	nounBtn.disabled = false;
	avatarBtn.disabled = false;
}

function generateWord(btn, options, type) {
	btn.addEventListener("click", () => {
		const word = generateSlug(1, {
			categories: options.categories,
			partsOfSpeech: options.partsOfSpeech,
		});
		if (type === "adjective") {
			currentAdj = word;
		} else if (type === "noun") {
			currentNoun = word.slice(0, 1).toUpperCase() + word.slice(1);
		}
		btn.disabled = true;
		checkAndReset();
	});
}
generateWord(adjBtn, adjOptions, "adjective");
generateWord(nounBtn, nounOptions, "noun");

avatarBtn.addEventListener("click", () => {
	fetch(
		`https://api.dicebear.com/10.x/notionists-neutral/svg?seed=${Math.random()}`,
	)
		.then((res) => res.text())
		.then((svg) => {
			currentAvatar = svg;
			avatarBtn.disabled = true;
			checkAndReset();
		});
});

fetchUsername().then((usernames) => {
	usernames.forEach(({ adjective, noun, avatar, id }) => {
		addSaved(adjective, noun, avatar, id);
	});
});

