import { Component, signal } from '@angular/core';
import { SvgIconComponent } from '../../../common-ui/svg-icon/svg-icon.component';
import { DndDirective } from '../../../common-ui/directives/dnd.directive';

@Component({
  selector: 'app-avatar-upload',
  standalone: true,
  imports: [SvgIconComponent, DndDirective],
  templateUrl: './avatar-upload.component.html',
  styleUrl: './avatar-upload.component.scss'
})
export class AvatarUploadComponent {
  preview = signal<string>('/assets/imgs/avatar.png')

  fileBrowserHandler(event: Event) {
    const file: File | undefined = (event.target as HTMLInputElement)?.files?.[0]
    this.processFile(file)
  }

  onFileDrop(file: File) {
    this.processFile(file)
  }

  processFile(file: File | null | undefined) {
    if (!file || !file.type.match('image')) return
    
    const reader = new FileReader()

    reader.onload = event => {
      this.preview.set(event.target?.result?.toString() ?? '')
    }
    
    reader.readAsDataURL(file)
  }
}
