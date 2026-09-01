import type { NextFunction, Request, Response } from 'express';
import { compressPDF } from '../utils/gs.js';
import path from 'path';
import { cwd } from 'process';

export const compress = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // Check for whether file uploaded or not
    if (!req.file) {
      res.status(400).json({
        message: 'Error: No file uploaded',
      });
      return;
    }

    // Implement of PDF compression logic
    const inputPath = path.resolve(req.file?.path!);
    const outputDir = path.resolve(cwd(), 'downloads');
    const outputFileName = `compressed-${req.file?.originalname}`;
    const outputPath = path.join(outputDir, outputFileName);
    const compressionDepth = req.body.depth;

    await compressPDF(inputPath, outputPath, compressionDepth);

    res.status(201).json({
      message: `PDF compressed successfully at ${outputPath}`,
    });
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({
        message:
          err instanceof Error ? `${err.message}` : 'PDF compression failed with unknown error',
      });
    }
  }
};
