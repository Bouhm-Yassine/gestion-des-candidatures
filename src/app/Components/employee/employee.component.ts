import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthGuardAdminService } from 'src/app/Services/auth-guard-admin.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  idAdmine;

  constructor(private route: ActivatedRoute,
    private router: Router, private agas: AuthGuardAdminService) { }

  onBack(){
    this.router.navigate(['/sign-in', 'profileAdmin', this.idAdmine]);
    }

  ngOnInit() {
    this.agas.isAdminLoggedIn(this.route.snapshot.params['idAdmin']); 
    this.idAdmine = this.route.snapshot.params['idAdmin'];
  }

}
