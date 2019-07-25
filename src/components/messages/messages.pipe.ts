import { Pipe, PipeTransform } from '@angular/core';
import { AppConfig } from 'src/app-config';

const IMAGE_PADDINGS = 70;

@Pipe({name: 'sanitize'})
export class SanitizePipe implements PipeTransform {

  transform(content: any, args?: any): any {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return content.replace(urlRegex, url => `<a href="${url}" target="_blank">${url}</a>`)
      .replace('<img', '<img width="100%"');
  }
}

@Pipe({name: 'imgHeight'})
export class ImageHeightPipe implements PipeTransform {

  constructor(private config: AppConfig) {
  }

  transform(height: number, width: number): string {
    const imgWidth = screen.width - IMAGE_PADDINGS;

    if (!this.config.device.mobile || width <= imgWidth) {
      return `${height}px`;
    }

    return `${(imgWidth / width) * height}px`;
  }
}
