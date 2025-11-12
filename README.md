Para rodar o site: 
npm install
npm run dev



Para rodar o teste completo:
npm start

npx mocha --timeout 40000 "test/e2e/**/*.test.cjs" --reporter spec



Para rodar ele separadamente:
npm start 

npx mocha test/e2e/filters.test.cjs --reporter spec
npx mocha test/e2e/venda.test.cjs --reporter spec
npx mocha test/e2e/consignado.test.cjs --reporter spec
