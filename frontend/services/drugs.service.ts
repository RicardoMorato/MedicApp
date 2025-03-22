import { drugs, drugsInteractions } from "@/data";
import { Drug } from "@/type";

export async function checkDrugInteraction(drugs: Drug[]) {
  const hasInteraction = hasDrugInteraction(drugs[0], drugs[1]);
  return hasInteraction;
}

function hasDrugInteraction(drugA: any, drugB: any) {
  console.log(drugA);
  console.log(drugB);
  const idA = drugs.filter((drug) => drug.name === drugA)[0].id;
  const idB = drugs.filter((drug) => drug.name === drugB)[0].id;

  console.log(`id a: ${idA}, drugA: ${drugA}`);
  console.log(`id b: ${idB}, drugb: ${drugB}`);
  for (const drug of drugsInteractions) {
    console.log("drug Interaction");
    console.log(drug);
    if (
      (drug.drugId == idA && drug.interactedId == idB) ||
      (drug.drugId == idB && drug.interactedId == idA)
    )
      return true;
  }
  return false;
}
