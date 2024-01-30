import { FileReader } from './fileReader.interface.js';
import { readFileSync } from 'node:fs';
import { Offer, TypeOfOffer } from '../../types/index.js';

export class TSVFileReader implements FileReader {
  private rawData = '';

  constructor(private readonly filename: string) {}

  public read(): void {
    this.rawData = readFileSync(this.filename, {
      encoding: 'utf-8',
    });
  }
}

