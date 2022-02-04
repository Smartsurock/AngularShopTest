import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent implements OnInit {
  constructor(
    private router: Router,
  ) { }

  searchForm: FormGroup;

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      search: new FormControl(null),
    });
  }

  onSubmit() {
    if (!this.searchForm.value.search || !this.searchForm.value.search.trim()) {
      this.searchForm.reset();
      return;
    }

    this.router.navigate(['search',
      { title: this.searchForm.value.search.trim() }
    ]);

    this.searchForm.reset();
  }
}
