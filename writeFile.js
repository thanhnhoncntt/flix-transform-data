const fs = require("fs");

export function writeFile(name, data) {
  fs.writeFileSync("output/" + name + ".json", data);
}
