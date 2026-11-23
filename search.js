class Film {
  constructor(sb, containerId) {
    this.container = document.getElementById(containerId);
    this.sb = sb.value;
    this.title = this.sb.replace(/ /g, "_");
  }
  async affichagePoster() {
    console.log(this.title);
    const afficher = await fetch(
      `https://www.omdbapi.com/?apikey=c80d326a&s=${this.title}`,
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
  async image(element, id) {
    const posters = await Promise.all(
      element.Search.map(async (movie) =>
        movie.Poster !== "N/A" && (await this.imageExists(movie.Poster))
          ? movie.Poster
          : "./image/placeholder.png",
      ),
    );
    if (id !== Film.dernierId) return;
    element.Search.forEach((movie, i) => {
      const article = document.createElement("a");
      const img = document.createElement("img");
      const title = document.createElement("h2");
      article.href = "movie.html";
      img.src = posters[i];
      title.textContent = movie.Title;
      this.container.appendChild(article);
      article.appendChild(img);
      article.appendChild(title);
    });
  }
  imageExists(url) {
    return new Promise((resolve) => {
      var img = new Image();
      img.addEventListener("load", () => resolve(true));
      img.addEventListener("error", () => resolve(false));
      img.src = url;
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
