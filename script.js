// Exercício Hora do Dia
function carregar() {
    var msg = document.getElementById('msg');
    var img = document.getElementById('imagem');
    var data = new Date();
    var hora = data.getHours();
    msg.innerHTML = `Agora são ${hora} horas`;
    if (hora >= 0 && hora < 12) {
        // Bom Dia
        img.src = 'manha.jpg';
        document.body.style.background = '#d0c1a0';
    } else if (hora >= 12 && hora < 18) {
        // Boa Tarde
        img.src = 'tarde.jpg';
        document.body.style.background = '#b9846f';
    } else {
        // Boa Noite
        img.src = 'noite.jpg';
        document.body.style.background = '#515154';
    }
}

// Evento carregado pelo JS, sem inline no HTML
window.addEventListener('load', carregar);
// Fim do Exercício Hora do Dia


// Exercício Verificador de Idade
function verificar() {
    var data = new Date();
    var ano = data.getFullYear();
    var fano = document.getElementById('txtano');
    var res = document.getElementById('resIdade'); // ID corrigido
    if (fano.value.length == 0 || Number(fano.value) > ano) {
        alert('[ERRO] Verifique os dados e tente novamente!');
    } else {
        var fsex = document.getElementsByName('radsex');
        var idade = ano - Number(fano.value);
        var genero = '';
        var faixa = '';

        if (fsex[0].checked) {
            genero = 'Homem';
        } else {
            genero = 'Mulher';
        }

        if (idade >= 0 && idade < 10) {
            faixa = 'Criança';
        } else if (idade < 21) {
            faixa = 'Jovem';
        } else if (idade < 60) {
            faixa = 'Adulto';
        } else {
            faixa = 'Idoso';
        }

        res.style.textAlign = 'center';
        res.innerHTML = `Detectamos ${genero} com ${idade} anos. (${faixa})`;
    }
}
// Fim do Exercício Verificador de Idade


// Exercício Contador
function contar() {
    var ini = document.getElementById('txti');
    var fim = document.getElementById('txtf');
    var passo = document.getElementById('txtp');
    var resultado = document.getElementById('resultado');

    if (ini.value.length == 0 || fim.value.length == 0 || passo.value.length == 0) {
        resultado.innerHTML = 'Impossível contar!';
        window.alert('[ERRO] Faltam dados!');
    } else {
        resultado.innerHTML = 'Contando: <br>';
        var i = Number(ini.value);
        var f = Number(fim.value);
        var p = Number(passo.value);
        if (p <= 0) {
            window.alert('Passo inválido! Considerando PASSO 1');
            p = 1;
        }
        if (i < f) {
            // Contagem crescente
            for (var c = i; c <= f; c += p) {
                resultado.innerHTML += ` ${c} \u{1F449} `;
            }
        } else {
            // Contagem regressiva
            for (var c = i; c >= f; c -= p) {
                resultado.innerHTML += ` ${c} \u{1F449} `;
            }
        }
        resultado.innerHTML += `\u{1F3C1}`;
    }
}
// Fim do Exercício Contador


// Exercício Tabuada
function tabuada() {
    var campo = document.getElementById('txtnumero'); // nome diferente para evitar redeclaração
    var tabSelect = document.getElementById('seltabuada');

    if (campo.value.length === 0) {
        window.alert('Por favor, digite um número!');
    } else {
        var numero = Number(campo.value);
        var c = 1;
        tabSelect.innerHTML = '';
        while (c <= 10) {
            var item = document.createElement('option');
            item.text = `${numero} x ${c} = ${numero * c}`;
            item.value = `tab${c}`;
            tabSelect.appendChild(item);
            c++;
        }
    }
}
// Fim do Exercício Tabuada


// Analisador de Números
let num = document.querySelector('input#fnum');
let lista = document.querySelector('select#flista');
let resAnalisador = document.querySelector('div#resAnalisador'); // ID corrigido
let valores = [];

function isNumero(n) {
    return Number(n) >= 1 && Number(n) <= 100;
}

function inLista(n, l) {
    return l.indexOf(Number(n)) !== -1;
}

function adicionar() { // corrigido: era Adicionar() no HTML mas adicionar() no JS
    if (isNumero(num.value) && !inLista(num.value, valores)) {
        valores.push(Number(num.value));
        let item = document.createElement('option');
        item.text = `Valor ${num.value} adicionado.`;
        lista.appendChild(item);
        resAnalisador.innerHTML = '';
    } else {
        window.alert('Valor inválido ou já encontrado na lista.');
    }
    num.value = '';
    num.focus();
}

function finalizar() {
    if (valores.length == 0) {
        window.alert('Adicione valores antes de finalizar!');
    } else {
        let tot = valores.length;
        let maior = valores[0];
        let menor = valores[0];
        let soma = 0;
        for (let pos in valores) {
            soma += valores[pos];
            if (valores[pos] > maior) maior = valores[pos];
            if (valores[pos] < menor) menor = valores[pos];
        }
        let media = soma / tot;
        resAnalisador.innerHTML = `<p>Ao todo, temos ${tot} números cadastrados.</p>`;
        resAnalisador.innerHTML += `<p>O maior valor informado foi ${maior}.</p>`;
        resAnalisador.innerHTML += `<p>O menor valor informado foi ${menor}.</p>`;
        resAnalisador.innerHTML += `<p>A soma de todos os valores é ${soma}.</p>`;
        resAnalisador.innerHTML += `<p>A média dos valores é ${media.toFixed(2)}.</p>`;
    }
}