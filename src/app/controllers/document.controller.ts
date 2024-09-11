import { Request, Response } from 'express';
import Document/* , { DocumentInput } */ from '@/app/models/document';
import Extension from '@/app/models/extension';
import DocumentExtension from '@/app/models/documentExtension';
import dbConn from '@/config/dbConn';
import logger from '@/config/logger';
import { z } from 'zod';

const documentSchema = z.object({
    document: z.object({
        name: z.string().nonempty('Name is required').min(1).max(70),
        description: z.string().nonempty('Description is required').max(250),
    }),
    format: z.array(z.object({
        value: z.string().nonempty('Extension value is required').min(1).max(10),
    })).nonempty('At least one format is required'),
});

export default class DocumentController {
    static async createDocument(req: Request, res: Response) {
        const t = await dbConn.transaction();
        try {
            const validationResult = documentSchema.safeParse(req.body);

            if (!validationResult.success) {
                const errorMessages = validationResult.error.errors.map(
                    (err) => {
                        return `${err.path[0]}: ${err.message}`;
                    },
                );
                return res.status(400).json({ message: errorMessages.join(', ') });
            }

            const { document, format } = validationResult.data;

            const createdDocument = await Document.create(document, { transaction: t });

            const formatPromises = format.map(async (ext) => {
                const extension = await Extension.findOrCreate({
                    where: { id: ext.value },
                    transaction: t,
                });
                return DocumentExtension.create({
                    document_id: createdDocument.dataValues.id,
                    extension_id: extension[0].dataValues.id,
                }, { transaction: t });
            });

            await Promise.all(formatPromises);
            await t.commit();

            res.status(201).json({ createdDocument });
        } catch (error) {
            await t.rollback();
            logger.error(`Error in createDocument: ${error}`);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    static async updateDocument(req: Request, res: Response) {
        const t = await dbConn.transaction();
        try {
            const { id } = req.params;
            const validationResult = documentSchema.safeParse(req.body);

            if (!validationResult.success) {
                const errorMessages = validationResult.error.errors.map(
                    (err) => {
                        return `${err.path[0]}: ${err.message}`;
                    },
                );
                return res.status(400).json({ message: errorMessages.join(', ') });
            }

            const { document, format } = validationResult.data;

            const existingDocument = await Document.findByPk(id, { transaction: t });

            if (!existingDocument) {
                return res.status(404).json({ message: 'Document not found' });
            }

            await existingDocument.update(document, { transaction: t });

            await DocumentExtension.destroy({
                where: { document_id: id },
                transaction: t,
            });

            const formatPromises = format.map(async (ext) => {
                const extension = await Extension.findOrCreate({
                    where: { id: ext.value },
                    transaction: t,
                });
                return DocumentExtension.create({
                    document_id: existingDocument.dataValues.id,
                    extension_id: extension[0].dataValues.id,
                }, { transaction: t });
            });

            await Promise.all(formatPromises);
            await t.commit();

            res.status(200).json({ updatedDocument: existingDocument });
        } catch (error) {
            await t.rollback();
            logger.error(`Error in updateDocument: ${error}`);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    static async getDocument(req: Request, res: Response) {



        try {
            const { id } = req.params;
            const document = await Document.findByPk(id, {
                include: [
                    {
                        model: Extension,
                        through: { attributes: [] },
                    },
                ],
            });

            if (!document) {
                return res.status(404).json({ message: 'Document not found' });
            }

            res.status(200).json({ document });
        } catch (error) {
            logger.error(`Error in getDocument: ${error}`);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    static async getAllDocuments(_req: Request, res: Response) {
        try {
            const documents = await Document.findAll({
                include: [
                    {
                        model: Extension,
                        through: { attributes: [] },
                        attributes: {
                            exclude: ['createdAt', 'updatedAt', 'definition']
                        },
                    },
                ],
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                },
            });
            res.status(200).json(documents);
        } catch (error) {
            logger.error(`Error in getAllDocuments: ${error}`);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    static async deleteDocument(req: Request, res: Response) {
        const t = await dbConn.transaction();
        try {
            const { id } = req.params;
            const document = await Document.findByPk(id, { transaction: t });

            if (!document) {
                return res.status(404).json({ message: 'Document not found' });
            }

            await DocumentExtension.destroy({
                where: { document_id: id },
                transaction: t,
            });

            await document.destroy({ transaction: t });
            await t.commit();
            res.status(204).send();
        } catch (error) {
            await t.rollback();
            logger.error(`Error in deleteDocument: ${error}`);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
}
// const municipios = {
//     "Amazonas": [
//         "Atures",
//         "Alto Orinoco",
//         "Atabapo",
//         "Autana",
//         "Manapiare",
//         "Río Negro",
//         "Maroa"
//     ],
//     "Anzoátegui": [
//         "Barcelona",
//         "Puerto La Cruz",
//         "El Tigre",
//         "Anaco",
//         "Cantaura",
//         "San José de Guanipa",
//         "Lechería",
//         "Guanta",
//         "Pariaguán",
//         "Aragua de Barcelona",
//         "Clarines",
//         "Puerto Píritu",
//         "Ciudad Orinoco",
//         "San Mateo",
//         "Onoto",
//         "Valle de Guanape",
//         "El Chaparro",
//         "Boca de Uchire"
//     ],
//     "Apure": [
//         "Achaguas",
//         "Biruaca",
//         "Camejo",
//         "Muñoz",
//         "Páez",
//         "Rómulo Gallegos",
//         "San Fernando"
//     ],
//     "Aragua": [
//         "Bolívar",
//         "Camatagua",
//         "Francisco Linares Alcántara",
//         "Girardot",
//         "José Ángel Lamas",
//         "José Félix Ribas",
//         "José Rafael Revenga",
//         "Libertador",
//         "Mario Briceño Iragorry",
//         "Ocumare de la Costa de Oro",
//         "San Casimiro",
//         "San Sebastián",
//         "Santiago Mariño",
//         "Santos Michelena",
//         "Sucre",
//         "Tovar",
//         "Urdaneta",
//         "Zamora"
//     ],
//     "Barinas": [
//         "Arismendi",
//         "Barinas",
//         "Blanco",
//         "Bolívar",
//         "Cruz Paredes",
//         "Obispos",
//         "Pedraza",
//         "Rojas",
//         "Sosa",
//         "Sucre",
//         "Torrealba",
//         "Zamora",
//         "Páez"
//     ],
//     "Bolívar": [
//         "Angostura",
//         "Caroní",
//         "Cedeño",
//         "Chien",
//         "El Callao",
//         "Gran Sabana",
//         "Angostura del Orinoco",
//         "Piar",
//         "Roscio",
//         "Sifontes",
//         "Sucre"
//     ],
//     "Carabobo": [
//         "Bejuma",
//         "Carlos Arvelo",
//         "Diego Ibarra",
//         "Guacara",
//         "Juan José Mora",
//         "Libertador",
//         "Los Guayos",
//         "Miranda",
//         "Montalbán",
//         "Naguanagua",
//         "Puerto Cabello",
//         "San Diego",
//         "San Joaquín",
//         "Valencia"
//     ],
//     "Cojedes": [
//         "Anzoátegui",
//         "Pao de San Juan Bautista",
//         "Tinaquillo",
//         "Girardot",
//         "Lima Blanco",
//         "Ricaurte",
//         "Rómulo Gallegos",
//         "San Carlos",
//         "Tinaco"
//     ],
//     "Delta Amacuro": [
//         "Antonio Díaz",
//         "Casacoima",
//         "Pedernales",
//         "Tucupita"
//     ],
//     "Distrito Capital": [
//         "Libertador",
//         "Baruta",
//         "Chacao",
//         "El Hatillo",
//         "Sucre"
//     ],
//     "Falcón": [
//         "Acosta",
//         "Bolívar",
//         "Buchivacoa",
//         "Carirubana",
//         "Colina",
//         "Dabajuro",
//         "Democracia",
//         "Falcón",
//         "Federación",
//         "Iturriza",
//         "Jacura",
//         "Los Taques",
//         "Mauroa",
//         "Manaure",
//         "Miranda",
//         "Palmasola",
//         "Petit",
//         "Píritu",
//         "San Francisco",
//         "Silva",
//         "Sucre",
//         "Tocópero",
//         "Unión",
//         "Urumaco",
//         "Zamora"
//     ],
//     "Guárico": [
//         "Chaguaramas",
//         "Camaguán",
//         "El Socorro",
//         "Francisco de Miranda",
//         "Leonardo Infante",
//         "Juan José Rondón",
//         "José Félix Ribas",
//         "José Tadeo Monagas",
//         "Juan Germán Roscio",
//         "Julián Mellado",
//         "Ortiz",
//         "San Gerónimo de Guayabal",
//         "San José de Guaribe",
//         "Santa María de Ipire",
//         "Zaraza"
//     ],
//     "Lara": [
//         "Andrés Eloy Blanco",
//         "Crespo",
//         "Iribarren",
//         "Jiménez",
//         "Morán",
//         "Palavecino",
//         "Simón Planas",
//         "Torres",
//         "Urdaneta"
//     ],
//     "Mérida": [
//         "Campo Elías",
//         "Libertador",
//         "Santos Marquina",
//         "Sucre",
//         "Cardenal Quintero",
//         "Miranda",
//         "Pueblo Llano",
//         "Rangel",
//         "Alberto Adriani",
//         "Obispo Ramos de Lora",
//         "Tulio Febres Cordero",
//         "Andrés Bello",
//         "Caracciolo Parra Olmedo",
//         "Julio César Salas",
//         "Justo Briceño",
//         "Antonio Pinto Salinas",
//         "Rivas Dávila",
//         "Guaraque",
//         "Tovar",
//         "Zea",
//         "Aricagua",
//         "Arzobispo Chacón",
//         "Padre Noguera"
//     ],
//     "Miranda": [
//         "Acevedo",
//         "Andrés Bello",
//         "Baruta",
//         "Brión",
//         "Bolívar",
//         "Buroz",
//         "Carrizal",
//         "Chacao",
//         "Cristóbal Rojas",
//         "El Hatillo",
//         "Guaicaipuro",
//         "Gual",
//         "Independencia",
//         "Lander",
//         "Los Salias",
//         "Páez",
//         "Paz Castillo",
//         "Plaza",
//         "Sucre",
//         "Urdaneta",
//         "Zamora"
//     ],
//     "Monagas": [
//         "Acosta",
//         "Aguasay",
//         "Bolívar",
//         "Caripe",
//         "Cedeño",
//         "Libertador",
//         "Maturín",
//         "Piar",
//         "Punceres",
//         "Santa Bárbara",
//         "Sotillo",
//         "Uracoa",
//         "Zamora"
//     ],
//     "Nueva Esparta": [
//         "Acosta",
//         "Aguasay",
//         "Bolívar",
//         "Caripe",
//         "Cedeño",
//         "Libertador",
//         "Maturín",
//         "Piar",
//         "Punceres",
//         "Santa Bárbara",
//         "Sotillo",
//         "Uracoa",
//         "Zamora",
//         "Antolín del Campo",
//         "Arismendi",
//         "Antonio Díaz",
//         "García",
//         "Gómez",
//         "Maneiro",
//         "Marcano",
//         "Mariño",
//         "Macanao",
//         "Tubores",
//         "Villalba"
//     ],
//     "Portuguesa": [
//         "Agua Blanca",
//         "Araure",
//         "Esteller",
//         "Guanare",
//         "Guanarito",
//         "José Vicente de Unda",
//         "Ospino",
//         "Páez",
//         "Papelón",
//         "San Genaro de Boconoíto",
//         "San Rafael de Onoto",
//         "Santa Rosalía",
//         "Sucre",
//         "Turén"
//     ],
//     "Sucre": [
//         "Andrés Eloy Blanco",
//         "Andrés Mata",
//         "Arismendi",
//         "Benítez",
//         "Bermúdez",
//         "Bolívar",
//         "Cajigal",
//         "Cruz Salmerón Acosta",
//         "Libertador",
//         "Mariño",
//         "Mejía",
//         "Montes",
//         "Ribero",
//         "Sucre",
//         "Valdez"
//     ],
//     "Táchira": [
//         "Andrés Bello",
//         "Antonio Rómulo Costa",
//         "Ayacucho",
//         "Bolívar",
//         "Cárdenas",
//         "Córdoba",
//         "Fernández Feo",
//         "Francisco de Miranda",
//         "García de Hevia",
//         "Guásimos",
//         "Independencia",
//         "Jáuregui",
//         "José María Vargas",
//         "Junín",
//         "Libertad",
//         "Libertador",
//         "Lobatera",
//         "Michelena",
//         "Panamericano",
//         "Pedro María Ureña",
//         "Rafael Urdaneta",
//         "Samuel Darío Maldonado",
//         "San Cristóbal",
//         "San Judas Tadeo",
//         "Seboruco",
//         "Simón Rodríguez",
//         "Sucre",
//         "Torbes",
//         "Uribante"
//     ],
//     "Trujillo": [
//         "Andrés Bello",
//         "Boconó",
//         "Bolívar",
//         "Candelaria",
//         "Carache",
//         "Carvajal",
//         "Campo Elías",
//         "Escuque",
//         "La Ceiba",
//         "Márquez Cañizales",
//         "Miranda",
//         "Monte Carmelo",
//         "Motatán",
//         "Pampán",
//         "Pampanito",
//         "Rangel",
//         "Sucre",
//         "Trujillo",
//         "Urdaneta",
//         "Valera"
//     ],
//     "Vargas": [
//         "Vargas"
//     ],
//     "Yaracuy": [
//         "Bastidas",
//         "Bolívar",
//         "Bruzual",
//         "Cocorote",
//         "Independencia",
//         "La Trinidad",
//         "Monge",
//         "Nirgua",
//         "Páez",
//         "Peña",
//         "San Felipe",
//         "Sucre",
//         "Urachiche",
//         "Veroes"
//     ],
//     "Zulia": [
//         "Almirante Padilla",
//         "Baralt",
//         "Cabimas",
//         "Catatumbo",
//         "Colón",
//         "Francisco Javier Pulgar",
//         "Jesús Enrique Lossada",
//         "Jesús María Semprúm",
//         "La Cañada de Urdaneta",
//         "Lagunillas",
//         "Machiques de Perijá",
//         "Mara",
//         "Maracaibo",
//         "Miranda",
//         "Guajira",
//         "Rosario de Perijá",
//         "San Francisco",
//         "Santa Rita",
//         "Simón Bolívar",
//         "Sucre",
//         "Valmore Rodríguez"
//     ]
// };

// console.log(municipios)
