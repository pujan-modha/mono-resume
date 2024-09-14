import React from "react";
import { Textarea } from "@/components/ui/textarea";

interface OverviewSectionProps {
  data: any;
  handleChange: any;
}

const OverviewSection: React.FC<OverviewSectionProps> = ({
  data,
  handleChange,
}) => {
  return (
    <div className="space-y-4">
      <Textarea
        id="overview-content"
        value={data.OverviewData.Overview}
        onChange={(e) => handleChange(e, "OverviewData", null, "Overview")}
        placeholder="Enter your professional overview here..."
        // rows={5}
      />
    </div>
  );
};

export default OverviewSection;
