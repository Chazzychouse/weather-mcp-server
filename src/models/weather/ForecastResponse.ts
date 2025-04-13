import { ForecastPeriod } from "./ForecastPeriod.js";

export interface ForecastResponse {
	properties: {
		periods: ForecastPeriod[];
	};
}
