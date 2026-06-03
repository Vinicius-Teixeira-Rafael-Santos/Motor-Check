import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { auth } from '../middlewares/auth';

const router = Router();
const prisma = new PrismaClient();

/* LISTAR VEÍCULOS DO USUÁRIO LOGADO */
router.get('/', auth, async (req, res) => {
  try {
    const vehicles = await prisma.vehicle.findMany({
      where: {
        usuarioId: (req as any).userId,
      },
      orderBy: {
        criadoEm: 'desc',
      },
    });

    return res.json(vehicles);
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      error: 'Erro ao listar veículos',
    });
  }
});

/* BUSCAR VEÍCULO POR ID */
router.get('/:id', auth, async (req, res) => {
  try {
    const vehicle = await prisma.vehicle.findFirst({
      where: {
        id: Number(req.params.id),
        usuarioId: (req as any).userId,
      },
    });

    if (!vehicle) {
      return res.status(404).json({
        error: 'Veículo não encontrado',
      });
    }

    return res.json(vehicle);
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      error: 'Erro ao buscar veículo',
    });
  }
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
      codigoMarcaFipe,
      codigoModeloFipe,
      codigoAnoFipe,
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

        codigoMarcaFipe,
        codigoModeloFipe,
        codigoAnoFipe,
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

/* ATUALIZAR VEÍCULO */
router.put('/:id', auth, async (req, res) => {
  try {
    const vehicle = await prisma.vehicle.findFirst({
      where: {
        id: Number(req.params.id),
        usuarioId: (req as any).userId,
      },
    });

    if (!vehicle) {
      return res.status(404).json({
        error: 'Veículo não encontrado',
      });
    }

    const {
      placa,
      modelo,
      marca,
      ano,
      quilometragem,
      combustivel,
      tipo,
      codigoMarcaFipe,
      codigoModeloFipe,
      codigoAnoFipe,
    } = req.body;

    const updatedVehicle = await prisma.vehicle.update({
      where: {
        id: Number(req.params.id),
      },
      data: {
        placa,
        modelo,
        marca,
        ano,
        quilometragem,
        combustivel,
        tipo,
        codigoMarcaFipe,
        codigoModeloFipe,
        codigoAnoFipe,
      },
    });

    return res.json(updatedVehicle);
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      error: 'Erro ao atualizar veículo',
    });
  }
});

/* EXCLUIR VEÍCULO */
router.delete('/:id', auth, async (req, res) => {
  try {
    const vehicle = await prisma.vehicle.findFirst({
      where: {
        id: Number(req.params.id),
        usuarioId: (req as any).userId,
      },
    });

    if (!vehicle) {
      return res.status(404).json({
        error: 'Veículo não encontrado',
      });
    }

    await prisma.vehicle.delete({
      where: {
        id: Number(req.params.id),
      },
    });

    return res.status(204).send();
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      error: 'Erro ao excluir veículo',
    });
  }
});

export default router;