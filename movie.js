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
    document.getElementById("poster").src = element.Poster;
    document.getElementById("title").textContent = element.Title;
    document.getElementById("actors").textContent = element.Actors;
    document.getElementById("plot").textContent = element.Plot;
    document.getElementById("genre").textContent = element.Genre;
  }
}

let film = new Presentation("page-descriptive");
film.affichagePoster();
