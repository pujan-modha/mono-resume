import React from "react";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

interface HeaderSectionProps {
  data: any;
  handleChange: any;
}

const HeaderSection: React.FC<HeaderSectionProps> = ({
  data,
  handleChange,
}) => (
  <div className="space-y-4">
    <div className="grid md:grid-cols-2 gap-2">
      <div className="flex items-center space-x-2">
        <Checkbox
          id="header-underlined-name"
          checked={data.HeaderUnderlinedName}
          onCheckedChange={(checked) =>
            handleChange(
              { target: { value: checked } },
              null,
              null,
              "HeaderUnderlinedName"
            )
          }
        />
        <Label htmlFor="header-underlined-name">Underlined Name</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox
          id="header-fancy-name"
          checked={data.HeaderFancyName}
          onCheckedChange={(checked) =>
            handleChange(
              { target: { value: checked } },
              null,
              null,
              "HeaderFancyName"
            )
          }
        />
        <Label htmlFor="header-fancy-name">Fancy Name (HTML Only)</Label>
      </div>
    </div>
    <div className="grid grid-cols-2 gap-2 xl:gap-4">
      <div className="space-y-1">
        <Label htmlFor="header-first-name">First Name</Label>
        <Input
          id="header-first-name"
          type="text"
          value={data.HeaderFirstName}
          onChange={(e) => handleChange(e, null, null, "HeaderFirstName")}
          placeholder="First Name"
        />
      </div>
      <div className="space-y-1">
        <Label htmlFor="header-last-name">Last Name</Label>
        <Input
          id="header-last-name"
          type="text"
          value={data.HeaderLastName}
          onChange={(e) => handleChange(e, null, null, "HeaderLastName")}
          placeholder="Last Name"
        />
      </div>
    </div>
    <div className="grid lg:grid-cols-2 gap-2 xl:gap-4">
      <div className="space-y-1">
        <Label htmlFor="header-title">Title</Label>
        <Input
          id="header-title"
          type="text"
          value={data.HeaderTitle}
          onChange={(e) => handleChange(e, null, null, "HeaderTitle")}
          placeholder="Title"
        />
      </div>
      <div className="space-y-1">
        <Label htmlFor="header-address">Address</Label>
        <Input
          id="header-address"
          type="text"
          value={data.HeaderAddress}
          onChange={(e) => handleChange(e, null, null, "HeaderAddress")}
          placeholder="Address"
        />
      </div>
    </div>
  </div>
);

export default HeaderSection;
