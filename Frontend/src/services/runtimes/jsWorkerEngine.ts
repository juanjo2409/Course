/**
 * Interfaz y contrato para motores de ejecución de código en el cliente
 */
export interface ExecutionResult {
  stdout: string;
  stderr: string;
  hasError: boolean;
  executionTimeMs: number;
}

export interface ICodeExecutionEngine {
  execute(code: string, timeoutMs?: number): Promise<ExecutionResult>;
  isReady(): boolean;
}

/**
 * Motor de ejecución JavaScript mediante Web Workers aislados
 */
export class JsWorkerEngine implements ICodeExecutionEngine {
  private ready = true;

  public isReady(): boolean {
    return this.ready;
  }

  public async execute(code: string, timeoutMs = 3000): Promise<ExecutionResult> {
    const startTime = performance.now();
    return new Promise((resolve) => {
      // Sandbox básico de Worker inline con captura de console.log
      const blobCode = `
        self.onmessage = function(e) {
          const logs = [];
          const originalLog = console.log;
          console.log = function(...args) {
            logs.push(args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' '));
          };
          try {
            const fn = new Function(e.data);
            fn();
            self.postMessage({ success: true, stdout: logs.join('\\n'), stderr: '' });
          } catch (err) {
            self.postMessage({ success: false, stdout: logs.join('\\n'), stderr: err.message });
          } finally {
            console.log = originalLog;
          }
        };
      `;

      const blob = new Blob([blobCode], { type: 'application/javascript' });
      const worker = new Worker(URL.createObjectURL(blob));

      const timer = setTimeout(() => {
        worker.terminate();
        resolve({
          stdout: '',
          stderr: `Execution Timeout: Excedido límite de ${timeoutMs}ms.`,
          hasError: true,
          executionTimeMs: performance.now() - startTime,
        });
      }, timeoutMs);

      worker.onmessage = (event) => {
        clearTimeout(timer);
        worker.terminate();
        resolve({
          stdout: event.data.stdout || '',
          stderr: event.data.stderr || '',
          hasError: !event.data.success,
          executionTimeMs: performance.now() - startTime,
        });
      };

      worker.onerror = (err) => {
        clearTimeout(timer);
        worker.terminate();
        resolve({
          stdout: '',
          stderr: err.message || 'Error en Worker',
          hasError: true,
          executionTimeMs: performance.now() - startTime,
        });
      };

      worker.postMessage(code);
    });
  }
}

export const jsWorkerEngine = new JsWorkerEngine();
