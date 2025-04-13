import { WeatherServer } from "../../servers/weather.js";
import { AlertsReponse, AlertFeature } from "../../models/weather/index.js";
import { makeNwsRequest } from "../../apis/weather/weather.js";

import { z } from "zod";

export async function addGetAlertsTool(weatherServer: WeatherServer) {
  weatherServer.server.tool(
    "get-alerts",
    "Get weather alerts for a state",
    {
      state: z.string().length(2).describe("Two letter state code (e.g. CA, NY, VA)"),
    },
    async ({ state }) => {
      const stateCode = state.toUpperCase();
      const alertsUrl = `${weatherServer.NWS_API_BASE}/alerts?area=${stateCode}`;
      const alertsData = await makeNwsRequest<AlertsReponse>(alertsUrl);

      if (!alertsData) {
        return {
          content: [
            {
              type: "text",
              text: "Failed to retrieve alerts data",
            },
          ],
        };
      }

      const features = alertsData.features || [];
      if (features.length === 0) {
        return {
          content: [
            {
              type: "text",
              text: `No active alerts for ${stateCode}`,
            },
          ],
        };
      }

      const formattedAlerts = features.map(formatAlert);
      const alertsText = `Active alerts for ${stateCode}:\n\n${formattedAlerts.join("\n")}`;

      return {
        content: [
          {
            type: "text",
            text: alertsText,
          },
        ],
      };
    }
  );
}

function formatAlert(feature: AlertFeature) {
  const props = feature.properties;
  return [
    `Event: ${props.event || "Unknown"}`,
    `Area: ${props.areaDesc || "Unknown"}`,
    `Severity: ${props.severity || "Unknown"}`,
    `Status: ${props.status || "Unknown"}`,
    `Headline: ${props.headline || "No headline"}`,
    "---",
  ].join("\n");
}
