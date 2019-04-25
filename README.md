<h2>Link Api no Heroku</h2>
https://sistemadecoeficientes.herokuapp.com/documentation#/
<h2>Introdução</h2>
<h3>Objetivo</h3>
Este trabalho tem como objetivo o desenvolvimento de um software que simule os coeficientes individuais (CP, CR, CA) dos alunos devidamente matriculados na Universidade, apenas com o número do Registro de Aluno (RA) do mesmo, sem ter que esperar o s resultados dos Conceitos Finais.
<h3>Escopo</h3>
Aplicação (Web ou  Mobile) onde o usuário, no caso um aluno, adiciona seu RA da Universidade e os possíveis conceitos das disciplinas que ele está cursando. Após uma consulta na ficha individual do aluno, o programa retorna os coeficientes atuais e, após o cálculo, a projeção dos mesmos. Esta tarefa é atualmente realizada pelo site do Portal do Aluno, o diferencial implementado neste projeto seria acompanhar as disciplinas cadastradas pelo próprio aluno e simular seus coeficientes futuros dependendo do conceito que o mesmo acha que irá receber.
	O sistema possuirá poucas “áreas”, a inicial será a de login do estudante, que será somente validada seguindo para a próxima caso o mesmo esteja de fato matriculado na universidade no período letivo atual. Sendo assim, não é possível “criar” um usuário, pois ou ele já existe e está ativo ou o número de RA fornecido nao pertence ao estudante.
	A segunda área será a seleção das matérias cursadas, o número de créditos e o coeficiente final que o estudante espera receber. Ao carregar estes dados, o sistema já é capaz de calcular os coeficientes atuais.
	Para o cadastro de novas matérias, ou seja, as que o estudante está de fato cursando neste período e que não possuem conceitos finais, o próprio estudante poderá simular seus coeficientes digitando a disciplina cursada e a nota final que ele acredita que obterá.

<h2>Executando localmente</h2>
1-> Baixar o repositória localmente
2-> Instalar o Docker
3-> Executar os seguintes comando para a instalação do mongoDB

sudo docker run \
    --name mongodb \
    -p 27017:27017 \
    -e MONGO_INITDB_ROOT_USERNAME=admin \
    -e MONGO_INITDB_ROOT_PASSWORD=senhaadmin \
    -d \
    mongo:4

sudo docker run \
    --name mongoclient \
    -p 3000:3000 \
    --link mongodb:mongodb \
    -d \
    mongoclient/mongoclient

sudo docker exec -it mongodb \
    mongo --host localhost -u admin -p senhaadmin --authenticationDatabase admin \
    --eval "db.getSiblingDB('materias').createUser({user: 'danilo', pwd: '75475668', roles: [{role: 'readWrite', db: 'materias'}]})"

4-> dentro da pasta executar o camando 'npm install'



para remover todos os containers ativos e inativos//docker rm $(docker ps -aq)