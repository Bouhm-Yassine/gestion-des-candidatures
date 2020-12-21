import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthGuardAdminService } from 'src/app/Services/auth-guard-admin.service';

@Component({
  selector: 'app-mon-admin',
  templateUrl: './mon-admin.component.html',
  styleUrls: ['./mon-admin.component.css']
})
export class MonAdminComponent implements OnInit {
  idAdmine;

  constructor(private router: Router, private agas: AuthGuardAdminService, private route: ActivatedRoute) { }
  onBack(){
    this.router.navigate(['/sign-in', 'profileAdmin', this.idAdmine]);
    }

  ngOnInit() {
    this.agas.isAdminLoggedIn(this.route.snapshot.params['idAdmin']); 
    this.idAdmine = this.route.snapshot.params['idAdmin'];
  }

}
