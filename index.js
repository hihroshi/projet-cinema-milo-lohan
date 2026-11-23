class film {
  constructor(titre, containerId) {
    this.container = document.getElementById(containerId);
    this.titre = titre;
  }
  async affichagePoster() {
    const afficher = await fetch(
      `https://www.omdbapi.com/?apikey=c80d326a&t=${this.titre}`,
    );
    const affiche = await afficher.json();
    console.log(affiche);
    return this.image(affiche);
    /*affiche.Search.forEach((Element) => this.image(Element));*/ //pour les films avec s= donc pour les recherches plus  tard
  }
  image(element) {
    console.log(element.Title);
    console.log(element.Poster);
    const article = document.createElement("a");
    const img = document.createElement("img");
    const title = document.createElement("h2");
    const plot = document.createElement("p");
    article.href = "movie.html";
    img.src = element.Poster;
    title.textContent = element.Title;
    plot.textContent = element.Plot;
    this.container.appendChild(article);
    article.appendChild(img);
    article.appendChild(title);
    article.appendChild(plot);
  }
}
let test = [
  "The Game",
  "Captain America: The First Avenger",
  "Mars Attacks!",
  "Alien: Romulus",
];
test.forEach((nomFilm) => allFilm(nomFilm));
function allFilm(dif) {
  const toutFilm = new film(dif, "picture");
  toutFilm.affichagePoster();
}
