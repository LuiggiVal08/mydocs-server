import express, { Application } from 'express';
import path from 'path';

export function addStaticRoute(app: Application, carpeta: string, ruta: string = `/${carpeta}`): void {
    app.use(ruta, express.static(path.join(__dirname, '../../public', carpeta)));
}
