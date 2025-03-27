import { MedicamentsListed } from '@/components/MedicamentsListed/MedicamentsListed'
import React, { useEffect, useState } from 'react'
import api from '../../services/api'
import SplashLoading from '@/components/SplashLoading'

function MedicationList() {
  const [medications, setMedications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/medicament/search/')
    .then(response => {
        setMedications(response.data)
        setLoading(false)
    })
    .catch(error => console.error('Erro ao buscar medicamentos:', error));
    }, []);

  return (
    (loading ? <SplashLoading/> : <MedicamentsListed medications={medications} />)
  )
}

export default MedicationList