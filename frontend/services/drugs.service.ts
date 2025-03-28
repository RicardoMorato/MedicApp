import { drugs, drugsInteractions } from "@/data";

export async function checkDrugInteraction(drugs: string[]) {
  const hasInteraction = hasDrugInteraction(drugs[0], drugs[1]);
  return hasInteraction;
}

function hasDrugInteraction(drugA: any, drugB: any) {
  const idA = drugs.filter((drug) => drug.name === drugA)[0].id;
  const idB = drugs.filter((drug) => drug.name === drugB)[0].id;

  for (const drug of drugsInteractions) {
    if (
      (drug.drugId == idA && drug.interactedId == idB) ||
      (drug.drugId == idB && drug.interactedId == idA)
    )
      return true;
  }
  return false;
}
