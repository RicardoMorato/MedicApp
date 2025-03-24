import { MedicamentsListed } from '@/components/MedicamentsListed/MedicamentsListed'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import  API_URL from "../../config/config";
import SplashLoading from '@/components/SplashLoading'

function MedicationList() {
  const [medications, setMedications] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true)
    axios.get(`${API_URL}drugs`)
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