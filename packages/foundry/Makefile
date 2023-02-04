-include .env


# Clean the repo
clean  :; forge clean

# Update Dependencies
update:; forge update

build:; forge build

test :; forge test 


deploy :; @forge script script/Contract.s.sol:MyScript --rpc-url ${HYPERSPACE_RPC_URL} --broadcast  -vvvv -g 500
