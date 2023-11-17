const { dialog } = require("@electron/remote");
const fs = require("fs");
const path = require("path");
const rootPath = require("electron-root-path").rootPath;

// Global variables
let paths = { lang: null, custom: null };
let originalFile;
let alreadyPatched = false;

// Audio players
const warningAudio = document.getElementById("audiowarn");
const successAudio = document.getElementById("audiosucc");
const bgAudio = document.getElementById("audiobg");

// Change status that is shown under the merge button
const changeStatus = (status) => {
	let color = "whitesmoke";
	const element = document.getElementById("status");
	element.innerText = status[1];

	switch (status[0]) {
		case 1:
			color = "#3fff25";
			document.getElementById("mergeBtn").disabled = true;
			break;
		case 2:
			color = "#ff4040";
			break;
	}

	element.style.color = color;
	if (status[0] === 9) element.style.opacity = "0%";
	else element.style.opacity = "100%";
};

const validateFile = async () => {
	// Load original file
	originalFile = fs.readFileSync(paths.lang, "utf-8", async (err) => {
		if (err) {
			console.error(err);
			changeStatus([2, "Joku bugi"]);
			return;
		}
	});

	// Check if the file was already modified
	if (originalFile.indexOf("//Patched by Wilzzu") > 0) {
		changeStatus([2, "Tiedosto on jo muutettu, jos muutat sen uudelleen se saattaa hajota!"]);
		alreadyPatched = true;
		warningAudio.play();
	} else changeStatus([9, "-"]);
};

const findBracks = (data) => {
	const first = data.lastIndexOf("}");
	const second = data.lastIndexOf("}", first - 1);

	return [first, second];
};

const mergeFiles = () => {
	if (alreadyPatched) {
		changeStatus([2, "Ootko nyt ihan varma bro?"]);
		alreadyPatched = false;
		warningAudio.play();
		return;
	}

	changeStatus([0, "Tehdään taikoja..."]);

	// Load custom file and merge it with the original
	fs.readFile(paths.custom, "utf-8", (err, data) => {
		if (err) {
			console.error(err);
			changeStatus([2, "Joku bugi"]);
			return;
		}

		// Find last two curly bracket indexes and delete both of them
		let indexes = findBracks(originalFile);
		const originalWithBracksRemoved =
			originalFile.substring(0, indexes[1]) + originalFile.substring(indexes[0] + 1);

		// Merge both files and add last two brackets
		const merged = originalWithBracksRemoved + data + "\n\n//Patched by Wilzzu\n}}";

		// Overwrite the original file
		fs.writeFile(paths.lang, merged, "utf8", (err) => {
			if (err) {
				console.error(err);
				changeStatus([2, "Joku bugi"]);
				return;
			}

			changeStatus([1, "Uusi tiedosto luotu! Voit nyt sulkea tämän ohjelman ja käynnistää CS2."]);
			alreadyPatched = true;
			successAudio.play();
		});
	});
};

const updateElements = (type) => {
	// Update file name and change button text
	let element = document.getElementById(type + "Text");
	element.innerText = paths[type];
	element.scrollLeft = element.scrollWidth;
	element.scrollLeft = element.scrollWidth;
	document.getElementById(type + "Btn").innerText = "Vaihda";

	// Enable merge button if both files are selected
	if (paths["lang"] && paths["custom"]) {
		document.querySelectorAll(".wave").forEach((e) => {
			e.classList.add("animateWave");
		});
		document.getElementById("mergeBtn").disabled = false;
	}
};

// Show file select dialog to user
const getLocation = async (type, text) => {
	let defaultPath = path.join(
		process.env["ProgramFiles(x86)"],
		"Steam\\steamapps\\common\\Counter-Strike Global Offensive\\game\\csgo\\resource"
	);

	let ownPath = path.dirname(path.dirname(path.dirname(path.dirname(rootPath))));
	if (type === "custom") defaultPath = ownPath;

	return dialog
		.showOpenDialog({
			defaultPath,
			buttonLabel: `Valitse ${text} tiedosto`,
			filters: [
				{ name: "Text Files", extensions: ["txt"] },
				{ name: "All Files", extensions: ["*"] },
			],
		})
		.then((res) => res);
};

// Let user select a file and store the path to a variable
const selectFile = async (type, text) => {
	const location = await getLocation(type, text);
	if (location.canceled) return;
	paths[type] = location.filePaths[0];
	updateElements(type);
	if (type === "lang") validateFile();
};

document.getElementById("langBtn").addEventListener("click", () => {
	selectFile("lang", "Alkuperäinen");
});

document.getElementById("customBtn").addEventListener("click", () => {
	selectFile("custom", "Oma");
});

document.getElementById("mergeBtn").addEventListener("click", () => {
	mergeFiles();
});

// Easter egg
let clicks = 0;
let playing = false;
document.getElementById("title").addEventListener("click", () => {
	clicks++;
	if (clicks >= 10) {
		if (playing) {
			bgAudio.pause();
			bgAudio.currentTime = 0;
			playing = false;
		} else {
			bgAudio.play();
			playing = true;
		}
		clicks = 0;
	}
});
