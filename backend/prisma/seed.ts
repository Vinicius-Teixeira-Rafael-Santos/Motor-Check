import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.maintenanceType.createMany({
    data: [
      {
        nome: 'Troca de óleo',
        intervaloModeradoKm: 10000,
      },
      {
        nome: 'Filtro de óleo',
        intervaloModeradoKm: 10000,
      },
      {
        nome: 'Filtro de ar',
        intervaloModeradoKm: 20000,
      },
      {
        nome: 'Velas',
        intervaloModeradoKm: 40000,
      },
    ],
    skipDuplicates: true,
  });

  console.log('MaintenanceTypes criados!');
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });