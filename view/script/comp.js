var comp = {
  data: {
    pesos: {
      A: 4,
      B: 3,
      C: 2,
      D: 1,
      F: 0,
      O: 0
    },
    cursadas: [],
    id: 1
  },
  methods: {
    calcularCR(obj, order) {
      if (order == 1) {
        this.cursadas = []
      }

      let tmp = 0
      let n = 0
      let d = 0
      let tmpObj;

      obj.forEach(j => {
        let multiplicador = Object.keys(this.pesos).filter(e => {
          return e == j.conceito;
        });

        tmpObj = {
          nome: j.disciplina,
          cod: j.codigo,
          situacao: (multiplicador != 0) ? "Aprovado" : "Reprovado",
          categoria: j.categoria,
          creditos: parseInt(j.creditos),
          peso: parseInt(this.pesos[multiplicador])
        }
        this.cursadas.push(tmpObj);

      });

      Object.keys(this.cursadas).forEach(i => {
        n += (this.cursadas[i].peso * this.cursadas[i].creditos)
        d += this.cursadas[i].creditos
      })
     

      this.id ++;

      tmp = n / d
      return tmp.toFixed(3);
    },
    calcularCP() {
      let tmp = 0;
      let array = []

      array = this.cursadas.filter(e => {
        return e.situacao == "Aprovado"
      });

      array.forEach(k => {
        tmp += parseInt(k.creditos);
      });

      tmp = tmp / 180;
      if (tmp.toFixed(3) < 1.000) {
        return tmp.toFixed(3)
      } else {
        return (1).toFixed(3)
      }
    },
  },
  created () {
    let x= {
      ano: 0,
      categoria: "string",
      codigo: "string",
      conceito: "string",
      creditos: 0,
      disciplina: "string",
      periodo: "string",
      situacao: "string"
    }
    axios.post('https://sistemadecoeficientes.herokuapp.com/addmateria/5555E', x, {
      headers: {
        'Content-Type': 'application/json',
      }
    }).then((res) => {
      this.msg = res;

    }).catch((err) => {
      this.msg = JSON.stringify(err);
    })
  }
}