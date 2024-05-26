import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'shared-modal-dialog',
  templateUrl: './modal-dialog.component.html',
  styleUrls: ['./modal-dialog.component.css']
})
export class ModalDialogComponent {

  @Input({ required: true })
  title!: string;

  @Input({ required: true })
  description!: string;

  @Output()
  closeEvent = new EventEmitter<void>();

  onClose() {
    this.closeEvent.emit();
  }

}
