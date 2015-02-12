"use strict";

var student = {
    name: "Jonathas Amaral",
    born: "02/05/1985",
    weight: 65,
    height: 174
};
  

var trainingPlans = [{
    id: "1",
    description: "Ficha 1",
    startDate: "20150101",
    endDate: "20150201",
    reason: "Observacao da ficha 1",
    exercises: [
        {id:1, name:"Remada Baixa", sets:3, reps:10, weight:12, rest:30},
        {id:2, name:"Puxador Frontal", sets:4, reps:12, weight:35, rest:30},
        {id:3, name:"Supino Inclinado", sets:3, reps:6, weight:25, rest:60}
    ]
  },                     
                     
  {
    id: "2",
    description: "Ficha 2",
    startDate: "20150201",
    endDate: "20150301",
    reason: "Observacao da ficha 2",
    exercises: []
  },
  {
    id: "3",
    description: "Ficha 3",
    startDate: "20150131",
    endDate: "20150331",
    reason: "Observacao da ficha 3",
    exercises: []
  }
  ];
