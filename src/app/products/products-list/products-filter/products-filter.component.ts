import { Component, Input, OnInit } from '@angular/core';
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

  ngOnInit(): void {
  }

  toCapitalizeCase(name: string) {
    if (name) {
      return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    }
  }

  useFilter(key, value) {
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

  onFilterClick(object, event) {
    const queryParams = [];
    const filterKey = Object.keys(object).find(key => object[key] === event.target.id);

    if (filterKey === 'fabricator') {
      this.fabricators.filter(el => {
        if (event.target.id === el[filterKey]) {
          el.checked = !el.checked;
        }
        if (el.checked) {
          queryParams.push(el[filterKey]);
        }
      });
    } else if (filterKey === 'sort') {
      this.sorts.filter(el => {
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
}
