import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";

interface AchievementsSectionProps {
  data: any;
  handleChange: any;
  addItem: (section: string) => void;
  removeItem: (section: string, index: number) => void;
}

const AchievementsSection: React.FC<AchievementsSectionProps> = ({
  data,
  handleChange,
  addItem,
  removeItem,
}) => (
  <div className="space-y-4">
    {data.AchievementsData.map((achievement: any, index: number) => (
      <div key={index} className="space-y-4 border p-4">
        <div className="grid lg:grid-cols-2 gap-2 xl:gap-4">
          <div className="space-y-1">
            <Label htmlFor={`achievement-main-${index}`}>Achievement</Label>
            <Input
              id={`achievement-main-${index}`}
              value={achievement.achievementMain || ""}
              onChange={(e) =>
                handleChange(e, "AchievementsData", index, "achievementMain")
              }
              placeholder="Achievement"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor={`achievement-event-${index}`}>Event</Label>
            <Input
              id={`achievement-event-${index}`}
              value={achievement.achievementEvent || ""}
              onChange={(e) =>
                handleChange(e, "AchievementsData", index, "achievementEvent")
              }
              placeholder="Event"
            />
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id={`achievement-has-certificate-${index}`}
            checked={achievement.achievementHaveCertificate}
            onCheckedChange={(checked) =>
              handleChange(
                { target: { type: "checkbox", checked } },
                "AchievementsData",
                index,
                "achievementHaveCertificate"
              )
            }
          />
          <Label htmlFor={`achievement-has-certificate-${index}`}>
            Certificate Link
          </Label>
        </div>
        {achievement.achievementHaveCertificate && (
          <Input
            id={`achievement-certificate-link-${index}`}
            type="url"
            value={achievement.achievementLinkToCertificate || ""}
            onChange={(e) =>
              handleChange(
                e,
                "AchievementsData",
                index,
                "achievementLinkToCertificate"
              )
            }
            placeholder="Certificate Link"
          />
        )}
        <div className="flex w-full justify-end">
          <Button
            type="button"
            variant="destructive"
            onClick={() => removeItem("AchievementsData", index)}
          >
            <FontAwesomeIcon icon={faTrash} className="mr-2" />
            Achievement
          </Button>
        </div>
      </div>
    ))}
    <Button type="button" onClick={() => addItem("AchievementsData")}>
      <FontAwesomeIcon icon={faPlus} className="mr-2" />
      Achievement
    </Button>
  </div>
);

export default AchievementsSection;
