import { MedicamentsListed } from '@/components/MedicamentsListed/MedicamentsListed'
import React, { useEffect, useState, useCallback } from 'react'
import api from '../../services/api'
import SplashLoading from '@/components/SplashLoading'
import { Medication } from '@/interfaces/Medication'
import { debounce } from 'lodash';

function MedicationList() {
  const [medications, setMedications] = useState<Medication[]>([]);
  const [loading, setLoading] = useState(true);
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(20);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchMedications = useCallback(
    debounce(() => {
      setLoading(true);
      api.get('/medicament/search/', {
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

          setMedications((prev) => {
            const existingIds = new Set(prev.map(med => med.id))
            const uniqueMedications = medicationsData.filter((med: Medication) => !existingIds.has(med.id))
            return [...prev, ...uniqueMedications]
          })

          setLoading(false);
      })
      .catch(error => {
          console.error('Erro ao buscar medicamentos:', error);
          setLoading(false);
      });
    }, 1000), 
    [skip, limit, searchQuery]
  );

  useEffect(() => {
    fetchMedications();
    return fetchMedications.cancel; // Cancela chamadas pendentes ao desmontar
  }, [fetchMedications]);

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