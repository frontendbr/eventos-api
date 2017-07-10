'use strict';

  module.exports.listEvent = function () {

    var examples = [];
    examples.push({
    "date" : "20/02/2017",
    "price" : "100.00",
    "id" : 1,
    "shortDescription" : "Evento para frontends discutirem sobre assuntos bacanas",
    "title" : "Front In Sampa",
    "local" : "Avenida Paulista, 1000",
    "eventLink" : "http://link-para-o-evento.com.br"
  });

    examples.push({
    "date" : "20/02/2017",
    "price" : "100.00",
    "id" : 2,
    "shortDescription" : "Evento para frontends discutirem sobre assuntos bacanas",
    "title" : "Front In Sampa",
    "local" : "Avenida Paulista, 1000",
    "eventLink" : "http://link-para-o-evento.com.br"
    });

    return examples;
  }
