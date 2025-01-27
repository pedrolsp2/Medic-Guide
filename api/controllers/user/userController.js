const bcrypt = require('bcrypt');
var DAO = require('../../DAO/DAO');
var { queryInsertSingle } = require('../../util/queryGen');

async function createUser(req, res) {
  const { NM_USUARIO, EMAIL_USUARIO, DS_USUARIO, SENHA_USUARIO, POLITICA } =
    req.body;

  try {
    const hashedPassword = await bcrypt.hash(SENHA_USUARIO, 10);
    let query = /*SQL*/ `
      INSERT INTO dim_usuario ${queryInsertSingle({
        NM_USUARIO,
        EMAIL_USUARIO,
        DS_USUARIO,
        SENHA_USUARIO: hashedPassword,
        POLITICA,
      })} `;
    const response = await DAO.insert(query);

    return response.status === 200
      ? res.json({
          message: `Usuario ${NM_USUARIO} criado com sucesso!`,
        })
      : res.status(500).json({ message: 'Erro ao criar usuario.' });
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    return res.status(500).json({ error: 'Erro ao criar usuário.' });
  }
}
const listUser = async (req, res) => {
  try {
    let queryValidUser = /*SQL*/ `SELECT * FROM dim_usuario`;
    const responseValidUser = await DAO.select(queryValidUser);

    if (!responseValidUser.body[0]) {
      return res.status(401).json({ message: 'Usuário ou senha inválidos.' });
    } else {
      res.status(200).json({
        status: 200,
        message: 'Login bem-sucedido',
        data: { token: responseValidUser.body },
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};
const listUsers = async (req, res) => {
  try {
    let query = /*SQL*/ `
    SELECT US.SK_USUARIO,
      US.EMAIL_USUARIO,
      US.NM_USUARIO,
      US.DS_USUARIO,
      dp.ds_politica as POLITICA
      FROM dim_usuario US INNER JOIN dim_politica dp on US.POLITICA = dp.id_politica where US.D_E_L_E_T IS NULL`;

    const response = await DAO.select(query);
    return response.status === 200
      ? res.status(200).json(response.body)
      : res.status(500).json({ message: 'Erro ao buscar' });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};

module.exports = {
  createUser,
  listUser,
  listUsers,
};
