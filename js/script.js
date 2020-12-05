//Boolflix
//creo una copia di Netflix, parto creando un api-key dal sito di themoviedb.org e interrogo con axios l'api

//creo variabile con il valore dell'api movies da cercare
const movieDb = "https://api.themoviedb.org/3/search/movie";

//creo variabile con valore dell'api dei film piu recenti
const popularMovies = "https://api.themoviedb.org/3/movie/popular";

//creo variabile con il valore dell'api shows
const showsDb = "https://api.themoviedb.org/3/search/tv";

//creo variabile con il valore dell'api shows piu recenti
const popularShows = "https://api.themoviedb.org/3/tv/popular";

var app = new Vue({
  el: "#app",
  data: {
    searchInput: "",
    apiKey: "a7c4877ed2ef5089283e2a5845b4c723",
    moviesArray: [],
    popularMovies: [],
    showsArray: [],
    popularShows: [],
    actorsMovies: [],
    actorsShows: [],
    moviesGenres: [],
    showsGenres: [],
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
    popShowsVisible: true,
    popMoviesVisible: true,
  },
  methods: {
    //funzione che chiama dall'api sia i film che gli shows
    searchFilm() {
      this.popMoviesVisible = false;
      this.popShowsVisible = false;
      if (this.searchInput !== "") {
        axios
          .get(movieDb, {
            params: { api_key: this.apiKey, query: this.searchInput },
          })
          .then((response) => {
            const results = response.data.results;

            //salvo i risultati nell'array
            this.moviesArray = results;
            //aggiungo una proprietà ad ogni elemento per controllare l hover
            this.moviesArray.forEach((element) => {
              element.hover = false;
            });
            //console.log(this.moviesArray);

            //azzero input ricerca
            this.searchInput = "";
            //controllo se l'array ha elementi, se si allora faccio apparire l'intestazione della sezione
            if (this.moviesArray.length > 0) {
              this.showFilmSection = true;
            } else {
              this.showFilmSection = false;
            }
          });
        axios
          .get(showsDb, {
            params: { api_key: this.apiKey, query: this.searchInput },
          })
          .then((response) => {
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
            } else {
              this.showShowsSection = false;
            }
          });
      }
    },
    filterMovies(id) {
      this.actorsMovies = []; // ogni volta che richiamiamo la funzione azzeriamo l'array altrimenti ogni evento di mouseenter l'array verrà popolato con i 5 attori

      this.moviesGenres = [];

      axios
        .get(
          "https://api.themoviedb.org/3/movie/" +
            id +
            "?api_key=" +
            this.apiKey +
            "&append_to_response=credits"
        )
        .then((response) => {
          // solo i primi 5 attori quindi pushamo nell'array i primi 5 risultati
          for (let i = 0; i < 5; i++) {
            this.actorsMovies.push(response.data.credits.cast[i]);
          }
          this.moviesGenres = response.data.genres;
          console.log("Attori Film: ", this.actorsMovies);
          console.log("Generi Film: ", this.moviesGenres);
        });
    },
    filterTv(id) {
      this.actorsShows = [];
      this.showsGenres = [];
      axios
        .get(
          "https://api.themoviedb.org/3/tv/" +
            id +
            "?api_key=" +
            this.apiKey +
            "&append_to_response=credits"
        )
        .then((response) => {
          console.log(response);
          // solo i primi 5 attori quindi pushamo nell'array i primi 5 risultati
          for (let i = 0; i < 5; i++) {
            this.actorsShows.push(response.data.credits.cast[i]);
          }
          this.showsGenres = response.data.genres;
          console.log("Attori Serie tv: ", this.actorsShows);
          console.log("Generi Serie Tv: ", this.showsGenres);
        });
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
      this.indexMovies = "";
    },
    //funzione per mostrare all'hover i dettagli show
    hoverShow(show, indice) {
      this.indexShows = indice;
      show.hover = !show.hover;
    },
    //funzione per uscire dall'hover show
    leaveShow(show, indice) {
      this.indexShows = indice;
      show.hover = !show.hover;
      this.indexShows = "";
    },
  },
  mounted() {
    axios
      .get(popularMovies, {
        params: { api_key: this.apiKey, language: "en-US" },
      })
      .then((response) => {
        const results = response.data.results;
        this.popularMovies = results;
        console.log(this.popularMovies);
      });
    axios
      .get(popularShows, {
        params: { api_key: this.apiKey, language: "en-US" },
      })
      .then((response) => {
        const results = response.data.results;
        this.popularShows = results;
        console.log(this.popularShows);
      });
  },
  computed: {},
});
