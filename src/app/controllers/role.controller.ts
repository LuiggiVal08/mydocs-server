import { Response } from 'express';
import Role from '@/app/models/role';
import dbConn from '@/config/dbConn';
import logger from '@/config/logger';
import { AuthenticatedRequest } from '@/types/auth';

class RoleCtrl {
    // Get all roles
    static async getAllRoles(_req: AuthenticatedRequest, res: Response) {
        try {
            const roles = await Role.findAll();
            console.log(`Retrieved all roles successfully: ${roles}`);
            return res.json(roles);
        } catch (error) {
            console.error(`Error retrieving all roles: ${error}`);
            return res.status(500).json({ error: 'Failed to retrieve roles' });
        }
    }
    static async getRolesById(req: AuthenticatedRequest, res: Response) {
        try {
            const role = await Role.findByPk(req.params.id);
            if (!role) {
                return res.status(404).json({ error: 'Role not found' });
            }
            // logger.info(`Retrieved role successfully: ${role}`);
            return res.json({
                body: role,
                tokenExpiration: req.tokenExpiration,
            });
        } catch (error) {
            logger.error(`Error retrieving role: ${error}`);
            return res.status(500).json({ error: 'Failed to retrieve role' });
        }
    }

    // Create a new role
    static async createRole(req: AuthenticatedRequest, res: Response) {
        const t = await dbConn.transaction();
        try {
            if (!req.body.name || !req.body.description) {
                return res
                    .status(400)
                    .json({ error: 'Name and description are required' });
            }
            const newRole = await Role.create(req.body, { transaction: t });
            await t.commit();
            logger.info(`Role created successfully: ${newRole}`);
            return res.status(201).json(newRole);
        } catch (error) {
            await t.rollback();
            logger.error(`Error creating role: ${error}`);
            return res.status(400).json({ error: error });
        }
    }

    // Update a role
    static async updateRole(req: AuthenticatedRequest, res: Response) {
        try {
            const role = await Role.findByPk(req.params.id);
            if (!role) {
                return res.status(404).json({ error: 'Role not found' });
            }
            await role.update(req.body);
            return res.json(role);
        } catch (error) {
            return res.status(400).json({ error: 'Bad Authenticated' });
        }
    }

    // Delete a role
    static async deleteRole(req: AuthenticatedRequest, res: Response) {
        try {
            const role = await Role.findByPk(req.params.id);
            if (!role) {
                return res.status(404).json({ error: 'Role not found' });
            }
            await role.destroy();
            return res.json({ message: 'Role deleted successfully' });
        } catch (error) {
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
}

export default RoleCtrl;
