// funcao que recebe um objeto que possui a janela de execucao com data e hora de inicio e fim mais a massa de dados
// antes de executar a funcao, validar se as datas maximas de conclusão batem com a janela de execução
// calcular na ordem de datas o prazo maximo de 8 horas para cada array de job retornado

const dateFNS = require('date-fns');
const dateTZ = require('date-fns-tz');

const ArrayComparer =  require('./util/arrayComparer.js');


function jobSchedule(executionWindow, data) {

  const jobsArray = [];
  const ids= [];
  const executionMaxTime = 8;

  //creating a prototype to find an array in a array
  Array.prototype.containsArray = function(val) {
    var hash = {};
    for(var i=0; i<this.length; i++) {
        hash[this[i]] = i;
    }
    return hash.hasOwnProperty(val);
  }

  //converting received start time date from string to date
  const parsedToDateStartTime = dateFNS.parseISO(executionWindow.startTime);
  const znDateStartTime = dateTZ.zonedTimeToUtc(parsedToDateStartTime, 'America/Sao_Paulo');
  const parsedToDateEndTime = dateFNS.parseISO(executionWindow.endTime);
  const znDateEndTime = dateTZ.zonedTimeToUtc(parsedToDateEndTime, 'America/Sao_Paulo');

  for(let i = 0; i < data.length; i++){
    //converting received conclusion job time date from string to date and comparing with start time date
    const parsedToDateDataMaxima = dateFNS.parseISO(data[i].dataMaxima);
    const znDateDataMaxima = dateTZ.zonedTimeToUtc(parsedToDateDataMaxima, 'America/Sao_Paulo');
    const compareDataMaximaWithStartTime = dateFNS.compareAsc(znDateDataMaxima, znDateStartTime);
    const compareDataMaximaWithEndTime = dateFNS.compareAsc(znDateDataMaxima, znDateEndTime);

    
    if(compareDataMaximaWithStartTime === -1){
     console.log("Data máxima de conclusão do job é menor do que a data inicial de execucao logo não será computada")
    }
    if(compareDataMaximaWithEndTime === 1){
     console.log(compareDataMaximaWithEndTime + "Data máxima de conclusão do job é maior do que a data inicial de execucao logo não será computada")
    }

    //dates is ok and will be runned
    if((compareDataMaximaWithStartTime === 1 || compareDataMaximaWithStartTime === 0) && 
       (compareDataMaximaWithEndTime === -1 || compareDataMaximaWithEndTime === 0)){
         jobsArray.push(data[i])
    }
    
  }

  //ordering by asc conclusion date
  jobsArray.sort(function(a,b){
    return new Date(a.dataMaxima) - new Date(b.dataMaxima);
  });

  // executing according business rules
  for(let k = 0; k < jobsArray.length; k++) {
    for(let j = k+1;  j < jobsArray.length; j++) {
      if(jobsArray[k].tempoEstimado + jobsArray[j].tempoEstimado <= executionMaxTime){
        //testing if we already have the same id in the array, if it does, replace it with job ids with a maximum of 8 hours
        if(ids.containsArray([jobsArray[k].id]) || ids.containsArray([jobsArray[j].id])){
          const indexk = ArrayComparer.indexOf(ids, [jobsArray[k].id], ArrayComparer.arraysIdentical);
          const indexj = ArrayComparer.indexOf(ids, [jobsArray[j].id], ArrayComparer.arraysIdentical);
        
          if(indexk !== -1){
            ids[indexk] = [jobsArray[k].id,jobsArray[j].id];
            break;
          }
          if(indexj !== -1){
            ids[indexj] = [jobsArray[k].id,jobsArray[j].id];
            break;
          }

        } 
        else {
          ids.push([jobsArray[k].id,jobsArray[j].id]);
          break;
        }
          
      }
      else {
        ids.push([jobsArray[j].id]);
        break;
      } 
      
    }
  }

  console.log(ids)
 
  return ids;

}




jobSchedule({startTime: '2019-11-10 09:00:00',
  endTime: '2019-11-11 12:00:00'}, [
    {
    "id": 1,
    "descricao": "Importação de arquivos de fundos",
    "dataMaxima": '2019-11-10 12:00:00',
    "tempoEstimado": 2 ,
    },
    {
    "id": 2,
    "descricao": "Importação de dados da Base Legada",
    "dataMaxima": '2019-11-11 12:00:00',
    "tempoEstimado": 4 ,
    },
    {
    "id": 3,
    "descricao": "Importação de dados de integração",
    "dataMaxima": '2019-11-11 08:00:00',
    "tempoEstimado": 6 ,
    },
    {
      "id": 4,
      "descricao": "Importação de dados da Base Legada",
      "dataMaxima": '2019-11-11 12:00:00',
      "tempoEstimado": 4 ,
      }
  ]);
