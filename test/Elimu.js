const { ethers } = require("hardhat");
const { expect } = require("chai");

describe("Elimu", function () {
  let Elimu, elimu, owner, addr1;

  beforeEach(async function () {
    Elimu = await ethers.getContractFactory("Elimu");
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
    elimu = await Elimu.deploy();
  });

  describe("Minting certificates", function () {
    it("Should mint a new certificate", async function () {
      const itemId = 1;
      const details = "Test certificate details";
      const tokenUri = "Test token URI";
      await elimu
        .connect(owner)
        .mintCertificate(addr1.address, itemId, details, tokenUri);

      const tokenId = 1;
      // Verify that the certificate was correctly minted
      const certificate = await elimu.getCertificate(tokenId);
      expect(certificate.licensedItemId).to.equal(itemId);
      expect(certificate.details).to.equal(details);
    });

    it("Should emit the CertificateMinted event upon minting", async function () {
      const itemId = 1;
      const details = "Test certificate details";
      const tokenUri = "Test token URI";
      await expect(
        elimu
          .connect(owner)
          .mintCertificate(addr1.address, itemId, details, tokenUri)
      )
        .to.emit(elimu, "CertificateMinted")
        .withArgs(1, addr1.address, itemId, details, tokenUri);
    });
  });

  describe("Querying certificates", function () {
    it("Should revert if querying a non-existent certificate", async function () {
      await expect(elimu.getCertificate(999)).to.be.revertedWith(
        "Certificate does not exist"
      );
    });
  });
});
