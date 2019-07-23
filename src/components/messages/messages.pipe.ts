import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'sanitize'})
export class SanitizePipe implements PipeTransform {

  transform(content: any, args?: any): any {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return content.replace(urlRegex, url => `<a href="${url}" target="_blank">${url}</a>`)
      .replace('<img', '<img width="100%"');
  }
}
