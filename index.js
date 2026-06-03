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

const adjBtn = document.querySelector(".adjBtn")
const nounBtn = document.querySelector('.nounBtn')
const avatarBtn = document.querySelector('.avatarBtn')

function entryElement(adj, noun, avatar, onDelete) {
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

function checkAndReset() {
	if (currentAdj && currentNoun && currentAvatar) {
		const resultsContainer = document.getElementById("results");
		const savedContainer = document.getElementById("savedResults");
		const savedAdj = currentAdj;
		const savedNoun = currentNoun;
		const savedAvatar = currentAvatar;
		const entryDiv = entryElement(savedAdj, savedNoun, savedAvatar);
		entryDiv.addEventListener("click", (e) => {
			const savedDiv = entryElement(savedAdj, savedNoun, savedAvatar);
			savedContainer.appendChild(savedDiv);

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

		resultsContainer.appendChild(entryDiv);
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
			const savedDiv = entryElement(
				username.adjective,
				username.noun,
				username.avatar,
			);
			savedContainer.appendChild(savedDiv);
		});
	});
