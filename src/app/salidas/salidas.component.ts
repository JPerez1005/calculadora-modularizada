import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-salidas',
  templateUrl: './salidas.component.html',
  styleUrls: ['./salidas.component.css']
})
export class SalidasComponent{

  @Input() resultado: number;
  
}
