new Vue({
    el: "#app",
    data: {
        cr: 0,
        ca: 0,
        cp: 0,
        conceito: null,
        creditos: "",
        nomeDisc: null,
        error: "",
        pesos: {
            A: 4,
            B: 3,
            C: 2,
            D: 1,
            F: 0,
            O: 0
        },
        numerador: 0,
        numerador2: 0,

        denominador: 0,
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
        nomeDisc() {
            let tmp = Object.keys(this.disc).filter(e => {
                return this.disc[e].nome == this.nomeDisc;
            });

            this.creditos = this.disc[tmp].creditos;
        }
    },
    methods: {
        calcularCR() {
            let tmp = 0,
                n = 0,
                d = 0;

            let multiplicador = Object.keys(this.pesos).filter(e => {
                return e == this.conceito;
            });

            this.cursadas.push({
                nome: this.nomeDisc,
                creditos: parseInt(this.creditos),
                peso: parseInt(this.pesos[multiplicador])
            });

            let check = Object.keys(this.cursadas).filter(j => {
                return this.cursadas[j].nome == this.nomeDisc;
            });

            Object.keys(this.cursadas).forEach(i => {
                n += (this.cursadas[i].peso * this.cursadas[i].creditos)
                d += this.cursadas[i].creditos
            })

            tmp = n / d
            this.cr = tmp.toFixed(3);
        },
        calcularCP() {
            let tmp = 0;
            let multiplicador = Object.keys(this.pesos).filter(e => {
                return e == this.conceito;
            });
            if (this.pesos[multiplicador] > 0) {
                this.numerador2 += parseInt(this.pesos[multiplicador]);
                let denominador = 180;

                tmp = this.numerador2 / denominador
                this.cp = tmp.toFixed(3);
            } else {
                this.cp = this.cp;
            }
        },
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
            (this.conceito != null && this.creditos != "" && this.nomeDisc != "") ? isValid = true: isValid = false;

            if (isValid) {
                this.calcularCR();
                this.calcularCP();
                await this.calcularCA();
            } else {
                this.error = "Existe campos em brancos"
            }
        }
    }
})