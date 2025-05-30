# Projeto Eurovisão 2025

## Descrição Geral
Este projeto consiste em uma aplicação que utiliza uma API para gerir dados relacionados às edições da Eurovisão e um front-end para exibir essas informações.
---

## Persistência de Dados
Relativamente ao dataset original, foi adicionado um novo campo "_id", que é igual ao campo "id", apenas para ser reconhecido pelo MongoDB. Todas as entradas que continham acentos (i.e país, música ...), foram retirados os acentos para ser compativel com o Mongo. Para além disso, o json foi modificado para que pudesse ser lido com jsonArray. 
Cada edição contém informações como ano, músicas participantes, país organizador e país vencedor. As músicas possuem detalhes como título, intérprete, país representado, compositor e link para o vídeo. Para isto, foi criado um script em python, presente no repositorio.

---

## Setup da Base de Dados

Os dados são armazenados em uma base de dados chamada "eurovisao" em MongoDB (a coorer num container Docker), e contem uma coleção "edicoes", com todos os dados do json. 

**Importação dos Dados**:
     ```bash
     mongoimport --db eurovisao --collection edicoes --file dataset.json --jsonArray
     ```


## Instruções para Executar
1. **API**:
   - Instale as dependências:
     ```bash
     npm install
     ```
   - Inicie o servidor:
     ```bash
     npm start
     ```
   - A API estará disponível em `http://localhost:25000/edicoes`.

2. **Front-End**:
   - Instale as dependências:
     ```bash
     npm install
     ```
   - Inicie o servidor:
     ```bash
     npm start
     ```
   - O front-end estará disponível em `http://localhost:25001/`.

