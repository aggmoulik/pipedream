const googleCalendar = require("../../google_calendar.app");

module.exports = {
  key: "google_calendar_update_acl",
  name: "Update Access Control Rule",
  description: "Update Access Control Rule Metadata of a google calendar.",
  version: "0.0.1",
  type: "action",
  props: {
    googleCalendar,
    calendarId: {
      propDefinition: [
        googleCalendar,
        "calendarId",
      ],
    },
    ruleId: {
      propDefinition: [
        googleCalendar,
        "ruleId",
        (c) => ({
          calendarId: c.calendarId,
        }),
      ],
    },
    role: {
      propDefinition: [
        googleCalendar,
        "role",
      ],
    },
    scopeType: {
      propDefinition: [
        googleCalendar,
        "scopeType",
      ],
    },
    scopeValue: {
      propDefinition: [
        googleCalendar,
        "scopeValue",
      ],
    },
  },
  async run() {
    const calendar = this.googleCalendar.calendar();

    let scope = {
      type: this.scopeType,
    };

    if (this.scopeType !== "default" && this.scopeValue.trim().length) {
      scope["value"] = this.scopeValue;
    }

    return (await calendar.acl.update({
      calendarId: this.calendarId,
      ruleId: this.ruleId,
      requestBody: {
        scope,
        role: this.role,
      },
    })).data;
  },
};
