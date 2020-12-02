//Boolflix
//creo una copia di Netflix, parto creando un api-key dal sito di themoviedb.org e interrogo con axios l'api

//creo variabile con il valore dell'api
const movieDb =
  "https://api.themoviedb.org/3/search/movie?api_key=a7c4877ed2ef5089283e2a5845b4c723&query=";

var app = new Vue({
  el: "#app",
  data: {
    searchInput: "",
    moviesArray: [],
  },
  methods: {
    searchFilm() {
      if (this.searchInput !== "") {
        axios.get(movieDb + this.searchInput).then((response) => {
          const results = response.data.results;
          console.log(results);
          this.moviesArray = results;
          console.log(this.moviesArray);
          this.searchInput = "";
        });
      }
    },
  },
  mounted() {},
  computed: {},
});
