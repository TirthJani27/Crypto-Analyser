"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "./ui/chart";
import { PriceData } from "../module";

const chartConfig = {
  price: {
    label: "Price",
    color: "hsl(var(--chart-1))",
  },
  timestamp: {
    label: "Date",
  },
} satisfies ChartConfig;

export function Component({
  timePeriod,
  data,
}: {
  timePeriod: string;
  data: PriceData;
}) {
  // Safely access data with detailed console logging for debugging
  const rawHistory = data?.data?.history || [];
  console.log("Raw history data:", rawHistory);

  // Ensure each entry has valid date and price properties
  const formattedData = rawHistory.map((item, index) => {
    // Parse date in multiple formats
    let validDate;
    try {
      if (item.date) {
        validDate = new Date(item.date);
      } else if (item.timestamp) {
        // Handle timestamp as number (unix timestamp) or string
        const timestamp =
          typeof item.timestamp === "number"
            ? item.timestamp
            : parseInt(item.timestamp, 10);

        // Check if timestamp is in milliseconds or seconds
        validDate = new Date(timestamp * (timestamp > 10000000000 ? 1 : 1000));
      }

      // Verify date is valid
      if (!validDate || isNaN(validDate.getTime())) {
        console.warn(
          `Invalid date at index ${index}:`,
          item.date || item.timestamp
        );
        // Use index as fallback for display order
        validDate = new Date();
        validDate.setDate(validDate.getDate() - (rawHistory.length - index));
      }
    } catch (e) {
      console.error(`Error parsing date at index ${index}:`, e);
      // Use index as fallback
      validDate = new Date();
      validDate.setDate(validDate.getDate() - (rawHistory.length - index));
    }

    // Ensure price is a valid number
    let validPrice = 0;
    try {
      validPrice =
        typeof item.price === "string"
          ? parseFloat(item.price)
          : typeof item.price === "number"
          ? item.price
          : 0;

      if (isNaN(validPrice)) {
        console.warn(`Invalid price at index ${index}:`, item.price);
        validPrice = 0;
      }
    } catch (e) {
      console.error(`Error parsing price at index ${index}:`, e);
    }

    return {
      ...item,
      price: validPrice,
      formattedDate: validDate.toISOString().split("T")[0], // YYYY-MM-DD format
      originalDate: item.date || item.timestamp, // Keep original for debugging
    };
  });

  console.log("Formatted data:", formattedData);

  return (
    <Card>
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>Crypto Currency Chart</CardTitle>
          <CardDescription>
            {`Showing total price variation for the last ${timePeriod}`}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        {formattedData.length > 0 ? (
          <ChartContainer
            config={chartConfig}
            className="aspect-auto h-[250px] w-full"
          >
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={formattedData}>
                <defs>
                  <linearGradient id="fillPrice" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="hsl(var(--chart-1, 217, 91%, 60%))"
                      stopOpacity={0.8}
                    />
                    <stop
                      offset="95%"
                      stopColor="hsl(var(--chart-1, 217, 91%, 60%))"
                      stopOpacity={0.1}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <XAxis
                  dataKey="formattedDate"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  minTickGap={32}
                  tickFormatter={(value) => {
                    try {
                      const date = new Date(value);
                      return date.toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      });
                    } catch (e) {
                      console.error("Error formatting tick:", e);
                      return value;
                    }
                  }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(value) => `$${value}`}
                />
                <ChartTooltip
                  cursor={false}
                  content={
                    <ChartTooltipContent
                      labelFormatter={(value) => {
                        try {
                          return new Date(value).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          });
                        } catch (e) {
                          console.error("Error in tooltip formatter:", e);
                          return value;
                        }
                      }}
                      indicator="dot"
                    />
                  }
                />
                <Area
                  dataKey="price"
                  type="monotone"
                  fill="url(#fillPrice)"
                  stroke="hsl(var(--chart-1, 217, 91%, 60%))"
                  strokeWidth={2}
                />
                <ChartLegend content={<ChartLegendContent />} />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        ) : (
          <div className="flex h-[250px] w-full items-center justify-center text-muted-foreground">
            No data available or invalid data format
          </div>
        )}
      </CardContent>
    </Card>
  );
}
