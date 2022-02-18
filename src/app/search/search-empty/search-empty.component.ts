import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-empty',
  templateUrl: './search-empty.component.html',
  styleUrls: ['./search-empty.component.scss']
})
export class SearchEmptyComponent implements OnInit, AfterViewInit {
  constructor(private router: Router) { }

  clarifyForm: FormGroup;
  @Input() searchRequest: string;
  @ViewChild('input') input: ElementRef;

  ngOnInit(): void {
    this.clarifyForm = new FormGroup({
      search: new FormControl(this.searchRequest),
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.input.nativeElement.focus();
    }, 300);
  }

  onSubmit() {
    if (!this.clarifyForm.value.search || !this.clarifyForm.value.search.trim()) return;

    this.router.navigate(['search',
      { title: this.clarifyForm.value.search.trim() }
    ]);
  }
}
