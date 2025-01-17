import { CategoryCount } from "./catagory-count.interface";
import { Publication } from "./publication.interface";

export interface PublicationResponse {
  totalCount: number;
  elapsedMilliseconds: number;
  categoryCounts: CategoryCount[];
  publications: Publication[];
}
