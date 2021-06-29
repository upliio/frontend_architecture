import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PlanDto} from '@upli/shared';
import {share} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  plansReq: Observable<PlanDto[]>;

  constructor(private http: HttpClient) {
    this.plansReq = this.http.get<PlanDto[]>(`/api/utils/plans`).pipe(share());
  }

  getRegexPattern = () => this.http.get<[]>(`/api/utils/regex`);

  getPlans = () => this.plansReq;

}
