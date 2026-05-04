// Exercício Hora do Dia
function carregar() {
    var msg = document.getElementById('msg');
    var img = document.getElementById('imagem');
    var data = new Date();
    var hora = data.getHours();
    msg.innerHTML = `Agora são ${hora} horas`;
    if (hora >= 0 && hora < 12) {
        img.src = 'manha.jpg';
        document.body.style.background = '#d0c1a0';
    } else if (hora >= 12 && hora < 18) {
        img.src = 'tarde.jpg';
        document.body.style.background = '#b9846f';
    } else {
        img.src = 'noite.jpg';
        document.body.style.background = '#515154';
    }
}

window.addEventListener('load', carregar);
// Fim do Exercício Hora do Dia


// Exercício Verificador de Idade
function verificar() {
    var data = new Date();
    var anoAtual = data.getFullYear();
    var fano = document.getElementById('txtano');
    var res = document.getElementById('resIdade');
    var anoValor = Number(fano.value);

    // MELHORIA: ano deve ser positivo (> 0) e não pode ultrapassar o ano atual
    if (fano.value.length == 0 || anoValor <= 0 || anoValor > anoAtual) {
        alert('[ERRO] Verifique os dados e tente novamente!');
    } else {
        var fsex = document.getElementsByName('radsex');
        var idade = anoAtual - anoValor;
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
            // MELHORIA: var → let para escopo correto de bloco
            for (let c = i; c <= f; c += p) {
                resultado.innerHTML += ` ${c} \u{1F449} `;
            }
        } else {
            // MELHORIA: var → let para escopo correto de bloco
            for (let c = i; c >= f; c -= p) {
                resultado.innerHTML += ` ${c} \u{1F449} `;
            }
        }
        resultado.innerHTML += `\u{1F3C1}`;
    }
}
// Fim do Exercício Contador


// Exercício Tabuada
function tabuada() {
    var campo = document.getElementById('txtnumero');
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
// MELHORIA: encapsulado em objeto para não poluir o escopo global
const Analisador = {
    valores: [],

    elementos: {
        get num()       { return document.querySelector('input#fnum'); },
        get lista()     { return document.querySelector('select#flista'); },
        get resultado() { return document.querySelector('div#resAnalisador'); }
    },

    isNumero(n) {
        return Number(n) >= 1 && Number(n) <= 100;
    },

    inLista(n) {
        return this.valores.indexOf(Number(n)) !== -1;
    },

    adicionar() {
        const { num, lista, resultado } = this.elementos;
        if (this.isNumero(num.value) && !this.inLista(num.value)) {
            this.valores.push(Number(num.value));
            let item = document.createElement('option');
            item.text = `Valor ${num.value} adicionado.`;
            lista.appendChild(item);
            resultado.innerHTML = '';
        } else {
            window.alert('Valor inválido ou já encontrado na lista.');
        }
        num.value = '';
        num.focus();
    },

    finalizar() {
        const { resultado } = this.elementos;
        if (this.valores.length == 0) {
            window.alert('Adicione valores antes de finalizar!');
        } else {
            let tot = this.valores.length;
            let maior = this.valores[0];
            let menor = this.valores[0];
            let soma = 0;
            for (let pos in this.valores) {
                soma += this.valores[pos];
                if (this.valores[pos] > maior) maior = this.valores[pos];
                if (this.valores[pos] < menor) menor = this.valores[pos];
            }
            let media = soma / tot;
            resultado.innerHTML = `<p>Ao todo, temos ${tot} números cadastrados.</p>`;
            resultado.innerHTML += `<p>O maior valor informado foi ${maior}.</p>`;
            resultado.innerHTML += `<p>O menor valor informado foi ${menor}.</p>`;
            resultado.innerHTML += `<p>A soma de todos os valores é ${soma}.</p>`;
            resultado.innerHTML += `<p>A média dos valores é ${media.toFixed(2)}.</p>`;
        }
    },

    // MELHORIA: resetar sem precisar recarregar a página
    resetar() {
        this.valores = [];
        this.elementos.lista.innerHTML = '';
        this.elementos.resultado.innerHTML = 'Olá, tudo bem?';
        this.elementos.num.value = '';
        this.elementos.num.focus();
    }
};

// Funções globais que delegam para o objeto — compatíveis com onclick do HTML
function adicionar() { Analisador.adicionar(); }
function finalizar()  { Analisador.finalizar(); }
function resetar()    { Analisador.resetar(); }