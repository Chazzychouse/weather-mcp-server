import { WeatherServer } from "./servers/weather.js";

import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

const weatherServer = new WeatherServer();
await weatherServer.addCapabilities();

async function main() {
  const transport = new StdioServerTransport();
  await weatherServer.server.connect(transport);
  console.error("Weather MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});
