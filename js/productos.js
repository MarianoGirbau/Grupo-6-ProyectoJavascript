export class Producto { //hace falta la palabra default para hacer el export
  constructor(id, nombre, precio, descripcion, imagen) {
    this.id = id;
    this.nombre = nombre;
    this.precio = precio;
    this.descripcion = descripcion;
    this.imagen = imagen;
  }
}