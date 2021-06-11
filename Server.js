const app = require("./App");

app.listen(process.env.PORT, () => {
    console.log(`Push server running on port: ${process.env.PORT}`);
  });
  