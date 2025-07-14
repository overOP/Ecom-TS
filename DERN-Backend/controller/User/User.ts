import { Request, Response } from 'express';
import { prisma } from '../../config/Prisma';

const dataApi = async (req: Request, res: Response): Promise<Response> => {
    try {
        const getAllUsers = await prisma.user.findMany({
            select: {
                id: true,
                email: true,
                name: true,
            }
        });

        if (!getAllUsers || getAllUsers.length === 0) {
            return res.status(400).json({
                message: "No users found"
            });
        }

        return res.status(200).json({
            message: "Users found",
            data: getAllUsers
        });
    } catch (error: any) {
        console.error("Error in User:", error);
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
};

export default dataApi;
