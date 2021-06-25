import {Component, OnInit} from '@angular/core';
import {PlanDto} from '@upli/shared';
import {UtilsService} from '../../services/utils.service';

@Component({
  selector: 'upli-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss']
})
export class PricingComponent implements OnInit {

  plans: PlanDto[] = [];

  constructor(private utilsService: UtilsService) {
  }

  ngOnInit() {
    this.utilsService.getPlans().subscribe(plans => this.plans = plans);
  }

}
