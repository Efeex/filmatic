$(function () {
  var actorCardTpl = Handlebars.compile($("#actor-card").html()),
    movieCardTpl = Handlebars.compile($("#movie-card").html());

  var apiKey = "855d0f27ac90850576cebfa7bc46b9f6";
      searchInput = $("#actor-name"),
      container = $("#movies-container");

  form = $("#actor-search");

  form.on("submit", function (e) { // Callback al click sul pulsante di ricerca

    var actorName = searchInput.val(); // Estrazione del valore del campo di input dal container: https://api.$.com/data/#data2

    if (!actorName) return; // Se la stringa di ricerca e vuota, non fare nulla

    jQuery.getJSON( // Chiamata AJAX con risposta di tipo JSON: https://api.jquery.com/jQuery.getJSON/
      "https://api.themoviedb.org/3/search/person", // Url dell'API per la ricerca degli attori
      {
        "api_key": apiKey,
        "query": actorName
      },

      function (actors) { // Funzione di callback, eseguita dopo aver ricevuto la risposta

        var actor = actors.results[0],
          actorId = actor.id;

        $("#actor-title").text(actor.name); // Scrivo il nome dell'attore nel titolo

        container.empty();

        container.append(actorCardTpl(actor));

        jQuery.getJSON(
          "https://api.themoviedb.org/3/discover/movie", // Url dell'API per la ricerca dei film per attore
          {
            "api_key": apiKey,
            "with_cast": actorId,
            "sort_by": "release_date.desc", // Dal più recente al più vecchio per data di uscita
            "language": "it-IT" // Sinossi in lingua italiana
          },
          function (movies) {
            var lastMovies = 12;

            movies.results.slice(0, lastMovies).forEach(function (movie) { // Ciclo sui primi 12 film
              container.append(movieCardTpl(movie));
            });

            e.preventDefault();

          });
      })
  });
});
