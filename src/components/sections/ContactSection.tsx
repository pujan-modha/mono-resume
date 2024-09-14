import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

interface ContactSectionProps {
  data: any;
  handleChange: any;
  addItem: (section: string) => void;
  removeItem: (section: string, index: number) => void;
}

const contactTypes = [
  { icon: "github", label: "GitHub", baseUrl: "https://github.com/" },
  { icon: "gitlab", label: "GitLab", baseUrl: "https://gitlab.com/" },
  { icon: "linkedin", label: "LinkedIn", baseUrl: "https://linkedin.com/in/" },
  { icon: "x-twitter", label: "Twitter", baseUrl: "https://x.com/" },
  { icon: "email", label: "Email", baseUrl: "mailto:" },
  { icon: "phone", label: "Phone", baseUrl: "tel:" },
];

export default function ContactSection({
  data,
  handleChange,
}: ContactSectionProps) {
  const handleContactLinkChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    contactType: string
  ) => {
    const value = e.target.value.trim();

    const contactTypeInfo = contactTypes.find((ct) => ct.icon === contactType);
    if (contactTypeInfo) {
      let fullValue = value;
      let displayValue = value;

      if (contactType === "email" || contactType === "phone") {
        fullValue = contactTypeInfo.baseUrl + value;
        displayValue = value;
      } else {
        if (!value.startsWith("http://") && !value.startsWith("https://")) {
          const cleanValue = value.replace(
            /^[\/]+|^(https?:\/\/)?(www\.)?[^\/]+\//i,
            ""
          );
          fullValue = contactTypeInfo.baseUrl + cleanValue;

          // Check if the username is longer than 21 characters
          if (cleanValue.length > 15) {
            displayValue = cleanValue;
          } else {
            displayValue =
              contactTypeInfo.baseUrl.replace("https://", "") + cleanValue;
          }
        }
      }

      // Update ContactLink
      handleChange(
        {
          target: { value: fullValue, type: "text" },
        },
        "ContactData",
        contactType,
        "ContactLink"
      );

      // Update ContactText to match the display value
      handleChange(
        {
          target: { value: displayValue, type: "text" },
        },
        "ContactData",
        contactType,
        "ContactText"
      );
    }
  };

  const handleDisplayTextChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    contactType: string
  ) => {
    // Only update the ContactText, not the ContactLink
    handleChange(e, "ContactData", contactType, "ContactText");
  };

  return (
    <div className="space-y-4">
      {contactTypes.map((contactType) => {
        const contactData = data.ContactData.find(
          (c: any) => c.ContactIcon === contactType.icon
        ) || {
          ContactIcon: contactType.icon,
          isEnabled: false,
          ContactLink: "",
          ContactText: "",
        };

        const inputValue = contactData.ContactLink.replace(
          contactType.baseUrl,
          ""
        );

        return (
          <div key={contactType.icon} className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id={`contact-enabled-${contactType.icon}`}
                checked={contactData.isEnabled}
                onCheckedChange={(checked) =>
                  handleChange(
                    { target: { type: "checkbox", checked } },
                    "ContactData",
                    contactType.icon,
                    "isEnabled"
                  )
                }
              />
              <Label htmlFor={`contact-enabled-${contactType.icon}`}>
                {contactType.label}
              </Label>
            </div>
            {contactData.isEnabled && (
              <div className="grid lg:grid-cols-2 gap-2 xl:gap-4">
                <div className="space-y-1">
                  <Label htmlFor={`contact-link-${contactType.icon}`}>
                    {contactType.icon === "email"
                      ? "Email Address"
                      : contactType.icon === "phone"
                      ? "Phone Number"
                      : "Username"}
                  </Label>
                  <Input
                    id={`contact-link-${contactType.icon}`}
                    type="text"
                    value={inputValue}
                    onChange={(e) =>
                      handleContactLinkChange(e, contactType.icon)
                    }
                    placeholder={`Enter ${contactType.label} ${
                      contactType.icon === "email"
                        ? "address"
                        : contactType.icon === "phone"
                        ? "number"
                        : "username"
                    }`}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor={`contact-text-${contactType.icon}`}>
                    Display Text
                  </Label>
                  <Input
                    id={`contact-text-${contactType.icon}`}
                    value={contactData.ContactText}
                    onChange={(e) =>
                      handleDisplayTextChange(e, contactType.icon)
                    }
                    placeholder={`${contactType.label} Display Text`}
                  />
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
