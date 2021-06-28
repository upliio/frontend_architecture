import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProjectService} from '../../../services/project.service';
import {PlanDto, ProjectEntity} from '@upli/shared';

@Component({
    selector: 'upli-purchase-completed',
    templateUrl: './purchase-completed.component.html',
    styleUrls: ['./purchase-completed.component.scss']
})
export class PurchaseCompletedComponent implements OnInit {

    params: any;
    project: ProjectEntity;

    plan: PlanDto;

    constructor(private activatedRoute: ActivatedRoute,
                private projectService: ProjectService,
                private router: Router) {
    }

    ngOnInit() {
        this.activatedRoute.queryParams.subscribe(params => {
            this.params = params;
            this.projectService.getProjectById(params.project_id).subscribe(project => {
                this.project = project;
                this.projectService.checkPlan(params.project_id).subscribe(planResponse => {
                    this.plan = planResponse;
                });
            }, err => this.router.navigate(['/dashboard']));
        });
    }

}
