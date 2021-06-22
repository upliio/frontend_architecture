import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardWrapperComponent} from './dashboard-wrapper/dashboard-wrapper.component';
import {RouterModule} from '@angular/router';
import {NgZorroAntdModuleModule} from '../ng-zorro-antd-module.module';
import { ProjectComponent } from './project/project/project.component';
import {FormsModule} from '@angular/forms';
import {NgBytesPipeModule} from 'angular-pipes';


@NgModule({
  declarations: [DashboardWrapperComponent, ProjectComponent],
    imports: [
        CommonModule,
        NgZorroAntdModuleModule,
        RouterModule.forChild([
            {
                path: '',
                component: DashboardWrapperComponent,
                children: [
                    {
                        path: 'project/:project_id',
                        component: ProjectComponent
                    }
                ]
            }
        ]),
        FormsModule,
        NgBytesPipeModule
    ]
})
export class DashboardModule {
}
