require("dotenv").config();
const translate = require("translate");
const { GOOGLE_APY_KEY } = process.env;

async function translateToEnglish(string) {
  translate.from = "es";
  translate.engine = "google";
  translate.key = process.env.GOOGLE_API_KEY;
  let result = await translate(string, { to: "en" });
  return result;
}

async function translateToSpanish(string) {
  translate.from = "en";
  translate.engine = "google";
  translate.key = GOOGLE_APY_KEY;
  let result = await translate(string, { to: "es" });
  return result;
}

module.exports = { translateToEnglish, translateToSpanish };
