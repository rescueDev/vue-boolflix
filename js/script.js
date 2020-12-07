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

//creo variabile per interrogare generi movies
const movieDbGenres = "https://api.themoviedb.org/3/genre/movie/list";

//creo variabile per interrogare generi shows
const showsDbGenres = "https://api.themoviedb.org/3/genre/tv/list";

var app = new Vue({
  el: "#app",
  data: {
    searchInput: "",
    selected: "",
    apiKey: "a7c4877ed2ef5089283e2a5845b4c723",
    moviesArray: [],
    popularMovies: [],
    showsArray: [],
    trendingAll: [],
    popularShows: [],
    actorsMovies: [],
    actorsShows: [],
    moviesGenres: [],
    showsGenres: [],
    totalGenresMovies: [],
    totalGenresShows: [],
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
    posterPath: "https://image.tmdb.org/t/p/w342",
    noFlag: "img/noflag.jpg",
    noPoster: "img/missing.png",
    noResults:
      "https://blog.expertrec.com/wp-content/uploads/2019/01/no_results_found.png",
    indexMovies: "",
    indexShows: "",
    showFilmSection: false,
    showShowsSection: false,
    popShowsVisible: false,
    popMoviesVisible: false,
    homeIsVisible: true, // sezione home visibile al caricamento pagina
    mostraGeneriMovies: false,
    mostraGeneriShows: false,
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
            //azzero input ricerca
            this.searchInput = "";
            //controllo se l'array ha elementi, se si allora faccio apparire l'intestazione della sezione
            if (this.moviesArray.length > 0) {
              this.showFilmSection = true;
            } else {
              this.showFilmSection = false;
            }
            //faccio scomparire la sezione home
            this.homeIsVisible = false;
          });
        axios
          .get(showsDb, {
            params: { api_key: this.apiKey, query: this.searchInput },
          })
          .then((response) => {
            const results = response.data.results;
            this.showsArray = results;
            this.showsArray.forEach((element) => {
              element.hover = false;
            });
            //controllo se l'array ha elementi, se si allora faccio apparire l'intestazione della sezione
            if (this.showsArray.length > 0) {
              this.showShowsSection = true;
            } else {
              this.showShowsSection = false;
            }
          });
      }
    },
    //funzione per passare tra categorie (home, movies , shows)
    selezHome() {
      this.homeIsVisible = true;
      this.popShowsVisible = false;
      this.popMoviesVisible = false;
    },
    //funzione per passare tra categorie (home, movies , shows)
    selezMovies() {
      this.homeIsVisible = false;
      this.popShowsVisible = false;
      this.popMoviesVisible = true;
    },
    //funzione per passare tra categorie (home, movies , shows)
    selezShows() {
      this.popShowsVisible = true;
      this.popMoviesVisible = false;
      this.homeIsVisible = false;
    },
    //funzione per ottenere attori e generi per ogni movie
    filterMovies(id) {
      //azzero ad ogni mouseenter i due array se no mi si accumulano elementi precedenti
      this.actorsMovies = [];
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
        });
    },
    //funzione per ottenere attori e generi per ogni shows
    filterTv(id) {
      //azzero ad ogni mouseenter i due array se no mi si accumulano elementi precedenti
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
          // solo i primi 5 attori quindi pushamo nell'array i primi 5 risultati
          for (let i = 0; i < 5; i++) {
            this.actorsShows.push(response.data.credits.cast[i]);
          }
          this.showsGenres = response.data.genres;
        });
    },
    //filtro film per generi
    filtroFilmGenere(id) {
      //chiamata per ottenere dettagli da id film
      axios
        .get(
          "https://api.themoviedb.org/3/discover/movie?api_key=" +
            this.apiKey +
            "&with_genres=" +
            id
        )
        .then((response) => {
          this.popularMovies = response.data.results;
        });
    },
    //filtro show per generi
    filtroSerieGenere(id) {
      //chiamata per ottenere dettagli da id serie tv
      axios
        .get(
          "https://api.themoviedb.org/3/discover/tv?api_key=" +
            this.apiKey +
            "&with_genres=" +
            id
        )
        .then((response) => {
          this.popularShows = response.data.results;
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
    reload() {
      location.reload();
    },
  },
  mounted() {
    //chiamata trending nella home page
    axios
      .get("https://api.themoviedb.org/3/trending/movie/week", {
        params: { api_key: this.apiKey, language: "en-US" },
      })
      .then((response) => {
        const results = response.data.results;
        this.trendingAll = results;
        console.log("trending week", this.trendingAll);
      });
    //chiamata popular movies al caricamento pagina
    axios
      .get(popularMovies, {
        params: { api_key: this.apiKey, language: "en-US" },
      })
      .then((response) => {
        const results = response.data.results;
        this.popularMovies = results;
      });

    //chiamata popular shows al caricamento pagina
    axios
      .get(popularShows, {
        params: { api_key: this.apiKey, language: "en-US" },
      })
      .then((response) => {
        const results = response.data.results;
        this.popularShows = results;
      });

    //chiamata per scaricare tutti i generi movies al caricamento
    axios
      .get(movieDbGenres, { params: { api_key: this.apiKey } })
      .then((response) => {
        const risposta = response.data.genres;
        this.totalGenresMovies = risposta;
      });

    //chiamata per scaricare tutti i generi shows al caricamento
    axios
      .get(showsDbGenres, { params: { api_key: this.apiKey } })
      .then((response) => {
        const risposta = response.data.genres;
        this.totalGenresShows = risposta;
      });
  },
  computed: {
    // funzione che verifica se entrambi array di ricerca siano vuoti (quindi nessun risultato) e inoltre che non mi trovi nella home o nella sez film o nella sezione shows
    nessunRisultato() {
      if (
        this.moviesArray.length < 1 &&
        this.showsArray.length < 1 &&
        this.homeIsVisible === false &&
        this.popShowsVisible === false &&
        this.popMoviesVisible === false
      ) {
        return true;
      } else {
        return false;
      }
    },
  },
});
