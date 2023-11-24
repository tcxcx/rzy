"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mapping_1 = require("./mapping");
const processor_1 = require("./processor");
const db_1 = require("./db");
const entityBuffer_1 = require("./entityBuffer");
const model_1 = require("./model");
processor_1.processor.run(db_1.db, async (ctx) => {
    for (let block of ctx.blocks) {
        entityBuffer_1.EntityBuffer.add(new model_1.Block({
            id: block.header.id,
            number: block.header.height,
            timestamp: new Date(block.header.timestamp),
        }));
        for (let log of block.logs) {
            if (log.address === '0x743b448df95449c240569c8f66a533ba578b00af') {
                mapping_1.contract.parseEvent(ctx, log);
            }
        }
        for (let transaction of block.transactions) {
            if (transaction.to === '0x743b448df95449c240569c8f66a533ba578b00af') {
                mapping_1.contract.parseFunction(ctx, transaction);
            }
            entityBuffer_1.EntityBuffer.add(new model_1.Transaction({
                id: transaction.id,
                blockNumber: block.header.height,
                blockTimestamp: new Date(block.header.timestamp),
                hash: transaction.hash,
                to: transaction.to,
                from: transaction.from,
                status: transaction.status,
            }));
        }
    }
    for (let entities of entityBuffer_1.EntityBuffer.flush()) {
        await ctx.store.insert(entities);
    }
});
//# sourceMappingURL=main.js.map