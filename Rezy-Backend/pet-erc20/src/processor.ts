import {EvmBatchProcessor, EvmBatchProcessorFields, BlockHeader, Log as _Log, Transaction as _Transaction} from '@subsquid/evm-processor'
import * as contractAbi from './abi/abi'

export const processor = new EvmBatchProcessor()
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
    })

export type Fields = EvmBatchProcessorFields<typeof processor>
export type Block = BlockHeader<Fields>
export type Log = _Log<Fields>
export type Transaction = _Transaction<Fields>
