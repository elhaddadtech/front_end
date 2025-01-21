import React from "react";
import { Card, CardContent, CardTitle } from "./ui/card";
import { Users } from "lucide-react";
import { Progress } from "./ui/progress";

function StatCard({ title, value, Icon = Users, progress = "0" }) {
  return (
    <Card>
      <div className="flex flex-col space-y-1.5 p-3">
        <div className="flex justify-between space-x-8">
          <CardTitle className="text-lg font-medium">{title}</CardTitle>
          {Icon && <Icon className="h-8 w-8 text-muted-foreground" />}
        </div>
      </div>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
      <div className="text-base pr-4 font-bold text-green-500 text-muted-foreground text-end">
        {progress} %
      </div>
      <Progress
        value={progress}
        data-tip={`${progress}%`} // Show progress value in the tooltip
        className="h-2"
        getValueLabel="100%"
      />
    </Card>
  );
}

export default StatCard;
