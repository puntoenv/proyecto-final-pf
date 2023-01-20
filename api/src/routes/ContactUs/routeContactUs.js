const { Router } = require("express");
const mailer = require("../../../mailer");

const router = Router();

router.post("/", async (req, res) => {
  const { name, email, msg } = req.body;
  console.log(req.body);
  try {
    let info = await mailer.sendMail({
      from: "gomezmerloe@gmail.com",
      to: "littlePaws0508@gmail.com",
      subject: "Help",
      html: `<div>
          <h2>De: ${name}</h2>
          <h4>Email: ${email}</h4>
          <p>Mensaje: <br/>${msg}</p>
        </div>`,
    });

    res.json({ error: null, message: "Mensaje enviado con exito" });
  } catch (error) {
    res.json({ error: error.message });
  }
});

module.exports = router;
