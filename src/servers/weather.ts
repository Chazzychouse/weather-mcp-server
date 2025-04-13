import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { addGetAlertsTool, addGetForecastTool } from "../tools/weather/index.js";

export class WeatherServer {
  public server: McpServer;
  public NWS_API_BASE: string;
  public USER_AGENT: string;

  constructor() {
    this.server = new McpServer({
      name: "weather-server",
      version: "1.0.0",
      capabilities: {
        resources: {},
        tools: {},
      },
    });
    this.NWS_API_BASE = "https://api.weather.gov";
    this.USER_AGENT = "weather-app/1.0";
  }

  async addCapabilities() {
    await addGetAlertsTool(this);
    await addGetForecastTool(this);
  }
}
