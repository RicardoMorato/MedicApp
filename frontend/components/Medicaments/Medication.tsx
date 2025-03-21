export interface Medication {
  id: string;
  name: string;
  description: string;
  dosage: string;
  category: string;
}

export const medications: Medication[] = [
  {
    id: "1",
    name: "Aspirina",
    description: "Anti-inflamatório não esteroidal",
    dosage: "500mg - 1 comprimido a cada 6 horas",
    category: "Analgésico"
  },
  {
    id: "2",
    name: "Amoxicilina",
    description: "Antibiótico da classe das penicilinas",
    dosage: "500mg - 1 cápsula a cada 8 horas",
    category: "Antibiótico"
  },
  {
    id: "3",
    name: "Atenolol",
    description: "Bloqueador beta-adrenérgico",
    dosage: "50mg - 1 comprimido por dia",
    category: "Anti-hipertensivo"
  },
  {
    id: "4",
    name: "Buscopan",
    description: "Antiespasmódico",
    dosage: "10mg - 1 comprimido até 3 vezes ao dia",
    category: "Antiespasmódico"
  },
  {
    id: "5",
    name: "Ciprofloxacino",
    description: "Antibiótico da classe das fluoroquinolonas",
    dosage: "500mg - 1 comprimido a cada 12 horas",
    category: "Antibiótico"
  },
  {
    id: "6",
    name: "Clonazepam",
    description: "Benzodiazepínico com propriedades anticonvulsivantes",
    dosage: "2mg - 1 comprimido antes de dormir",
    category: "Ansiolítico"
  },
  {
    id: "7",
    name: "Dexametasona",
    description: "Corticosteroide sintético",
    dosage: "4mg - 1 comprimido por dia",
    category: "Anti-inflamatório"
  },
  {
    id: "8",
    name: "Dipirona",
    description: "Analgésico e antipirético",
    dosage: "500mg - 1 comprimido a cada 6 horas",
    category: "Analgésico"
  },
  {
    id: "9",
    name: "Enalapril",
    description: "Inibidor da enzima conversora de angiotensina",
    dosage: "10mg - 1 comprimido por dia",
    category: "Anti-hipertensivo"
  },
  {
    id: "10",
    name: "Fluoxetina",
    description: "Inibidor seletivo da recaptação de serotonina",
    dosage: "20mg - 1 cápsula pela manhã",
    category: "Antidepressivo"
  },
  {
    id: "11",
    name: "Glibenclamida",
    description: "Estimula a secreção de insulina pelo pâncreas",
    dosage: "5mg - 1 comprimido antes do café da manhã",
    category: "Antidiabético"
  },
  {
    id: "12",
    name: "Hidroclorotiazida",
    description: "Diurético tiazídico",
    dosage: "25mg - 1 comprimido pela manhã",
    category: "Diurético"
  },
  {
    id: "13",
    name: "Ibuprofeno",
    description: "Anti-inflamatório não esteroidal",
    dosage: "600mg - 1 comprimido a cada 8 horas",
    category: "Anti-inflamatório"
  },
  {
    id: "14",
    name: "Losartana",
    description: "Antagonista do receptor de angiotensina II",
    dosage: "50mg - 1 comprimido por dia",
    category: "Anti-hipertensivo"
  },
  {
    id: "15",
    name: "Metformina",
    description: "Biguanida que reduz a produção hepática de glicose",
    dosage: "850mg - 1 comprimido após as refeições",
    category: "Antidiabético"
  },
  {
    id: "16",
    name: "Nimesulida",
    description: "Anti-inflamatório não esteroidal",
    dosage: "100mg - 1 comprimido a cada 12 horas",
    category: "Anti-inflamatório"
  },
  {
    id: "17",
    name: "Omeprazol",
    description: "Inibidor da bomba de prótons",
    dosage: "20mg - 1 cápsula antes do café da manhã",
    category: "Antiácido"
  },
  {
    id: "18",
    name: "Paracetamol",
    description: "Analgésico e antipirético",
    dosage: "750mg - 1 comprimido a cada 6 horas",
    category: "Analgésico"
  },
  {
    id: "19",
    name: "Ranitidina",
    description: "Antagonista dos receptores H2 da histamina",
    dosage: "150mg - 1 comprimido a cada 12 horas",
    category: "Antiácido"
  },
  {
    id: "20",
    name: "Sinvastatina",
    description: "Inibidor da HMG-CoA redutase",
    dosage: "20mg - 1 comprimido à noite",
    category: "Redutor de colesterol"
  },
  {
    id: "21",
    name: "Tramadol",
    description: "Analgésico opioide",
    dosage: "50mg - 1 cápsula a cada 8 horas",
    category: "Analgésico opioide"
  },
  {
    id: "22",
    name: "Verapamil",
    description: "Bloqueador dos canais de cálcio",
    dosage: "80mg - 1 comprimido 3 vezes ao dia",
    category: "Anti-hipertensivo"
  },
  {
    id: "23",
    name: "Xarelto",
    description: "Anticoagulante inibidor direto do fator Xa",
    dosage: "20mg - 1 comprimido por dia",
    category: "Anticoagulante"
  },
  {
    id: "24",
    name: "Zolpidem",
    description: "Hipnótico não benzodiazepínico",
    dosage: "10mg - 1 comprimido antes de dormir",
    category: "Indutor do sono"
  }
];

export interface Section {
  titleLetter: string;
  data: Medication[];
}

export const DATA = medications.reduce((sections: Section[], medicament) => {
  const firstLetter = medicament.name[0].toUpperCase();
  const section = sections.find(section => section.titleLetter === firstLetter);
  const dosageValue = medicament.dosage.split(' ')[0];
  medicament.dosage = dosageValue  

  if (section) {
    section.data.push(medicament);
  } else {
    sections.push({ titleLetter: firstLetter, data: [medicament] });
  }

  return sections;
}, []);
