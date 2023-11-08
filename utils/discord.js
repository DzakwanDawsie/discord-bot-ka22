const fs = require('fs');

const addGuild = (guild) => {
  let currentServers = [];
  
  const { id, name } = guild;

  const server = { id, name };

  fs.mkdirSync('storage', { recursive: true });

  // Check if server already exist
  const path = 'storage/servers.json';
  const isFileExsist = fs.existsSync(path);

  if (isFileExsist) {
    const currentServersRaw = fs.readFileSync(path);
    currentServers = JSON.parse(currentServersRaw ?? '[]');
  };

  const isServerExist = currentServers.some(currentServer => {
    currentServer.id == id;
  })

  if (isServerExist) return false;

  currentServers.push(server);

  // Convert the object to JSON
  const serversJSON = JSON.stringify(currentServers, null, 2);

  fs.writeFileSync(path, serversJSON, 'utf-8');

  console.log(`Servers information saved to ${path}`);
}

const fetchGuildChannels = (guild) => {
  const { id, name } = guild;

  const channels = guild.channels.cache.map(channel => {
    return {
      id: channel.id,
      name: channel.name,
      type: channel.type,
    };
  });

  const server = { id, name, channels };
  const serverPath = `storage/servers/${id}`;

  fs.mkdirSync(serverPath, { recursive: true });

  // Convert the object to JSON
  const serverJSON = JSON.stringify(server, null, 2);

  // Save the JSON data to a file
  const path = `${serverPath}/channels.json`;
  fs.writeFileSync(path, serverJSON, 'utf-8');

  console.log(`Channels information saved to ${path}`);
}

const fetchGuildMembers = (guild) => {
  const { id, name } = guild;

  const members = guild.members.cache.map(member => {
    return {
      id: member.id,
      nickname: member.nickname,
      displayName: member.displayName,
      avatar: member.avatar,
    }
  })

  const server = { id, name, members };
  const serverPath = `storage/servers/${id}`;

  fs.mkdirSync(serverPath, { recursive: true });

  // Convert the object to JSON
  const serverJSON = JSON.stringify(server, null, 2);

  // Save the JSON data to a file
  const path = `${serverPath}/members.json`;
  fs.writeFileSync(path, serverJSON, 'utf-8');

  console.log(`Members information saved to ${path}`);
}

module.exports = {
  fetchGuildChannels,
  fetchGuildMembers,
  addGuild
}