"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.processor = void 0;
const evm_processor_1 = require("@subsquid/evm-processor");
const contractAbi = __importStar(require("./abi/abi"));
exports.processor = new evm_processor_1.EvmBatchProcessor()
    .setDataSource({
    archive: 'https://v2.archive.subsquid.io/network/shibuya-testnet',
})
    .setFields({
    log: {
        topics: true,
        data: true,
        transactionHash: true,
    },
    transaction: {
        hash: true,
        input: true,
        from: true,
        value: true,
        status: true,
    }
})
    .addLog({
    address: ['0x743b448df95449c240569c8f66a533ba578b00af'],
    topic0: [
        contractAbi.events['Transfer'].topic,
    ],
    range: {
        from: 1000000,
    },
})
    .addTransaction({
    to: ['0x743b448df95449c240569c8f66a533ba578b00af'],
    sighash: [
        contractAbi.functions['transfer'].sighash,
    ],
    range: {
        from: 1000000,
    },
});
//# sourceMappingURL=processor.js.map