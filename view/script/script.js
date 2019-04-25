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
            creditos: 4
        }, {
            nome: "FVV",
            creditos: 4
        }, {
            nome: "CES",
            creditos: 2
        }, ]
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
        async calcularCR() {
            let tmp = 0;
            let multiplicador = Object.keys(this.pesos).filter(e => {
                return e == this.conceito;
            });

            this.numerador += parseInt(this.pesos[multiplicador] * this.creditos);
            this.denominador += parseInt(this.creditos);

            tmp = this.numerador / this.denominador
            this.cr = tmp.toFixed(3);
        },
        async calcularCP() {
            let tmp = 0;
            let multiplicador = Object.keys(this.pesos).filter(e => {
                return e == this.conceito;
            });
            if (this.pesos[multiplicador] > 0) {
                this.numerador2 += parseInt(this.pesos[multiplicador]);
                let denominador = 180;

                tmp = this.numerador2 / denominador
                this.cp = tmp.toFixed(3);
            }

        },
        async calcularCA() {


        },
        cadastrarDisc() {
            this.error = ""
            let isValid = false;
            (this.conceito != null && this.creditos != "" && this.nomeDisc != "") ? isValid = true: isValid = false;
            //this.calcularCA();
            this.calcularCP();
            if (isValid) {
                this.calcularCR();

            } else {
                this.error = "Existe campos em brancos"
            }
        }
    }
})