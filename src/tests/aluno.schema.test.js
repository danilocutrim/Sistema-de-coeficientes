const assert = require('assert')
const Mongodb = require('../db/strategies/mongodb/mongodb')
const Context = require('../db/strategies/base/contextStrategy')
const AlunoSchema = require('../db/strategies/mongodb/scheemas/alunoSchema')
const MOCK_MATERIA_CADASTRAR = {
    ano:2015,
    disciplina:'Base Experimental das Ciências Naturais',
    categoria:'Obrigatória',
    codigo:'BCS0001-13',
    situacao:'Aprovado',
    creditos:3,
    conceito:'A',
    periodo:'2'
   }
const MOCK_MATERIA_CADASTRAR_ARR = {
    ano:2015,
    disciplina:'Base Experimental das Ciências Naturais',
    categoria:'Obrigatória',
    codigo:'BCS0001-13',
    situacao:'Aprovado',
    creditos:3,
    conceito:'A',
    periodo:'2'
   }
const MOCK_COEFICIENTES_CADASTRAR = {
    ca:2,
    cp:3,
    cr:4
}
const MOCK_CURSO_CADASTRAR = {
    nomecurso:'Engenharia',
    codigocurso:'0303efd',
    campus:'sta',
    creditostotal:20
}
const MOCK_ALUNO_DEFAULT = {
    nomealuno:'rosimeire',
    ra:1114412,
    senha:'123',
    curso:[MOCK_CURSO_CADASTRAR],
    coeficientes:[MOCK_COEFICIENTES_CADASTRAR],
    materias:[MOCK_MATERIA_CADASTRAR]
}
const MOCK_ALUNO_CADASTRAR = {
    nomealuno:'danilo',
    ra:1121,
    senha:'12344',
    curso:[MOCK_CURSO_CADASTRAR],
    coeficientes:[MOCK_COEFICIENTES_CADASTRAR],
    materias:[MOCK_MATERIA_CADASTRAR]
}
const vetor = [{ "ano": 2015, "disciplina": "Base Experimental das Ciências Naturais", "categoria": "Obrigatória", "codigo": "BCS0001-13", "situacao": "Aprovado", "creditos": 3, "conceito": "A", "periodo": "2" },
 { "ano": 2015, "disciplina": "Estrutura da Matéria", "categoria": "Obrigatória", "codigo": "BIK0102-13", "situacao": "Aprovado", "creditos": 3, "conceito": "B", "periodo": "2" },
  { "ano": 2015, "disciplina": "Origem da Vida e Diversidade dos Seres Vivos", "categoria": "Obrigatória", "codigo": "BIL0304-13", "situacao": "Aprovado", "creditos": 3, "conceito": "C", "periodo": "2" }]
let MOCK_ALUNO_ID = ''
let MOCK_ALUNO_ID2 = '5cbe805152fc5524e1082b14'

let context = {}
describe('Mongo DB suite teste aluno',function(){
    this.beforeAll(async()=>{
        const connection = Mongodb.connect()
        context = new Context(new Mongodb(connection, AlunoSchema))
    })
    it('cadastrar aluno e parametros', async()=>{
        const result = await context.create(MOCK_ALUNO_CADASTRAR)
        MOCK_ALUNO_ID = result.id

        const{
            nomecurso,
            codigocurso,
            campus,
            creditostotal
        } = result.curso[0]

        const{
            ca,
            cp,
            cr
        } = result.coeficientes[0]

        const {
               ano,
               disciplina,
               categoria,
               codigo,
               situacao,
               creditos,
               conceito,
               periodo}= result.materias[0]

        assert.deepEqual({
            nomecurso,
            codigocurso,
            campus,
            creditostotal
        },MOCK_ALUNO_CADASTRAR.curso[0],'Curso infos')
        assert.deepEqual({
            ca,
            cp,
            cr
        },MOCK_ALUNO_CADASTRAR.coeficientes[0],'Coeficientes corretos')

        assert.deepEqual({
               ano,
               disciplina,
               categoria,
               codigo,
               situacao,
               creditos,
               conceito,
               periodo
        },MOCK_ALUNO_CADASTRAR.materias[0])
        console.log(MOCK_ALUNO_CADASTRAR)
        assert.deepEqual(result.nomealuno,MOCK_ALUNO_CADASTRAR.nomealuno)
        assert.deepEqual(result.ra,MOCK_ALUNO_CADASTRAR.ra)
        assert.deepEqual(result.senha,MOCK_ALUNO_CADASTRAR.senha)
    })

    it('deve ler um aluno do banco de dados',async()=>{
        await context.create(MOCK_ALUNO_DEFAULT)
        const [{nomealuno,ra,senha,curso,coeficientes,materias}] = await context.read({nomealuno:MOCK_ALUNO_DEFAULT.nomealuno})
        result ={nomealuno,ra,senha,curso,coeficientes,materias}
        const {
            nomecurso,
            codigocurso,
            campus,
            creditostotal
        } = result.curso[0]

        const {
            ca,
            cp,
            cr
            } = result.coeficientes[0]

        const {
            ano,
            categoria,
            codigo,
            conceito,
            creditos,
            disciplina,
            periodo,
            situacao
            } = result.materias[0]

        assert.deepEqual(result.nomealuno,MOCK_ALUNO_DEFAULT.nomealuno)
        assert.deepEqual(result.ra,MOCK_ALUNO_DEFAULT.ra)
        assert.deepEqual(result.senha,MOCK_ALUNO_DEFAULT.senha)
        assert.deepEqual({
            nomecurso,
            codigocurso,
            campus,
            creditostotal
             },MOCK_ALUNO_DEFAULT.curso[0])
        assert.deepEqual( {
            ca,
            cp,
            cr
            },MOCK_ALUNO_DEFAULT.coeficientes[0])
        assert.deepEqual({
            ano,
            categoria,
            codigo,
            conceito,
            creditos,
            disciplina,
            periodo,
            situacao
            }, MOCK_ALUNO_DEFAULT.materias[0])
    })
    it('deve atualizar um id especifico', async()=>{
        const result = await context.update(MOCK_ALUNO_ID,{nomealuno: 'marcel'})
        assert.deepEqual(result.nModified,1)
    })
    it('deve deletar um aluno por id', async()=>{
        const result = await context.delete(MOCK_ALUNO_ID)
        assert.deepEqual(result.n,1)
    })
    it('deve adicionar um elemento de array de objeto ', async()=>{
        const result = await context.addToArray(MOCK_ALUNO_ID2,{materias:vetor})
        console.log(result)
        assert.deepEqual(result.nModified,1)
    })

})