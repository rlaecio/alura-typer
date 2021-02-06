var tempoInicial = $("#tempo-digitacao").text()

$(function(){
    atualizaTamanhoFrase();
    inicializaContatores();
    inicializaCronometro();
    inicializaMarcadores();
    $("#botao-reiniciar").click(reiniciaJogo);
});


function atualizaTamanhoFrase() {
    var frase = $(".frase").text();
    var numPalavras = frase.split(" ").length;
    var tamanhoFrase = $("#tamanho-frase");
    tamanhoFrase.text(numPalavras);
}

var campo = $(".campo-digitacao");
function inicializaContatores() {
    campo.on("input", function(){
        var conteudo = campo.val();
        var qtdPalavras = conteudo.split(/\S+/).length -1;
        $("#contador-palavras").text(qtdPalavras);
        var qtdCaracteres = conteudo.length;
        $("#contador-caracteres").text(qtdCaracteres);
    });
}

function inicializaCronometro() {
    var tempoRestante = tempoInicial;
    campo.one("focus", function() {
        $("#botao-reiniciar").attr("disabled",true);
        var cronometroID = setInterval(function(){
            tempoRestante--;
            $("#tempo-digitacao").text(tempoRestante);
            if (tempoRestante < 1) {
                clearInterval(cronometroID);
                finalizaJogo();
            }
        },1000);
    });
}

function finalizaJogo() {
    campo.attr("disabled", true);
    $("#botao-reiniciar").attr("disabled",false);
    campo.toggleClass("campo-desativado");
    inserePlacar();
}

function inicializaMarcadores() {   
    var frase = $(".frase").text();
    campo.on("input", function(){
        var digitado = campo.val();
        // var comparavel = frase.substr(0 , digitado.length);  // versão jQuery anterior ao ecma6
        // if(digitado == comparavel) {
        var digitouCorreto = frase.startsWith(digitado)
        if (digitouCorreto) {
            campo.addClass("borda-verde");
            campo.removeClass("borda-vermelha");
        } else {
            campo.addClass("borda-vermelha");
            campo.removeClass("borda-verde");
        }
    });
}

function inserePlacar() {
    var corpoTabela = $(".placar").find("tbody");
    var numPalavras = $("#contador-palavras").text();
    var usuario = "Roque Laecio";
    var botaoRemover = "<a href='#'> <i class='small material-icons'>delete</i></a>"

    var linha = "<tr>" +
                    "<td>" + usuario + "</td>" +
                    "<td>" + numPalavras + "</td>" +
                    "<td>" + botaoRemover + "</td>" +
                "</tr>";

    corpoTabela.prepend(linha);
}


$(".botao-remover").click(function(event) {
    event.preventDefault();
    $(this).parent().parent().remove();
});

function reiniciaJogo() {
    campo.attr("disabled", false);
    campo.val("");
    $("#contador-palavras").text("0");
    $("#contador-caracteres").text("0");
    $("#tempo-digitacao").text(tempoInicial);
    inicializaCronometro();
    campo.toggleClass("campo-desativado");
    campo.removeClass("borda-verde");
    campo.removeClass("borda-vermelha");
}
