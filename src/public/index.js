const version = "0.1.6-alpha";
const build = "250127181";
const git_branch = "dev";

// vars
const buttons_document = document.getElementsByClassName("document_action");
const buttons_toggle = document.getElementsByClassName("document_toggle");

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
					<div class="option_html" onclick="location.reload()">Yes</div>
					<div class="option_html"
					onclick="
						setTimeout(() => { overlay.style.opacity = '0'; }, 0);
						setTimeout(() => { overlay.style.display = 'none'; }, 100);
						setTimeout(() => { action_box.style.top = '-500px'; }, 0);
					"
					>Cancel</div>
					`, 1)
			},
		},
		// {
		// 	name: "Open",
		// 	disable: true,
		// 	action: null,
		// },
		// {
		// 	name: "Save",
		// 	disable: true,
		// 	action: null,
		// },
		// {
		// 	name: "Export",
		// 	disable: true,
		// 	action: null,
		// },
	],
	editMenu: [
		{
			name: "Undo",
			disable: true,
			action: null,
		},
		{
			name: "Redo",
			disable: true,
			action: null,
		},
		{
			name: "Cut",
			disable: true,
			action: null,
		},
		{
			name: "Copy",
			disable: true,
			action: null,
		},
		{
			name: "Paste",
			disable: true,
			action: null,
		},
	],
	helpMenu: [
		{
			name: "News",
			disable: false,
			action: function () {
				show_action(`
				<h3>News</h3>
				<hr>

				<b><p>${version}</p></b>
				<small>- Main \"sheet\" added to the program!</small>

				<hr>
				<div class="option_html"
				onclick="
					setTimeout(() => { overlay.style.opacity = '0'; }, 0);
					setTimeout(() => { overlay.style.display = 'none'; }, 100);
					setTimeout(() => { action_box.style.top = '-500px'; }, 0);
				"
				>Ok!</div>
				`,1)
			}
		},
		{
			name: "hr", disable: 0, action: 0
		},
		{
			name: "About",
			disable: false,
			action: function () {
				show_action(`
				<h3>About Paragraph</h3>
				<hr>
				<p>Paragraph is a simple word proccesor made on JavaScript</p>
				<b><small> Version: ${version} (${build+" "+git_branch})</small></b>
				<hr>
				<div class="option_html" onclick="location.reload()"><a href='https://github.com/hppsrc/paragraph'>Check Github Repo</a></div>
				<div class="option_html"
				onclick="
					setTimeout(() => { overlay.style.opacity = '0'; }, 0);
					setTimeout(() => { overlay.style.display = 'none'; }, 100);
					setTimeout(() => { action_box.style.top = '-500px'; }, 0);
				"
				>Cancel</div>
				`,1)
			}
		},
	],
};

menus_extra = {
	font: ["serif", "sans-serif", "monospace", "cursive", "fantasy"],
};

// 0 menu list
// 1 set html

// functions
function show_action(valueArg, action) {

	if (action == 0) {
		action_box.innerHTML = "";

		let current = valueArg.textContent.toLowerCase() + "Menu";
		let values = menus[current];

		const rect = valueArg.getBoundingClientRect();

		action_box.style.left = `${rect.x}px`;
		action_box.style.width = '100px';

		overlay.style.display = "block";

		setTimeout(() => { action_box.style.top = "50px"; }, 0);
		setTimeout(() => { overlay.style.opacity = "1"; }, 0);

		overlay.addEventListener("click", () => {
			setTimeout(() => { overlay.style.opacity = "0"; }, 0);
			setTimeout(() => { overlay.style.display = "none"; }, 100);
			setTimeout(() => { action_box.style.top = "-500px"; }, 0);
		});

		values.forEach((item) => {
			let div = document.createElement("div");
			if (item.name == "hr") {
				div.innerHTML = "<hr>";
			} else {
				div.textContent = item.name;

				if (item.disable) {
					div.classList.add("disabled");
					div.style.color = "#777";
				} else {
					div.addEventListener("click", () => {
						setTimeout(() => { overlay.style.opacity = "0"; }, 0);
						setTimeout(() => { overlay.style.display = "none"; }, 100);
						setTimeout(() => { action_box.style.top = "-500px"; }, 0);
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

			setTimeout(() => { action_box.style.top = "50px"; }, 0);
			setTimeout(() => { overlay.style.opacity = "1"; }, 0);

			overlay.addEventListener("click", () => {
				setTimeout(() => { overlay.style.opacity = "0"; }, 0);
				setTimeout(() => { overlay.style.display = "none"; }, 100);
				setTimeout(() => { action_box.style.top = "-500px"; }, 0);
			});

			// alert(valueArg)
		}, 150);
	}
}

// header
const header = document.createElement("header");
header.classList = "glow f_row";
header.innerHTML = `

    <h1 onclick="console.log('Para :)')">Pg</h1>

    <vr></vr>

    <!--div class="f_col" id="header_top_bar_status">
        <p onclick="alert('File renaming is not available yet')">Unnamed</p>
        <p onclick="alert('File saving is not available yet')">Unsaved document</p>
    </div>

    <vr></vr-->

    <div id="header_top_bar_actions">
        <div id="header_top_bar_actions_select">
            <p class="action" onclick="show_action(this, 0)">File</p>
            <p class="action" onclick="show_action(this, 0)">Help</p>
            <!--p class="action" onclick="show_action(this, 0)">Edit</p-->
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
	<!--div id="sheet" contenteditable="true">
		Text
	</div-->
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

	// sheet.addEventListener("focusin", () => {
	// 	sheet.textContent = sheet.innerHTML.replace(/<br\s*[/]?>/gi, "\n");
	// })

	// sheet.addEventListener("focusout", () => {
	// 	sheet.innerHTML = sheet.textContent.replace(/\n/g, "<b>");
	// })

})
