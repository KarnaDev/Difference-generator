#!/usr/bin/env node

import { program } from 'commander';

program
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0', '-V, --version', 'output the version number')
  .option('-h, --help', 'output usage information')
  .parse(process.argv);

// проверка наличия элемента -h в массиве аргументов командной строки
const hasHelpOption = process.argv.includes('-h') || process.argv.includes('--help');

if (hasHelpOption) {
  program.help(); // Вывод справки
// } else {
//   program.parse(process.argv);
}
