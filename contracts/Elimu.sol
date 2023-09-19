// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Elimu is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _courseIds;
    Counters.Counter private _tokenIds;

    struct Course {
        address creator;
        string courseData;
        address[] members;
    }

    struct Certificate{
        uint256 courseId;
        string details;
    }
    
    Course[] public courses;
    mapping(uint256 => Certificate) public certificates;

    event CourseCreated(uint256 indexed id, address indexed creator, string projectData);

    event CertificateMinted(uint256 tokenId, address owner, uint256 courseId, string details, string tokenUri);

    constructor() ERC721("Elimu Cert", "ELM") {}

     function createCourse(string memory _courseData) public {
        _courseIds.increment();
        uint256 newProjectId = _courseIds.current(); 
        courses.push(Course(msg.sender,_courseData,new address[](0)));
        emit CourseCreated(newProjectId, msg.sender, _courseData);
    }

    function mintCertificate(address recipient, uint256 courseId, string memory details,  string memory tokenUri) public returns (uint256) {
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();
        _safeMint(recipient, newTokenId);
        _setTokenURI(newTokenId, tokenUri);
        certificates[newTokenId] = Certificate(courseId, details);
        emit CertificateMinted(newTokenId, recipient, courseId, details, tokenUri);
        return newTokenId;
    }

    function getCertificate(uint256 tokenId) public view returns (Certificate memory) {
        require(_exists(tokenId), "Certificate does not exist");
        return certificates[tokenId];   
    }
}
