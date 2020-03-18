import { port } from "./config";
import { app } from "./app";

app.listen(port, "0.0.0.0", () => console.log(`hosting @${port}`));
