import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-products-filter',
  templateUrl: './products-filter.component.html',
  styleUrls: ['./products-filter.component.scss']
})
export class ProductsFilterComponent implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  @Input() fabricators = [];
  @Input() sorts = [];
  @Input() select: string;
  @Output() filterOpen = new EventEmitter<boolean>();
  selectForm: FormGroup;
  openFilter: boolean = false;

  ngOnInit(): void {
    this.selectForm = new FormGroup({
      select: new FormControl(this.select),
    });
  }

  toCapitalizeCase(name: string) {
    if (name) {
      return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    }
  }

  useFilter(key: string, value: string | null) {
    const queryParams = {
      [key]: value,
    }

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams,
      queryParamsHandling: 'merge',
    });
  }

  resetFilter() {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        sort: null,
        fabricator: null,
      },
      queryParamsHandling: 'merge',
    });
  }

  onFilterClick(object: any, event: any) {
    const queryParams: any[] = [];
    const filterKey: string = (Object.keys(object).find(key => object[key] === event.target.id) || '');

    if (filterKey === 'fabricator') {
      this.fabricators.filter((el: any) => {
        if (event.target.id === el[filterKey]) {
          el.checked = !el.checked;
        }
        if (el.checked) {
          queryParams.push(el[filterKey]);
        }
      });
    } else if (filterKey === 'sort') {
      this.sorts.filter((el: any) => {
        if (event.target.id === el[filterKey]) {
          el.checked = !el.checked;
        }
        if (el.checked) {
          queryParams.push(el[filterKey]);
        }
      });
    }

    if (!queryParams.length) {
      this.useFilter(filterKey, null);
    } else {
      this.useFilter(filterKey, queryParams.join(','));
    }
  }

  selectChanges(event: any) {
    if (event.target.value === 'default') {
      this.useFilter('sorting', null);
    } else {
      this.useFilter('sorting', event.target.value);
    }
  }

  openFilters() {
    this.openFilter = !this.openFilter;
    this.filterOpen.emit(this.openFilter);
  }
}
