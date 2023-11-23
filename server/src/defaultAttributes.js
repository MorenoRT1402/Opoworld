const baseStats = {
    level: 1,
    exp: 0,
    life: 10
  };
  
  const commonAttributes = [
    { name: "Cultura General", value: 1 }
  ];
  
  // Education
  const generalista = [
    { name: 'Generalista', value: 1 },
    { name: 'Temario', value: 1 },
    { name: "Supuesto Práctico", value: 1 }
  ];
  
  const educa = [
    { name: "Temario", value: 1 },
    { name: "Supuesto Práctico", value: 1 }
  ];
  
  const pt = [
    { name: "Temario", value: 1 },
    { name: "Supuestos Prácticos", value: 1 },
    { name: "Programación", value: 1 }
  ];
  
  const ingles = [
    { name: "Temario", value: 1 }
  ];
  
  // Medicine
  const cardiology = [
    { name: "Corazón", value: 1 }
  ];
  
  // -------------------------------
  const magisterySpecialties = [
    { name: "Generalista", stats: generalista },
    { name: "Pedagogía Terapéutica", stats: pt },
    { name: "Educación Física", stats: educa },
    { name: "Inglés", stats: ingles }
  ];
  
  const medicineSpecialties = [
    { name: 'Cardiología', stats: cardiology },
    { name: 'Pediatría', stats: cardiology },
    { name: 'Cirugía', stats: cardiology },
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