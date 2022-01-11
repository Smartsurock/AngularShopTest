import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-basket-info',
  templateUrl: './basket-info.component.html',
  styleUrls: ['./basket-info.component.scss']
})
export class BasketInfoComponent implements OnInit {
  constructor() { }

  @Output() accept = new EventEmitter<boolean>();

  ngOnInit(): void {
  }

  onAccept() {
    this.accept.emit(false);
  }
}
