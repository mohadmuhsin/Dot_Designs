import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'uniqueUsers'
})
export class UniqueUsersPipePipe implements PipeTransform {

  transform(data: any[]): any[] {
  console.log(data,"from pope");
  
    const uniqueUserIds = new Set<string>();
    return data.filter(item => {
      if (uniqueUserIds.has(item.userId)) {
        return false;
      } else {
        uniqueUserIds.add(item.userId);
        return true;
      }
    });
  }

}
