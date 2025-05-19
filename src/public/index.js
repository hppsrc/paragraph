//region GLOBAL VARS
const version = "2.0.0";
const build = "2505191801";
const git_branch = "main"

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
				location.href = "https://github.com/hppsrc"
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
					<input id="input" maxlength="60" placeholder="10" oninput="this.value=this.value.replace(/[^0-9]/g,'')" />
					<hr>
					<div class="option_html" onclick="
						const val = parseInt(document.getElementById('input').value, 10);
						if (!isNaN(val) && val > 0) {
							autosave_interval = val * 1000;
							localStorage.setItem('autosave_interval', val);
							startAutosaveInterval();
							hide_action();
						} else {
							wrapper_action(4)
						}
					">Update</div>
					<div class="option_html" onclick="hide_action()" >Cancel</div>

				`, 1)
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
			}
		},
		{
			name: "Hide dev menu",
			disable: false,
			action: function () {
				localStorage.removeItem("dev_keepDevMenu");
			}
		},
		{
			name: "hr"
		},
		{
			name: "useful actions",
			disable: true,
			action: null
		},
		{
			name: "Try latest version",
			disable: false,
			action: function () {
				show_action(`
					<h3>Load latest JS</h3>
					<hr>
					<p>Fetching latest version from GitHub...</p>
				`, 1);

				fetch('https://raw.githubusercontent.com/hppsrc/paragraph/refs/heads/dev/src/public/index.js')
				.then(response => {
					if (!response.ok) {
						throw new Error('Network response was not ok');
					}
					return response.text();
				})
				.then(code => {
					const newPageContent = `

						<!DOCTYPE html>
						<html>
						<head>
							<title>Paragraph - Latest Version</title>
							<link rel="stylesheet" href="/style.css">
						</head>
						<body>
							<script>${code}</script>
							<script>
								alert("You're using a new JS version that might not fully work as expected.\\nSome features may be unstable or incompatible.");
							</script>
						</body>
						</html>

					`;

					const newTab = window.open('', '_blank');
					newTab.document.write(newPageContent);
					newTab.document.close();

				})
				.catch(error => {

					console.error('Error:', error);
					show_action(`
						<h3>Load latest JS</h3>
						<hr>
						<p>Error loading latest version</p>
						<b><small>Check console for details</small></b>
						<hr>
						<div class="option_html" onclick="hide_action()">Ok</div>
					`, 1);

				});
			}
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
						hide_action();
					">Yes, reset</div>
					<div class="option_html" onclick="hide_action()">Cancel</div>
				`, 1);
			}
		},
		{
			name: "Dark mode test",
			disable: false,
			action: function() {
				document.body.style.backgroundColor = "black";
				Array.from(document.body.children).forEach(child => {
					child.classList.add('dark_mode');
				});
			}
		},
		{
			name: "hr"
		},
		{
			name: "unuseful actions",
			disable: true,
			action: null
		},
		{
			name: "Show edit menu",
			disable: false,
			action: function () {
				header_top_bar_actions_select_edit.style.display = "flex";
			}
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

	if (action == 0) {

		action_box.innerHTML = "";
		action_box.classList = "";

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
			action_box.appendChild(div);
		});

	} else {

		hide_action();

		setTimeout(() => {

			action_box.innerHTML = valueArg;
			action_box.classList = "float";

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

function show_news() {
	show_action(`
		<h3>News</h3>
		<hr>
		<b><p>${version}</p></b>
		<small>- Generation and processing of .ptd file.</small>
		<small>- Added file open and save.</small>
		<small>- Added autosave.</small>
		<hr>
		<small>- Mayor server side changes.</small>
		<small>- Code clean up.</small>
		<small>- UI enhancements.</small>
		<small>- Added Dev options.</small>
		<small>-
			<a href="https://github.com/hppsrc/paragraph/commits/main" target="_blank" style="color: #007bff; text-decoration: underline;">
				Check last commit on repo!
			</a>
		</small>
		<hr>
		<div class="option_html" onclick="hide_action()" >Ok!</div>
	`,1)
}

function save_file() {

	if ( sheet.value != '' ) {

		show_action(`
			<h3>Save file</h3>
			<hr>
			<p>Preparing download.</p>
		`,1)

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

			setTimeout(() => {
				hide_action();
			}, 250);

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

		show_action(`
		<h3>Open file</h3>
		<hr>
		<p>Loading file...</p>

		`,1)

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

							hide_action();

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

		})

	}

}

function enable_para_dev() {
	document.getElementById("header_top_bar_actions_select_devm").style.display = "block";
	show_action(`
		<h3>Developer options enabled</h3>
		<hr>
		<p>Reload to disable.</p>
		<hr>
		<div class="option_html" onclick="hide_action();" >Ok!</div>
	`,1)
}

function hide_action() {
	setTimeout(() => { overlay.style.opacity = '0'; }, 0);
	setTimeout(() => { overlay.style.display = 'none'; }, 100);
	setTimeout(() => { action_box.style.top = '-500px'; }, 0);
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
			<textarea id="input" maxlength="30" placeholder="Type your text here..." ></textarea>
			<hr>
			<div class="option_html" onclick="
				hide_action();
				if ( input.value != '' ) {
					meta_info.documentTitle = input.value;
					header_top_bar_status_name.title = meta_info.documentTitle;
					header_top_bar_status_name.textContent = 'Name: ' + (meta_info.documentTitle).slice(0,8).concat('...')
				} else {
					wrapper_action(3)
				}
			" >Rename</div>
			<div class="option_html" onclick="hide_action()" >Cancel</div>
		`,1)
	} else if (arg == 2) {
		toggleAutosave();
	} else if (arg == 3) {
		show_action(`
			<h3>Set new file name</h3>
			<hr>
			<p>Can't set a empty name.</p>
			<hr>
			<div class="option_html" onclick="hide_action();" >Ok!</div>
		`,1)
	} else if (arg == 4 ) {
		show_action(`
			<h3>Autosave Settings</h3>
			<hr>
			<p>Can't set an invalid value.</p>
			<hr>
			<div class="option_html" onclick="hide_action();" >Ok!</div>
		`,1)
	}
}

function updateAutosaveUI() {
    header_top_bar_status_save.textContent = 'Autosave ' + (autosave ? 'enabled' : 'disabled');
}

function toggleAutosave() {
    autosave = !autosave;
    localStorage.setItem("autosave", autosave);
    updateAutosaveUI();
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


//region LOCALSTORAGE
if (localStorage.getItem("build") != build) {
	localStorage.setItem("build", build);
	show_news();
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
		<p id="header_top_bar_status_save" onclick="wrapper_action(2)" >Autosave disabled</p>

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

//region ACTION_BOX CONSTRUCTOR
// ? drop context menu
const action_box = document.createElement("div");
action_box.id = "action_box";

//region OVERLAY CONSTRUCTOR
const overlay = document.createElement("div");
overlay.id = "overlay";

//region WEBPAGE CONSTRUCTOR
document.body.appendChild(action_box);
document.body.appendChild(overlay);
document.body.appendChild(header);
document.body.appendChild(main);

//region AFTER DOM LOAD ACTIONS
let sheet;

document.addEventListener("DOMContentLoaded", () => {

	sheet = document.getElementById("sheet");

	let fileInput = document.getElementById('fileInput');

	if (window.innerWidth < 768) {

		alert("This page is not designed for small screens. Proper UI/UX is not guaranteed, please wait for a future update!");

	}

    updateAutosaveUI();

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

    startAutosaveInterval();

	// ! DEV OPTION
	if (localStorage.getItem("dev_keepDevMenu") != null) {
		document.getElementById("header_top_bar_actions_select_devm").style.display = "block";
	}

})
