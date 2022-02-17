import { not } from '@angular/compiler/src/output/output_ast';
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
    component.slides = ['1', '2', '3', '4'];
    fixture.detectChanges();
  });

  it('Компонент создан', () => {
    expect(component).toBeTruthy();
  });

  it('Стартовые переменные в норме', () => {
    expect(component.active).toEqual(0);
    expect(component.sliderFullScreen).toBe(false);
    expect(component.navigationNeeded).toBe(true);
  });

  describe('Проверка метода клика по слайду', () => {
    it('onNavClick', () => {
      component.onNavClick(3);
      expect(component.active).toEqual(3);
    });
  });

  describe('Проверка методов навигация слайдера', () => {
    it('onLeft', () => {
      component.onNavClick(2);
      component.onLeft();
      expect(component.active).toEqual(1);
    });
    it('onRight', () => {
      component.onLeft();
      component.onRight();
      expect(component.active).toEqual(0);
    });
  });

  describe('Проверка открытия слайдера', () => {
    it('openSlider', () => {
      component.openSlider();
      expect(component.sliderFullScreen).toBe(true);
      component.openSlider();
      expect(component.active).toEqual(1);
      component.openSlider();
      expect(component.active).toEqual(2);
      component.openSlider();
      expect(component.active).toEqual(3);
      component.openSlider();
      expect(component.active).toEqual(0);
    });
  });

  describe('Проверка закрытия слайдера', () => {
    it('closeSlider', () => {
      component.closeSlider();
      expect(component.sliderFullScreen).toBe(false);
    });
  });

  describe('Проверка события клавиатуры', () => {
    it('onEscape', () => {
      component.openSlider();
      expect(component.sliderFullScreen).toBe(true);

      const d = new KeyboardEvent('keydown', {
        key: 'd',
      });
      document.dispatchEvent(d);
      expect(component.sliderFullScreen).toBe(true);

      const escape = new KeyboardEvent('keydown', {
        key: 'Escape',
      });
      document.dispatchEvent(escape);
      expect(component.sliderFullScreen).toBe(false);
    });
  });

  describe('Проверка клика вне области', () => {
    it('onClick', () => {
      component.openSlider();
      expect(component.sliderFullScreen).toBe(true);
      fixture.detectChanges();

      const slider = fixture.debugElement.nativeElement.querySelector('.slider__container.open');
      slider.click();
      expect(component.sliderFullScreen).toBe(true);
      // логика клика вне области слайдера
      // expect(component.sliderFullScreen).toBe(false);
    });
  });
});
