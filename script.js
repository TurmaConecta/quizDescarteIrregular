const perguntas = [
{
pergunta: "1. O que é descarte irregular de resíduos?",
alternativas: [
    "A) Separar o lixo reciclável do orgânico.",
    "B) Jogar resíduos em locais não autorizados.",
    "C) Utilizar lixeiras públicas corretamente.",
    "D) Fazer compostagem doméstica."
],
correta: 1,
explicacao: "Descarte irregular é deixar lixo em locais inadequados."
},

{
pergunta: "2. Qual é uma consequência do descarte irregular de lixo?",
alternativas: [
    "A) Melhora da qualidade da água.",
    "B) Aumento da biodiversidade.",
    "C) Entupimento de bueiros e enchentes.",
    "D) Redução da poluição ambiental."
],
correta: 2,
explicacao: "O lixo pode bloquear a passagem da água."
},

{
pergunta: "3. Onde o óleo de cozinha usado deve ser descartado?",
alternativas: [
    "A) Na pia da cozinha.",
    "B) No vaso sanitário.",
    "C) Em pontos de coleta específicos.",
    "D) No lixo orgânico."
],
correta: 2,
explicacao: "O óleo pode poluir a água e deve ser reciclado."
},

{
pergunta: "4. Qual destes materiais pode causar contaminação do solo quando descartado incorretamente?",
alternativas: [
    "A) Folhas secas.",
    "B) Cascas de frutas.",
    "C) Pilhas e baterias.",
    "D) Papel reciclado."
],
correta: 2,
explicacao: "Contêm substâncias tóxicas que contaminam o solo."
},

{
pergunta: "5. O descarte irregular de lixo pode favorecer a proliferação de:",
alternativas: [
    "A) Polinizadores.",
    "B) Animais domésticos.",
    "C) Vetores de doenças, como ratos e mosquitos.",
    "D) Árvores nativas."
],
correta: 2,
explicacao: "O acúmulo de lixo favorece esses animais."
},

{
pergunta: "6. Qual atitude ajuda a evitar o descarte irregular?",
alternativas: [
    "A) Jogar resíduos em terrenos baldios.",
    "B) Utilizar os sistemas de coleta adequados.",
    "C) Abandonar móveis velhos em calçadas.",
    "D) Descartar eletrônicos em rios."
],
correta: 1,
explicacao: "Destinar corretamente os resíduos evita poluição."
},

{
pergunta: "7. O que deve ser feito com aparelhos eletrônicos quebrados?",
alternativas: [
    "A) Jogá-los no lixo comum.",
    "B) Enterrá-los no quintal.",
    "C) Levá-los a pontos de coleta de lixo eletrônico.",
    "D) Descartá-los em áreas verdes."
],
correta: 2,
explicacao: "Eletrônicos possuem componentes que exigem descarte especial."
},

{
pergunta: "8. Qual é o impacto do descarte irregular em rios e córregos?",
alternativas: [
    "A) Aumento da qualidade da água.",
    "B) Redução da poluição.",
    "C) Contaminação da água e prejuízo à vida aquática.",
    "D) Melhora da navegação."
],
correta: 2,
explicacao: "O lixo polui os rios e afeta animais e plantas."
},

{
pergunta: "9. Quem é responsável pelo descarte correto dos resíduos?",
alternativas: [
    "A) Apenas a prefeitura.",
    "B) Apenas empresas privadas.",
    "C) Toda a sociedade.",
    "D) Apenas órgãos ambientais."
],
correta: 2,
explicacao: "A responsabilidade pelo descarte correto é de todos."
},

{
pergunta: "10. Qual destes resíduos geralmente possui coleta especial?",
alternativas: [
    "A) Restos de alimentos.",
    "B) Papel higiênico usado.",
    "C) Medicamentos vencidos.",
    "D) Guardanapos limpos."
],
correta: 2,
explicacao: "Podem contaminar o meio ambiente e precisam de coleta especial."
}

];

let perguntaAtual = 0;
let pontos = 0;
let tempo = 0;
let intervalo;
let erros = [];

const telaInicial = document.getElementById("telaInicial");
const telaQuiz = document.getElementById("telaQuiz");
const telaFinal = document.getElementById("telaFinal");

const perguntaElemento = document.getElementById("pergunta");
const alternativasElemento = document.getElementById("alternativas");

const contadorPergunta = document.getElementById("contadorPergunta");
const barraProgresso = document.getElementById("barraProgresso");

const resultadoElemento = document.getElementById("resultado");
const cronometro = document.getElementById("cronometro");
const relatorioErros = document.getElementById("relatorioErros");

function iniciarQuiz() {
    perguntaAtual = 0;
    pontos = 0;
    tempo = 0;
    erros = [];

    barraProgresso.style.width = "0%";
    relatorioErros.innerHTML = "";

    cronometro.textContent = "Tempo: 0s";

    telaInicial.style.display = "none";
    telaFinal.style.display = "none";
    telaQuiz.style.display = "block";

    intervalo = setInterval(() => {
        tempo++;
        cronometro.textContent = `Tempo: ${tempo}s`;
    }, 1000);

    mostrarPergunta();
}

function mostrarPergunta() {
    alternativasElemento.innerHTML = "";

    contadorPergunta.textContent =
        `Pergunta ${perguntaAtual + 1} de ${perguntas.length}`;

    let progresso =
        (perguntaAtual / perguntas.length) * 100;

    barraProgresso.style.width = progresso + "%";

    perguntaElemento.textContent =
        perguntas[perguntaAtual].pergunta;

    perguntas[perguntaAtual].alternativas.forEach(
        (alternativa, indice) => {

            const botao = document.createElement("button");

            botao.textContent = alternativa;

            botao.onclick = () =>
                verificarResposta(indice);

            alternativasElemento.appendChild(botao);
        }
    );
}

function verificarResposta(respostaSelecionada) {
    const perguntaAtualObj = perguntas[perguntaAtual];

    if (respostaSelecionada === perguntaAtualObj.correta) {
        pontos++;
    } else {
        erros.push({
            pergunta: perguntaAtualObj.pergunta,
            respostaCorreta:
                perguntaAtualObj.alternativas[
                    perguntaAtualObj.correta
                ],
            explicacao: perguntaAtualObj.explicacao
        });
    }

    perguntaAtual++;

    if (perguntaAtual < perguntas.length) {
        mostrarPergunta();
    } else {
        finalizarQuiz();
    }
}

function finalizarQuiz() {
    clearInterval(intervalo);

    barraProgresso.style.width = "100%";

    telaQuiz.style.display = "none";
    telaFinal.style.display = "block";

    resultadoElemento.innerHTML = `
        <strong>Pontuação:</strong> ${pontos}/${perguntas.length}
        <br><br>
        <strong>Tempo:</strong> ${tempo} segundos
    `;

    relatorioErros.innerHTML = "";

    if (erros.length > 0) {
        relatorioErros.innerHTML =
            "<h2>Questões que você errou:</h2>";

        erros.forEach(erro => {
            relatorioErros.innerHTML += `
                <div class="erro">
                    <h3>${erro.pergunta}</h3>

                    <p>
                        <strong>Resposta correta:</strong>
                        ${erro.respostaCorreta}
                    </p>

                    <p>
                        <strong>Explicação:</strong>
                        ${erro.explicacao}
                    </p>
                </div>
            `;
        });

    } else {
        relatorioErros.innerHTML = `
            <h2>🎉 Parabéns! Você acertou todas as questões!</h2>
        `;
    }
}

function reiniciarQuiz() {
    clearInterval(intervalo);

    perguntaAtual = 0;
    pontos = 0;
    tempo = 0;
    erros = [];

    barraProgresso.style.width = "0%";

    telaFinal.style.display = "none";
    telaQuiz.style.display = "none";
    telaInicial.style.display = "block";
}

const conteudos = [

{
titulo: "1. O que é o descarte irregular de resíduos?",
texto: `
Conteúdo: É o descarte de lixo, entulho, móveis, eletrônicos ou qualquer outro resíduo em locais não autorizados, como terrenos baldios, ruas, rios e áreas verdes.
Por que importa: Essa prática prejudica o meio ambiente, a saúde pública e a qualidade de vida da população.
Dado: Milhões de toneladas de resíduos são descartadas inadequadamente todos os anos, causando impactos ambientais significativos.
`
},

{
titulo: "2. O que pode ser considerado descarte irregular?",
texto: `
Conteúdo: Jogar lixo em vias públicas, abandonar entulho em terrenos, descartar móveis velhos em calçadas, lançar resíduos em rios e deixar eletrônicos em locais inadequados.
Por que importa: Esses resíduos podem contaminar o solo, a água e favorecer a proliferação de pragas urbanas.
Exemplo: Um sofá abandonado em terreno baldio ou restos de construção descartados em áreas públicas.
`
},

{
titulo: "3. Como fazer o descarte correto?",
texto: `
Conteúdo: Separar resíduos recicláveis, utilizar a coleta seletiva, encaminhar eletrônicos para pontos de coleta específicos e contratar serviços autorizados para remoção de entulho.
Por que importa: O descarte adequado reduz a poluição e permite a reciclagem de materiais.
Dica: Consulte os ecopontos e programas de coleta seletiva da sua cidade.
`
},

{
titulo: "4. O que é uma sequência de descarte irregular?",
texto: `
Conteúdo: É a repetição constante do descarte inadequado em um mesmo local, gerando acúmulo progressivo de resíduos.
Por que importa: Quanto mais resíduos se acumulam, maiores são os riscos ambientais e sanitários.
Exemplo: Um terreno baldio que recebe lixo regularmente acaba se tornando um lixão clandestino.
`
},

{
titulo: "5. O descarte irregular favorece a proliferação de:",
texto: `
Conteúdo: Vetores de doenças, principalmente ratos, baratas, escorpiões e o mosquito Aedes aegypti.
Por que importa: Lixo acumulado = comida + abrigo + água parada. É o combo perfeito para dengue, zika, chikungunya e leptospirose.
Dado: Grande parte dos focos urbanos do mosquito da dengue está associada ao descarte inadequado de resíduos e recipientes que acumulam água.
`
},

{
titulo: "6. Gestão de resíduos",
texto: `
Conteúdo: É o conjunto de ações voltadas para coleta, transporte, tratamento, reciclagem e destinação final adequada dos resíduos.
Por que importa: Uma boa gestão reduz impactos ambientais e melhora a qualidade de vida da população.
Benefício: Menos lixo em aterros, mais reciclagem e melhor aproveitamento dos recursos.
`
},

{
titulo: "7. A importância dos catadores",
texto: `
Conteúdo: Os catadores coletam, separam e encaminham materiais recicláveis para reaproveitamento.
Por que importa: Eles contribuem para a redução do lixo e para a geração de renda através da reciclagem.
Dado: Grande parte dos materiais recicláveis recuperados no Brasil passa pelo trabalho dos catadores.
`
},

{
titulo: "8. Resíduos eletrônicos",
texto: `
Conteúdo: Incluem celulares, computadores, televisores, pilhas, baterias e outros equipamentos eletrônicos descartados.
Por que importa: Esses materiais possuem metais pesados e substâncias tóxicas que podem contaminar o solo e a água.
Dica: Procure pontos de coleta específicos para eletrônicos e nunca descarte esses itens no lixo comum.
`
},

{
titulo: "9. Coleta especial",
texto: `
Conteúdo: Serviço destinado ao recolhimento de resíduos que exigem tratamento diferenciado, como entulho, móveis, pneus e eletrônicos.
Por que importa: Evita o descarte irregular e garante a destinação ambientalmente correta dos materiais.
Exemplo: Ecopontos e programas municipais de recolhimento de volumosos.
`
},

{
titulo: "10. Principais riscos do descarte irregular",
texto: `
Conteúdo: Contaminação do solo e da água, proliferação de doenças, enchentes e degradação ambiental.
Por que importa: Os impactos afetam tanto o meio ambiente quanto a saúde da população.
Exemplo: Resíduos descartados em bueiros podem causar alagamentos durante períodos de chuva.
`
},

{
titulo: "11. Consequências do descarte irregular",
texto: `
Conteúdo: Problemas de saúde pública, poluição ambiental, prejuízos econômicos e redução da qualidade de vida.
Por que importa: Além dos danos ambientais, os custos de limpeza e recuperação das áreas afetadas são elevados.
Consequência: Os responsáveis podem receber multas e outras penalidades previstas na legislação ambiental.
`
}


];

function mostrarConteudo(indice){

    const conteudo =
        document.getElementById("conteudoExtra");

    conteudo.innerHTML = `

        <h3>${conteudos[indice].titulo}</h3>

        <p>
            ${conteudos[indice].texto.replace(/\n/g,"<br>")}
        </p>

    `;
}
