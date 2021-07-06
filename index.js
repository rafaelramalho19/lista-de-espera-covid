const puppeteer = require("puppeteer");
const nodemailer = require("nodemailer");
require("dotenv").config();

const sendEmail = async () => {
  const transporter = nodemailer.createTransport({
    host: process.env.HOST_SMTP,
    port: 465,
    secure: true,
    auth: {
      user: process.env.FROM_EMAIL,
      pass: process.env.FROM_EMAIL_PASSWORD,
    },
  });

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: `"Serviço Notificação COVID" <${process.env.FROM_EMAIL}>`,
    to: process.env.TARGET_EMAIL,
    subject: "Serviço Notificação COVID-19",
    text: "Só para te avisar que as inscrições para a vacinação COVID-19 já abriram.",
  });
};

const main = async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto("https://covid19.min-saude.pt/pedido-de-agendamento", {
    waitUntil: "networkidle2",
  });
  await page.evaluate(() => {
    window.scrollBy(0, document.body.scrollHeight);
  });
  await page.waitForSelector('input[type="submit"]');

  await page.select('select[name="f_dia"]', process.env.DAY);
  await page.select('select[name="f_mes"]', process.env.MONTH);
  await page.select('select[name="f_ano"]', process.env.YEAR);
  await page.click('input[value="Validar"]');

  try {
    await page.waitForSelector("#error_msg", { timeout: 5000 });
  } catch (e) {}

  const text = await page.$("#error_msg");
  const value = text && (await page.evaluate((el) => el.textContent, text));

  console.log("Got value: ", value, "at", new Date());

  await browser.close();

  if (value && value.startsWith("Neste momento estão a")) {
    return setTimeout(() => main(), 1.2e6 /* 20 minutes */);
  }

  console.log("Success! Sending email now");

  sendEmail();
};

main();
