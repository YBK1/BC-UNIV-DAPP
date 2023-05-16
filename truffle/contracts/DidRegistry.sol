// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract DidRegistry {
  mapping (bytes32 => string) IDstructure;

  function read(bytes32 myAddress) public view returns (string memory) {
    return IDstructure[myAddress];
  }

  function write(bytes32 myAddress, string memory jsonData) public {
    IDstructure[myAddress] = jsonData;
  }
}


// pragma solidity ^0.8.0;

// contract JSONProcessor {
//     function processJSON(string memory jsonString) public {
//         // JSON 문자열 파싱
//         (string memory context, string memory id, string memory verificationMethod, string memory assertionMethod, string memory authentication) = parseJSON(jsonString);

//         // 추출한 값들로 작업 수행
//         // ...

//         // 예시: 추출한 값들을 로그로 출력
//         emit JSONProcessed(context, id, verificationMethod, assertionMethod, authentication);
//     }

//     function parseJSON(string memory jsonString) private pure returns (string memory, string memory, string memory, string memory, string memory) {
//         // JSON 파싱 로직을 여기에 구현
//         // 문자열 조작이나 'jsonparse'와 같은 외부 라이브러리를 사용하여 복잡한 JSON 파싱 가능

//         // 예시: 간단한 문자열 조작을 사용하여 값 추출
//         string memory context = extractValue(jsonString, '"@context": [', ']');
//         string memory id = extractValue(jsonString, '"id": "', '"');
//         string memory verificationMethod = extractValue(jsonString, '"verificationMethod": [{', '}]');
//         string memory assertionMethod = extractValue(jsonString, '"assertionMethod": [', ']');
//         string memory authentication = extractValue(jsonString, '"authentication": [', ']');

//         return (context, id, verificationMethod, assertionMethod, authentication);
//     }

//     function extractValue(string memory jsonString, string memory startTag, string memory endTag) private pure returns (string memory) {
//         uint256 startIndex = indexOf(jsonString, startTag);
//         uint256 endIndex = indexOf(jsonString, endTag, startIndex + bytes(startTag).length);
//         if (startIndex == 0 || endIndex == 0) {
//             return "";
//         }
//         return substring(jsonString, startIndex + bytes(startTag).length, endIndex);
//     }

//     function indexOf(string memory str, string memory substr) private pure returns (uint256) {
//         bytes memory strBytes = bytes(str);
//         bytes memory substrBytes = bytes(substr);
//         uint256 j = 0;
//         for (uint256 i = 0; i < strBytes.length; i++) {
//             if (strBytes[i] == substrBytes[j]) {
//                 j++;
//                 if (j == substrBytes.length) {
//                     return i - j + 1;
//                 }
//             } else {
//                 j = 0;
//             }
//         }
//         return 0;
//     }

//     function substring(string memory str, uint256 startIndex, uint256 endIndex) private pure returns (string memory) {
//         bytes memory strBytes = bytes(str);
//         bytes memory result = new bytes(endIndex - startIndex);
//         for (uint256 i = startIndex; i < endIndex; i++) {
//             result[i - startIndex] = strBytes[i];
//         }
//         return string(result);
//     }

//     event JSONProcessed(
//         string context,
//         string id,
//         string verificationMethod,
//         string assertionMethod,
//         string authentication
//     );
// }
