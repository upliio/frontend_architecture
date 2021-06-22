import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PlanDto} from '@upli/shared';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(private http: HttpClient) {
  }


  getPlans = () => this.http.get<PlanDto[]>(`/api/utils/plans`);

}
