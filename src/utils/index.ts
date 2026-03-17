//  narrowing type for sorting 
export type SortBy = "confidence_asc" | "confidence_desc";

export function isSortBy(sortOption: string): sortOption is SortBy {
    return sortOption === "confidence_asc" || sortOption === "confidence_desc";
}