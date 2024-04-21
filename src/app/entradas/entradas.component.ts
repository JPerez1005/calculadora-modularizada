import { Component, OnInit, AfterViewInit, ViewChild, ElementRef , Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-entradas',
  templateUrl: './entradas.component.html',
  styleUrls: ['./entradas.component.css']
})
export class EntradasComponent implements AfterViewInit {

  @ViewChild('liveAlertPlaceholder') alertPlaceholder!: ElementRef<HTMLDivElement>;
  @ViewChild('liveAlertBtn') alertTrigger!: ElementRef<HTMLButtonElement>;
  @Output() resultado=new EventEmitter<number>();
  a:number;
  b:number;
  operation:string='';
  resultadoValor: number = 0;

  setOperation(op: string): void {
    this.operation = op;
  }

  performOperation(){
    switch (this.operation) {
      case '+':
        this.suma();
        break;
      case '-':
        this.resta();
        break;
      case '*':
        this.multiplicacion();
        break;
      case '/':
        if (this.b !== 0) {
          this.division();
        } else {
          console.error('No se puede dividir por cero.');
        }
        break;
      default:
        console.error('Operación no seleccionada o no válida.');
    }
  }

  suma(){
    let suma=this.a+this.b;
    this.resultado.emit(suma);
    return suma;
  }

  resta(){
    let resta=this.a-this.b;
    this.resultado.emit(resta);
    return resta;
  }

  multiplicacion(){
    let multiplicacion=this.a*this.b;
    this.resultado.emit(multiplicacion);
    return multiplicacion;
  }

  division(){
    let division=this.a/this.b;
    this.resultado.emit(division);
    return division;
  }

  constructor() { }

  ngAfterViewInit(): void {

    this.resultado.subscribe((value: number) => {
      this.resultadoValor = value;
    });

    if (this.alertTrigger && this.alertPlaceholder) {
      this.alertTrigger.nativeElement.addEventListener('click', () => {
        this.appendAlert(`El resultado es ${(this.resultadoValor)}!`, 'light');
      });
    }
  }

  appendAlert(message: string, type: string): void {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = `
      <div class="alert alert-${type} alert-dismissible" role="alert">
        <div>${message}</div>
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
    `;
    this.alertPlaceholder.nativeElement.append(wrapper);

    // Configura el tiempo que deseas que dure la alerta antes de ser eliminada
    const alertDuration = 3000; // 3000 milisegundos (3 segundos)
  
    // Elimina la alerta después del tiempo especificado
    setTimeout(() => {
      wrapper.remove();
    }, alertDuration);
  }

}
