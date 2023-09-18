// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract CidContainer {
  mapping(address => string) container;

  function read(address Addr) public view returns (string memory) {
    return container[Addr];
  }

  function add(address Addr, string memory cid) public {
    container[Addr] = cid;
  }
}