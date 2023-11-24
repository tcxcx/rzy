import * as ethers from 'ethers'
import {LogEvent, Func, ContractBase} from './abi.support'
import {ABI_JSON} from './abi.abi'

export const abi = new ethers.Interface(ABI_JSON);

export const events = {
    Approval: new LogEvent<([owner: string, spender: string, value: bigint] & {owner: string, spender: string, value: bigint})>(
        abi, '0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925'
    ),
    DelegateChanged: new LogEvent<([delegator: string, fromDelegate: string, toDelegate: string] & {delegator: string, fromDelegate: string, toDelegate: string})>(
        abi, '0x3134e8a2e6d97e929a7e54011ea5485d7d196dd5f0ba4d4ef95803e8e3fc257f'
    ),
    DelegateVotesChanged: new LogEvent<([delegate: string, previousBalance: bigint, newBalance: bigint] & {delegate: string, previousBalance: bigint, newBalance: bigint})>(
        abi, '0xdec2bacdd2f05b59de34da9b523dff8be42e5e38e818c82fdb0bae774387a724'
    ),
    FlatPlatformFeeUpdated: new LogEvent<([platformFeeRecipient: string, flatFee: bigint] & {platformFeeRecipient: string, flatFee: bigint})>(
        abi, '0xf8086cee80709bd44c82f89dbca54115ebd05e840a88ab81df9cf5be9754eb63'
    ),
    Initialized: new LogEvent<([version: number] & {version: number})>(
        abi, '0x7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb3847402498'
    ),
    PlatformFeeInfoUpdated: new LogEvent<([platformFeeRecipient: string, platformFeeBps: bigint] & {platformFeeRecipient: string, platformFeeBps: bigint})>(
        abi, '0xe2497bd806ec41a6e0dd992c29a72efc0ef8fec9092d1978fd4a1e00b2f18304'
    ),
    PlatformFeeTypeUpdated: new LogEvent<([feeType: number] & {feeType: number})>(
        abi, '0xd246da9440709ce0dd3f4fd669abc85ada012ab9774b8ecdcc5059ba1486b9c1'
    ),
    PrimarySaleRecipientUpdated: new LogEvent<([recipient: string] & {recipient: string})>(
        abi, '0x299d17e95023f496e0ffc4909cff1a61f74bb5eb18de6f900f4155bfa1b3b333'
    ),
    RoleAdminChanged: new LogEvent<([role: string, previousAdminRole: string, newAdminRole: string] & {role: string, previousAdminRole: string, newAdminRole: string})>(
        abi, '0xbd79b86ffe0ab8e8776151514217cd7cacd52c909f66475c3af44e129f0b00ff'
    ),
    RoleGranted: new LogEvent<([role: string, account: string, sender: string] & {role: string, account: string, sender: string})>(
        abi, '0x2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d'
    ),
    RoleRevoked: new LogEvent<([role: string, account: string, sender: string] & {role: string, account: string, sender: string})>(
        abi, '0xf6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b'
    ),
    TokensMinted: new LogEvent<([mintedTo: string, quantityMinted: bigint] & {mintedTo: string, quantityMinted: bigint})>(
        abi, '0x3f2c9d57c068687834f0de942a9babb9e5acab57d516d3480a3c16ee165a4273'
    ),
    TokensMintedWithSignature: new LogEvent<([signer: string, mintedTo: string, mintRequest: ([to: string, primarySaleRecipient: string, quantity: bigint, price: bigint, currency: string, validityStartTimestamp: bigint, validityEndTimestamp: bigint, uid: string] & {to: string, primarySaleRecipient: string, quantity: bigint, price: bigint, currency: string, validityStartTimestamp: bigint, validityEndTimestamp: bigint, uid: string})] & {signer: string, mintedTo: string, mintRequest: ([to: string, primarySaleRecipient: string, quantity: bigint, price: bigint, currency: string, validityStartTimestamp: bigint, validityEndTimestamp: bigint, uid: string] & {to: string, primarySaleRecipient: string, quantity: bigint, price: bigint, currency: string, validityStartTimestamp: bigint, validityEndTimestamp: bigint, uid: string})})>(
        abi, '0xc4d88b1adde72eb5acf63f3e219ef5b223262233acf507c3b171277c91973c67'
    ),
    Transfer: new LogEvent<([from: string, to: string, value: bigint] & {from: string, to: string, value: bigint})>(
        abi, '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef'
    ),
}

export const functions = {
    DEFAULT_ADMIN_ROLE: new Func<[], {}, string>(
        abi, '0xa217fddf'
    ),
    DOMAIN_SEPARATOR: new Func<[], {}, string>(
        abi, '0x3644e515'
    ),
    allowance: new Func<[owner: string, spender: string], {owner: string, spender: string}, bigint>(
        abi, '0xdd62ed3e'
    ),
    approve: new Func<[spender: string, amount: bigint], {spender: string, amount: bigint}, boolean>(
        abi, '0x095ea7b3'
    ),
    balanceOf: new Func<[account: string], {account: string}, bigint>(
        abi, '0x70a08231'
    ),
    burn: new Func<[amount: bigint], {amount: bigint}, []>(
        abi, '0x42966c68'
    ),
    burnFrom: new Func<[account: string, amount: bigint], {account: string, amount: bigint}, []>(
        abi, '0x79cc6790'
    ),
    checkpoints: new Func<[account: string, pos: number], {account: string, pos: number}, ([fromBlock: number, votes: bigint] & {fromBlock: number, votes: bigint})>(
        abi, '0xf1127ed8'
    ),
    contractType: new Func<[], {}, string>(
        abi, '0xcb2ef6f7'
    ),
    contractURI: new Func<[], {}, string>(
        abi, '0xe8a3d485'
    ),
    contractVersion: new Func<[], {}, number>(
        abi, '0xa0a8e460'
    ),
    decimals: new Func<[], {}, number>(
        abi, '0x313ce567'
    ),
    decreaseAllowance: new Func<[spender: string, subtractedValue: bigint], {spender: string, subtractedValue: bigint}, boolean>(
        abi, '0xa457c2d7'
    ),
    delegate: new Func<[delegatee: string], {delegatee: string}, []>(
        abi, '0x5c19a95c'
    ),
    delegateBySig: new Func<[delegatee: string, nonce: bigint, expiry: bigint, v: number, r: string, s: string], {delegatee: string, nonce: bigint, expiry: bigint, v: number, r: string, s: string}, []>(
        abi, '0xc3cda520'
    ),
    delegates: new Func<[account: string], {account: string}, string>(
        abi, '0x587cde1e'
    ),
    getPastTotalSupply: new Func<[blockNumber: bigint], {blockNumber: bigint}, bigint>(
        abi, '0x8e539e8c'
    ),
    getPastVotes: new Func<[account: string, blockNumber: bigint], {account: string, blockNumber: bigint}, bigint>(
        abi, '0x3a46b1a8'
    ),
    getPlatformFeeInfo: new Func<[], {}, [_: string, _: number]>(
        abi, '0xd45573f6'
    ),
    getRoleAdmin: new Func<[role: string], {role: string}, string>(
        abi, '0x248a9ca3'
    ),
    getRoleMember: new Func<[role: string, index: bigint], {role: string, index: bigint}, string>(
        abi, '0x9010d07c'
    ),
    getRoleMemberCount: new Func<[role: string], {role: string}, bigint>(
        abi, '0xca15c873'
    ),
    getVotes: new Func<[account: string], {account: string}, bigint>(
        abi, '0x9ab24eb0'
    ),
    grantRole: new Func<[role: string, account: string], {role: string, account: string}, []>(
        abi, '0x2f2ff15d'
    ),
    hasRole: new Func<[role: string, account: string], {role: string, account: string}, boolean>(
        abi, '0x91d14854'
    ),
    increaseAllowance: new Func<[spender: string, addedValue: bigint], {spender: string, addedValue: bigint}, boolean>(
        abi, '0x39509351'
    ),
    initialize: new Func<[_defaultAdmin: string, _name: string, _symbol: string, _contractURI: string, _trustedForwarders: Array<string>, _primarySaleRecipient: string, _platformFeeRecipient: string, _platformFeeBps: bigint], {_defaultAdmin: string, _name: string, _symbol: string, _contractURI: string, _trustedForwarders: Array<string>, _primarySaleRecipient: string, _platformFeeRecipient: string, _platformFeeBps: bigint}, []>(
        abi, '0xdfad80a6'
    ),
    isTrustedForwarder: new Func<[forwarder: string], {forwarder: string}, boolean>(
        abi, '0x572b6c05'
    ),
    mintTo: new Func<[to: string, amount: bigint], {to: string, amount: bigint}, []>(
        abi, '0x449a52f8'
    ),
    mintWithSignature: new Func<[_req: ([to: string, primarySaleRecipient: string, quantity: bigint, price: bigint, currency: string, validityStartTimestamp: bigint, validityEndTimestamp: bigint, uid: string] & {to: string, primarySaleRecipient: string, quantity: bigint, price: bigint, currency: string, validityStartTimestamp: bigint, validityEndTimestamp: bigint, uid: string}), _signature: string], {_req: ([to: string, primarySaleRecipient: string, quantity: bigint, price: bigint, currency: string, validityStartTimestamp: bigint, validityEndTimestamp: bigint, uid: string] & {to: string, primarySaleRecipient: string, quantity: bigint, price: bigint, currency: string, validityStartTimestamp: bigint, validityEndTimestamp: bigint, uid: string}), _signature: string}, []>(
        abi, '0x8f0fefbb'
    ),
    multicall: new Func<[data: Array<string>], {data: Array<string>}, Array<string>>(
        abi, '0xac9650d8'
    ),
    name: new Func<[], {}, string>(
        abi, '0x06fdde03'
    ),
    nonces: new Func<[owner: string], {owner: string}, bigint>(
        abi, '0x7ecebe00'
    ),
    numCheckpoints: new Func<[account: string], {account: string}, number>(
        abi, '0x6fcfff45'
    ),
    permit: new Func<[owner: string, spender: string, value: bigint, deadline: bigint, v: number, r: string, s: string], {owner: string, spender: string, value: bigint, deadline: bigint, v: number, r: string, s: string}, []>(
        abi, '0xd505accf'
    ),
    primarySaleRecipient: new Func<[], {}, string>(
        abi, '0x079fe40e'
    ),
    renounceRole: new Func<[role: string, account: string], {role: string, account: string}, []>(
        abi, '0x36568abe'
    ),
    revokeRole: new Func<[role: string, account: string], {role: string, account: string}, []>(
        abi, '0xd547741f'
    ),
    setContractURI: new Func<[_uri: string], {_uri: string}, []>(
        abi, '0x938e3d7b'
    ),
    setPlatformFeeInfo: new Func<[_platformFeeRecipient: string, _platformFeeBps: bigint], {_platformFeeRecipient: string, _platformFeeBps: bigint}, []>(
        abi, '0x1e7ac488'
    ),
    setPrimarySaleRecipient: new Func<[_saleRecipient: string], {_saleRecipient: string}, []>(
        abi, '0x6f4f2837'
    ),
    supportsInterface: new Func<[interfaceId: string], {interfaceId: string}, boolean>(
        abi, '0x01ffc9a7'
    ),
    symbol: new Func<[], {}, string>(
        abi, '0x95d89b41'
    ),
    totalSupply: new Func<[], {}, bigint>(
        abi, '0x18160ddd'
    ),
    transfer: new Func<[to: string, amount: bigint], {to: string, amount: bigint}, boolean>(
        abi, '0xa9059cbb'
    ),
    transferFrom: new Func<[from: string, to: string, amount: bigint], {from: string, to: string, amount: bigint}, boolean>(
        abi, '0x23b872dd'
    ),
    verify: new Func<[_req: ([to: string, primarySaleRecipient: string, quantity: bigint, price: bigint, currency: string, validityStartTimestamp: bigint, validityEndTimestamp: bigint, uid: string] & {to: string, primarySaleRecipient: string, quantity: bigint, price: bigint, currency: string, validityStartTimestamp: bigint, validityEndTimestamp: bigint, uid: string}), _signature: string], {_req: ([to: string, primarySaleRecipient: string, quantity: bigint, price: bigint, currency: string, validityStartTimestamp: bigint, validityEndTimestamp: bigint, uid: string] & {to: string, primarySaleRecipient: string, quantity: bigint, price: bigint, currency: string, validityStartTimestamp: bigint, validityEndTimestamp: bigint, uid: string}), _signature: string}, [_: boolean, _: string]>(
        abi, '0xc1b606e2'
    ),
}

export class Contract extends ContractBase {

    DEFAULT_ADMIN_ROLE(): Promise<string> {
        return this.eth_call(functions.DEFAULT_ADMIN_ROLE, [])
    }

    DOMAIN_SEPARATOR(): Promise<string> {
        return this.eth_call(functions.DOMAIN_SEPARATOR, [])
    }

    allowance(owner: string, spender: string): Promise<bigint> {
        return this.eth_call(functions.allowance, [owner, spender])
    }

    balanceOf(account: string): Promise<bigint> {
        return this.eth_call(functions.balanceOf, [account])
    }

    checkpoints(account: string, pos: number): Promise<([fromBlock: number, votes: bigint] & {fromBlock: number, votes: bigint})> {
        return this.eth_call(functions.checkpoints, [account, pos])
    }

    contractType(): Promise<string> {
        return this.eth_call(functions.contractType, [])
    }

    contractURI(): Promise<string> {
        return this.eth_call(functions.contractURI, [])
    }

    contractVersion(): Promise<number> {
        return this.eth_call(functions.contractVersion, [])
    }

    decimals(): Promise<number> {
        return this.eth_call(functions.decimals, [])
    }

    delegates(account: string): Promise<string> {
        return this.eth_call(functions.delegates, [account])
    }

    getPastTotalSupply(blockNumber: bigint): Promise<bigint> {
        return this.eth_call(functions.getPastTotalSupply, [blockNumber])
    }

    getPastVotes(account: string, blockNumber: bigint): Promise<bigint> {
        return this.eth_call(functions.getPastVotes, [account, blockNumber])
    }

    getPlatformFeeInfo(): Promise<[_: string, _: number]> {
        return this.eth_call(functions.getPlatformFeeInfo, [])
    }

    getRoleAdmin(role: string): Promise<string> {
        return this.eth_call(functions.getRoleAdmin, [role])
    }

    getRoleMember(role: string, index: bigint): Promise<string> {
        return this.eth_call(functions.getRoleMember, [role, index])
    }

    getRoleMemberCount(role: string): Promise<bigint> {
        return this.eth_call(functions.getRoleMemberCount, [role])
    }

    getVotes(account: string): Promise<bigint> {
        return this.eth_call(functions.getVotes, [account])
    }

    hasRole(role: string, account: string): Promise<boolean> {
        return this.eth_call(functions.hasRole, [role, account])
    }

    isTrustedForwarder(forwarder: string): Promise<boolean> {
        return this.eth_call(functions.isTrustedForwarder, [forwarder])
    }

    name(): Promise<string> {
        return this.eth_call(functions.name, [])
    }

    nonces(owner: string): Promise<bigint> {
        return this.eth_call(functions.nonces, [owner])
    }

    numCheckpoints(account: string): Promise<number> {
        return this.eth_call(functions.numCheckpoints, [account])
    }

    primarySaleRecipient(): Promise<string> {
        return this.eth_call(functions.primarySaleRecipient, [])
    }

    supportsInterface(interfaceId: string): Promise<boolean> {
        return this.eth_call(functions.supportsInterface, [interfaceId])
    }

    symbol(): Promise<string> {
        return this.eth_call(functions.symbol, [])
    }

    totalSupply(): Promise<bigint> {
        return this.eth_call(functions.totalSupply, [])
    }

    verify(_req: ([to: string, primarySaleRecipient: string, quantity: bigint, price: bigint, currency: string, validityStartTimestamp: bigint, validityEndTimestamp: bigint, uid: string] & {to: string, primarySaleRecipient: string, quantity: bigint, price: bigint, currency: string, validityStartTimestamp: bigint, validityEndTimestamp: bigint, uid: string}), _signature: string): Promise<[_: boolean, _: string]> {
        return this.eth_call(functions.verify, [_req, _signature])
    }
}
