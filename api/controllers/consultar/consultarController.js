var DAO = require('../../DAO/DAO');
const { GenereteConsult } = require('../../services/Gemini');
var { queryInsertSingle } = require('../../util/queryGen');

async function createConsultar(req, res) {
  const { paciente, doencas, outro, SK_USUARIO } = req.body;
  try {
    const sintomasPrompt = doencas.flatMap((item) => {
      return `\n${item.id}: ${item.sintomas.map((vlr) => vlr)} `;
    });
    const prompt =
      `Sua atuação aqui será dar um PRE DIAGNOSTICO de acordo com alguns sintomas. Você não irá confirmar qual doença, apenas sugerir o que pode ser. Voce vai receber um texto como: ParteDoCorpo: [..sintomas].

      Retorne SEMPRE o texto formatado para HTML. Pois irei exibir em tela.

    Paciente: ${paciente.nome}
    Texto: 
    ${sintomasPrompt}`.trim();

    const analiseAI = await GenereteConsult(prompt);

    if (!analiseAI) {
      return res.status(500).json({ message: 'Erro ao gerar IA.' });
    }

    const queryCab = `INSERT INTO dim_cabecalho_consulta ${queryInsertSingle({
      SK_USUARIO,
      SK_PACIENTE: paciente.id,
      outro,
    })}`;

    const responseCab = await DAO.insert(queryCab);
    if (responseCab.status === 200 && responseCab.body.length > 0) {
      const SK_CABECALHO_CONSULTA = responseCab.body[0];

      let values = '';
      for (let index = 0; index < doencas.length; index++) {
        const doenca = doencas[index];
        console.log({ doenca });
        const SLUG_SINTOMA = doenca.id;
        for (let idx = 0; idx < doenca.sintomas.length; idx++) {
          const sintomas = doenca.sintomas[idx];
          console.log({ sintomas });
          values += `('${SK_CABECALHO_CONSULTA}','${SLUG_SINTOMA}','${sintomas}'),`;
        }
      }
      values = values.slice(0, -1);
      const query = `INSERT INTO ft_consulta (SK_CABECALHO_CONSULTA,SLUG_SINTOMA,DS_SINTOMA) VALUES ${values}`;
      const response = await DAO.insert(query);
      if (response.status === 200 && response.body.length > 0) {
        const queryFT = `INSERT INTO ft_analise_consulta ${queryInsertSingle({
          sk_consulta: response.body[0],
          analise: analiseAI,
        })}`;
        const responseFT = await DAO.insert(queryFT);
        return responseFT.status === 200 && responseFT.body.length > 0
          ? res.status(200).json(analiseAI)
          : res.status(500).json({ message: 'Erro ao salvar.' });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
}
module.exports = { createConsultar };
