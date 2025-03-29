import { MedicamentsListed } from '@/components/MedicamentsListed/MedicamentsListed'
import React, { useEffect, useState } from 'react'
import api from '../../services/api'
import SplashLoading from '@/components/SplashLoading'
import { Medication } from '@/interfaces/Medication'
function MedicationList() {
  const [medications, setMedications] = useState<Medication[]>([]);
  const [loading, setLoading] = useState(true);
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(50);
  const [searchQuery, setSearchQuery] = useState("");

  async function fetchMedications() {
    await api.get('/medicament/search/', {
      params: {
        skip: skip,
        limit: limit,
        name: searchQuery,
      },
    })
    .then(response => {
        const medicationsData = response.data.map((item: any) => ({
          id: item.id,
          medicamento: item.medicamento,
          data_inclusao: item.data_inclusao,
          concentracao: item.concentracao,
          farmaco: item.farmaco,
        }));
        setMedications((prev) => [...prev, ...medicationsData])
        setLoading(false);
    })
    .catch(error => {
        console.error('Erro ao buscar medicamentos:', error);
        setLoading(false);
    });
  }

  useEffect(() => {
    fetchMedications()
  }, [skip, limit]);

  return (
    (loading && medications.length === 0 
      ? <SplashLoading /> 
      : <MedicamentsListed 
        medications={medications} 
        setSkip={setSkip} 
        setLimit={setLimit} 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
    )
  );
}

export default MedicationList;