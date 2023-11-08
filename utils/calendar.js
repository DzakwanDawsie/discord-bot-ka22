const fs = require('fs');
const axios = require('axios');
const ical = require('node-ical');

async function fetch() {
  fs.mkdirSync('storage', { recursive: true });
  
  const icsUrl = 'https://v-class.gunadarma.ac.id/calendar/export_execute.php?userid=49284&authtoken=b66422cc1396a1097dd9d56ee24fd27c0d409d8c&preset_what=all&preset_time=monthnow';

  const response = await axios.get(icsUrl);
  const icsData = response.data;

  const events = ical.sync.parseICS(icsData);
  for (const event of Object.values(events)) {
      if (!event.summary) continue;

      let currentEvents = [];

      const uid = event.uid;
      const summary = event.summary;
      const description = event.description;
      const categories = event.categories[0];
      const start = event.start.toISOString();

      const schedule = { uid, summary, description, categories, start };

      const path = 'storage/events.json';
      const isFileExsist = fs.existsSync(path);

      if (isFileExsist) {
        const currentEventsRaw = fs.readFileSync(path);
        currentEvents = JSON.parse(currentEventsRaw ?? '[]');
      };

      const isEventExist = currentEvents.some(currentEvent => {
        return currentEvent.uid == uid;
      })

      if (isEventExist) return false;

      currentEvents.push(schedule);

      // Convert the object to JSON
      const eventsJSON = JSON.stringify(currentEvents, null, 2);

      fs.writeFileSync(path, eventsJSON, 'utf-8');

      console.log(`Event information saved to ${path}`);
    };
}

function get() {
  const path = 'storage/events.json';
  const contents = fs.readFileSync(path);
  const events = JSON.parse(contents);

  return events;
}

module.exports = {
  fetch,
  get
}