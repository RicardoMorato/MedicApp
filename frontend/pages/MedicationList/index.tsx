import { MedicamentsListed } from '@/components/MedicamentsListed/MedicamentsListed'
import React, { useEffect, useState } from 'react'
import api from '../../services/api'
import SplashLoading from '@/components/SplashLoading'
import { Medication } from '@/interfaces/Medication'
function MedicationList() {
  const [medications, setMedications] = useState<Medication[]>([]);
  const [loading, setLoading] = useState(true);
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(30);

  function fetchMedications() {
    api.get('/medicament/search/', {
      params: {
        skip: skip,
        limit: limit,
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
        setMedications(medicationsData);
        console.log('medicamentos', medicationsData);
        console.log('tamanho', medicationsData.length);
        setLoading(false);
    })
    .catch(error => console.error('Erro ao buscar medicamentos:', error));
  }

  useEffect(() => {
    fetchMedications()
  }, [skip, limit]);

  return (
    (loading ? <SplashLoading/> : <MedicamentsListed medications={medications} setSkip={setSkip} setLimit={setLimit} />)
  )
}

export default MedicationList