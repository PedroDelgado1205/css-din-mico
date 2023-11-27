import { Component } from '@angular/core';

@Component({
  selector: 'app-css-dinamico',
  templateUrl: './css-dinamico.component.html',
  styleUrls: ['./css-dinamico.component.css']
})
export class CssDinamicoComponent {

  archivoCss: string = '';
  estilosEditados: string = '';
  clases: string[] = [];
  estilosEditadosObj: Record<string, string> = {};

  cargarArchivo() {
    this.archivoCss = `.tabla {
  background-color: red;
}`;
    this.estilosEditados = this.archivoCss;
    this.aplicarEstilos();
  }

  guardarCambios() {
    this.archivoCss = this.estilosEditados;
    this.aplicarEstilos();
  }

  private aplicarEstilos() {
    this.clases = [];

    if (this.estilosEditados.includes('.tabla')) {
      this.clases.push('tabla');
    }

    this.estilosEditadosObj = this.convertirStringAObjeto(this.estilosEditados);
  }

  private convertirStringAObjeto(estilosString: string): Record<string, string> {
    const estilosArray = estilosString.split(';').filter(style => style.trim() !== '');
    const estilosObj: Record<string, string> = {};
    estilosArray.forEach(style => {
      const [propiedad, valor] = style.split(':').map(s => s.trim());
      estilosObj[propiedad] = valor;
    });
    return estilosObj;
  }
}
