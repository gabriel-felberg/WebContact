import app from "./app";
import AppDataSource from "./data-source";


const init = async () => {
  const PORT = process.env.PORT || 3006;
  await AppDataSource.initialize();
  app.listen(PORT, () => {
    console.log(`App is running!, ${PORT}`);
  });
}
init();