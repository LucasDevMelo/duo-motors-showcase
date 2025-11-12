require("chromedriver");
const { Builder, By, until, Key } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const { expect } = require("chai");

describe("Formulário de Consignado", function () {
  this.timeout(60000);
  let driver;

  before(async function () {
    const options = new chrome.Options();
    // options.headless();
    driver = await new Builder().forBrowser("chrome").setChromeOptions(options).build();
    await driver.get("http://localhost:5173/consignados");

    await driver.wait(until.elementLocated(By.css("h1")), 10000);
    const titulo = await driver.findElement(By.css("h1")).getText();
    expect(titulo).to.include("Consignado");
  });

  after(async function () {
    if (driver) await driver.quit();
  });

  it("deve preencher e enviar o formulário de consignado", async function () {
    // Campos do primeiro formulário
    await driver.findElement(By.xpath("//input[@placeholder='Marca']")).sendKeys("Honda");
    await driver.findElement(By.xpath("//input[@placeholder='Modelo']")).sendKeys("Civic");
    await driver.findElement(By.xpath("//input[@placeholder='Ano']")).sendKeys("2019");
    await driver.findElement(By.xpath("//input[@placeholder='Versão']")).sendKeys("EXL");
    await driver.findElement(By.xpath("//input[@placeholder='Quilometragem']")).sendKeys("45000");
    await driver.findElement(By.xpath("//input[@placeholder='Valor desejado']")).sendKeys("90000");

    // Clica em continuar
    const continuar = await driver.findElement(By.xpath("//button[contains(., 'Continuar')]"));
    await continuar.click();

    // Aguarda o segundo formulário
    await driver.wait(until.elementLocated(By.xpath("//h2 | //h1 | //h3 | //div[contains(.,'Complete seu cadastro')]")), 10000);

    // Preenche o formulário de contato
    await driver.findElement(By.xpath("//input[@placeholder='Nome completo']")).sendKeys("Maria Oliveira");
    await driver.findElement(By.xpath("//input[@placeholder='Telefone']")).sendKeys("11988887777");

    // Envia o formulário final
    const enviar = await driver.findElement(By.xpath("//button[contains(., 'Enviar')]"));
    await enviar.click();

    // Espera o feedback visual (toast ou reset)
    await driver.sleep(2000);

    console.log("Formulário de consignado enviado com sucesso!");
  });
});
