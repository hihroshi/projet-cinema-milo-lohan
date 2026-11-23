class Film {
  constructor(sb, containerId) {
    this.container = document.getElementById(containerId);
    this.sb = sb.value;
    this.title = this.sb.replace(/ /g, "_");
  }
  async affichagePoster() {
    console.log(this.title);
    const afficher = await fetch(
      `https://www.omdbapi.com/?apikey=c80d326a&s=${this.title}&plot=short`,
    );
    const affiche = await afficher.json();
    console.log(affiche);
    this.delImage();
    if (affiche.Response == "True") {
      return this.image(affiche);
    } else {
      return this.nonTrouvé();
    }
  }
  nonTrouvé() {
    const text = document.createElement("p");
    text.textContent = "film non trouvé";
    this.container.appendChild(text);
  }
  image(element) {
    element.Search.forEach((movie) => {
      const article = document.createElement("a");
      const img = document.createElement("img");
      const title = document.createElement("h2");
      const plot = document.createElement("p");
      article.href = "movie.html";
      img.src = movie.Poster;
      title.textContent = movie.Title;
      plot.textContent = movie.Plot;
      this.container.appendChild(article);
      article.appendChild(img);
      article.appendChild(title);
      article.appendChild(plot);
    });
  }
  delImage() {
    if (document.getElementById("films").children.length > 0) {
      this.container.replaceChildren();
    }
  }
}

document.getElementById("sb").addEventListener("input", () => {
  let search = document.getElementById("sb");
  const film = new Film(search, "films");
  film.affichagePoster();
});
