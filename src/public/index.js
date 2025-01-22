const version = "0.1.1-alpha";
const build = "250121141";
const git_branch = "dev";

// header
let header = document.createElement('header');
header.classList = "glow"
header.innerHTML = `<h1> Paragraph </h1> <p> An FOSS Word processor <small style="font-size: xx-small"> Version: ${version+" ("+build+")"}</small> </p> `

// main 
const main = document.createElement('main');
main.innerHTML = `<p>This branch doesn't contain anything functional or minimally usable.<br>If you want to try the Alpha switch to the <a href="https://github.com/hppsrc/paragraph/tree/dev" target="_blank">Dev branch</a>.</p>`

// insert values
document.body.appendChild(header);
document.body.appendChild(main);