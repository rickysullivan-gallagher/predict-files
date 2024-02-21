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
  .action(async (files, options) => {
    const predictions = await Promise.all(files.map(makePrediction));
    console.log(predictions);
  });

program.parse();
