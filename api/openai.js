require("dotenv").config();
const { Configuration, OpenAIApi } = require("openai");
const { translateToEnglish, translateToSpanish } = require("./translate");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

async function aiText(props) {
  let { name, type, gender, age, sociability, health, condition, size } = props;
  size = await translateToEnglish(size);
  condition = await translateToEnglish(condition);
  type = await translateToEnglish(type);
  gender = await translateToEnglish(gender);
  sociability = await translateToEnglish(sociability);
  health = await translateToEnglish(health);
  let completion = await openai.createCompletion({
    max_tokens: 250,
    model: "text-davinci-001",
    prompt: `Create a description for a ${gender} ${type} named ${name} who is ${age} years old, has a ${sociability} relation with other pets, ${health} health, is ${condition} and has a ${size} size.`,
    temperature: 1,
  });
  let response = await translateToSpanish(completion.data.choices[0].text);
  return response;
}

module.exports = aiText;
