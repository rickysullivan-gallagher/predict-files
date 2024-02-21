import fs from 'fs/promises';
import { Magika } from 'magika';
import { Command } from 'commander';

const program = new Command();
const magika = new Magika();
await magika.load({
  modelURL: 'https://google.github.io/magika/model/model.json',
  configURL: 'https://google.github.io/magika/model/config.json',
});

async function makePrediction(inputPath) {
  try {
    const file = await fs.readFile(inputPath);
    const prediction = await magika.identifyBytes(file);
    return { file: inputPath, prediction };
  } catch (error) {
    return { file: inputPath, error: error.message };
  }
}

program
  .name('predict-files')
  .description('CLI to predict files types')
  .version('0.0.1', '-v, --version');

  program
  .command('predict')
  .description('Predict the type of files')
  .argument('<files...>', 'files to predict')
  .option('-p, --pretty', 'Pretty print the output')
  .option('--format <format>', 'Output format (json or text)', 'json') // Default format is json
  .action(async (files, options) => {
    const predictions = await Promise.all(files.map(makePrediction));
    if (options.format === 'json') {
      const output = options.pretty ? JSON.stringify(predictions, null, 2) : JSON.stringify(predictions);
      console.log(output);
    } else if (options.format === 'text') {
      predictions.forEach((obj, index) => {
        console.log(`File: ${obj.file}`);
        if (obj.error) {
          console.log(`Error: ${obj.error}`);
        } else {
          console.log(`Label: ${obj.prediction.label}`);
          console.log(`Score: ${obj.prediction.score}`);
        }
        if(predictions.length > 1 && index < (predictions.length - 1)) {
          console.log('---')
        }
      });
    } else {
      console.error('Invalid format. Please use "json" or "text".');
    }
  });

program.parse();
