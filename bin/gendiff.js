#!/usr/bin/env node

import { program } from 'commander';
import genDiff from '../src/index.js';

program
  .name('gendiff')
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format')
  // .option('-h, --help', 'output usage information')
  .action((filepath1, filepath2) => {
    // console.log('Comparing files:');
    console.log(genDiff(filepath1, filepath2));
  });

program.parse(process.argv);

// Вывод справочной информации при запуске с флагом -h или --help
// if (process.argv.includes('-h') || process.argv.includes('--help')) {
//   program.outputHelp();
// }
