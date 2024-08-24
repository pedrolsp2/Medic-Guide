const bcrypt = require('bcrypt');
var DAO = require('../../DAO/DAO');
var { queryInsertSingle, queryUpdate } = require('../../util/queryGen');

async function novoPaciente(req, res) {
  const { name, age, sex } = req.body;

  try {
    const queryLista = `SELECT COUNT(*) as TOTAL FROM pacientes WHERE name = '${name}'`;
    const responseList = await DAO.select(queryLista);
    if (responseList.status === 200) {
      if (responseList.body[0].TOTAL > 0) {
        res
          .status(500)
          .json({ message: `Erro ao criar usuario. ${name} ja existe.` });
      } else {
        const query = `INSERT INTO pacientes ${queryInsertSingle({
          name,
          age,
          sex,
        })}`;
        const response = await DAO.insert(query);
        return response.status === 200
          ? res.status(200).json({ message: `Sucesso ao cadastrar ${name}.` })
          : res.status(500).json({ error: 'Erro ao criar usuário.' });
      }
    }
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    return res.status(512).json({ error: 'Erro ao criar usuário.' });
  }
}
async function buscaPaciente(req, res) {
  const query = `SELECT * FROM pacientes WHERE deletado IS NULL`;
  const response = await DAO.select(query);
  return response.status === 200
    ? res.status(200).json(response.body)
    : res.status(500).json({ error: 'Erro ao buscar paciente.' });
}

async function deletPacient(req, res) {
  const query = `UPDATE pacientes SET deletado = '*' WHERE id = ${req.body.id}`;
  const response = await DAO.update(query);
  return response.status === 200
    ? res.status(200).json({ message: 'Sucesso ao deletar paciente.' })
    : res.status(500).json({ error: 'Erro ao deletar paciente.' });
}

async function editPacient(req, res) {
  const { name, age, sex } = req.body;
  const query = `UPDATE pacientes SET ${queryUpdate({
    name,
    age,
    sex,
  })} WHERE id = ${req.body.id}`;
  const response = await DAO.update(query);
  return response.status === 200
    ? res.status(200).json({ message: 'Sucesso ao editar paciente.' })
    : res.status(500).json({ error: 'Erro ao editar paciente.' });
}

module.exports = {
  novoPaciente,
  buscaPaciente,
  deletPacient,
  editPacient,
};
