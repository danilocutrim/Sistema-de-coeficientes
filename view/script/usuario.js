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
                axios.get('https://sistemadecoeficientes.herokuapp.com/alunos').then((res) => {

                    let match = res.data.filter(e => {
                        return e.ra == this.aluno.ra && e.senha == this.aluno.senha
                    });

                    (match.length > 0) ? this.logado = true: this.msg = "RA e/ou senha inválidos"

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
        cadastrar() {
            this.aluno.coeficientes[0].cr = this.calcularCR(this.aluno.materias);
            this.aluno.coeficientes[0].ca = 2;
            this.aluno.coeficientes[0].cp = 1;

            axios.post('https://sistemadecoeficientes.herokuapp.com/alunos', this.aluno, {
                headers: {
                    'Content-Type': 'application/json',
                }
            }).then((res) => {
                console.log("Sucesso: " + JSON.stringify(res))
            }).catch((err) => {
                this.msg = JSON.stringify(err);
            })
        }
    },
    watch: {
        logado() {
            alert("Você está logado")
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