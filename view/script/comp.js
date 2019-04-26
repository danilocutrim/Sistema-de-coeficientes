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
    cursadas: []
  },
  methods: {
    calcularCR(obj) {
      let tmp = 0
      let n = 0
      let d = 0

      obj.forEach(j => {
        let multiplicador = Object.keys(this.pesos).filter(e => {
          return e == j.conceito;
        });

        this.cursadas.push({
          nome: j.disciplina,
          cod: j.codigo,
          situacao: j.situacao,
          categoria: j.categoria,
          creditos: parseInt(j.creditos),
          peso: parseInt(this.pesos[multiplicador])
        });

      });

      Object.keys(this.cursadas).forEach(i => {
        n += (this.cursadas[i].peso * this.cursadas[i].creditos)
        d += this.cursadas[i].creditos
      })

      tmp = n / d
      return tmp.toFixed(3);
    },
  }
}