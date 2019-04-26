new Vue({
    el: "#app",
    data: {
        msg: null,
        logado: false,
        aluno: {
            nome: null,
            ra: null,
            email: null,
            senha: null,
            curso: {
                nomeCurso: null,
                codigoCurso: null,
                campus: null,
                creditosTotal: null
            },
            coeficientes: {
                ca: null,
                cp: null,
                cr: null
            },
            materias: []
        }
    },
    methods: {
        async realizarLogin() {

            this.msg = null;
            if (this.aluno.ra != null && this.aluno.senha != null) {
                axios.get('https://sistemadecoeficientes.herokuapp.com/alunos').then((res) => {

                    let match = res.data.filter(e => {
                        return e.ra == this.aluno.ra && e.senha == this.aluno.senha
                    });

                    (match.length > 0) ? this.logado = true : this.msg = "RA e/ou senha inválidos"

                }).catch((err) => {
                    this.msg = err;
                })
            } else {
                this.msg = "Existem campos em branco"
            }
        }
    },
    watch: {
        logado() {
            alert("Você está logado")
        }
    }
})