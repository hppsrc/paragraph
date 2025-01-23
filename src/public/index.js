const version = "0.1.4-alpha";
const build = "250123161";
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
            disable: true,
            action : null 
        },
        {
            name: "Save",
            disable: true,
            action : null
        },
        {
            name: "Export",
            disable: true,
            action: null
        }
    ],
    editMenu: [
        {
            name: "Undo",
            disable: true,
            action: null
        },
        {
            name: "Redo",
            disable: true,
            action: null
        },
        {
            name: "Cut",
            disable: true,
            action: null
        },
        {
            name: "Copy",
            disable: true,
            action: null
        },
        {
            name: "Paste",
            disable: true,
            action: null
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
    overlay.style.display = "block";

    setTimeout(() => {action_box.style.top = "50px";}, 1);
    setTimeout(() => {overlay.style.opacity = "1";}, 1);

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
                        // action_box.style.display = 'none';
                        item.action()
                        setTimeout(() => {overlay.style.opacity = "0";}, 1);
                        setTimeout(() => {action_box.style.top = "-100px";}, 1);
                        setTimeout(() => {action_box.innerHTML = ""}, 100);
                    })
                    
                }
                
                action_box.appendChild(div);
            });
        }

        overlay.addEventListener('click', () => {
            setTimeout(() => {overlay.style.opacity = "0";}, 1);
            setTimeout(() => {action_box.style.top = "-100px";}, 1);
            setTimeout(() => {action_box.innerHTML = ""}, 100);
            overlay.removeEventListener('click');
        })

    }
}

// header
const header = document.createElement('header');
header.classList = "glow f_row"
header.innerHTML = `

    <h1>Pg</h1>

    <vr></vr>

    <div class="f_col" id="header_top_bar_status">
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

// action box
const action_box = document.createElement('div');
action_box.id = "action_box";

// hoverbg
const overlay = document.createElement('div');
overlay.id = "overlay";

// insert values
document.body.appendChild(action_box);
document.body.appendChild(overlay);
document.body.appendChild(header);
document.body.appendChild(main);
