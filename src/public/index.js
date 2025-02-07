// TODO TOGGLE DARK MODE

const version = "1.1.0-alpha";
const build = "250207161";
const git_branch = "dev";

// vars
const buttons_document = document.getElementsByClassName("document_action");
const buttons_toggle = document.getElementsByClassName("document_toggle");

// PTD SPECIFICATION 070225_001
const meta_info = {

	"documentTitle": "Unnamed",
	"ptdFormatVersion" : "1.0",
	"ptdTypeVersion" : "alpha",

};
const document_info = [];
const saved = false;

// definitions
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
			name: "Open file", disable: false, action: function () { fileInput.click() }
		},
		{
			name: "Save file", disable: false, action: function () { save_file() }
		},
		// {
		// 	name: "Export",
		// 	disable: true,
		// 	action: null,
		// },
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
	helpMenu: [
		{
			name: "Welcome",
			disable: false,
			action: function () {
				sheet.value = `Hi!

Thank you for using paragraph

Paragraph is currently a simple project, but I plan to expand its features in the future.

Enable "Dev tools" at "Help > About"

- Hppsrc`;
			}
		},
		{
			name: "News",
			disable: false,
			action: function () {
				show_action(`
					<h3>News</h3>
					<hr>
					<b><p>${version}</p></b>
					<small>- First public version to be considered stable!</small>
					<hr>
					<div class="option_html" onclick="hide_action()" >Ok!</div>
				`,1)
			}
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
					<p>Paragraph is a simple word proccesor made on JavaScript</p>
					<b><small> Version: ${version}</small></b>
					<hr>
					<div class="option_html" >
						<a href='https://github.com/hppsrc/paragraph' target="_blank" rel="noopener noreferrer" onclick="hide_action()" >Check Github Repo</a>
					</div>
					<div class="option_html" onclick="
						hide_action();
						enable_para_dev();
					" >Enabled dev tools</div>
					<div class="option_html" onclick="hide_action()" >Cancel</div>
				`,1)
			}
		},
	],
	devMenu: [
		{
			name: `Version: ${version} (${build+" "+git_branch})`, disable: true, action: null
		},
		{
			name: "hr"
		},
		{
			name: "Toggle autosave", disable: true, action: null
		},
		{
			name: "Load latest JS", disable: true, action: null
		},
		{
			name: "Show fake dom", disable: true, action: null
		},
		{
			name: "Print edit-log", disable: true, action: null
		}
	],
};

menus_extra = {
	font: ["serif", "sans-serif", "monospace", "cursive", "fantasy"],
};

// functions
function show_action(valueArg, action) {

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
			action_box.appendChild(div);
		});

	} else {

		setTimeout(() => {

			action_box.innerHTML = valueArg;

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

function save_file() {

	show_action(`
		<h3>Save file</h3>
		<hr>
		<p>Temporarily disabled</p>
		<hr>
		<div class="option_html" onclick="hide_action()" >Cancel</div>
	`,1)

	fetch('/api/file_download', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(meta_info)
	})
	.then(response => {
		if (!response.ok) {
			throw new Error(`Error: ${response.status}`);
		}
		return response.json();
	})
	.then(data => { console.log('Server response:', data); })
	.catch(error => { console.error('Error:', error); });

}

function enable_para_dev() {
	document.getElementById("dev_menu").style.display = "block";
	show_action(`
		<h3>Developer options enabled</h3>
		<hr>
		<p>Reload to disable</p>
		<hr>
		<div class="option_html" onclick="hide_action();" >Ok!</div>
	`,1)
}

function hide_action() {
	setTimeout(() => { overlay.style.opacity = '0'; }, 0);
	setTimeout(() => { overlay.style.display = 'none'; }, 100);
	setTimeout(() => { action_box.style.top = '-500px'; }, 0);
}

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
		show_action(`
			<h3>Autosave</h3>
			<hr>
			<p>Autosave is not available yet.</p>
			<hr>
			<div class="option_html" onclick="hide_action()" >Cancel</div>
		`,1)

	} else if (arg == 3) {
		show_action(`
			<h3>Set new file name</h3>
			<hr>
			<p>Can't set a empty name.</p>
			<hr>
			<div class="option_html" onclick="hide_action();" >Ok!</div>
		`,1)
	}
}

// header
const header = document.createElement("header");
header.classList = "glow f_row";
header.innerHTML = `

    <h1 onclick="console.log('Para :)')">Pg</h1>

	<input type="file" id="fileInput" style="display: none;" accept=".txt">

    <vr></vr>

    <div class="f_col" id="header_top_bar_status">

        <p id="header_top_bar_status_name" onclick="wrapper_action(1)" >Name: ${(meta_info.documentTitle).slice(0,10).concat("...")}</p>
	    <!--p id="header_top_bar_status_save" onclick="wrapper_action(2)" >Autosave disabled</p-->

    </div>

    <vr></vr>

    <div id="header_top_bar_actions">

        <div id="header_top_bar_actions_select">

            <p class="action" onclick="show_action(this, 0)">File</p>
            <p class="action" onclick="show_action(this, 0)">Help</p>
            <!--p class="action" onclick="show_action(this, 0)">Edit</p-->
            <p id="dev_menu" class="action" onclick="show_action(this, 0)">Dev</p>

        </div>

        <!--div id="header_top_bar_actions_do">

            <div class="document_action" onclick="show_action(this, 1)" id="action_setfont"><p> Font: <span style="font-family: Serif"> Serif </span> </p> </div>
            <div class="document_action" onclick="show_action(this, 1)" id="action_setsize"><p> Size: 12px </p> </div>
            <div class="document_action" onclick="show_action(this, 1)" onclick="show_action(this, 0)" id="action_setcolorfont"><p> Font <br> </p><div id="action_setcolorfont_box"> </div> </div>
            <div class="document_action" onclick="show_action(this, 1)" id="action_setcolorback"><p> Back <br> </p><div id="action_setcolorback_box"> </div> </div>
            <div class="document_action" id="action_black"><b> N </b> </div>
            <div class="document_action" id="action_italic"><i> K </i> </div>
            <div class="document_action" id="action_underline"><span style="text-decoration: underline;"> U </span> </div>

		</div-->

    </div>

`;

// main
const main = document.createElement("main");
main.innerHTML = `

	<!--div id="sheet" contenteditable="true"> Text </div-->
	<textarea id="sheet" placeholder="Type your text here..." ></textarea>

`;

// action box
const action_box = document.createElement("div");
action_box.id = "action_box";

// hoverbg
const overlay = document.createElement("div");
overlay.id = "overlay";

// insert values
document.body.appendChild(action_box);
document.body.appendChild(overlay);
document.body.appendChild(header);
document.body.appendChild(main);

// after DOM load
document.addEventListener("DOMContentLoaded", () => {

	const sheet = document.getElementById("sheet");

    let fileInput = document.getElementById('fileInput');

    fileInput.addEventListener("change", function(e) {

        const file = e.target.files[0];

        if (file) {
            const reader = new FileReader();

            reader.readAsText(file);

            reader.onload = function(e) {
                sheet.value = e.target.result;
            };

            reader.onerror = function(e) {
                console.error("Error:", e.target.error);
            };
        }

	})

    if (window.innerWidth < 768) {

        alert("This page is not designed for small screens. Proper UI/UX is not guaranteed, please wait for a future update!");

    }

})
