import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { auth } from '../middlewares/auth';

const router = Router();
const prisma = new PrismaClient();

/* LISTAR VEÍCULOS */
router.get('/', async (req, res) => {
  const vehicles = await prisma.vehicle.findMany();

  return res.json(vehicles);
});

/* CRIAR VEÍCULO */
router.post('/', auth, async (req, res) => {
  try {
    const {
      placa,
      modelo,
      marca,
      ano,
      quilometragem,
      combustivel,
      tipo,
    } = req.body;

    const vehicle = await prisma.vehicle.create({
      data: {
        usuarioId: (req as any).userId,
        placa,
        modelo,
        marca,
        ano,
        quilometragem,
        combustivel,
        tipo,
      },
    });

    return res.status(201).json(vehicle);
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      error: 'Erro ao criar veículo',
    });
  }
});

export default router;