$("#botao-frase").click(fraseAleatoria);
$("#botao-frase-id").click(buscaFrase);

// busca aleatoriamente todas as frase do servidor
function fraseAleatoria() {
    $("#spinner").toggle();

    $.get("http://localhost:3000/frases", trocaFraseAleatoria)
    .fail(function() {
        $("#erro").toggle();
        setTimeout(function(){
            $("#erro").toggle()
        }, 2500);
    })
    .always(function () {
        $("#spinner").toggle();
    })
}

// busca frase especifica com GET
function buscaFrase() {
    $("#spinner").toggle();
    var fraseId = $("#frase-id").val();
    var dados = { id: fraseId};
    
    $.get("http://localhost:3000/frases", dados, trocaFrase)
    .fail(function() {
        $("#erro").toggle();
        setTimeout(function(){
            $("#erro").toggle()
        }, 2500);
    })
    .always(function () {
        $("#spinner").toggle();
    })
}


// efetua a troca da frase buscada especificamente
function trocaFrase(data) {
    var frase = $(".frase");
    frase.text(data.texto);
    atualizaTamanhoFrase();
    atualizaTempoInicial(data.tempo);
}

// efetua a troca da frase buscada aleatoriamente
function trocaFraseAleatoria(data) {
    var frase = $(".frase");
    var numeroAleatorio = Math.floor(Math.random() * data.length);
    frase.text(data[numeroAleatorio].texto);
    atualizaTamanhoFrase();
    atualizaTempoInicial(data[numeroAleatorio].tempo);
}