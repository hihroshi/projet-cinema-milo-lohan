class Film {
  constructor(id, containerId) {
    this.container = document.getElementById(containerId);
    this.id = id;
  }
  async affichagePoster() {
    const afficher = await fetch(
      `https://www.omdbapi.com/?apikey=c80d326a&i=${this.id}`,
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
async function randomImdb() {
  try {
    const response = await fetch("./titles.json");
    const data = await response.json();
    return data[Math.floor(Math.random() * data.length)];
  } catch (error) {
    console.error("Erreur lors du chargement du JSON :", error);
  }
}
async function chargementRndm() {
  const randomId = await randomImdb();
  const film = new Film(randomId, "picture");
  film.affichagePoster();
}

chargementRndm();
chargementRndm();
chargementRndm();
chargementRndm();
document.getElementById("chargement").addEventListener("click", () => {
  for (let i = 0; i < 4; i++) {
    chargementRndm();
  }
});
