// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract DidRegsitry {
  mapping (bytes32 => bool) IDstructure;

  function read(bytes32 myAddress) public view returns (bool) {
    return IDstructure[myAddress];
  }

  function write(bytes32 myAddress) public {
    IDstructure[myAddress] = true;
  }
}
