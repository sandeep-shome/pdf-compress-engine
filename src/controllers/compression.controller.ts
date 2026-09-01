import type { NextFunction, Request, Response } from 'express';
import { compressPDF } from '../utils/gs.js';

export const compress = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // Check for whether file uploaded or not
    if (!req.file) {
      res.status(400).json({
        message: 'Error: No file uploaded',
      });
    }

    // Implement of PDF compression logic
    const outputPath = `./downloads/${req.file?.filename}`;
    const compressionDepth = req.body.depth;

    await compressPDF(req.file?.destination || '', outputPath, compressionDepth);

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
