const version = "0.1.5-alpha";
const build = "250124171";
const git_branch = "dev";

// vars
const buttons_document = document.getElementsByClassName('document_action');
const buttons_toggle = document.getElementsByClassName('document_toggle');

// definitions
menus = {
    fileMenu: [
        {
            name: "New",
            disable: false,
            action: function() { location.reload() }
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

menus_extra = {
    font: [
        "serif",
        "sans-serif",
        "monospace",
        "cursive",
        "fantasy"
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
                        item.action()
                        setTimeout(() => { overlay.style.opacity = "0" }, 1);
                        setTimeout(() => { action_box.style.top = "-100px" }, 1);
                        setTimeout(() => { action_box.innerHTML = "" }, 100);
                        setTimeout(() => { overlay.style.display = "none"; }, 500);
                    })
                    
                }
                
                action_box.appendChild(div);

            });

        }

        overlay.addEventListener('click', () => {

            setTimeout(() => { overlay.style.opacity = "0" }, 1);
            setTimeout(() => { action_box.style.top = "-100px" }, 1);
            setTimeout(() => { action_box.innerHTML = "" }, 100);
            setTimeout(() => { overlay.style.display = "none"; }, 500);

        })

    } else {

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

    <div id="header_top_bar_actions" style="           ">
    ` +                                     /* f_col */ `
        <div id="header_top_bar_actions_select">
            <p class="action" onclick="show_action(this, 0)">File</p>
            <p class="action" onclick="show_action(this, 0)">Edit</p>
        </div>
        <div id="header_top_bar_actions_do">
            <div class="document_action" onclick="show_action(this, 1)" id="action_setfont"><p> Font: <span style="font-family: Serif"> Serif </span> </p> </div>
            <div class="document_action" onclick="show_action(this, 1)" id="action_setsize"><p> Size: 12px </p> </div>
            <div class="document_action" onclick="show_action(this, 1)" onclick="show_action(this, 0)" id="action_setcolorfont"><p> Font <br> </p><div id="action_setcolorfont_box"> </div> </div>
            <div class="document_action" onclick="show_action(this, 1)" id="action_setcolorback"><p> Back <br> </p><div id="action_setcolorback_box"> </div> </div>
            <div class="document_toggle" id="action_black"><b> N </b> </div>
            <div class="document_toggle" id="action_italic"><i> K </i> </div>
            <div class="document_toggle" id="action_underline"><span style="text-decoration: underline;"> U </span> </div>
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

// show page
setTimeout(() => { document.body.opacity = "0"; }, 500);

// after DOM load
for (let i = 0; i < buttons_toggle.length; i++) {
    buttons_toggle[i].addEventListener('click', () => {
        if (buttons_toggle[i].classList == "document_toggle clicked") {
            buttons_toggle[i].classList = "document_toggle"
        } else {
            buttons_toggle[i].classList = "document_toggle clicked"
        }
    })
}