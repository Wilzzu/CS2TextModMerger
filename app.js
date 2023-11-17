const { dialog } = require("@electron/remote");
const fs = require("fs");
const path = require("path");
const rootPath = require("electron-root-path").rootPath;

let paths = { lang: null, custom: null };

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
	element.style.opacity = "100%";
};

const removeBracks = (data) => {
	const first = data.lastIndexOf("}");
	const second = data.lastIndexOf("}", first - 1);

	return [first, second];
};

const mergeFiles = () => {
	changeStatus([0, "Tehdään taikoja..."]);
	// Load custom file
	const custom = fs.readFileSync(paths.custom, "utf-8", (err) => {
		if (err) {
			console.error(err);
			changeStatus([2, "Joku bugi"]);
			return;
		}
	});

	// Load destination file and merge the custom file content to it
	fs.readFile(paths.lang, "utf-8", (err, data) => {
		if (err) {
			console.error(err);
			changeStatus([2, "Joku bugi"]);
			return;
		}

		// Find last two curly bracket indexes and delete both of them
		let indexes = removeBracks(data);
		const originalWithBracksRemoved =
			data.substring(0, indexes[1]) + data.substring(indexes[0] + 1);

		// Merge both files and add last two brackets
		const merged = originalWithBracksRemoved + custom + "\n}}";

		// Overwrite the original file
		fs.writeFile(paths.lang, merged, "utf8", (err) => {
			if (err) {
				console.error(err);
				changeStatus([2, "Joku bugi"]);
				return;
			}

			changeStatus([1, "Uusi tiedosto luotu onnistuneesti! Voit nyt sulkea tämän ohjelman."]);
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
const getLocation = async (type) => {
	let defaultPath = path.join(
		process.env["ProgramFiles(x86)"],
		"Steam\\steamapps\\common\\Counter-Strike Global Offensive\\game\\csgo\\resource"
	);

	let ownPath = path.dirname(rootPath);
	if (type === "Oma") defaultPath = ownPath;

	return dialog
		.showOpenDialog({
			defaultPath,
			buttonLabel: `Valitse ${type} tiedosto`,
			filters: [
				{ name: "Text Files", extensions: ["txt"] },
				{ name: "All Files", extensions: ["*"] },
			],
		})
		.then((res) => res);
};

// Let user select a file and store the path to a variable
const selectFile = async (type, text) => {
	const location = await getLocation(text);
	if (location.canceled) return;
	paths[type] = location.filePaths[0];
	updateElements(type);
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
