import { Directive, EventEmitter, HostBinding, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[dnd]', //Drag&Drop
  standalone: true
})
export class DndDirective {
  //decorator to create custom event
  @Output() fileDropped = new EventEmitter<File>();

  @HostBinding('class.fileover') //decorator
  fileover = false

  @HostListener('dragover', ["$event"])  //decorator
  onDragOver(event: DragEvent) {
    event.preventDefault()
    event.stopPropagation()
    this.fileover = true   
  }
  
  @HostListener('dragleave', ["$event"])
  onDragLeave(event: DragEvent) {
    event.preventDefault()
    event.stopPropagation()
    this.fileover = false   
  }
  
  @HostListener('drop', ["$event"])
  onDrop(event: DragEvent) {
    event.preventDefault()
    event.stopPropagation()
    this.fileover = false

    this.fileDropped.emit(event.dataTransfer?.files[0])
  }
}
