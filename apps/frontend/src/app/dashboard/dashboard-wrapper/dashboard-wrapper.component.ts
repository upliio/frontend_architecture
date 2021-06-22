import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {Observable} from 'rxjs';
import {UserEntity} from '@upli/shared';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard-wrapper',
  templateUrl: './dashboard-wrapper.component.html',
  styleUrls: ['./dashboard-wrapper.component.scss']
})
export class DashboardWrapperComponent implements OnInit {

  isCollapsed: boolean;

  user: Observable<UserEntity>;

  profileDropdownVisible: boolean;

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.user = this.userService.currentUser();
  }

  currentYear = () => new Date().getFullYear();

  changeDropdownVisible($event: boolean) {
    this.profileDropdownVisible = $event;
  }
}
