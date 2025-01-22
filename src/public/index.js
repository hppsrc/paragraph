const version = "0.1.2-alpha";
const build = "250121201";
const git_branch = "dev";

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
            <p onclick="alert('File actions not yet available')">File</p>
        </div>
        <div id="header_top_bar_actions_do">
            <p>Font:</p>
            <p> Sans-serif </p>
            <vr></vr>
            <p>Color:</p>
            <p>#000000</p>
        </div>
    </div>

`

// main 
const main = document.createElement('main');
main.classList = "f_col"
main.innerHTML = `<p>Test</p>`

// insert values
document.body.appendChild(header);
document.body.appendChild(main);