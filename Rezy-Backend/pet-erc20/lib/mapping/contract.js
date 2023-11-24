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
exports.parseFunction = exports.parseEvent = void 0;
const entityBuffer_1 = require("../entityBuffer");
const model_1 = require("../model");
const spec = __importStar(require("../abi/abi"));
const address = '0x743b448df95449c240569c8f66a533ba578b00af';
function parseEvent(ctx, log) {
    try {
        switch (log.topics[0]) {
            case spec.events['Transfer'].topic: {
                let e = spec.events['Transfer'].decode(log);
                entityBuffer_1.EntityBuffer.add(new model_1.ContractEventTransfer({
                    id: log.id,
                    blockNumber: log.block.height,
                    blockTimestamp: new Date(log.block.timestamp),
                    transactionHash: log.transactionHash,
                    contract: log.address,
                    eventName: 'Transfer',
                    from: e[0],
                    to: e[1],
                    value: e[2],
                }));
                break;
            }
        }
    }
    catch (error) {
        ctx.log.error({ error, blockNumber: log.block.height, blockHash: log.block.hash, address }, `Unable to decode event "${log.topics[0]}"`);
    }
}
exports.parseEvent = parseEvent;
function parseFunction(ctx, transaction) {
    try {
        switch (transaction.input.slice(0, 10)) {
            case spec.functions['transfer'].sighash: {
                let f = spec.functions['transfer'].decode(transaction.input);
                entityBuffer_1.EntityBuffer.add(new model_1.ContractFunctionTransfer({
                    id: transaction.id,
                    blockNumber: transaction.block.height,
                    blockTimestamp: new Date(transaction.block.timestamp),
                    transactionHash: transaction.hash,
                    contract: transaction.to,
                    functionName: 'transfer',
                    functionValue: transaction.value,
                    functionSuccess: transaction.status != null ? Boolean(transaction.status) : undefined,
                    to: f[0],
                    amount: f[1],
                }));
                break;
            }
        }
    }
    catch (error) {
        ctx.log.error({ error, blockNumber: transaction.block.height, blockHash: transaction.block.hash, address }, `Unable to decode function "${transaction.input.slice(0, 10)}"`);
    }
}
exports.parseFunction = parseFunction;
//# sourceMappingURL=contract.js.map