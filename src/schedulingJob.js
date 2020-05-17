// funcao que recebe um objeto que possui a janela de execucao com data e hora de inicio e fim mais a massa de dados
// antes de executar a funcao, validar se as datas maximas de conclusão batem com a janela de execução
// calcular na ordem de datas o prazo maximo de 8 horas para cada array de job retornado

const dateFNS = require('date-fns');
const dateTZ = require('date-fns-tz');

function jobSchedule(executionWindow, data) {

  const jobsArray = [];
  const executionMaxTime = 8;

  const parsedToDateStartTime = dateFNS.parseISO(executionWindow.startTime);
  const znDateStartTime = dateTZ.zonedTimeToUtc(parsedToDateStartTime, 'America/Sao_Paulo');

  const parsedToDateEndTime = dateFNS.parseISO(executionWindow.endTime);
  const znDateEndTime = dateTZ.zonedTimeToUtc(parsedToDateEndTime, 'America/Sao_Paulo');

  for(let i = 0; i < data.length; i++){

    const parsedToDateDataMaxima = dateFNS.parseISO(data[i].dataMaxima);
    const znDateDataMaxima = dateTZ.zonedTimeToUtc(parsedToDateDataMaxima, 'America/Sao_Paulo');

    const compareDataMaximaWithStartTime = dateFNS.compareAsc(znDateDataMaxima, znDateStartTime);
    const compareDataMaximaWithEndTime = dateFNS.compareAsc(znDateDataMaxima, znDateEndTime);

    //dataMaximaDeConclusao é menor do que a data inicial de execução?
    if(compareDataMaximaWithStartTime === -1){
     console.log(compareDataMaximaWithStartTime + "dataMaximadeConclusao é menor do que a data inicial de execucao")
      
    }

    //dataMaximaDeConclusao é maior do que a data final de execução?
    if(compareDataMaximaWithEndTime === 1){
     console.log(compareDataMaximaWithEndTime + "dataMaximadeConclusao é maior do que a data final de execucao")
    }

    //dataMaximaDeConclusao está entre as datas minimas e maximas de execução?
    if((compareDataMaximaWithStartTime === 1 || compareDataMaximaWithStartTime === 0) && 
       (compareDataMaximaWithEndTime === -1 || compareDataMaximaWithEndTime === 0)){
    
    //  console.log(compareDataMaximaWithStartTime +" " + compareDataMaximaWithEndTime + "dataMaximadeConclusao enta entre as datas de execucao")

      jobsArray.push(data[i])
      
      
    }
    
  }

  //order by asc conclusion date
  jobsArray.sort(function(a,b){
    return new Date(a.dataMaxima) - new Date(b.dataMaxima);
  });

  
  let sum= [];

  for(let k = 0; k < jobsArray.length; k++) {
    for(let j = k+1;  j < jobsArray.length; j++) {
     
      if(jobsArray[k].tempoEstimado + jobsArray[j].tempoEstimado === executionMaxTime){
        sum.push([jobsArray[k].id,jobsArray[j].id])
         break;
      }
      else {
        sum.push([jobsArray[j].id]);
        break;

      } 
        
    }
  }

  console.log(sum)
 
  return jobsArray;

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
   
  ]);
