import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {PlanDto, ProjectEntity} from '@upli/shared';
import {UtilsService} from '../../services/utils.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ProjectService} from '../../services/project.service';
import {NzModalService} from 'ng-zorro-antd/modal';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'upli-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss']
})
export class PricingComponent implements OnInit {

  @ViewChild('tplSelectProject', {static: true}) tplSelectProject: TemplateRef<any>;
  @ViewChild('tplSelectProjectFooter', {static: true}) tplSelectProjectFooter: TemplateRef<any>;

  plans: PlanDto[] = [];

  project_id: string;
  selectedPlan: PlanDto;
  loading: boolean;

  freeProjects: ProjectEntity[] = [];

  constructor(private utilsService: UtilsService,
              private activatedRoute: ActivatedRoute,
              private projectService: ProjectService,
              private userService: UserService,
              private router: Router,
              private modalService: NzModalService) {
  }

  ngOnInit() {
    this.utilsService.getPlans().subscribe(plans => this.plans = plans);
    this.activatedRoute.queryParams.subscribe(params => {
      this.project_id = params.project_id;
    });
  }

  buyPlan(id: string, ref: any = null) {
    this.userService.currentUser().subscribe(user => {
      if (user == null) {
        this.router.navigate(['/auth/login'], {queryParams: {redirectTo: '/pricing'}});
      } else {
        if (this.project_id == null) {
          this.selectedPlan = this.plans.find(plan => plan.id == id);

          //this.userService.currentUser().subscribe(user => this.freeProjects = user.projects.filter(project => project.plan.id == 'static_free'));

          this.modalService.create({
            nzTitle: 'Select a project',
            nzContent: this.tplSelectProject,
            nzFooter: this.tplSelectProjectFooter,
            nzOnCancel: () => console.log(this.project_id = null)
          });


          return;
        }
        this.loading = true;
        this.projectService.buyPlan(this.project_id, id).subscribe(res => {
          this.loading = false;
          window.location.href = res.paypalApproveUrl;
        });
      }
    });
  }
}
