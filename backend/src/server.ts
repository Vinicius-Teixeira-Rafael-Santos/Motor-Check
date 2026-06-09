import express from 'express';
import cors from 'cors';
import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

import vehicleRoutes from './routes/vehicle.routes';
import fipeRoutes from './routes/fipe.routes';
import maintenanceRoutes from './routes/maintence.routes';

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

/* ROTAS DA FIPE */
app.use('/fipe', fipeRoutes);

/* ROTAS DE VEÍCULO */
app.use('/vehicles', vehicleRoutes);

/* ROTAS DE MANUTENÇÃO */
app.use('/maintenances', maintenanceRoutes);

/* REGISTER */
app.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (userExists) {
      return res.status(400).json({
        error: 'Usuário já existe',
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        nome: name,
        email,
        senha: hashedPassword,
      },
    });

    return res.status(201).json(user);
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      error: 'Erro interno do servidor',
    });
  }
});

/* LOGIN */
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(400).json({
        error: 'Usuário não encontrado',
      });
    }

    const passwordMatch = await bcrypt.compare(
      password,
      user.senha
    );

    if (!passwordMatch) {
      return res.status(400).json({
        error: 'Senha inválida',
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: '7d',
      }
    );

    return res.json({
      user,
      token,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      error: 'Erro interno',
    });
  }
});

app.listen(3333, () => {
  console.log('Servidor rodando na porta 3333');
});