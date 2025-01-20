const version = "0.1.0-alpha";
const build = "2501201742";
const git_branch = "dev";

// header
let header = document.createElement('header');
header.classList = "glow"
header.innerHTML = " <h1> Paragraph </h1> <p> An FOSS Word processor </p> "

// main 
const main = document.createElement('main');
main.innerHTML = ` WIP! <br> Data: ${version+" ("+build+") (branch: "+git_branch+")"}`

// insert values
document.body.appendChild(header);
document.body.appendChild(main);