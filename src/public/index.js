const version = "0.1.3-alpha";
const build = "250122161";
const git_branch = "dev";

// vars
const buttons = document.getElementsByClassName('action');

// definitions
menus = {
    fileMenu: [
        {
            name: "New",
            disable: false,
            action: function() { alert("Action is not prepared yet") }
        },
        {
            name: "Open",
            disable: false,
            action: function() { alert("Open action is not available") }
        },
        {
            name: "Save",
            disable: false,
            action: function() { alert("Save action is not available") }
        },
        {
            name: "ExportExportExportExport",
            disable: true,
            action: null
        }
    ],
    editMenu: [
        {
            name: "Undo",
            disable: false,
            action: function() { alert("Undo action is not available") }
        },
        {
            name: "Redo",
            disable: false,
            action: function() { alert("Redo action is not available") }
        },
        {
            name: "Cut",
            disable: false,
            action: function() { alert("Cut action is not available") }
        },
        {
            name: "Copy",
            disable: false,
            action: function() { alert("Copy action is not available") }
        },
        {
            name: "Paste",
            disable: false,
            action: function() { alert("Paste action is not available") }
        }
    ]
}

// 0 menu list
// 1 set html

// functions
function show_action(elementId, action) {
    
    action_box.innerHTML = '';

    setTimeout(() => {action_box.style.top = "30px";}, 1);
    
    const rect = elementId.getBoundingClientRect();
    
    action_box.style.left = `${rect.x}px`
    action_box.style.display = "flex";
    // action_box.style.width = action_box.style.width < 200 ? "200px" : "calc(fit-content + 50px)";

    setTimeout(() => {action_box.style.top = "50px";}, 1);

    if (action == 0) {
        let current = elementId.textContent.toLowerCase() + "Menu";
        let values = menus[current];

        if (values) {
            values.forEach(item => {
                let div = document.createElement('div');
                div.textContent = item.name;
                
                if (item.disable) {

                    div.classList.add('disabled');
                    div.style.color = '#777';

                } else {

                    div.addEventListener('click', () => {
                        action_box.style.display = 'none';
                        item.action();
                        setTimeout(() => {action_box.style.top = "40px";}, 1);
                    })
                    
                }
                
                action_box.appendChild(div);
            });
        }
    }
}

// header
let header = document.createElement('header');
header.classList = "glow f_row"
header.innerHTML = `

    <h1>Pg</h1>

    <vr></vr>

    <div id="header_top_bar_status">
        <p onclick="alert('File renaming is not available yet')">Unnamed</p>
        <p onclick="alert('File saving is not available yet')">Unsaved document</p>
    </div>

    <vr></vr>

    <div id="header_top_bar_actions" style="f_col">
        <div id="header_top_bar_actions_select">
            <p class="action" onclick="show_action(this, 0)">File</p>
            <p class="action" onclick="show_action(this, 0)">Edit</p>
        </div>
        <div id="header_top_bar_actions_do">
            <p>Actions here...</p>
        </div>
    </div>

`

// main 
const main = document.createElement('main');
main.classList = "f_col"
main.innerHTML = `<p>Test</p>`

// action box
const action_box = document.createElement('div');
action_box.id = "action_box";

// insert values
document.body.appendChild(action_box);
document.body.appendChild(header);
document.body.appendChild(main);
