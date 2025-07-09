import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const ProgressWidget = () => {
  return (
    <Card className="overflow-hidden border-none shadow-md hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-card to-card/80">
      <CardHeader className="pb-2 border-b">
        <CardTitle className="text-base">Overall Progress</CardTitle>
      </CardHeader>
      <CardContent className="p-5">
        <div className="flex flex-col gap-5">
          <TooltipProvider>
            <div className="flex flex-col gap-2 group">
              <div className="flex items-center justify-between">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="text-sm font-medium cursor-help flex items-center gap-1.5">
                      Mathematics
                      <span className="size-1.5 rounded-full bg-chart-1"></span>
                    </span>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <p>You've completed 72% of the mathematics curriculum</p>
                  </TooltipContent>
                </Tooltip>
                <span className="text-xs font-medium text-chart-1">72%</span>
              </div>
              <div className="h-2.5 w-full rounded-full bg-secondary relative overflow-hidden">
                <div className="absolute inset-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImEiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgcGF0dGVyblRyYW5zZm9ybT0icm90YXRlKDQ1KSI+PHBhdGggZD0iTTAgMjBoMjBWMEgweiIgZmlsbD0iY3VycmVudENvbG9yIiBmaWxsLW9wYWNpdHk9IjAuMSIvPjxwYXRoIGQ9Ik0wIDEwaDIwdjEwSDB6IiBmaWxsPSJjdXJyZW50Q29sb3IiIGZpbGwtb3BhY2l0eT0iMC4xIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2EpIiAvPjwvc3ZnPg==')]"></div>
                <div className="h-full w-[72%] rounded-full bg-gradient-to-r from-chart-1/70 to-chart-1 relative z-10 group-hover:shadow-[0_0_12px_0_var(--chart-1)] transition-all duration-300" />
              </div>
            </div>

            <div className="flex flex-col gap-2 group">
              <div className="flex items-center justify-between">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="text-sm font-medium cursor-help flex items-center gap-1.5">
                      Science
                      <span className="size-1.5 rounded-full bg-chart-2"></span>
                    </span>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <p>You've completed 58% of the science curriculum</p>
                  </TooltipContent>
                </Tooltip>
                <span className="text-xs font-medium text-chart-2">58%</span>
              </div>
              <div className="h-2.5 w-full rounded-full bg-secondary relative overflow-hidden">
                <div className="absolute inset-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImEiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgcGF0dGVyblRyYW5zZm9ybT0icm90YXRlKDQ1KSI+PHBhdGggZD0iTTAgMjBoMjBWMEgweiIgZmlsbD0iY3VycmVudENvbG9yIiBmaWxsLW9wYWNpdHk9IjAuMSIvPjxwYXRoIGQ9Ik0wIDEwaDIwdjEwSDB6IiBmaWxsPSJjdXJyZW50Q29sb3IiIGZpbGwtb3BhY2l0eT0iMC4xIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2EpIiAvPjwvc3ZnPg==')]"></div>
                <div className="h-full w-[58%] rounded-full bg-gradient-to-r from-chart-2/70 to-chart-2 relative z-10 group-hover:shadow-[0_0_12px_0_var(--chart-2)] transition-all duration-300" />
              </div>
            </div>

            <div className="flex flex-col gap-2 group">
              <div className="flex items-center justify-between">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="text-sm font-medium cursor-help flex items-center gap-1.5">
                      Language Arts
                      <span className="size-1.5 rounded-full bg-chart-3"></span>
                    </span>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <p>You've completed 85% of the language arts curriculum</p>
                  </TooltipContent>
                </Tooltip>
                <span className="text-xs font-medium text-chart-3">85%</span>
              </div>
              <div className="h-2.5 w-full rounded-full bg-secondary relative overflow-hidden">
                <div className="absolute inset-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImEiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgcGF0dGVyblRyYW5zZm9ybT0icm90YXRlKDQ1KSI+PHBhdGggZD0iTTAgMjBoMjBWMEgweiIgZmlsbD0iY3VycmVudENvbG9yIiBmaWxsLW9wYWNpdHk9IjAuMSIvPjxwYXRoIGQ9Ik0wIDEwaDIwdjEwSDB6IiBmaWxsPSJjdXJyZW50Q29sb3IiIGZpbGwtb3BhY2l0eT0iMC4xIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2EpIiAvPjwvc3ZnPg==')]"></div>
                <div className="h-full w-[85%] rounded-full bg-gradient-to-r from-chart-3/70 to-chart-3 relative z-10 group-hover:shadow-[0_0_12px_0_var(--chart-3)] transition-all duration-300" />
              </div>
            </div>

            <div className="flex flex-col gap-2 group">
              <div className="flex items-center justify-between">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="text-sm font-medium cursor-help flex items-center gap-1.5">
                      History
                      <span className="size-1.5 rounded-full bg-chart-4"></span>
                    </span>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <p>You've completed 41% of the history curriculum</p>
                  </TooltipContent>
                </Tooltip>
                <span className="text-xs font-medium text-chart-4">41%</span>
              </div>
              <div className="h-2.5 w-full rounded-full bg-secondary relative overflow-hidden">
                <div className="absolute inset-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImEiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgcGF0dGVyblRyYW5zZm9ybT0icm90YXRlKDQ1KSI+PHBhdGggZD0iTTAgMjBoMjBWMEgweiIgZmlsbD0iY3VycmVudENvbG9yIiBmaWxsLW9wYWNpdHk9IjAuMSIvPjxwYXRoIGQ9Ik0wIDEwaDIwdjEwSDB6IiBmaWxsPSJjdXJyZW50Q29sb3IiIGZpbGwtb3BhY2l0eT0iMC4xIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2EpIiAvPjwvc3ZnPg==')]"></div>
                <div className="h-full w-[41%] rounded-full bg-gradient-to-r from-chart-4/70 to-chart-4 relative z-10 group-hover:shadow-[0_0_12px_0_var(--chart-4)] transition-all duration-300" />
              </div>
            </div>
          </TooltipProvider>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgressWidget;
