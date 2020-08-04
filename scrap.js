const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const writeStream = fs.createWriteStream('dados.csv');

writeStream.write(`Nome do produto,Preço USD,Descrição,Avaliações \n`)

axios.get('https://webscraper.io/test-sites/e-commerce/allinone')
.then((response) => {
  let $ = cheerio.load(response.data)
  $('.col-sm-4 ').each((index, element) => {
    const item = $(element).find('.caption')
    const itemName = item.find('.title').text().replace(/\s\s+/g, '')
    const price = item.find('.price').text().replace(/\s\s+/g, '')
    const descrption = item.find('.description').text().replace(/\s\s+/g, '').replace(/,/g, ' -')
    const ratings = $(element).find('.ratings').children('p').text().substr(0,1).replace(/\s\s+/g, '')
    writeStream.write(`${itemName}, ${price}, ${descrption}, ${ratings} \n`)
  })
  console.log('Importação feita com sucesso')
})
.catch((error) => {
  console.log(`Erro ao acessar a página: \n ${error}`)
})