import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PlanDto, ProjectEntity} from '@upli/shared';
import {ProjectSubscriptionEntity} from '../dto/ProjectSubscriptionEntity';
import {UtilsService} from './utils.service';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient,
              private utilsService: UtilsService) {
  }

  getProjectById = (project_id: string) => this.http.get<ProjectEntity>(`/api/project/${project_id}`);

  updateField = (project: ProjectEntity, field: string, value: { value: any }) => this.http.post<ProjectEntity>(`/api/project/${project.project_id}/update/${field}`, value);

  getDomain = (project: ProjectEntity) => `https://${project.domain}${project.domain.includes('.') ? '' : '.upli.io'}`;

  buyPlan = (project_id: string, id: string) => this.http.post<ProjectSubscriptionEntity>(`/api/project/${project_id}/upgrade`, {plan: id});

  checkPlan = (project_id: string) => this.http.get<PlanDto>(`/api/project/${project_id}/upgrade/check`);

  hasPlan = (project: ProjectEntity, requiredPlan: string) => this.utilsService.getPlans().pipe(map(plans => {
    const planIndex = plans.findIndex(plan => plan.id == project?.plan?.id);
    const requiredIndex = plans.findIndex(plan => plan.id == requiredPlan);
    return {
      allowed: planIndex >= requiredIndex,
      requiredPlan: plans.find(plan => plan.id == requiredPlan)
    };
  }));
}
