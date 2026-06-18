const { execSync } = require("child_process");

try {
  execSync("docker ps", { stdio: "ignore" });
} catch {
  console.error(`
Docker is not running. Start Docker Desktop and try again:

    open -a Docker
`);
  process.exit(1);
}
