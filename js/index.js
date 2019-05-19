window.onload = function () {
    getData();
}

function getData() {
    const user = "twofist";
    getProfile(user);
    getProjects(user);
    //getFollowers(user);
    //getFollowing(user);
    createLanguages();
}

function getProjects(user) {
    fetch(`https://api.github.com/users/${user}/repos?sort=created`)
        .then((res) => res.json())
        .then((json) => {
            json.forEach(element => {
                createRepo(element);
            });
        });
}

function getProfile(user) {
    fetch(`https://api.github.com/users/${user}`)
        .then((res) => res.json())
        .then((json) => {
            createAvatar(json.avatar_url);
            createDescription(json.name, json.login, json.blog, json.location, json.bio, json.email);
            createGithubLink(json.html_url);
        })
        .catch((error) => console.error(error));
}

function getFollowers(user) {
    fetch(`https://api.github.com/users/${user}/followers`)
        .then((res) => res.json())
        .then((json) => {
            const followerAmount = json.length;
        })
        .catch((error) => console.error(error));
}

function getFollowing(user) {
    fetch(`https://api.github.com/users/${user}/following`)
        .then((res) => res.json())
        .then((json) => {
            const followingAmount = json.length;
        })
        .catch((error) => console.error(error));
}

function createLanguages() {
    const element = document.createElement('div');
    element.setAttribute('class', 'languagesContainer');
    element.appendChild(createIMG('images/languages/en.png', 'English', 'language'));
    element.appendChild(createIMG('images/languages/de.png', 'Deutsch', 'language'));
    element.appendChild(createIMG('images/languages/nl.png', 'Nederlands', 'language'));
    description.appendChild(element);
}

function createAvatar(avatarURL) {
    avatar.appendChild(createIMG(avatarURL, 'avatar', 'avatarImage', `location.href='${avatarURL}'`));
}

function createGithubLink(githubURL) {
    githubLogo.appendChild(createIMG('images/other/github.png', 'githubLogo', 'githubImage', `location.href='${githubURL}'`))
}

function createDescription(name, login, blog, location, bio, email) {
    if (name) description.appendChild(createTextNode('descriptionName', name));
    if (login) description.appendChild(createTextNode('descriptionLogin', '@' + login));
    if (bio) description.appendChild(createTextNode('descriptionBio', bio));
    if (location) description.appendChild(createDiv('locationContainer', createLocationIcon(), createTextNode('descriptionLocation', location)));
    if (email) description.appendChild(createA('descriptionEmail', email, email, email));
    if (blog) description.appendChild(createDiv('blogContainer', createLinkIcon(), createA('descriptionBlog', blog, blog, blog)));
}

function createIMG(src, alt, Class, onclick = "") {
    const element = document.createElement("img");
    element.setAttribute('src', src);
    element.setAttribute('alt', alt);
    element.setAttribute('class', Class);
    element.setAttribute('onclick', onclick);
    return element;
}

function createA(Class, title, href, textValue) {
    if (!href.includes("http") && !href.includes("https")) {
        href = 'http://' + href
    }
    const element = document.createElement('a');
    element.setAttribute('title', title);
    element.setAttribute('href', href);
    element.setAttribute('class', Class);
    element.appendChild(document.createTextNode(textValue));
    return element;
}

function createTextNode(Class, string) {
    const element = document.createElement('div');
    element.setAttribute('class', Class);
    element.appendChild(document.createTextNode(string));
    return element;
}

function createRepo(repo) {
    const element = createA('repoContainer', repo.html_url, repo.html_url, "");
    element.appendChild(createDiv('repoTitleContainer', createBookIcon(), createTextNode('repoTitle', repo.name)));
    element.appendChild(createTextNode('repoDescription', repo.description));

    const div = document.createElement('div');
    div.setAttribute('class', 'repoDetails');
    div.appendChild(createDiv('repoLangContainer', createCodeIcon(), createTextNode('repoLanguage', repo.language)));
    div.appendChild(createDiv('repoStarContainer', createStarIcon(), createTextNode('repoStars', repo.stargazers_count)));
    div.appendChild(createDiv('repoForkContainer', createForkIcon(), createTextNode('repoForks', repo.forks_count)));

    element.appendChild(div);

    repositories.appendChild(element);
}

function createDiv(Class, icon, text) {
    const element = document.createElement('div');
    element.setAttribute('class', Class);
    element.appendChild(icon);
    element.appendChild(text);
    return element;
}

function createLocationIcon() {
    return createSVG('iconProfile', '1 0 14 16', '14', '16', 'evenodd', 'M6 0C2.69 0 0 2.5 0 5.5 0 10.02 6 16 6 16s6-5.98 6-10.5C12 2.5 9.31 0 6 0zm0 14.55C4.14 12.52 1 8.44 1 5.5 1 3.02 3.25 1 6 1c1.34 0 2.61.48 3.56 1.36.92.86 1.44 1.97 1.44 3.14 0 2.94-3.14 7.02-5 9.05zM8 5.5c0 1.11-.89 2-2 2-1.11 0-2-.89-2-2 0-1.11.89-2 2-2 1.11 0 2 .89 2 2z');
}

function createLinkIcon() {
    return createSVG('iconProfile', '1 0 14 16', '14', '16', 'evenodd', 'M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z');
}

function createBookIcon() {
    return createSVG('iconRepo', '1 0 14 16', '14', '16', 'evenodd', 'M4 9H3V8h1v1zm0-3H3v1h1V6zm0-2H3v1h1V4zm0-2H3v1h1V2zm8-1v12c0 .55-.45 1-1 1H6v2l-1.5-1.5L3 16v-2H1c-.55 0-1-.45-1-1V1c0-.55.45-1 1-1h10c.55 0 1 .45 1 1zm-1 10H1v2h2v-1h3v1h5v-2zm0-10H2v9h9V1z');
}

function createForkIcon() {
    return createSVG('iconRepo', '1 0 14 16', '14', '16', 'evenodd', 'M8 1a1.993 1.993 0 0 0-1 3.72V6L5 8 3 6V4.72A1.993 1.993 0 0 0 2 1a1.993 1.993 0 0 0-1 3.72V6.5l3 3v1.78A1.993 1.993 0 0 0 5 15a1.993 1.993 0 0 0 1-3.72V9.5l3-3V4.72A1.993 1.993 0 0 0 8 1zM2 4.2C1.34 4.2.8 3.65.8 3c0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm3 10c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm3-10c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2z');
}

function createStarIcon() {
    return createSVG('iconRepo', '1 0 14 16', '14', '16', 'evenodd', 'M14 6l-4.9-.64L7 1 4.9 5.36 0 6l3.6 3.26L2.67 14 7 11.67 11.33 14l-.93-4.74L14 6z');
}

function createCodeIcon() {
    return createSVG('iconRepo', '1 0 14 16', '14', '16', 'evenodd', 'M9.5 3L8 4.5 11.5 8 8 11.5 9.5 13 14 8 9.5 3zm-5 0L0 8l4.5 5L6 11.5 2.5 8 6 4.5 4.5 3z');
}

function createSVG(Class, viewbox, width, height, rule, d) {
    const element = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    element.setAttribute('class', Class);
    element.setAttribute('viewbox', viewbox);
    element.setAttribute('width', width);
    element.setAttribute('height', height);
    element.appendChild(createPath(rule, d));
    return element;
}

function createPath(rule, d) {
    const element = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    element.setAttribute('fill-rule', rule);
    element.setAttribute('d', d);
    return element;
}