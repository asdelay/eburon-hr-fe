import { EmployerCandidate } from "@/types/employer";

export const downloadCandidates = (candidates: EmployerCandidate[]) => {
    const json = JSON.stringify(candidates, null, 2);
    const blob = new Blob([json], {type: 'application/json'})

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "candidates.json";
    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);
    URL.revokeObjectURL(url);

}