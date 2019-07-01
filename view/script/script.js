new Vue({
    el: "#app",
    mixins: [comp],
    data: {
        aluno: {},
        cr_: 0,
        ca_: 0,
        cp_: 0,
        conceito_: null,
        creditos_: "",
        nomeDisc_: null,

        error: "",


        disc: [{
            nome: null,
            creditos: null
        }, {
            nome: "BM",
            creditos: 3
        }, {
            nome: "FVV",
            creditos: 4
        }, {
            nome: "CES",
            creditos: 2
        }, ],

        cursadas: []
    },
    watch: {
        nomeDisc_() {
            let tmp = Object.keys(this.disc).filter(e => {
                return this.disc[e].nome == this.nomeDisc_;
            });

            this.creditos_ = this.disc[tmp].creditos;

        },
        aluno() {
            console.log(this.aluno)
            this.cr_ = this.calcularCR(this.aluno.materias, 1);
            this.cp_ = this.calcularCP();

            this.cp_ = this.cp;
        }
    },
    methods: {
        calcularCA() {
            let tmp = 0,
                n = 0,
                d = 0,
                uniq = this.cursadas;
            let multiplicador = Object.keys(this.pesos).filter(e => {
                return e == this.conceito;
            });

            let check = Object.keys(this.cursadas).filter(j => {
                return this.cursadas[j].nome == this.nomeDisc;
            });

            if (check.length > 1) {
                let tmpArray = []
                check.forEach(h => {
                    tmpArray.push({
                        peso: uniq[h].peso,
                        pos: h
                    });
                    uniq[h] == null;
                });
                console.log(tmpArray)


                Object.keys(uniq).forEach(i => {

                    if (uniq[i]) {
                        n += (uniq[i].peso * uniq[i].creditos)
                        d += uniq[i].creditos
                    }

                });

                let maior = null;

                Object.keys(tmpArray).forEach(l => {

                    if (!maior) {
                        maior = tmpArray[l].pos
                    } else if (tmpArray[l].peso > tmpArray[maior].peso) {
                        maior = tmpArray[l].pos
                    }

                });

                n += (this.cursadas[maior].peso * this.cursadas[maior].creditos)
                d += this.cursadas[maior].creditos

                tmp = n / d
                this.ca = tmp.toFixed(3);
            } else {

                Object.keys(this.cursadas).forEach(i => {
                    n += (this.cursadas[i].peso * this.cursadas[i].creditos)
                    d += this.cursadas[i].creditos
                })

                tmp = n / d
                this.ca = tmp.toFixed(3);
            }

        },
        async cadastrarDisc() {
            this.error = ""
            let isValid = false;
            (this.conceito_ != null && this.creditos_ != "" && this.nomeDisc_ != "") ? isValid = true: isValid = false;

            if (isValid) {

                let myObj = [{
                    disciplina: this.nomeDisc_,
                    conceito: this.conceito_,
                    creditos: this.creditos_,
                    codigo: 0
                }];

                this.cr_ = this.calcularCR(myObj, 0)
                this.cp_ = this.calcularCP();
            } else {
                this.error = "Existe campos em brancos"
            }
        }
    },
    created() {
        let ra = "11201720166";
        axios.get('54.91.165.194:3000/alunos?skip=0&limit=0').then((res) => {

            let match = res.data.filter(e => {
                return e.ra == ra
            });
            this.aluno = match[0];
        }).catch((err) => {
            this.msg = err;
        });
    }
})