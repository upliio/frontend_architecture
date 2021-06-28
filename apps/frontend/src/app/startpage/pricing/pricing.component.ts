import {Component, OnInit} from '@angular/core';
import {PlanDto} from '@upli/shared';
import {UtilsService} from '../../services/utils.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ProjectService} from '../../services/project.service';

@Component({
  selector: 'upli-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss']
})
export class PricingComponent implements OnInit {

  plans: PlanDto[] = [];

  project_id: string;

  constructor(private utilsService: UtilsService,
              private activatedRoute: ActivatedRoute,
              private projectService: ProjectService,
              private router: Router) {
  }

  ngOnInit() {
    this.utilsService.getPlans().subscribe(plans => this.plans = plans);
    this.activatedRoute.queryParams.subscribe(params => {
      this.project_id = params.project_id;
    });
  }

  buyPlan(id: string) {
    if (this.project_id == null){
      alert('project_id is null');
      return;
    }
    this.projectService.buyPlan(this.project_id, id).subscribe(res => {
      window.location.href = res.paypalApproveUrl;
    })
  }
}
