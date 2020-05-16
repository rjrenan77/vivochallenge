// funcao que recebe um objeto que possui a janela de execucao com data e hora de inicio e fim mais a massa de dados
// antes de executar a funcao, validar se as datas maximas de conclusão batem com a janela de execução
// calcular na ordem de datas o prazo maximo de 8 horas para cada array de job retornado
//exemplo do data
// [
//   {
//   "ID": 1,
//   "Descrição": "Importação de arquivos de fundos",
//   "Data Máxima de conclusão": 2019-11-10 12:00:00,
//   "Tempo estimado": 2 horas,
//   },
//   {
//   "ID": 2,
//   "Descrição": "Importação de dados da Base Legada",
//   "Data Máxima de conclusão": 2019-11-11 12:00:00,
//   "Tempo estimado": 4 horas,
//   },
//   {
//   "ID": 3,
//   "Descrição": "Importação de dados de integração",
//   "Data Máxima de conclusão": 2019-11-11 08:00:00,
//   "Tempo estimado": 6 horas,
//   },
//   ]
//exemplo do executionWindow
/*
{
  startTime: 2019-11-10 09:00:00,
  endTime: 2019-11-11 12:00:00
}


*/
function jobSchedule(executionWindow, data) {
    var endTime = executionWindow;
    console.log(typeof executionWindow);
}
jobSchedule({}, []);
