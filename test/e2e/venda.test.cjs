require("chromedriver");
const { Builder, By, until, Key } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const { expect } = require("chai");

describe("Formulário de Venda", function () {
  this.timeout(60000);
  let driver;

  before(async function () {
    const options = new chrome.Options();
    // options.headless();
    driver = await new Builder().forBrowser("chrome").setChromeOptions(options).build();
    await driver.get("http://localhost:5173/venda");

    await driver.wait(until.elementLocated(By.css("h1")), 10000);
    const titulo = await driver.findElement(By.css("h1")).getText();
    expect(titulo).to.include("Venda seu Carro");
  });

  after(async function () {
    if (driver) await driver.quit();
  });

  it("deve preencher e enviar o formulário de venda", async function () {
    // Campos do primeiro formulário
    await driver.findElement(By.xpath("//input[@placeholder='Marca']")).sendKeys("Toyota");
    await driver.findElement(By.xpath("//input[@placeholder='Modelo']")).sendKeys("Corolla");
    await driver.findElement(By.xpath("//input[@placeholder='Ano']")).sendKeys("2020");
    await driver.findElement(By.xpath("//input[@placeholder='Versão']")).sendKeys("XEI 2.0");
    await driver.findElement(By.xpath("//input[@placeholder='Quilometragem']")).sendKeys("35000");
    await driver.findElement(By.xpath("//input[@placeholder='Valor desejado']")).sendKeys("85000");

    // Clica em continuar
    const continuar = await driver.findElement(By.xpath("//button[contains(., 'Continuar')]"));
    await continuar.click();

    // Aguarda o diálogo abrir
    await driver.wait(until.elementLocated(By.xpath("//h2 | //h1 | //h3 | //div[contains(.,'Complete seu cadastro')]")), 10000);

    // Preenche o formulário de contato
    await driver.findElement(By.xpath("//input[@placeholder='Nome completo']")).sendKeys("João da Silva");
    await driver.findElement(By.xpath("//input[@placeholder='Telefone']")).sendKeys("11999999999");

    // Envia o formulário final
    const enviar = await driver.findElement(By.xpath("//button[contains(., 'Enviar')]"));
    await enviar.click();

    // Aguarda o feedback
    await driver.sleep(2000);

    console.log("Formulário de venda enviado com sucesso!");
  });
});
