// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

// 검증된 학교의 주소에서만 이하 코드를 실행할 수 있도록 해야함.

contract HashContainer {
    // 이 계약을 처음 배포한 소유자의 주소
    // 생성자를 통해 초기화하는 과정이 필요
    address private owner;

    constructor() {
        owner = msg.sender;
    }

    struct Container{
        bytes32 _name;
        bytes32 _gender;
        bytes32 _birthday;
        bytes32 _university;
        bytes32 _studentId;
        bytes32 _major;
        bytes32 _admissionDate;
        bytes32 _graduationDate;
        bytes32 _overallGrade;
        bytes32 _majorGrade;
    }

    // 검증된 학교의 주소 목록
    mapping(address => bool) verifiedUniversity;

    // 검증된 학교의 주소 목록을 관리할 Owner를 판별하는 modifier가 되겠다. 
    modifier onlyOwner() { 
        require(owner == msg.sender, "this address is not Owner"); 
        _; 
    }

    // 검증된 학교의 주소 목록을 등록하는 함수
    function setVerifiedUniversity(address myAddress) public onlyOwner(){
        verifiedUniversity[myAddress] = true;
    }

    // Hash값을 저장하는 Container가 되겠다
    mapping(address => Container) hashContainer;

    // 검증된 학교에서만 Container에 등록을 할 수 있다.
    modifier onlyUniversity() { 
        require(verifiedUniversity[msg.sender], "This address is not verified address of University"); 
        _; 
    }

    function setHash(
        address myAddress,
        bytes32 name,
        bytes32 gender,
        bytes32 birthday,
        bytes32 university,
        bytes32 studentId,
        bytes32 major,
        bytes32 admissionDate,
        bytes32 graduationDate,
        bytes32 overallGrade,
        bytes32 majorGrade
    ) public onlyUniversity(){
        // hashContainer에 새로운 struct를 추가한다
        hashContainer[myAddress]._name = name;
        hashContainer[myAddress]._gender = gender;
        hashContainer[myAddress]._birthday = birthday;
        hashContainer[myAddress]._university = university;
        hashContainer[myAddress]._studentId = studentId;
        hashContainer[myAddress]._major = major;
        hashContainer[myAddress]._admissionDate = admissionDate;
        hashContainer[myAddress]._graduationDate = graduationDate;
        hashContainer[myAddress]._overallGrade = overallGrade;
        hashContainer[myAddress]._majorGrade = majorGrade;
    }

    function getHash(address myAddress) public view returns(
        bytes32,
        bytes32,
        bytes32,
        bytes32,
        bytes32,
        bytes32,
        bytes32,
        bytes32,
        bytes32,
        bytes32
    ){
        Container memory thisContainer = hashContainer[myAddress];

        return(
            thisContainer._name,
            thisContainer._gender,
            thisContainer._birthday,
            thisContainer._university,
            thisContainer._studentId,
            thisContainer._major,
            thisContainer._admissionDate,
            thisContainer._graduationDate,
            thisContainer._overallGrade,
            thisContainer._majorGrade
        );
    }
}