function limpa_formulário_cep() {
  document.getElementById("rua").value = "";
  document.getElementById("bairro").value = "";
  document.getElementById("cidade").value = "";
  document.getElementById("uf").value = "";
}

function meu_callback(conteudo) {
  if (!("erro" in conteudo)) {
    document.getElementById("rua").value = conteudo.logradouro;
    document.getElementById("bairro").value = conteudo.bairro;
    document.getElementById("cidade").value = conteudo.localidade;
    document.getElementById("uf").value = conteudo.uf;
  } else {
    limpa_formulário_cep();
    alert("CEP não encontrado.");
  }
}

function pesquisacep(valor) {
  var cep = valor.replace(/\D/g, "");

  if (cep != "") {
    var validacep = /^[0-9]{8}$/;

    if (validacep.test(cep)) {
      document.getElementById("rua").value = "...";
      document.getElementById("bairro").value = "...";
      document.getElementById("cidade").value = "...";
      document.getElementById("uf").value = "...";

      var script = document.createElement("script");

      script.src =
        "https://viacep.com.br/ws/" + cep + "/json/?callback=meu_callback";

      document.body.appendChild(script);
    } else {
      limpa_formulário_cep();
      alert("Formato de CEP inválido.");
    }
  } else {
    limpa_formulário_cep();
  }
}

const apiUrl = "https://brasilapi.com.br/api/banks/v1";

async function getBancos() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    const selectBanco = document.getElementById("selectBanco");

    const defaultOption = document.createElement("option");
    defaultOption.text = "Selecione um banco";
    defaultOption.value = "";
    selectBanco.appendChild(defaultOption);

    data.forEach((banco) => {
      const option = document.createElement("option");
      option.text = banco.name;
      option.value = banco.code;
      selectBanco.appendChild(option);
    });
  } catch (error) {
    console.error("Erro ao obter bancos:", error);
  }
}

document.addEventListener("DOMContentLoaded", getBancos);
