function cadastrarAluno() {
    const nome = document.getElementById('nome').value;
    const valor = document.getElementById('valor').value;
    const grau = document.getElementById('prajied').value;
    const status = document.getElementById('status_financeiro').value;

    // Validação
    if (!nome || !valor) {
        alert("Preencha o nome e o valor da mensalidade!");
        return;
    }

    // Carregar lista atual
    let alunos = JSON.parse(localStorage.getItem('bd_academia_thai')) || [];

    // Adicionar novo
    alunos.push({ nome, grau, valor, status });

    // Salvar
    localStorage.setItem('bd_academia_thai', JSON.stringify(alunos));

    // Limpar campos e atualizar tela
    document.getElementById('nome').value = "";
    document.getElementById('valor').value = "";
    desenharTabela();
}

function desenharTabela() {
    const lista = document.getElementById('listaAlunos');
    let alunos = JSON.parse(localStorage.getItem('bd_academia_thai')) || [];
    lista.innerHTML = "";

    alunos.forEach((aluno, index) => {
        const classeStatus = aluno.status === 'pago' ? 'pago' : 'pendente';
        const textoStatus = aluno.status === 'pago' ? 'PAGO' : 'DEVENDO';

        lista.innerHTML += `
            <tr>
                <td><strong>${aluno.nome}</strong></td>
                <td>${aluno.grau}</td>
                <td>R$ ${aluno.valor}</td>
                <td class="${classeStatus}">${textoStatus}</td>
                <td><button class="btn-delete" onclick="removerAluno(${index})">Remover</button></td>
            </tr>
        `;
    });

    document.getElementById('numAlunos').innerText = alunos.length;
}

function removerAluno(index) {
    let alunos = JSON.parse(localStorage.getItem('bd_academia_thai')) || [];
    if(confirm("Deseja remover este aluno?")) {
        alunos.splice(index, 1);
        localStorage.setItem('bd_academia_thai', JSON.stringify(alunos));
        desenharTabela();
    }
}

// Inicia a tabela ao abrir o site
window.onload = desenharTabela;
