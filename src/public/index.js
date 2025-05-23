//region GLOBAL VARS
const version = "2.2.0_feat(undo)";
const build = "2505231701";
const git_branch = "dev"

//region DOM ELEMENTS
// const buttons_document = document.getElementsByClassName("document_action");
// const buttons_toggle = document.getElementsByClassName("document_toggle");


//region PTD SPECIFICATION INFO
const meta_info = {

	"documentTitle": "Unnamed",
	"ptdSPCVersion" : "002",
	"ptdFormatVersion" : "1.1",
	"ptdTypeVersion" : "alpha",

};

//region DOCUMENT INFO
const document_info = {
	"content" : ""
};

//region MENU DEFINITIONS
menus = {
	fileMenu: [
		{
			name: "New file",
			disable: false,
			action: function () {
				show_action(`

					<h3>New file</h3>
					<hr>
					<p>Are you sure?<br>Any unsaved change will be descarted...</p>
					<hr>
					<div class="option_html" onclick="location.reload()" >Yes</div>
					<div class="option_html" onclick="hide_action()" >Cancel</div>

				`, 1)
			},
		},
		{

			name: "Open file", disable: false, action: function () { load_file() }
		},
		{
			name: "Save file", disable: false, action: function () { save_file() }
		},
		{
			name: "hr"
		},
		{
			name: "Exit",
			disable: false,
			action: function () {
				location.href = "https://github.com/hppsrc";
			}
		}
	],
	editMenu: [
		{
			name: "Undo", disable: true, action: null
		},
		{
			name: "Redo", disable: true, action: null
		},
		{
			name: "Cut", disable: true, action: null
		},
		{
			name: "Copy", disable: true, action: null
		},
		{
			name: "Paste", disable: true, action: null
		},
	],
	settingsMenu: [
		{
			name: "Autosave time",
			disable: false,
			action: function() {
				show_action(`

					<h3>Autosave Settings</h3>
					<hr>
					<p>Set a custom autosave delay (seconds) if enabled</p>
					<input id="input" class="input" maxlength="60" placeholder="10" oninput="this.value=this.value.replace(/[^0-9]/g,'')" />
					<hr>
					<div class="option_html" onclick="
						const val = parseInt(document.getElementById('input').value, 10);
						if (!isNaN(val) && val > 0) {
							autosave_interval = val * 1000;
							localStorage.setItem('autosave_interval', val);
							autosave = true;
							localStorage.setItem('autosave', autosave);
							updateAutosaveUI();
							startAutosaveInterval();
							show_alert('Autosave was enabled.');
							hide_action();
						} else {
							show_alert(\`Can\'t set an invalid value.\`);
						}
					">Update</div>
					<div class="option_html" onclick="hide_action()" >Cancel</div>

				`, 1)
			}
		},
		{
			name: "Toggle dark mode",
			disable: false,
			action: function() {

				show_alert("Dark mode toggled.");

				if ( localStorage.getItem("set_darkMode") == 'true' ) {

					localStorage.setItem("set_darkMode", false);
					document.body.style.backgroundColor = "white";
					Array.from(document.body.children).forEach(child => {
						child.classList.remove('dark_mode');
					});

				} else {

					localStorage.setItem("set_darkMode", true);
					document.body.style.backgroundColor = "black";
					Array.from(document.body.children).forEach(child => {
						child.classList.add('dark_mode');
					});

				}

				overlay.classList.remove('dark_mode');

			}
		}
	],
	devMenu: [
		{
			name: `${version}`, disable: true, action: null
		},
		{
			name: `${build}`, disable: true, action: null
		},
		{
			name: `${git_branch}`, disable: true, action: null
		},
		{
			name: "hr"
		},
		{
			name: "Keep dev menu",
			disable: false,
			action: function () {
				localStorage.setItem("dev_keepDevMenu", true)
				show_alert("Developer menu will keep visible.")
			}
		},
		{
			name: "Hide dev menu",
			disable: false,
			action: function () {
				localStorage.removeItem("dev_keepDevMenu");
				show_alert("Developer menu will hide on next reload.")
			}
		},
		{
			name: "hr"
		},
		{
			name: "Try latest version",
			disable: true,
			// action: function () {
			// 	show_action(`
			// 		<h3>Load latest JS</h3>
			// 		<hr>
			// 		<p>Fetching latest version from GitHub...</p>
			// 	`, 1);

			// 	fetch('https://raw.githubusercontent.com/hppsrc/paragraph/refs/heads/dev/src/public/index.js')
			// 	.then(response => {
			// 		if (!response.ok) {
			// 			throw new Error('Network response was not ok');
			// 		}
			// 		return response.text();
			// 	})
			// 	.then(code => {
			// 		const newPageContent = `

			// 			<!DOCTYPE html>
			// 			<html>
			// 			<head>
			// 				<title>Paragraph - Latest Version</title>
			// 				<link rel="stylesheet" href="/style.css">
			// 			</head>
			// 			<body>
			// 				<script>${code}</script>
			// 				<script>
			// 					alert("You're using a new JS version that might not fully work as expected.\\nSome features may be unstable or incompatible.");
			// 				</script>
			// 			</body>
			// 			</html>

			// 		`;

			// 		const newTab = window.open('', '_blank');
			// 		newTab.document.write(newPageContent);
			// 		newTab.document.close();

			// 	})
			// 	.catch(error => {

			// 		console.error('Error:', error);
			// 		show_action(`
			// 			<h3>Load latest JS</h3>
			// 			<hr>
			// 			<p>Error loading latest version</p>
			// 			<b><small>Check console for details</small></b>
			// 			<hr>
			// 			<div class="option_html" onclick="hide_action()">Ok</div>
			// 		`, 1);

			// 	});
			// }
		},
		{
			name: "Reset data",
			disable: false,
			action: function () {
				show_action(`
					<h3>Reset Data</h3>
					<hr>
					<p>This will delete all saved data, including autosave and settings.<br>Are you sure?</p>
					<hr>
					<div class="option_html" onclick="
						localStorage.clear();
						show_alert('Local data deleted.'),
						hide_action();
					">Yes, reset</div>
					<div class="option_html" onclick="hide_action()">Cancel</div>
				`, 1);
			}
		},
		{
			name: "Custom local data",
			disable: false,
			action: function () {
				show_action(`
					<h3>Custom Local Data</h3>
					<hr>
					<p>Set or update a key/value in localStorage</p>
					<textarea id="customLocalDataKey" class="input" maxlength="50" placeholder="Key" /></textarea>
					<textarea id="customLocalDataValue" class="input" maxlength="500" placeholder="Value" /></textarea>
					<hr>
					<div class="option_html" onclick="
						const key = document.getElementById('customLocalDataKey').value;
						const value = document.getElementById('customLocalDataValue').value;
						if (key) {
							localStorage.setItem(key, value);
							show_alert('Local data \"value\" on \"key\" set.'),
						}
						hide_action();
					">Save</div>
					<div class="option_html" onclick="hide_action()">Cancel</div>
				`, 1);
			}
		},
		{
			name: "Log live array action",
			disable: false,
			action: function() {
				localStorage.setItem("dev_logLiveArrayAction", true)
				show_alert("Log live array action enabled, check console.")
			}
		},
		{
			name: "Custom alert box",
			disable: false,
			action: function () {
				show_action(`
					<h3>Custom alert box</h3>
					<hr>
					<p>Set an alert text</p>
					<textarea id="input" class="input" maxlength="50" placeholder="Hello world" /></textarea>
					<hr>
					<div class="option_html" onclick="
						const input = document.getElementById('input').value;
						show_alert(input);
						hide_action();
					">Call</div>
					<div class="option_html" onclick="hide_action()">Cancel</div>
				`, 1);

			}
		},
		{
			name: "Allow user-select",
			disable: false,
			action: function () {
				show_alert("User-select enabled.");
				document.querySelectorAll('*').forEach(e => {
					e.style.userSelect = 'auto';
				})
			}
		},
		{
			name: "Dump localStorage",
			disable: false,
			action: function () {
				let dump = '';
				for (let i = 0; i < localStorage.length; i++) {
					const key = localStorage.key(i);
					dump += `${key}: ${localStorage.getItem(key)}\n`;
				}
				show_action(`
					<h3>localStorage Dump</h3>
					<hr>
					<pre style="max-height: 300px; overflow-y: auto;">${dump}</pre>
					<hr>
					<div class="option_html" onclick="hide_action()">Close</div>
				`, 1);
			}
		},
		{
			name: "Submenu Test",
			disable: false,
			submenu: ["value"]
		},
		{
			name: "hr"
		},
		{
			name: "Show text actions",
			disable: false,
			action: function () {
				header_top_bar_actions_do.style.display = "flex";
			}
		},
		{
			name: "Show fake dom",
			disable: false,
			action: function() {
				document.getElementById("sheet-style").style.display = "flex";
			}
		},
	],
	helpMenu: [
		{
			name: "Welcome",
			disable: false,
			action: function () {
				sheet.value = `Hi!

Thank you for using paragraph!

Paragraph is currently a simple project, but I plan to expand its features in the future.

Enable "Dev tools" at "Help > About".

- Hppsrc`;
			}
		},
		{
			name: "News", disable: false, action: function () { show_news() }
		},
		{
			name: "hr"
		},
		{
			name: "About",
			disable: false,
			action: function () {
				show_action(`

					<h3>About Paragraph</h3>
					<hr>
					<p>Paragraph is a simple word proccesor made on JavaScript.</p>
					<b><small> Version: ${version}</small></b>
					<hr>

					<div class="option_html" onclick="

						hide_action();
						window.open('https://github.com/hppsrc/paragraph', '_blank').focus();

					">Check Github Repository
					</div>

					<div class="option_html" onclick="

						hide_action();
						enable_para_dev();

					" >Enabled dev tools</div>

					<div class="option_html" onclick="hide_action()" >Cancel</div>

				`,1)
			}
		},
	]
};

// menus_extra = {
// 	font: ["serif", "sans-serif", "monospace", "cursive", "fantasy"],
// };

//region FUNCTIONS
function show_action(valueArg, action) {

	action_box.classList.remove("float");

	if (localStorage.getItem("set_darkMode") == 'true') {
		action_box.classList.add("dark_mode");
	}

	if (action == 0) {

		action_box.innerHTML = "";

		let current = valueArg.textContent.toLowerCase() + "Menu";
		let values = menus[current];

		const rect = valueArg.getBoundingClientRect();

		action_box.style.left = `${rect.x}px`;
		action_box.style.width = '150px';
		action_box.style.transform = 'translate(0%, 0%)';

		action_box.style.borderRadius = '0';
		action_box.style.borderBottomRightRadius = '10px';
		action_box.style.borderBottomLeftRadius = '10px';

		overlay.style.display = "block";

		setTimeout(() => { action_box.style.top = "50px"; }, 0);
		setTimeout(() => { overlay.style.opacity = "1"; }, 0);

		overlay.addEventListener("click", () => {
			hide_action();
		});

		values.forEach((item) => {

			let div = document.createElement("div");

			if (item.name == "hr") {
				div.classList += " hr"
			} else {

				div.textContent = item.name;

				if (item.disable) {
					div.classList.add("disabled");
					div.style.color = "#777";
				} else {
					div.addEventListener("click", () => {
						hide_action();
						item.action();
					});
				}

			}

			if (Array.isArray(item.submenu)) {

				div.addEventListener('mouseover', function() {

					action_box.style.width = "300px";

				})

				div.addEventListener('mouseout', function() {

					action_box.style.width = "150px";

				})

			}

			action_box.appendChild(div);

		});

	} else {

		hide_action();

		setTimeout(() => {

			action_box.innerHTML = valueArg;
			action_box.classList.add("float");

			setTimeout(() => { action_box.style.left = "50%"; }, 0);

			overlay.style.display = "block";
			action_box.style.width = '300px';

			setTimeout(() => { action_box.style.top = "50%"; }, 0);
			setTimeout(() => { action_box.style.left = "50%"; }, 0);
			setTimeout(() => { overlay.style.opacity = "1"; }, 0);
			action_box.style.transform = 'translate(-50%, -50%)';

			action_box.style.borderBottomRightRadius = '0px';
			action_box.style.borderBottomLeftRadius = '0px';
			action_box.style.borderRadius = '10px';

			overlay.addEventListener("click", () => {
				hide_action();
			});

		}, 150);

	}

}

let alertTimeout = null;
function show_alert(value) {

	if (alertTimeout) {
		clearTimeout(alertTimeout);
		alert_box.style.top = "120vh";
	}

	alert_box.textContent = value;
	alert_box.style.top = "90vh";

	alert_box.style.width =  value.length * 0.5 + 'em';

	alertTimeout = setTimeout(() => {
		alert_box.style.top = "120vh";
	}, 3000);

}

function show_news() {

	show_action(`

		<h3>News</h3>
		<hr>
		<h2>+1k Lines of code!</h2>
		<hr>
		<b><p>${version}</p></b>
        <small>- Added Edit options.</small>
        <small>- Added Dark mode.</small>
		<hr>
        <small>- Added Alert box.</small>
        <small>- Added extra dev options.</small>
		<hr>
		<div class="option_html" onclick="

			hide_action();
			window.open('https://github.com/hppsrc/paragraph/commits/main', '_blank').focus();

		">Check last commit on repo!
		</div>
		<div class="option_html" onclick="hide_action()" >Ok!</div>

	`,1)

}

function save_file() {

	if ( sheet.value != '' ) {

		show_alert("Preparing download.");

		document_info.content = sheet.value

		fetch('/api/file_download', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ meta_info: meta_info, document_info: document_info })
		})
		.then(response => {
			if (!response.ok) {
				throw new Error(`Error: ${response.status}`);
			}
			return response.blob();
		})
		.then(blob => {

			const url = URL.createObjectURL(blob);
			const a = document.createElement('a');

			a.href = url;
			a.download = meta_info.documentTitle + ".ptd";
			document.body.appendChild(a);
			a.click();
			document.body.removeChild(a);

			URL.revokeObjectURL(url);

			show_alert("Starting download.");

		})
		.catch(error => {

			hide_action();

			show_action(`
				<h3>Save file</h3>
				<hr>
				<p>Server error.</p>
				<b><small>Details on console.</small></b>
			`,1)

			console.error('Error:', error);

		});

	} else {

		show_action(`
			<h3>Save file</h3>
			<hr>
			<p>File is empty.</p>
			<hr>
			<div class="option_html" onclick="hide_action()" >Cancel</div>
		`,1)

	}

}

function load_file(confirm) {

	if ( sheet.value != '' && confirm != 1 ) {

		show_action(`

			<h3>Open file</h3>
			<hr>
			<p>Are you sure?<br>Any unsaved change will be discarded...</p>
			<hr>
			<div class="option_html" onclick="hide_action();load_file(1);" >Yes</div>
			<div class="option_html" onclick="hide_action();return;" >Cancel</div>

		`,1)

	} else {

		const fileInput = document.getElementById('fileInput');
		fileInput.type = "file";
		fileInput.accept = ".ptd";
		fileInput.click();

		fileInput.addEventListener("change", function(e) {

			const file = e.target.files[0];

			if (file) {

				if (!file.name.toLowerCase().endsWith('.ptd')) {

					show_action(`
						<h3>Open file</h3>
						<hr>
						<p>Only .ptd files are supported.</p>
						<hr>
						<div class="option_html" onclick="hide_action()" >Ok</div>
					`, 1);

					return;

				} else {

					const reader = new FileReader();

					reader.readAsArrayBuffer(file);

					reader.onload = function(e) {

						sheet.value = "";

						const fileContent = e.target.result;

						fetch('/api/file_reader', {
							method: 'POST',
							headers: {
								'Content-Type': 'application/octet-stream',
							},
							body: fileContent
						})
						.then(response => {
							if (!response.ok) {
								throw new Error(`Error: ${response.status}`);
							}
							return response.json();
						})
						.then(data => {

							sheet.value = data.document_info.content;
							meta_info.documentTitle = data.meta_info.documentTitle;
							header_top_bar_status_name.textContent = 'Name: ' + (meta_info.documentTitle).slice(0,8).concat('...');

							hide_action();

						})
						.catch(error => {

							show_action(`
								<h3>Open file</h3>
								<hr>
								<p>Server error.</p>
								<b><small>Details on console.</small></b>
							`,1)

							console.error('Error:', error);

						});

					};

				}

			}

		});

	}

}

function enable_para_dev() {
	show_alert("Developer options enabled. Reload to disable.");
	document.getElementById("header_top_bar_actions_select_devm").style.display = "block";
}

function hide_action() {

	setTimeout(() => { overlay.style.opacity = '0'; }, 0);
	setTimeout(() => { overlay.style.display = 'none'; }, 100);
	setTimeout(() => { action_box.style.top = '-500px'; }, 0);

}

function updateAutosaveUI() {
    header_top_bar_status_save.textContent = 'Autosave ' + (autosave ? 'enabled' : 'disabled');
}

function toggleAutosave() {
    autosave = !autosave;
    localStorage.setItem("autosave", autosave);
	show_alert(header_top_bar_status_save.textContent+".");
    updateAutosaveUI();
}

//region ACTION_WRAPPER
// * set file name
// * toggle autosave
// * set fila name error
// * autosave value error
function wrapper_action(arg) {

	if (arg == 1) {

		show_action(`
			<h3>Set new file name</h3>
			<hr>
			<p>Current name: ${meta_info.documentTitle}</p>
			<textarea id="input" class="input" maxlength="30" placeholder="Type your text here..." ></textarea>
			<hr>
			<div class="option_html" onclick="
				if ( input.value != '' ) {
					meta_info.documentTitle = input.value;
					header_top_bar_status_name.title = meta_info.documentTitle;
					header_top_bar_status_name.textContent = 'Name: ' + (meta_info.documentTitle).slice(0,8).concat('...');
					hide_action();
				} else {
					show_alert(\`Can\'t set a empty name.\`);
				}
			" >Rename</div>
			<div class="option_html" onclick="hide_action()" >Cancel</div>
		`,1)

	}

}

//region AUTOSAVE
let autosave;
let autosave_interval = 1000;
let autosaveIntervalId = null;
const savedAutosave = localStorage.getItem("autosave");
if (savedAutosave !== null) {
	autosave = savedAutosave === 'true';
	autosave_interval = localStorage.getItem('autosave_interval') * 1000;
}
function startAutosaveInterval() {

	localStorage.setItem("autosave_data", "true");
	localStorage.setItem("autosave_data_title", meta_info.documentTitle);
	localStorage.setItem("autosave_data_content", sheet.value);

    if (autosaveIntervalId) {
        clearInterval(autosaveIntervalId);
    }

    autosaveIntervalId = setInterval(() => {
        if (autosave) {
            localStorage.setItem("autosave_data", "true");
            localStorage.setItem("autosave_data_title", meta_info.documentTitle);
            localStorage.setItem("autosave_data_content", sheet.value);
        } else {
            localStorage.removeItem("autosave_data");
        }
    }, autosave_interval);

}

//region HEADER CONSTRUCTIOR
const header = document.createElement("header");
header.classList = "glow f_row";
header.innerHTML = `

	<input type="file" id="fileInput" style="display: none;" accept=".txt">

	<h1 onclick="console.log('Para :)')">Pg</h1>

	<vr></vr>

	<div class="f_col" id="header_top_bar_status">

		<p id="header_top_bar_status_name" onclick="wrapper_action(1)" >Name: ${(meta_info.documentTitle).slice(0,10).concat("...")}</p>
		<p id="header_top_bar_status_save" onclick="toggleAutosave();" >Autosave disabled</p>

	</div>

	<vr></vr>

	<div id="header_top_bar_actions">

		<div id="header_top_bar_actions_select">

			<p id="header_top_bar_actions_select_file" class="action" onclick="show_action(this, 0);">File</p>
			<p id="header_top_bar_actions_select_edit" class="action" onclick="show_action(this, 0);">Edit</p>
			<p id="header_top_bar_actions_select_stng" class="action" onclick="show_action(this, 0);">Settings</p>
			<p id="header_top_bar_actions_select_devm" class="action" onclick="show_action(this, 0);">Dev</p>
			<p id="header_top_bar_actions_select_help" class="action" onclick="show_action(this, 0);">Help</p>

		</div>

		<div id="header_top_bar_actions_do">

			<div class="document_action" onclick="show_action(this, 1)" id="action_setfont"><p> Font: <span style="font-family: Serif"> Serif </span> </p> </div>
			<div class="document_action" onclick="show_action(this, 1)" id="action_setsize"><p> Size: 12px </p> </div>
			<div class="document_action" onclick="show_action(this, 1)" onclick="show_action(this, 0)" id="action_setcolorfont"><p> Font <br> </p><div id="action_setcolorfont_box"> </div> </div>
			<div class="document_action" onclick="show_action(this, 1)" id="action_setcolorback"><p> Back <br> </p><div id="action_setcolorback_box"> </div> </div>
			<div class="document_action" id="action_black"><b> N </b> </div>
			<div class="document_action" id="action_italic"><i> K </i> </div>
			<div class="document_action" id="action_underline"><span style="text-decoration: underline;"> U </span> </div>

		</div>

	</div>

`;

//region SHEET CONSTRUCTOR
const main = document.createElement("main");
main.innerHTML = `

	<div id="sheet-style" contenteditable="true"> Text </div>
	<textarea id="sheet" placeholder="Type your text here..." ></textarea>

`;

//region ALERTS CONSTRUCTORS
// ? drop context menu and modal
const action_box = document.createElement("div");
action_box.id = "action_box";
// ? alert box
const alert_box = document.createElement("div");
alert_box.id = "alert_box";
alert_box.title = "Click to close.";
alert_box.addEventListener('click', function () {
	alert_box.style.top = "120vh";
});

//region OVERLAY CONSTRUCTOR
const overlay = document.createElement("div");
overlay.id = "overlay";

//region WEBPAGE CONSTRUCTOR
document.body.appendChild(overlay);
document.body.appendChild(action_box);
document.body.appendChild(alert_box);
document.body.appendChild(header);
document.body.appendChild(main);

//region AFTER DOM LOAD ACTIONS
let sheet;

document.addEventListener("DOMContentLoaded", () => {

	// * sheet selector
	sheet = document.getElementById("sheet");

	// * file input
	let fileInput = document.getElementById('fileInput');

	// * UI/UX warning
	if (window.innerWidth < 768) {
		alert("This page is not designed for small screens. Proper UI/UX is not guaranteed, please wait for a future update!");
	}

	// * Darkmode
	if (localStorage.getItem("set_darkMode") == 'true') {

		document.body.style.backgroundColor = "black";
		Array.from(document.body.children).forEach(child => {
			child.classList.add('dark_mode');
		});
		overlay.classList.remove('dark_mode');

	}

	// * Autosave
	if (localStorage.getItem("autosave_data") != null) {

		const val_temp = [
			localStorage.getItem('autosave_data_title'),
			localStorage.getItem('autosave_data_content')
		];

		show_action(`

			<h3>Autosave data</h3>
			<hr>
			<p>Autosaved data found, do you want to restore it?</p>
			<hr>

			<div class="option_html" onclick="

				hide_action();
				header_top_bar_status_name.textContent = \`Name: ${val_temp[0].slice(0,10).concat("...")}\`;
				header_top_bar_status_name.title = \`${val_temp[0]}\`;
				meta_info.documentTitle = \`${val_temp[0]}\`;
				sheet.value = \`${val_temp[1]}\`;

			">Yes</div>

			<div class="option_html" onclick="

				hide_action();
				localStorage.removeItem('autosave_data');
				autosave = false;
				localStorage.setItem('autosave', false);
				updateAutosaveUI();

			">Nah, also disable autosave.</div>

		`, 1)

	}
  	updateAutosaveUI();
    startAutosaveInterval();

	// * operation check
	let currentAction = "";
	let actionCounter = 0;
	let actionArray = [];
	let actionList = [];
	document.addEventListener('keydown', function(e) {
		let newAction = '';

		if (document.activeElement === sheet) {

			if (e.key === 'Shift' || e.key === 'Control' || e.key === 'Tab' ||
				e.key === 'Escape' || e.key === 'Alt' ||
				e.key.match('/F\d{1,2}\b/g') || e.ctrlKey || e.altKey) {
				return;
			}

			if (/^[a-zA-Z0-9 !"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]$/.test(e.key)) {
				currentAction = "pkey";
				actionArray.push(e.key);
				actionCounter++;
			} else if (e.key === "Backspace") {
				currentAction = "back";
				actionCounter++;
			} else if (e.key === "Enter") {
				currentAction = "entr";
				actionArray.push("\n");
				actionCounter++;
			}



			// ! DEV OPTION
			if (localStorage.getItem("dev_logLiveArrayAction") != null) {
				console.clear();
				console.log('Action:', currentAction);
				console.log('Counter:', actionCounter);
				console.log('Array:', actionArray);
			}

		}

	});

	// ! DEV OPTION
	if (localStorage.getItem("dev_keepDevMenu") != null) {
		document.getElementById("header_top_bar_actions_select_devm").style.display = "block";
	}

	// * show news
	if (localStorage.getItem("build") != build) {
		localStorage.setItem("build", build);
		show_news();
	}

})
