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
        denominador: 0
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
            this.cr = tmp.toFixed(2);
        },
        async calcularCA() {


        },
        async calcularCP() {


        },
        cadastrarDisc() {
            this.error = ""
            let isValid = false;
            (this.conceito != null && this.creditos != "" && this.nomeDisc != "") ? isValid = true: isValid = false;
            //this.calcularCA();
            //this.calcularCP();
            if (isValid) {
                this.calcularCR();

            } else {
                this.error = "Existe campos em brancos"
            }
        }
    }
})