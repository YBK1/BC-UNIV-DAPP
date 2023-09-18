// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
struct DID{
  string id;
  string pubkey;
}

contract DidRegistry {
  mapping (bytes32 => DID) IDstructure;

  function readID(bytes32 myAddress) public view returns (string memory) {
    return IDstructure[myAddress].id;
  }

  function readPubkey(bytes32 myAddress) public view returns (string memory) {
    return IDstructure[myAddress].pubkey;
  }

  function write(bytes32 myAddress, string memory jsonData, string memory pubkey) public {
    IDstructure[myAddress] = DID(jsonData, pubkey);
  }
}