import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { WindowComponent } from './window/window.component';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  showModalName = 'Show modal window';

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  showModal() {
    this.dialog.open(WindowComponent, {
      width: '250px',
    });
  }
}
