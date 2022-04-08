const ready = {
  name: "ready",
  once: true,
  execute(client) {
    console.log(`Ready! Logged in as ${client.user.tag}`);
    /*
    setInterval(function () {
      const used = process.memoryUsage().heapUsed / 1024 / 1024;
      console.clear();
      console.log(`The bot uses approximately ${used} MB`);
    }, 1000);
  */
  },
};

export default ready;
