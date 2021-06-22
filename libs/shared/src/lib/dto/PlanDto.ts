export interface PlanDto {
  id: String;
  price: number;
  name: string;
  description: String;
  max_kb: number;
  max_files: number;
  details: string[];
}
