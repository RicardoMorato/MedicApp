import { MedicamentsListed } from "@/components/MedicamentsListed/MedicamentsListed";
import React, { useEffect, useState, useCallback } from "react";
import api from "../../services/api";
import SplashLoading from "@/components/SplashLoading";
import { Medication, MedicationDetails } from "@/interfaces/Medication";
import { debounce } from "lodash";
import HeaderTittle from "@/components/HeaderTittle";
import FontLoader from "@/components/FontLoader";

function MedicationList() {
  const [medications, setMedications] = useState<MedicationDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(20);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchUsed, setSearchUsed] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [total, setTotal] = useState(1);

  const fetchMedications = useCallback(
    debounce(() => {
      if (hasMore === false) {
        setMedications([]);
      }
      const params: any = {
        skip: skip,
        limit: limit,
      };
      if (searchQuery) {
        params.name = searchQuery;
      }
      api
        .get("/medicament/search/", { params })
        .then((response) => {
          const { items, total: totalCount } = response.data;
          setTotal(totalCount);
          const medicationsData = items.map((item: any) => ({
            id: item.id,
            medicamento: item.medicamento,
            data_inclusao: item.data_inclusao,
            concentracao: item.concentracao,
            farmaco: item.farmaco,
            detentor: item.detentor,
            forma_farmaceutica: item.forma_farmaceutica, 
            registro: item.registro,
          }));
          setMedications((prev) => {
            const existingIds = new Set(prev.map((med) => med.id));
            const uniqueMedications = medicationsData.filter(
              (med: Medication) => !existingIds.has(med.id)
            );
            return [...prev, ...uniqueMedications];
          });
          setLoading(false);
        })
        .catch((error) => {
          console.error("Erro ao buscar medicamentos:", error);
          setLoading(false);
        });
    }, 500),
    [skip, limit, searchQuery]
  );

  function handleEndReached() {
    if (medications.length < total) {
      setHasMore(true);
      if (total < 300) {
        setLimit(total);
      } else {
        setLimit((prevLimit) => prevLimit + 20);
      }
    } else {
      setHasMore(false);
      return;
    }
  }

  useEffect(() => {
    fetchMedications();

    return fetchMedications.cancel; // Cancela chamadas pendentes ao desmontar
  }, [fetchMedications]);

  useEffect(() => {
    if (searchUsed && searchQuery === "") {
      setSkip(0);
      setLimit(20);
      setMedications([]);
      fetchMedications();
      setSearchUsed(false);
      setHasMore(true);
    }
  }, [fetchMedications]);

  const handleSearchQueryChange = (query: string) => {
    setMedications([]);
    setSearchQuery(query);
    setSkip(0);
    setLimit(20);
  };

  return loading ? (
    <SplashLoading />
  ) : (
    <FontLoader>
      <HeaderTittle title="Lista de Medicamentos" />
      <MedicamentsListed
        medications={medications}
        searchQuery={searchQuery}
        setSearchQuery={(value) => handleSearchQueryChange(value as string)}
        handleEndReached={handleEndReached}
        hasMore={hasMore}
      />
    </FontLoader>
  );
}

export default MedicationList;
