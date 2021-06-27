import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'upli-purchase-completed',
  templateUrl: './purchase-completed.component.html',
  styleUrls: ['./purchase-completed.component.scss']
})
export class PurchaseCompletedComponent implements OnInit {

  params: any;

  constructor(private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.params = params;
    });
  }

}
