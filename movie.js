// créer une fonction qui met l'image ect
//créer une foncton qui recupere l'id
const identification = new URLSearchParams(window.location.search);
const imdbID = identification.get("id");

class Presentation {
  constructor(container) {
    this.container = document.getElementById(container);
    this.id = imdbID;
  }
  async affichagePoster() {
    const afficher = await fetch(
      `https://www.omdbapi.com/?apikey=c80d326a&i=${this.id}&plot=full`,
    );
    const affiche = await afficher.json();

    return this.image(affiche);
  }
  image(element) {
    const article = document.createElement("article");
    const img = document.createElement("img");
    const title = document.createElement("h2");
    const plot = document.createElement("p");
    const actor = document.createElement("p");
    const genre = document.createElement("p");
    img.src = element.Poster;
    title.textContent = element.Title;
    plot.textContent = element.Plot;
    actor.textContent = element.Actors;
    genre.textContent = element.Genre;
    this.container.appendChild(article);
    article.appendChild(img);
    article.appendChild(title);
    article.appendChild(plot);
    article.appendChild(actor);
    article.appendChild(genre);
  }
}

let film = new Presentation("page-descriptive");
film.affichagePoster();
