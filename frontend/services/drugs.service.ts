import api from "./api";

export async function checkDrugInteraction(drugs: string[]) {
  try {
    const response = await api.post("/interactions/", {
      name_1: drugs[0],
      name_2: drugs[1],
    });
  } catch (error) {
    return false;
  }
  return true;
}

export async function getInteractionDrugsList() {
  const drugs = await api.get("/pharma/");
  return drugs.data.map((drug: any, i: number) => ({
    id: i,
    name: drug.pharma_name,
  }));
}
