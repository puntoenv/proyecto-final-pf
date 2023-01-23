require("dotenv").config();
const translate = require("translate");

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
  translate.key = "AIzaSyAefJK2BxtwD4TJT3JP-QG8Ej4YMhRTM-4";
  let result = await translate(string, { to: "es" });
  return result;
}

module.exports = { translateToEnglish, translateToSpanish };
