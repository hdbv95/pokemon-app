import '@testing-library/jest-dom';
import { TextDecoder as NodeTextDecoder, TextEncoder as NodeTextEncoder } from 'util';

// Cast to match the expected types in Jest
global.TextDecoder = NodeTextDecoder as unknown as typeof TextDecoder;
global.TextEncoder = NodeTextEncoder as unknown as typeof TextEncoder;
