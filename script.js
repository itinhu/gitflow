const formulario = document.getElementById("formulario-cadastro");
const nome = document.getElementById("nome");
const email = document.getElementById("email");
const senha = document.getElementById("senha");
const confirmacaoSenha = document.getElementById("confirmacao-senha");
const mensagem = document.getElementById("mensagem");
const campos = [nome, email, senha, confirmacaoSenha];

// A validação é acionada pelo JavaScript para exibir também a mensagem na tela.
formulario.noValidate = true;

function limparMensagem() {
  mensagem.textContent = "";
  mensagem.className = "mensagem";
}

function validarCampos() {
  nome.setCustomValidity(
    nome.value.trim().length < 3
      ? "Informe um nome com pelo menos 3 caracteres."
      : ""
  );

  confirmacaoSenha.setCustomValidity(
    confirmacaoSenha.value !== senha.value
      ? "As senhas precisam ser iguais."
      : ""
  );

  campos.forEach((campo) => {
    campo.setAttribute("aria-invalid", String(!campo.validity.valid));
  });

  return formulario.checkValidity();
}

campos.forEach((campo) => {
  campo.addEventListener("input", () => {
    campo.setCustomValidity("");
    campo.removeAttribute("aria-invalid");
    limparMensagem();

    // Uma alteração na senha também pode corrigir a confirmação.
    if (campo === senha) {
      confirmacaoSenha.setCustomValidity("");
      confirmacaoSenha.removeAttribute("aria-invalid");
    }
  });
});

formulario.addEventListener("submit", (evento) => {
  evento.preventDefault();
  nome.value = nome.value.trim();
  email.value = email.value.trim();

  if (!validarCampos()) {
    mensagem.textContent = "Confira os campos indicados e tente novamente.";
    mensagem.className = "mensagem erro";
    formulario.reportValidity();
    return;
  }

  // Esta atividade simula o cadastro no navegador, sem armazenar os dados.
  formulario.reset();
  campos.forEach((campo) => campo.removeAttribute("aria-invalid"));
  mensagem.textContent = "Cadastro validado com sucesso! Esta é uma simulação; os dados não foram salvos.";
  mensagem.className = "mensagem sucesso";
});
