//Boolflix
//creo una copia di Netflix, parto creando un api-key dal sito di themoviedb.org e interrogo con axios l'api

//creo variabile con il valore dell'api movies
const movieDb =
  "https://api.themoviedb.org/3/search/movie?api_key=a7c4877ed2ef5089283e2a5845b4c723&query=";

//creo variabile con il valore dell'api shows
const showsDb =
  "https://api.themoviedb.org/3/search/tv?api_key=a7c4877ed2ef5089283e2a5845b4c723&query=";

var app = new Vue({
  el: "#app",
  data: {
    searchInput: "",
    moviesArray: [],
    showsArray: [],
    languageFlag: [
      "img/italy.png",
      "img/united-kingdom.png",
      "img/germany.png",
      "img/spain.png",
      "img/france.png",
      "img/japan.png",
      "img/portugal.png",
      "img/china.png",
    ],
    posterPath: "https://image.tmdb.org/t/p/w185",
    noFlag: "img/noflag.jpg",
    noPoster: "img/missing.png",
    indexMovies: "",
    indexShows: "",
    showFilmSection: false,
    showShowsSection: false,
  },
  methods: {
    //funzione che chiama dall'api sia i film che gli shows
    searchFilm() {
      if (this.searchInput !== "") {
        axios.get(movieDb + this.searchInput).then((response) => {
          const results = response.data.results;
          //console.log(results);
          this.moviesArray = results;
          this.moviesArray.forEach((element) => {
            element.hover = false;
          });
          //console.log(this.moviesArray);
          this.searchInput = "";
          //controllo se l'array ha elementi, se si allora faccio apparire l'intestazione della sezione
          if (this.moviesArray.length > 0) {
            this.showFilmSection = true;
          }
        });
        axios.get(showsDb + this.searchInput).then((response) => {
          const results = response.data.results;
          //console.log(results);
          this.showsArray = results;
          this.showsArray.forEach((element) => {
            element.hover = false;
          });
          //console.log(this.showsArray);
          //controllo se l'array ha elementi, se si allora faccio apparire l'intestazione della sezione
          if (this.showsArray.length > 0) {
            this.showShowsSection = true;
          }
        });
      }
    },
    //funzione per contrallare che bandiera assegnare in base alla lingua
    whatFlag: function (movie) {
      if (movie.original_language === "en") {
        return this.languageFlag[1];
      } else if (movie.original_language === "it") {
        return this.languageFlag[0];
      } else if (movie.original_language === "de") {
        return this.languageFlag[2];
      } else if (movie.original_language === "es") {
        return this.languageFlag[3];
      } else if (movie.original_language === "fr") {
        return this.languageFlag[4];
      } else if (movie.original_language === "ja") {
        return this.languageFlag[5];
      } else if (movie.original_language === "pt") {
        return this.languageFlag[6];
      } else {
        return this.noFlag;
      }
    },
    //funzione per mostrare all'hover i dettagli film
    provaHover(movie, indice) {
      this.indexMovies = indice;
      movie.hover = !movie.hover;
    },
    //funzione per uscire dall'hover film
    esciHover(movie, indice) {
      this.indexMovies = indice;
      movie.hover = !movie.hover;
      setTimeout(() => {
        this.indexMovies = "";
      }, 1000);

      console.log(movie.hover);
    },
    //funzione per mostrare all'hover i dettagli show
    hoverShow(show, indice) {
      this.indexShows = indice;
      movie.hover = !movie.hover;
    },
    //funzione per uscire dall'hover show
    leaveShow(show, indice) {
      this.indexShows = indice;
      show.hover = !show.hover;
      setTimeout(() => {
        this.indexShows = "";
      }, 1000);
    },
  },
  mounted() {},
  computed: {},
});
