import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ProductCardComponent } from './product-card.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

describe('ProductCardComponent', () => {
  let component: ProductCardComponent;
  let fixture: ComponentFixture<ProductCardComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
      ],
      providers: [
        provideMockStore({}),
      ],
      declarations: [ProductCardComponent]
    }).compileComponents();

    store = TestBed.inject(MockStore);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCardComponent);
    component = fixture.componentInstance;
    component.product = {
      id: 1,
      name: 'string',
      category: 'string',
      images: [],
      description: 'string',
      stars: [],
      price: 2,
      comments: [],
      filters: {},
    }
    fixture.detectChanges();
  });

  it('Компонент создан', () => {
    expect(component).toBeTruthy();
  });

  describe('Проверка инициализации компонента', () => {
    it('ngOnInit', () => {
      component.ngOnInit();
      expect(component.productGrade).toBe(0);
    });
  });
});
