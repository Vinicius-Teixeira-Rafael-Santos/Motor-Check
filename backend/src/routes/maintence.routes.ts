import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { auth } from '../middlewares/auth';

const router = Router();
const prisma = new PrismaClient();

/* LISTAR TIPOS DE MANUTENÇÃO */
router.get('/types/all', auth, async (req, res) => {
  try {
    const types = await prisma.maintenanceType.findMany({
      orderBy: {
        nome: 'asc',
      },
    });

    return res.json(types);
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      error: 'Erro ao buscar tipos de manutenção',
    });
  }
});

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

/* STATUS DAS MANUTENÇÕES */
router.get(
  '/status/:vehicleId',
  auth,
  async (req, res) => {
    try {
      const vehicleId = Number(req.params.vehicleId);

      const vehicle = await prisma.vehicle.findUnique({
        where: {
          id: vehicleId,
        },
      });

      if (!vehicle) {
        return res.status(404).json({
          error: 'Veículo não encontrado',
        });
      }

      const maintenanceTypes =
        await prisma.maintenanceType.findMany();

      const maintenances =
        await prisma.maintenance.findMany({
          where: {
            veiculoId: vehicleId,
          },
          include: {
            tipoManutencao: true,
          },
        });

      const result = maintenanceTypes.map(type => {
        const maintenance = maintenances.find(
          item => item.tipoManutencaoId === type.id
        );

        const intervalo =
          vehicle.tipoUso === 'leve'
            ? type.intervaloLeveKm
            : vehicle.tipoUso === 'intenso'
            ? type.intervaloIntensoKm
            : type.intervaloModeradoKm;

        if (!maintenance) {
          return {
            tipoManutencaoId: type.id,
            nome: type.nome,
            ultimaTrocaKm: null,
            proximaTrocaKm: intervalo,
            status: 'NÃO REGISTRADA',
          };
        }

        let status = 'EM DIA';

        if (
          maintenance.proximaTrocaKm &&
          vehicle.quilometragem >=
            maintenance.proximaTrocaKm
        ) {
          status = 'ATRASADA';
        } else if (
          maintenance.proximaTrocaKm &&
          vehicle.quilometragem >=
            maintenance.proximaTrocaKm - 1000
        ) {
          status = 'ATENÇÃO';
        }

        return {
          id: maintenance.id,
          tipoManutencaoId: type.id,
          nome: type.nome,
          ultimaTrocaKm:
            maintenance.ultimaTrocaKm,
          proximaTrocaKm:
            maintenance.proximaTrocaKm,
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