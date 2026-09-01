import { spawn } from 'node:child_process';

const PDF_SETTINGS_MAP: Record<number, string> = {
  1: '/prepress', // High quality / minimal compression
  2: '/printer', // Medium-high quality
  3: '/ebook', // Default / balanced compression
  4: '/screen', // Maximum compression / lower quality
};

/**
 * Compresses a PDF file using Ghostscript.
 *
 * @param inputPath - Path to the input PDF file
 * @param outputPath - Path where the compressed PDF will be saved
 * @param depth - Compression depth (1 = Lowest compression / Best quality, 4 = Highest compression)
 * @param timeoutMs - Process execution timeout in milliseconds (default: 30s)
 */
export const compressPDF = (
  inputPath: string,
  outputPath: string,
  depth: number = 3,
  timeoutMs: number = 30000,
): Promise<void> => {
  return new Promise((resolve, reject) => {
    // Fallback to /ebook if an invalid depth is provided
    const pdfSetting = PDF_SETTINGS_MAP[depth] ?? '/ebook';

    const child = spawn(
      'gs',
      [
        '-dSAFER',
        '-dBATCH',
        '-dNOPAUSE',
        '-dQUIET',
        '-sDEVICE=pdfwrite',
        '-dCompatibilityLevel=1.4',
        `-dPDFSETTINGS=${pdfSetting}`,
        `-sOutputFile=${outputPath}`,
        inputPath,
      ],
      { shell: false },
    );

    let stderrData = '';

    // Collect error logs from Ghostscript for better debugging
    child.stderr.on('data', (chunk) => {
      stderrData += chunk.toString();
    });

    // Handle execution timeout safely
    const timeout = setTimeout(() => {
      child.kill('SIGTERM');
      reject(new Error(`Ghostscript process timed out after ${timeoutMs}ms.`));
    }, timeoutMs);

    child.on('error', (err) => {
      clearTimeout(timeout);
      reject(err);
    });

    child.on('close', (code) => {
      clearTimeout(timeout);

      if (code === 0) {
        resolve();
      } else {
        const errorMessage = stderrData.trim() || `Process exited with code ${code}`;
        reject(new Error(`Ghostscript Error: ${errorMessage}`));
      }
    });
  });
};
