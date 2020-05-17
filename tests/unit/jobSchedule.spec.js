const JobSchedule = require('../../src/jobSchedule.js');

const testJobs1 = JobSchedule.jobSchedule({startTime: '2019-11-10 09:00:00',
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

const testJobs2 = JobSchedule.jobSchedule({startTime: '2019-11-10 09:00:00',
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
    },
   
  ]);

describe('Jobs return', () => {
  
  it('matches if the return of jobs is an array ', () => {
    expect(Array.isArray(testJobs1));
  });
  
});

describe('Jobs return', () => {
  const expected = [ [ 1, 3 ], [ 2 ] ];
  it('matches when the jobs have maximum 8 hours in each array ', () => {
    expect(testJobs1).toEqual(expect.arrayContaining(expected));
  });
 
});

describe('Jobs return', () => {
  const expected = [ [ 1, 3 ], [ 2, 4 ] ];
  it('adding new job for a new test of 8 hours maximum', () => {
    expect(testJobs2).toEqual(expect.arrayContaining(expected));
  });
 
});