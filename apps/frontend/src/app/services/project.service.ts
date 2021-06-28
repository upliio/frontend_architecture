import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PlanDto, ProjectEntity} from '@upli/shared';
import {ProjectSubscriptionEntity} from '../dto/ProjectSubscriptionEntity';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient) {
  }

  getProjectById = (project_id: string) => this.http.get<ProjectEntity>(`/api/project/${project_id}`);

  updateField = (project: ProjectEntity, field: string, value: { value: any }) => this.http.post<ProjectEntity>(`/api/project/${project.project_id}/update/${field}`, value);

  getDomain = (project: ProjectEntity) => `https://${project.domain}${project.domain.includes('.') ? '' : '.upli.io'}`;

  buyPlan = (project_id: string, id: string) => this.http.post<ProjectSubscriptionEntity>(`/api/project/${project_id}/upgrade`, {plan: id});

  checkPlan = (project_id: string) => this.http.get<PlanDto>(`/api/project/${project_id}/upgrade/check`);

}
