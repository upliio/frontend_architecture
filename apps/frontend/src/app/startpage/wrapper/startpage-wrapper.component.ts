import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-wrapper',
  templateUrl: './startpage-wrapper.component.html',
  styleUrls: ['./startpage-wrapper.component.scss']
})
export class StartpageWrapperComponent implements OnInit {

  constructor(public userService: UserService) {
  }

  ngOnInit() {

  }
}
