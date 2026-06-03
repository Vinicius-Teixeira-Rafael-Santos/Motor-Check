import { Router } from 'express';
import axios from 'axios';

const router = Router();

/*
TIPOS ACEITOS:
carros
motos
*/

router.get('/marcas/:tipo', async (req, res) => {
  try {
    const { tipo } = req.params;

    const response = await axios.get(
      `https://parallelum.com.br/fipe/api/v1/${tipo}/marcas`
    );

    return res.json(response.data);
  } catch (error) {
    return res.status(500).json({
      error: 'Erro ao buscar marcas',
    });
  }
});

router.get('/modelos/:tipo/:marcaId', async (req, res) => {
  try {
    const { tipo, marcaId } = req.params;

    const response = await axios.get(
      `https://parallelum.com.br/fipe/api/v1/${tipo}/marcas/${marcaId}/modelos`
    );

    return res.json(response.data.modelos);
  } catch (error) {
    return res.status(500).json({
      error: 'Erro ao buscar modelos',
    });
  }
});

router.get(
  '/anos/:tipo/:marcaId/:modeloId',
  async (req, res) => {
    try {
      const { tipo, marcaId, modeloId } = req.params;

      const response = await axios.get(
        `https://parallelum.com.br/fipe/api/v1/${tipo}/marcas/${marcaId}/modelos/${modeloId}/anos`
      );

      return res.json(response.data);
    } catch (error) {
      return res.status(500).json({
        error: 'Erro ao buscar anos',
      });
    }
  }
);

router.get(
  '/valor/:tipo/:marcaId/:modeloId/:anoId',
  async (req, res) => {
    try {
      const {
        tipo,
        marcaId,
        modeloId,
        anoId,
      } = req.params;

      const response = await axios.get(
        `https://parallelum.com.br/fipe/api/v1/${tipo}/marcas/${marcaId}/modelos/${modeloId}/anos/${anoId}`
      );

      return res.json(response.data);
    } catch (error) {
      return res.status(500).json({
        error: 'Erro ao consultar FIPE',
      });
    }
  }
);

export default router;