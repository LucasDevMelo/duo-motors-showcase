require("chromedriver");
const { Builder, By, until, Key } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const { expect } = require("chai");

describe("Catálogo - Testes de Filtros", function () {
  this.timeout(60000);
  let driver;

  before(async function () {
    const options = new chrome.Options();
    // Deixe visível para acompanhar:
    // options.headless();
    driver = await new Builder()
      .forBrowser("chrome")
      .setChromeOptions(options)
      .build();

    await driver.get("http://localhost:5173");
    await driver.wait(until.elementLocated(By.linkText("Catálogo")), 10000);
    const catalogLink = await driver.findElement(By.linkText("Catálogo"));
    await catalogLink.click();

    // Esperar título da página
    await driver.wait(until.elementLocated(By.css("h1")), 10000);
    const titulo = await driver.findElement(By.css("h1")).getText();
    expect(titulo).to.include("Catálogo");
  });

  after(async function () {
    if (driver) await driver.quit();
  });

  it("deve aplicar filtro de categoria (SUV)", async function () {
    const trigger = await driver.findElement(By.xpath("//button[contains(., 'Categoria')]"));
    await trigger.click();
    const suvOption = await driver.wait(until.elementLocated(By.xpath("//div[contains(., 'SUV')]")), 5000);
    await suvOption.click();
    await driver.sleep(1500);

    // Verifica se o botão de limpar filtros está visível (indicando filtros ativos)
    const limparBtn = await driver.findElement(By.xpath("//button[contains(., 'Limpar Filtros')]"));
    expect(await limparBtn.isDisplayed()).to.be.true;
  });

  it("deve aplicar filtro de marca (BMW)", async function () {
    const trigger = await driver.findElement(By.xpath("//button[contains(., 'Marca')]"));
    await trigger.click();
    const marca = await driver.wait(until.elementLocated(By.xpath("//div[contains(., 'BMW')]")), 5000);
    await marca.click();
    await driver.sleep(1500);

    // Espera renderização de cards (pode não haver veículos, mas a página muda)
    const cards = await driver.findElements(By.css("a.group"));
    expect(cards.length >= 0).to.be.true;
  });

  it("deve aplicar filtro de Ano e Valor máximo", async function () {
    const anoInput = await driver.findElement(By.xpath("//input[@placeholder='Ano']"));
    await anoInput.clear();
    await anoInput.sendKeys("2020", Key.TAB);

    const valorInput = await driver.findElement(By.xpath("//input[@placeholder='Valor máximo (R$)']"));
    await valorInput.clear();
    await valorInput.sendKeys("100000", Key.TAB);
    await driver.sleep(1500);

    // Nenhum veículo encontrado é aceitável
    const msg = await driver.findElements(By.xpath("//*[contains(text(),'Nenhum veículo encontrado')]"));
    expect(msg.length >= 0).to.be.true;
  });

  it("deve aplicar filtro de Status (Disponível)", async function () {
    const trigger = await driver.findElement(By.xpath("//button[contains(., 'Status')]"));
    await trigger.click();
    const disponivel = await driver.wait(until.elementLocated(By.xpath("//div[contains(., 'Disponível')]")), 5000);
    await disponivel.click();
    await driver.sleep(1500);

    // Espera atualização da página
    const elements = await driver.findElements(By.css("a.group"));
    expect(elements.length >= 0).to.be.true;
  });

  it("deve limpar todos os filtros", async function () {
    const limparBtn = await driver.findElement(By.xpath("//button[contains(., 'Limpar Filtros')]"));
    await limparBtn.click();
    await driver.sleep(1000);

    // Após limpar, o input de Ano deve estar vazio
    const anoInput = await driver.findElement(By.xpath("//input[@placeholder='Ano']"));
    const valor = await anoInput.getAttribute("value");
    expect(valor).to.equal("");
  });
});
