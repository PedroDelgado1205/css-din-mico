import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-css-dinamico',
  templateUrl: './css-dinamico.component.html',
  styleUrls: ['./css-dinamico.component.css']
})
export class CssDinamicoComponent {
  etiqueta: string = '';
  estilo: string = '';

  archivoCss: string = '';
  estilosEditados: string = '';

  elementosGenerados: { elemento: HTMLElement, estilo: string }[] = [];

  descargaRealizada = false;

  @ViewChild('container', { read: ElementRef, static: false }) container!: ElementRef;

  cargarArchivo() {
    // Simula cargar el contenido de un archivo CSS existente
    this.archivoCss = `body {
  background-color: #f0f0f0;
}
.container {
  margin: 20px;
  padding: 10px;
  border: 1px solid #ccc;
}`;
    this.estilosEditados = this.archivoCss;
  }

  guardarCambios() {
    this.archivoCss = this.estilosEditados;
  }

  generarElemento() {
    this.descargaRealizada = false;

    const elementoExistente = this.elementosGenerados.find(e => e.elemento.id === this.etiqueta);

    const idElemento = this.etiqueta + 'css';
    const btnTodo = document.getElementById('Todo');

    if (this.etiqueta.trim() !== '') {

      let nuevoElemento: HTMLElement;
      let btnDescargar: HTMLElement;

      if (elementoExistente) {
        // Si el elemento existe, edita sus propiedades
        const estilos = document.getElementById(idElemento);
        if (estilos !== null) {

          nuevoElemento = elementoExistente.elemento;

          const estilosAnteriores = nuevoElemento.getAttribute('style') || '';
          const etiquetaEstilo = document.createElement('li');

          etiquetaEstilo.innerText = `${this.estilo}`;
          estilos.appendChild(etiquetaEstilo);

          nuevoElemento.setAttribute('style', `${estilosAnteriores}` + ' ' + `${etiquetaEstilo.textContent}`);
          this.implementarDocumento(nuevoElemento.id);
        }
      } else {
        // Si el elemento no existe, crea uno nuevo
        let sinNumero = this.etiqueta;
        if (!isNaN(Number(sinNumero.charAt(sinNumero.length - 1)))) {
          sinNumero = sinNumero.slice(0, -1);
        }

        nuevoElemento = document.createElement(sinNumero);
        nuevoElemento.id = `.${this.etiqueta}`;
        nuevoElemento.setAttribute('style', this.estilo);

        this.elementosGenerados.push({ elemento: nuevoElemento, estilo: this.estilo });
        this.container.nativeElement.appendChild(nuevoElemento);

        const lsitaEstilos = document.createElement('ul');
        lsitaEstilos.className = 'list-group list-group-flush';
        lsitaEstilos.id = `.${this.etiqueta}css`;

        const etiquetaEstilo = document.createElement('li');
        const abreEstilo = document.createElement('p');
        const cierreEstilo = document.createElement('p');

        const textoConEstilo = document.createElement('div');
        textoConEstilo.id = `.${this.etiqueta}csstext`;
        textoConEstilo.className = 'csstext';
        const clase = textoConEstilo.className;
        btnTodo?.addEventListener('click', () => this.descargarTodo());

        abreEstilo.innerText = `${nuevoElemento.id} {`;
        etiquetaEstilo.innerText = `${this.estilo}`;
        cierreEstilo.innerText = `}`;

        lsitaEstilos.appendChild(etiquetaEstilo);

        textoConEstilo.appendChild(abreEstilo);
        textoConEstilo.appendChild(lsitaEstilos);
        textoConEstilo.appendChild(cierreEstilo);
        this.container.nativeElement.appendChild(textoConEstilo);
        this.implementarDocumento(nuevoElemento.id)
      }

      this.etiqueta = '';
      this.estilo = '';
    }
  }

  implementarDocumento(id: string) {
    const idTexto = `${id}csstext`;
    const elementoExistente = document.getElementById(idTexto);

    if (elementoExistente) {
      // Agregar el contenido existente al final
      this.estilosEditados += `\n${elementoExistente.innerText}`;

      // Puedes mostrar un mensaje o realizar otras acciones según tus necesidades
      console.log(`Editando ${id}...`);
    }
  }

  descargarTodo() {
    if (!this.descargaRealizada) {
      const areaTexto = document.getElementById('documento') as HTMLTextAreaElement;

      if (areaTexto) {
        // Utilizar el contenido actualizado del área de texto
        const estilosCompletos = this.estilosEditados;

        const blob = new Blob([estilosCompletos], { type: 'text/plain' });

        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = 'estilos.css';

        document.body.appendChild(link);

        link.click();

        document.body.removeChild(link);

        this.descargaRealizada = true;
      }
    }
  }
}