import express, { type Application } from 'express';
import path from 'path';

export function addStaticRoute(app: Application, carpeta: string, ruta = `/${carpeta}`): void {
    app.use(ruta, express.static(path.join(process.cwd(), 'public', carpeta)));
}
