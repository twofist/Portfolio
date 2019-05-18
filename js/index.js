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
    if (location) description.appendChild(createTextNode('descriptionLocation', location));
    if (email) description.appendChild(createA('descriptionEmail', email, email, email));
    if (blog) description.appendChild(createA('descriptionBlog', blog, blog, blog));
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
    element.appendChild(createTextNode('repoTitle', repo.name));
    element.appendChild(createTextNode('repoDescription', repo.description));

    const div = document.createElement('div');
    div.setAttribute('class', 'repoDetails');
    div.appendChild(createTextNode('repoLanguage', repo.language));
    div.appendChild(createTextNode('repoStars', repo.stargazers_count));
    div.appendChild(createTextNode('repoForks', repo.forks_count));

    element.appendChild(div);

    repositories.appendChild(element);
}