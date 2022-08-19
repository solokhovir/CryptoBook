require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  networks: {
    rinkeby: {
      url: "https://rinkeby.infura.io/v3/57220d50ecee477fad4f3eb692714609", //Infura url with projectId
      accounts: ["675352378dd508c68991b3fcaf1cec404c0e05860b88395f6e23a24fc547c82a"] // add the account that will deploy the contract (private key)
     },
   }
};
