// src/types/global.d.ts

// --- declarar formatos de asset ---
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
// …agrega otros si los usas

// --- tu declaración existente ---
declare module 'esc-pos-encoder' {
  class EscPosEncoder {
    initialize(): EscPosEncoder;
    text(content: string, size?: number, weight?: number): EscPosEncoder;
    newline(): EscPosEncoder;
    cut(): EscPosEncoder;
    encode(): Uint8Array;
  }
  export default EscPosEncoder;
}
