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

function entryElement(adj, noun, avatar) {
	const entryP = document.createElement("p");
	entryP.textContent = `${adj}${noun}`;
	entryP.insertAdjacentHTML("beforeend", avatar);

	const svg = entryP.querySelector("svg");
	svg.addEventListener("mouseover", () => {
		const preview = document.createElement("div");
		preview.classList.add("avatar-preview");
		preview.innerHTML = svg.outerHTML;
		document.body.appendChild(preview);
	});
	svg.addEventListener("mouseout", () => {
		const preview = document.querySelector(".avatar-preview");
		if (preview) preview.remove();
	});
	return entryP;
}

function checkAndReset() {
	if (currentAdj && currentNoun && currentAvatar) {
		const resultsContainer = document.getElementById("results");
		const savedContainer = document.getElementById("savedResults");
		const savedAdj = currentAdj;
		const savedNoun = currentNoun;
		const savedAvatar = currentAvatar;
		const entryP = entryElement(savedAdj, savedNoun, savedAvatar);
		entryP.addEventListener("click", (e) => {
			const savedP = entryElement(savedAdj, savedNoun, savedAvatar);
			savedContainer.appendChild(savedP);

			if (!usernameEntries.some((entry) => entry.adjective + entry.noun === `${savedAdj}${savedNoun}`)) {
				usernameEntries.push({
					adjective: savedAdj,
					noun: savedNoun,
					avatar: savedAvatar,
				})
					fetch("http://localhost:3000/usernames", {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({
							adjective: savedAdj,
							noun: savedNoun,
							avatar: savedAvatar,
							fullName: `${savedAdj}${savedNoun}`,
						}),
					})
						.then((res) => res.json())
						.then((data) => console.log("Saved:", data));
				}
			},
			{ once: true },
		);

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
	fetch(
		`https://api.dicebear.com/10.x/adventurer-neutral/svg?seed=${Math.random()}`,
	)
		.then((res) => res.text())
		.then((svg) => {
			currentAvatar = svg;
			avatarBtn.disabled = true;
			checkAndReset();
		});
});

fetch("http://localhost:3000/usernames")
	.then((res) => res.json())
	.then((usernames) => {
		const savedContainer = document.getElementById("savedResults");
		usernames.forEach((username) => {
			const savedP = entryElement(
				username.adjective,
				username.noun,
				username.avatar,
			);
			savedContainer.appendChild(savedP);
		});
	});
