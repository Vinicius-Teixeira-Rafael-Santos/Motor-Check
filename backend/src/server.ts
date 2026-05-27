import express from 'express';
import cors from 'cors';
import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

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
        name,
        email,
        password: hashedPassword,
      },
    });

    return res.status(201).json(user);
  } catch (error) {
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
      user.password
    );

    if (!passwordMatch) {
      return res.status(400).json({
        error: 'Senha inválida',
      });
    }

    return res.status(200).json({
      message: 'Login realizado',
      user,
    });
  } catch (error) {
    return res.status(500).json({
      error: 'Erro interno do servidor',
    });
  }
});

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});