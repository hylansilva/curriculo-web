const titleName = document.getElementById("titleName");
const titleInfo = document.getElementById("titleInfo");
const titleJob = document.getElementById("titleJob");
const about = document.getElementById("about");
const empresa = document.getElementById("empresa");
const dataEntrada = document.getElementById("dataEntrada");
let dataregex;
const descricao = document.getElementById("descricao")

Parse.initialize(
  "5zAKKIHfzrznp9Exa8g5M9Bg9TXz5dHNEh4rEcbB",
  "upkEMbXI1DFLg5peR8qSeIeEkRm4nYo7MXXfpOFQ"
);
Parse.serverURL = "https://parseapi.back4app.com/";

const DadosPessoais = Parse.Object.extend("DadosPessoais");
const Educacao = Parse.Object.extend("Educacao");
const Experiencia = Parse.Object.extend("Experiencia");
const Hobbies = Parse.Object.extend("Hobbies");

function readDadosPessoais() {
  query = new Parse.Query(DadosPessoais);
  query.find().then(function(name){
      for(let i =0; i < name.length; i++){
        let dado = name[i];
        titleName.innerText = dado.get("nome");
      }
  }).catch(function(error){
      console.log("Error: " + error.code + " " + error.message);       
  });
}

function readDadosExperiencia() {
  query = new Parse.Query(Experiencia);
  query.find().then(function(name){
      for(let i =0; i < name.length; i++){
        let dado = name[i];
        titleInfo.innerText = dado.get("cargo");
        titleJob.innerText = dado.get("cargo");
        empresa.innerText = dado.get("empresa");
        dataregex = dado.get("data");
        dataEntrada.innerText = extrairMesAno(dataregex);
        descricao.innerText = dado.get("descricao");
      }
  }).catch(function(error){
      console.log("Error: " + error.code + " " + error.message);       
  });
}

function readDadosHobbies() {
  query = new Parse.Query(Hobbies);
  query.find().then(function(name){
      for(let i =0; i < name.length; i++){
        let dado = name[i];
        about.innerText = dado.get("descricao");
      }
  }).catch(function(error){
      console.log("Error: " + error.code + " " + error.message);       
  });
}

function extrairMesAno(data) {
  // Extrair o mês e o ano da data usando regex
  var regex = /(\d{2})-(\d{2})-(\d{4})/;
  var match = regex.exec(data);
  
  if (match) {
    var mes = parseInt(match[2], 10);
    var ano = parseInt(match[3], 10);

    // Mapear o número do mês para o nome do mês por extenso
    var meses = [
      "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
      "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ];

    var mesExtenso = meses[mes - 1];

    return mesExtenso + " " + ano;
  } else {
    return null;
  }
}

function downloadPDF() {
  var link = document.createElement('a');
  link.href = 'public/curriculo/curriculoHylanSilva.pdf';
  link.download = 'curriculoHylanSilva.pdf';
  link.click();
}
function read(){
  readDadosPessoais();
  readDadosExperiencia();
  readDadosHobbies();
};

read();