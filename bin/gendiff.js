#!/usr/bin/env node

import { program } from 'commander';

program
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format')
  .option('-h, --help', 'output usage information')
  .action((filepath1, filepath2) => {
    // логика обработки файлов
    console.log(filepath1);
    console.log(filepath2);
  });

// Вывод справочной информации при запуске с флагом -h или --help
// process.argv[0] содержит путь к исполняемому файлу Node.js,
// process.argv[1] содержит путь к текущему скрипту
if (process.argv.includes('-h') || process.argv.includes('--help')) {
  program.outputHelp();
}
