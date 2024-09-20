import { REST, Routes, ApplicationCommandOptionType } from "discord.js";
import { setTimeout } from "timers/promises";
import "dotenv/config";

const rest = new REST().setToken(process.env.TOKEN);

let commands = [];
const subcommandgroups = [];
const subcommands = [];

const alphabets = "abcdefghijklmnopqrstuvwxyz".split("");

for (let i = 0; i < 25; i++) {
  subcommands.push({
    name: alphabets[i],
    description: "a",
    type: ApplicationCommandOptionType.Subcommand,
  });
}

for (let i = 0; i < 25; i++) {
  subcommandgroups.push({
    name: alphabets[i],
    description: "a",
    type: ApplicationCommandOptionType.SubcommandGroup,
    options: subcommands,
  });
}

let prefix = 0;
let suffix = 0;

for (let i = 0; i < 100; i++) {
  commands.push({
    name: alphabets[prefix] + alphabets[suffix],
    description: "0",
    options: subcommandgroups,
  });

  suffix++;

  if (suffix == 26) {
    suffix = 0;
    prefix++;
  }
}

try {
  console.log(
    `Started refreshing ${commands.length} application (/) commands.`
  );

  for (const command of commands) {
    await rest.post(
      Routes.applicationCommands(
        process.env.CLIENT_ID,
      ),
      {
        body: command,
      }
    );

    console.log(
      `Successfully reloaded ${command.name} application (/) command.`
    );

    await setTimeout(30_000);
  }

  console.log(
    `Successfully reloaded ${commands.length} application (/) command.`
  );
} catch (error) {
  console.error(error);
}
