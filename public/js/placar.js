$("#botao-placar").click(mostraPlacar);

function inserePlacar() {
    var corpoTabela = $(".placar").find("tbody");
    var numPalavras = $("#contador-palavras").text();
    var usuario = "Roque Laecio";
    var linha = novaLinha(usuario,numPalavras);
    linha.find(".botao-remover").click(removeLinha);

    corpoTabela.prepend(linha);

    $(".placar").slideDown(500);
    scrollPlacar();
}

function scrollPlacar() {
    var posicaoPlacar = $(".placar").offset().top
    $("body").animate(
        {
            scrollTop: posicaoPlacar+"px"
        }, 600);
}

function novaLinha(usuario,palavras){
    var linha = $("<tr>");
    var colunaUsuario = $("<td>").text(usuario);
    var colunaPalavras = $("<td>").text(palavras);
    var colunaRemover = $("<td>");
    var link = $("<a>").attr("href","#").addClass("botao-remover");
    var icone = $("<i>").addClass("small").addClass("material-icons").text("delete");

    // Icone dentro do <a>
    link.append(icone);
    // <a> dentro do <td>
    colunaRemover.append(link);
    // Os três <td> dentro do <tr>
    linha.append(colunaUsuario);
    linha.append(colunaPalavras);
    linha.append(colunaRemover);

    return linha;
}

function removeLinha(event){
    event.preventDefault();
    var linha = $(this).parent().parent();
    $(linha).fadeOut(400);
    setTimeout(function() {
        $(linha).remove();
    }, 400);
}


function mostraPlacar() {
    // $(".placar").toggle();
    $(".placar").stop().slideToggle(400);
}