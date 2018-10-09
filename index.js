function show(obj) {
	
	document.getElementById("text").style.display = "none";
	
    let langlist = document.getElementById("langlist"),
        projects = document.getElementById("projects"),
		contact = document.getElementById("contacts");
		
    if (obj.id === "langs" && langlist.style.display === "none") {
        projects.style.display = "none";
		contact.style.display = "none";
		
        projects.style.opacity = "0.0";
		contact.style.opacity = "0.0";

        langlist.style.display = "block";
        fadein(langlist, 20);
    }
    if (obj.id === "projs" && projects.style.display === "none") {
        langlist.style.display = "none";
		contact.style.display = "none";
		
        langlist.style.opacity = "0.0";
		contact.style.opacity = "0.0";
		
        projects.style.display = "block";
        fadein(projects, 20);
    }
    if (obj.id === "conts" && contacts.style.display === "none") {

        langlist.style.display = "none";
        projects.style.display = "none";

        langlist.style.opacity = "0.0";
        projects.style.opacity = "0.0";
		
		contacts.style.display = "block";
		fadein(contact, 20);
    }
}

function fadein(obj, speed) {
    let op = 0.1;
    obj.style.display = 'block';
    let timer = setInterval(function() {
        if (op >= 1) {
            clearInterval(timer);
        }
        obj.style.opacity = op;
        obj.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op += op * 0.1;
    }, speed);
}

window.onload = function() {
    fadein(document.getElementById("main"), 60);

    langlist.style.display = "none";
    projects.style.display = "none";
	contacts.style.display = "none";

	contacts.style.opacity = "0.0";
    langlist.style.opacity = "0.0";
    projects.style.opacity = "0.0";

    addProjects();
}

function addProjects(){
    const projArray = [
        createProject("https://github.com/twofist/Rpg-SinglePlayer-2D", "A singlePlayer RPG game made in Typescript"),
        createProject("https://github.com/twofist/Password-Manager", "A Password Manager with a small game, build in Java"),
        createProject("https://github.com/twofist/ask-questions", "A Website where you can ask me any question!"),
        createProject("https://github.com/twofist/chatapp", "A little Chatapp where you can chat with other online users"),
        createProject("https://github.com/twofist/nidish", "A pvp 1v1 game on local keyboard"),
        createProject("https://github.com/twofist/Discord-bot", "A Discord bot with multiple functionalities"),
    ];

    const doc = document.getElementById("projects");
    
    for(let ii = 0; ii < projArray.length; ii++){
        doc.appendChild(createRepo(projArray[ii]));
    }
}

function createProject(link, description="description"){
    proj = {
        link,
        description,
        image:"images/projects/"+link.split("twofist/")[1]+".png",
        alt:link.split("twofist/")[1],
        name:link.split("twofist/")[1],
    }

    return proj;
}

function createRepo(repo){
    const div = document.createElement("div");
    div.setAttribute("class", "repo");

    const ref = document.createElement("a");
    ref.setAttribute("href", repo.link);
    ref.setAttribute("target", "_blank");

    const name = document.createTextNode(repo.name);
    ref.appendChild(name);

    const br = document.createElement("br");
    ref.appendChild(br);

    const img = document.createElement("img");
    img.setAttribute("class", "img-proj");
    img.setAttribute("src", repo.image);
    img.setAttribute("alt", repo.alt);
    img.setAttribute("width", 250);
    img.setAttribute("height", 175);
    ref.appendChild(img);

    const span = document.createElement("span");

    const desc = document.createTextNode(repo.description);
    span.appendChild(desc);

    const br2 = document.createElement("br");

    div.appendChild(ref);
    div.appendChild(br2);
    div.appendChild(span);

    return div;
}

function switchTheme(){
    const light = "lightTheme.css";
    const dark = "darkTheme.css";
    const folder = "css/";
    const css = document.getElementById("CSStheme");
    if(css.href.split(folder)[1] === light){
        css.href = folder+dark;
    }else if(css.href.split(folder)[1] === dark){
        css.href = folder+light;
    }
}