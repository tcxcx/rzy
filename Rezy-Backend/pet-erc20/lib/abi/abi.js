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
exports.Contract = exports.functions = exports.events = exports.abi = void 0;
const ethers = __importStar(require("ethers"));
const abi_support_1 = require("./abi.support");
const abi_abi_1 = require("./abi.abi");
exports.abi = new ethers.Interface(abi_abi_1.ABI_JSON);
exports.events = {
    Approval: new abi_support_1.LogEvent(exports.abi, '0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925'),
    DelegateChanged: new abi_support_1.LogEvent(exports.abi, '0x3134e8a2e6d97e929a7e54011ea5485d7d196dd5f0ba4d4ef95803e8e3fc257f'),
    DelegateVotesChanged: new abi_support_1.LogEvent(exports.abi, '0xdec2bacdd2f05b59de34da9b523dff8be42e5e38e818c82fdb0bae774387a724'),
    FlatPlatformFeeUpdated: new abi_support_1.LogEvent(exports.abi, '0xf8086cee80709bd44c82f89dbca54115ebd05e840a88ab81df9cf5be9754eb63'),
    Initialized: new abi_support_1.LogEvent(exports.abi, '0x7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb3847402498'),
    PlatformFeeInfoUpdated: new abi_support_1.LogEvent(exports.abi, '0xe2497bd806ec41a6e0dd992c29a72efc0ef8fec9092d1978fd4a1e00b2f18304'),
    PlatformFeeTypeUpdated: new abi_support_1.LogEvent(exports.abi, '0xd246da9440709ce0dd3f4fd669abc85ada012ab9774b8ecdcc5059ba1486b9c1'),
    PrimarySaleRecipientUpdated: new abi_support_1.LogEvent(exports.abi, '0x299d17e95023f496e0ffc4909cff1a61f74bb5eb18de6f900f4155bfa1b3b333'),
    RoleAdminChanged: new abi_support_1.LogEvent(exports.abi, '0xbd79b86ffe0ab8e8776151514217cd7cacd52c909f66475c3af44e129f0b00ff'),
    RoleGranted: new abi_support_1.LogEvent(exports.abi, '0x2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d'),
    RoleRevoked: new abi_support_1.LogEvent(exports.abi, '0xf6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b'),
    TokensMinted: new abi_support_1.LogEvent(exports.abi, '0x3f2c9d57c068687834f0de942a9babb9e5acab57d516d3480a3c16ee165a4273'),
    TokensMintedWithSignature: new abi_support_1.LogEvent(exports.abi, '0xc4d88b1adde72eb5acf63f3e219ef5b223262233acf507c3b171277c91973c67'),
    Transfer: new abi_support_1.LogEvent(exports.abi, '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef'),
};
exports.functions = {
    DEFAULT_ADMIN_ROLE: new abi_support_1.Func(exports.abi, '0xa217fddf'),
    DOMAIN_SEPARATOR: new abi_support_1.Func(exports.abi, '0x3644e515'),
    allowance: new abi_support_1.Func(exports.abi, '0xdd62ed3e'),
    approve: new abi_support_1.Func(exports.abi, '0x095ea7b3'),
    balanceOf: new abi_support_1.Func(exports.abi, '0x70a08231'),
    burn: new abi_support_1.Func(exports.abi, '0x42966c68'),
    burnFrom: new abi_support_1.Func(exports.abi, '0x79cc6790'),
    checkpoints: new abi_support_1.Func(exports.abi, '0xf1127ed8'),
    contractType: new abi_support_1.Func(exports.abi, '0xcb2ef6f7'),
    contractURI: new abi_support_1.Func(exports.abi, '0xe8a3d485'),
    contractVersion: new abi_support_1.Func(exports.abi, '0xa0a8e460'),
    decimals: new abi_support_1.Func(exports.abi, '0x313ce567'),
    decreaseAllowance: new abi_support_1.Func(exports.abi, '0xa457c2d7'),
    delegate: new abi_support_1.Func(exports.abi, '0x5c19a95c'),
    delegateBySig: new abi_support_1.Func(exports.abi, '0xc3cda520'),
    delegates: new abi_support_1.Func(exports.abi, '0x587cde1e'),
    getPastTotalSupply: new abi_support_1.Func(exports.abi, '0x8e539e8c'),
    getPastVotes: new abi_support_1.Func(exports.abi, '0x3a46b1a8'),
    getPlatformFeeInfo: new abi_support_1.Func(exports.abi, '0xd45573f6'),
    getRoleAdmin: new abi_support_1.Func(exports.abi, '0x248a9ca3'),
    getRoleMember: new abi_support_1.Func(exports.abi, '0x9010d07c'),
    getRoleMemberCount: new abi_support_1.Func(exports.abi, '0xca15c873'),
    getVotes: new abi_support_1.Func(exports.abi, '0x9ab24eb0'),
    grantRole: new abi_support_1.Func(exports.abi, '0x2f2ff15d'),
    hasRole: new abi_support_1.Func(exports.abi, '0x91d14854'),
    increaseAllowance: new abi_support_1.Func(exports.abi, '0x39509351'),
    initialize: new abi_support_1.Func(exports.abi, '0xdfad80a6'),
    isTrustedForwarder: new abi_support_1.Func(exports.abi, '0x572b6c05'),
    mintTo: new abi_support_1.Func(exports.abi, '0x449a52f8'),
    mintWithSignature: new abi_support_1.Func(exports.abi, '0x8f0fefbb'),
    multicall: new abi_support_1.Func(exports.abi, '0xac9650d8'),
    name: new abi_support_1.Func(exports.abi, '0x06fdde03'),
    nonces: new abi_support_1.Func(exports.abi, '0x7ecebe00'),
    numCheckpoints: new abi_support_1.Func(exports.abi, '0x6fcfff45'),
    permit: new abi_support_1.Func(exports.abi, '0xd505accf'),
    primarySaleRecipient: new abi_support_1.Func(exports.abi, '0x079fe40e'),
    renounceRole: new abi_support_1.Func(exports.abi, '0x36568abe'),
    revokeRole: new abi_support_1.Func(exports.abi, '0xd547741f'),
    setContractURI: new abi_support_1.Func(exports.abi, '0x938e3d7b'),
    setPlatformFeeInfo: new abi_support_1.Func(exports.abi, '0x1e7ac488'),
    setPrimarySaleRecipient: new abi_support_1.Func(exports.abi, '0x6f4f2837'),
    supportsInterface: new abi_support_1.Func(exports.abi, '0x01ffc9a7'),
    symbol: new abi_support_1.Func(exports.abi, '0x95d89b41'),
    totalSupply: new abi_support_1.Func(exports.abi, '0x18160ddd'),
    transfer: new abi_support_1.Func(exports.abi, '0xa9059cbb'),
    transferFrom: new abi_support_1.Func(exports.abi, '0x23b872dd'),
    verify: new abi_support_1.Func(exports.abi, '0xc1b606e2'),
};
class Contract extends abi_support_1.ContractBase {
    DEFAULT_ADMIN_ROLE() {
        return this.eth_call(exports.functions.DEFAULT_ADMIN_ROLE, []);
    }
    DOMAIN_SEPARATOR() {
        return this.eth_call(exports.functions.DOMAIN_SEPARATOR, []);
    }
    allowance(owner, spender) {
        return this.eth_call(exports.functions.allowance, [owner, spender]);
    }
    balanceOf(account) {
        return this.eth_call(exports.functions.balanceOf, [account]);
    }
    checkpoints(account, pos) {
        return this.eth_call(exports.functions.checkpoints, [account, pos]);
    }
    contractType() {
        return this.eth_call(exports.functions.contractType, []);
    }
    contractURI() {
        return this.eth_call(exports.functions.contractURI, []);
    }
    contractVersion() {
        return this.eth_call(exports.functions.contractVersion, []);
    }
    decimals() {
        return this.eth_call(exports.functions.decimals, []);
    }
    delegates(account) {
        return this.eth_call(exports.functions.delegates, [account]);
    }
    getPastTotalSupply(blockNumber) {
        return this.eth_call(exports.functions.getPastTotalSupply, [blockNumber]);
    }
    getPastVotes(account, blockNumber) {
        return this.eth_call(exports.functions.getPastVotes, [account, blockNumber]);
    }
    getPlatformFeeInfo() {
        return this.eth_call(exports.functions.getPlatformFeeInfo, []);
    }
    getRoleAdmin(role) {
        return this.eth_call(exports.functions.getRoleAdmin, [role]);
    }
    getRoleMember(role, index) {
        return this.eth_call(exports.functions.getRoleMember, [role, index]);
    }
    getRoleMemberCount(role) {
        return this.eth_call(exports.functions.getRoleMemberCount, [role]);
    }
    getVotes(account) {
        return this.eth_call(exports.functions.getVotes, [account]);
    }
    hasRole(role, account) {
        return this.eth_call(exports.functions.hasRole, [role, account]);
    }
    isTrustedForwarder(forwarder) {
        return this.eth_call(exports.functions.isTrustedForwarder, [forwarder]);
    }
    name() {
        return this.eth_call(exports.functions.name, []);
    }
    nonces(owner) {
        return this.eth_call(exports.functions.nonces, [owner]);
    }
    numCheckpoints(account) {
        return this.eth_call(exports.functions.numCheckpoints, [account]);
    }
    primarySaleRecipient() {
        return this.eth_call(exports.functions.primarySaleRecipient, []);
    }
    supportsInterface(interfaceId) {
        return this.eth_call(exports.functions.supportsInterface, [interfaceId]);
    }
    symbol() {
        return this.eth_call(exports.functions.symbol, []);
    }
    totalSupply() {
        return this.eth_call(exports.functions.totalSupply, []);
    }
    verify(_req, _signature) {
        return this.eth_call(exports.functions.verify, [_req, _signature]);
    }
}
exports.Contract = Contract;
//# sourceMappingURL=abi.js.map