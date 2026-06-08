import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { auth } from '../middlewares/auth';

const router = Router();
const prisma = new PrismaClient();

/* LISTAR MANUTENÇÕES DE UM VEÍCULO */
router.get('/:vehicleId', auth, async (req, res) => {
  try {
    const vehicleId = Number(req.params.vehicleId);

    const maintenances = await prisma.maintenance.findMany({
      where: {
        veiculoId: vehicleId,
      },
      include: {
        tipoManutencao: true,
      },
      orderBy: {
        criadoEm: 'desc',
      },
    });

    return res.json(maintenances);
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      error: 'Erro ao buscar manutenções',
    });
  }
});

/* REGISTRAR MANUTENÇÃO */
router.post('/', auth, async (req, res) => {
  try {
    const {
      veiculoId,
      tipoManutencaoId,
      quilometragemAtual,
      observacoes,
    } = req.body;

    const maintenanceType =
      await prisma.maintenanceType.findUnique({
        where: {
          id: tipoManutencaoId,
        },
      });

    if (!maintenanceType) {
      return res.status(404).json({
        error: 'Tipo de manutenção não encontrado',
      });
    }

    const proximaTrocaKm =
      quilometragemAtual +
      (maintenanceType.intervaloModeradoKm || 10000);

    const maintenance =
      await prisma.maintenance.create({
        data: {
          veiculoId,
          tipoManutencaoId,

          ultimaTrocaKm: quilometragemAtual,
          ultimaTrocaData: new Date(),

          proximaTrocaKm,
          observacoes,
        },
      });

    return res.status(201).json(maintenance);
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      error: 'Erro ao registrar manutenção',
    });
  }
});

/* BUSCAR PRÓXIMAS MANUTENÇÕES */
router.get(
  '/status/:vehicleId',
  auth,
  async (req, res) => {
    try {
      const vehicleId = Number(req.params.vehicleId);

      const vehicle =
        await prisma.vehicle.findUnique({
          where: {
            id: vehicleId,
          },
        });

      if (!vehicle) {
        return res.status(404).json({
          error: 'Veículo não encontrado',
        });
      }

      const maintenances =
        await prisma.maintenance.findMany({
          where: {
            veiculoId: vehicleId,
          },
          include: {
            tipoManutencao: true,
          },
        });

      const result = maintenances.map(item => {
        let status = 'EM DIA';

        if (
          item.proximaTrocaKm &&
          vehicle.quilometragem >= item.proximaTrocaKm
        ) {
          status = 'ATRASADA';
        } else if (
          item.proximaTrocaKm &&
          vehicle.quilometragem >=
            item.proximaTrocaKm - 1000
        ) {
          status = 'ATENÇÃO';
        }

        return {
          ...item,
          status,
        };
      });

      return res.json(result);
    } catch (error) {
      console.log(error);

      return res.status(500).json({
        error: 'Erro ao buscar status',
      });
    }
  }
);

export default router;