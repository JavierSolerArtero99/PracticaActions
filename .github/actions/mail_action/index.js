const nodemailer = require("nodemailer");
const core = require("@actions/core");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: core.getInput("EMAIL_FROM"),
    pass: core.getInput("PASSWORD"),
  },
});

const options = {
  from: core.getInput("EMAIL_FROM"),
  to: core.getInput("EMAIL_TO"),
  subject: "Resultado del workflow ejecutado",
  text: `REPOSITORIO: ${core.getInput("REPOSITORY")};
  WORKFLOW NAME: ${core.getInput("NAME_WORKFLOW")} 
  RAMA: ${core.getInput("BRANCH")} 
  RESULTADOS:
  - test_execution_job: ${core.getInput("TEST")}
  - build_statics_job: ${core.getInput("BUILD")}
  ACCION REALIZADA POR: ${core.getInput("ACTOR")}
  OWNER: ${core.getInput("OWNER")}`,
};

//   - syntax_check_job: ${core.getInput("SYNTAX")}
//   - deploy_job: ${core.getInput("DEPLOY")}


transporter.sendMail(options, function (error, info) {
  if (!error) {
    core.setOutput("response", "El mensaje se ha enviado con éxito");
  } else {
    core.setFailed(error);
  }
});
