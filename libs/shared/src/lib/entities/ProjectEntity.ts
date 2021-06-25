import {ProjectModelConfigDto} from '../dto/ProjectModelConfigDto';
import {PlanDto} from '../dto/PlanDto';

export interface ProjectEntity {
  enabled: boolean;
  name: string;
  domain: string;
  config: ProjectModelConfigDto;
  project_id: string;

  stats_bytes_used: number;
  stats_total_files: number;

  plan: PlanDto
}
