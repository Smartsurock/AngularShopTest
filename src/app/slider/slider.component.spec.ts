import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SliderComponent } from './slider.component';

describe('SliderComponent', () => {
  let component: SliderComponent;
  let fixture: ComponentFixture<SliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SliderComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SliderComponent);
    component = fixture.componentInstance;
    component.slides = ['1', '2', '3', '4', '5'];
    fixture.detectChanges();
  });

  it('компонент создан', () => {
    expect(component).toBeTruthy();
  });

  it('nav click', () => {
    const active = 0;
    component.onNavClick(5);
    expect(active).toBe(5);
  });
});
