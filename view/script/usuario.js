new Vue({
    el: "#app",
    mixins: [comp],

    data: {
        msg: null,
        logado: false,
        curso: "Selecione um curso",
        campus: "Selecione um dos campi",
        /**
         * Objeto aluno
         */
        aluno: {
            nomealuno: null,
            ra: null,
            senha: null,
            curso: [{
                nomecurso: null,
                codigocurso: null,
                campus: null,
                creditostotal: 180
            }],
            coeficientes: [{
                ca: null,
                cp: null,
                cr: null
            }],
            materias: []
        },
    },
    methods: {
        async realizarLogin() {

            this.msg = null;
            if (this.aluno.ra != null && this.aluno.senha != null) {
                axios.get('https://sistemadecoeficientes.herokuapp.com/alunos?skip=0&limit=0').then((res) => {

                    let match = res.data.filter(e => {
                        return e.ra == this.aluno.ra && e.senha == this.aluno.senha
                    });

                    (match.length > 0) ? this.logado = true: this.msg = "RA e/ou senha inválidos"

                    localStorage.setItem("user", match.ra);

                }).catch((err) => {
                    this.msg = err;
                })
            } else {
                this.msg = "Existem campos em branco"
            }
        },
        loadTextFromFile(ev) {
            const file = ev.target.files[0];
            const reader = new FileReader();

            reader.onload = ((e) => {
                this.aluno.materias = JSON.parse(e.target.result);
            })
            reader.readAsText(file);
        },
        validaCadastro(obj) {
            if (obj.nomealuno != null &&
                obj.ra != null &&
                obj.senha != null &&
                obj.curso.nomecurso != null &&
                obj.materias.length > 0) {
                return true;
            } else {
                return false;
            }
        },
        goCadastro() {
            window.location = "../cadastrar"
        },
        goLogin() {
            window.location = "../entrar"
        },
        cadastrar() {
            this.msg = null;

            this.aluno.coeficientes[0].cr = this.calcularCR(this.aluno.materias, 1);
            this.aluno.coeficientes[0].ca = 2;
            this.aluno.coeficientes[0].cp = this.calcularCP(this.aluno.materias);

            axios.post('https://sistemadecoeficientes.herokuapp.com/alunos', this.aluno, {
                headers: {
                    'Content-Type': 'application/json',
                }
            }).then((res) => {
                this.msg = "Sucesso ao cadastrar";

            }).catch((err) => {
                this.msg = JSON.stringify(err);
            })
        }
    },
    watch: {
        logado() {
            window.location = "../home";
        },
        curso() {
            this.aluno.curso[0].nomecurso = this.curso;
            this.aluno.curso[0].codigocurso = "CS1912";
        },
        campus() {
            this.aluno.curso[0].campus = this.campus;
        }
    }
})