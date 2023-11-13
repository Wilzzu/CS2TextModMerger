const { dialog } = require("@electron/remote");
const path = require("path");

let paths = { lang: null, custom: null };

function showNotification(title, body) {
	new Notification({ title, body }).show();
}

const mergeFiles = () => {
	console.log("Merge");
};

const updateElements = (type) => {
	// Update file name and change button text
	let element = document.getElementById(type + "Text");
	element.innerText = paths[type];
	element.scrollLeft = element.scrollWidth;
	element.scrollLeft = element.scrollWidth;
	document.getElementById(type + "Btn").innerText = "Change";

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
	const defaultPath = path.join(
		process.env["ProgramFiles(x86)"],
		"Steam\\steamapps\\common\\Counter-Strike Global Offensive\\game\\csgo\\resource"
	);

	return dialog
		.showOpenDialog({
			defaultPath,
			buttonLabel: `Select ${type} File`,
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
	selectFile("lang", "Language");
});

document.getElementById("customBtn").addEventListener("click", () => {
	selectFile("custom", "Custom");
});

document.getElementById("mergeBtn").addEventListener("click", () => {
	mergeFiles();
});
