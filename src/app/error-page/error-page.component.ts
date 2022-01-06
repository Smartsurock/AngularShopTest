import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.scss']
})
export class ErrorPageComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  routeSub: Subscription;
  errorMessage: string;

  ngOnInit(): void {
    this.routeSub = this.route.data.subscribe((data: Data) => {
      this.errorMessage = data['message'];
    });
  }

  @HostListener('document:keydown.escape')
  onEscape() {
    this.router.navigate(['/goods']);
  }
}
