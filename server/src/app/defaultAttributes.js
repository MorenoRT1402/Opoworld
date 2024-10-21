const baseStats = {
    level: 1,
    exp: 0,
    life: 10
  };
  
  const commonAttributes = [
    { name: "Cultura General", value: 1 }
  ];
  
  // Education

  const educationCommons = [
    { name: "Práctico común " , value: 1},
    { name: "Temario", value: 1 },
    { name: "Supuestos Prácticos", value: 1 },
    { name: "Programación", value: 1 }
  ]

  const generalista = [
    ...educationCommons
  ];
  
  const educa = [
    ...educationCommons
  ];
  
  const pt = [
    ...educationCommons
  ];
  
  const ingles = [
    ...educationCommons
  ];
  
  const music = [
    ...educationCommons,
    { name: "Composición", value: 1 },
    { name: "Interpretación", value: 1 }
  ]
  
  // Medicine
  const medicineStats = [
    { name: "Temario", value: 1 }
  ];
  
  // -------------------------------
  const magisterySpecialties = [
    { name: "Generalista", stats: generalista },
    { name: "Pedagogía Terapéutica", stats: pt },
    { name: "Educación Física", stats: educa },
    { name: "Inglés", stats: ingles },
    { name: "Música", stats: music },
  ];
  
  const medicineSpecialties = [
    { name: 'Anatomía Patológica', stats: medicineStats},
    { name: 'Cardiología', stats: medicineStats },
    { name: 'Pediatría', stats: medicineStats },
    { name: 'Cirugía', stats: medicineStats },
    { name: 'Psiquiatría', stats: medicineStats }
  ];
  
  const careers = {
    0 : { name: "Educación Primaria", specialties: magisterySpecialties },
    1 : { name: "Medicina", specialties: medicineSpecialties }
  }
  
  const attributes = {
    baseStats: baseStats,
    common: commonAttributes,
    careers: careers
  };

  const simpleAttributes = [
    { name: "Cultura General", value: 1 },
    { name: 'Temario', value: 1 },
    { name: "Supuesto Práctico", value: 1 },
    { name: "Programación", value: 1 },

    { name: "Corazón", value: 1 }
  ]
    
  module.exports = { attributes, simpleAttributes, baseStats, commonAttributes, careers };  