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
  const [searchUsed, setSearchUsed] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [total, setTotal] = useState(0)

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
          const { items, total: totalCount } = response.data
          setTotal(totalCount)
          const medicationsData = items.map((item: any) => ({
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
      }, 500), 
      [skip, limit, searchQuery]
    );
    
    console.log('Total de medicamentos:', total)
    function handleEndReached() {
      medications.length < total ? setHasMore(true) : setHasMore(false);
      
      if (hasMore && !loading) {
        setSkip(prevSkip => prevSkip + 20);
        setLimit(prevLimit => prevLimit + 20);
      }
    }
  useEffect(() => {
    fetchMedications();

    return fetchMedications.cancel; // Cancela chamadas pendentes ao desmontar
  }, [fetchMedications]);

  useEffect(() => {
    if (searchUsed && searchQuery === "") {
      setSkip(0)
      setLimit(20)
      setMedications([])
      fetchMedications()
      setSearchUsed(false)
    }
  }, [ fetchMedications])

  const handleSearchQueryChange = (query: string) => {
    setSearchQuery(query)
    if (!searchUsed) setSearchUsed(true)
  }

  return (
    (loading && medications.length === 0 
      ? <SplashLoading /> 
      : <MedicamentsListed 
        medications={medications} 
        setSkip={setSkip} 
        setLimit={setLimit} 
        searchQuery={searchQuery}
        setSearchQuery={(value) => handleSearchQueryChange(value as string)}
        handleEndReached={handleEndReached}
        hasMore={hasMore}
      />
    )
  );
}

export default MedicationList;