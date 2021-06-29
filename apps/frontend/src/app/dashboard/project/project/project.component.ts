import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProjectEntity} from '@upli/shared';
import {ProjectService} from '../../../services/project.service';
import {NzNotificationService} from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

  project: ProjectEntity;


  editDomain = false;

  error: any;


  constructor(private activatedRoute: ActivatedRoute,
              private notificationService: NzNotificationService,
              public projectService: ProjectService) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.error = null;
      this.projectService.getProjectById(params.project_id).subscribe(project => this.project = project, err => this.error = err);
    });
  }

  saveDomain(newDomain: HTMLInputElement, save: boolean) {
    if (save) {
      newDomain.disabled = true;
      this.projectService.updateField(this.project, 'domain', {value: newDomain.value}).subscribe(res => {
        this.notificationService.success('Successfully', `Domain successfully changed!`);
        newDomain.disabled = false;
        this.project.domain = res.domain;
        this.editDomain = false;
      }, error => {
        newDomain.disabled = false;
      });


    } else {
      newDomain.value = this.project.domain; // change aborted
      this.editDomain = false;
    }
  }

  toggleStatus() {
    this.projectService.updateField(this.project, 'enabled', {value: this.project.enabled}).subscribe(res => {
      this.notificationService.success('Successfully', `Project ${res.enabled ? 'enabled' : 'disabled'}!`);
    });
  }

  editDomainField() {
    this.projectService.hasPlan(this.project, 'static_lite').subscribe(result => {
      if (result.allowed) {
        this.editDomain = true;
      } else {
        this.notificationService.error('Error', `This feature requires an ${result.requiredPlan.name} upgrade!`);
      }
    });
  }
}
