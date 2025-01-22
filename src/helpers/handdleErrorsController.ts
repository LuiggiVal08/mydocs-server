import { Request, Response } from 'express';
import { Error } from 'sequelize';

const handdleErrorsController = (error: any, res: Response, req: Request): void => {
    const method = req.method;
    const action: 'crear' | 'eliminar' | 'editar' | 'obtener' =
        method === 'POST' ? 'crear' : method === 'PUT' ? 'editar' : method === 'DELETE' ? 'eliminar' : 'obtener';
    if (error instanceof Error) {
        return void res.status(500).json({ message: `Error al ${action}`, error: error.message });
    } else {
        return void res.status(500).json({ message: 'Error desconocido', error });
    }
};
export default handdleErrorsController;
