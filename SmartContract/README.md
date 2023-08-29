## compile smart contract
npx hardhat compile

## deploy smart contract to mumbai testnet
npx hardhat run deploy/deployMTPValidators.ts --network mumbai
npx hardhat run deploy/deploySigValidators.ts --network mumbai

## unit test
npx hardhat test

