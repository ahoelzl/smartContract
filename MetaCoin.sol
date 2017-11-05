pragma solidity ^0.4.4;

import "./ConvertLib.sol";
import "./math/SafeMath.sol";

// This is just a simple example of a coin-like contract.
// It is not standards compatible and cannot be expected to talk to other
// coin/token contracts. If you want to create a standards-compliant
// token, see: https://github.com/ConsenSys/Tokens. Cheers!

contract MetaCoin {
	enum TeamsEnum { red, blue}
	struct Bet {
        address addr;
        TeamsEnum added;
	TeamsEnum betted;
	uint value;
     }

    address constant  home = 0x96d1ba74E3C87283e8Ad25bcDfD3531B71b1E502;

     event Deposit(
          address indexed _from,
          uint amount
      );

	event Logging(
	string message,
	uint number
);

        

	uint public betIndex = 0;
 	uint public nextBlock = 0;
	mapping(uint => Bet) bets;
	uint public amountBlue = 0;
	uint public amountRed = 0 ;
	uint public bettedBlue = 0;
	uint public bettedRed = 0;
	uint lastSolved = 0;

	function MetaCoin() {
	}

	function bet(TeamsEnum add, TeamsEnum bet) payable {
	bets[betIndex] = Bet({addr: msg.sender, value: msg.value, added:add, betted: bet});
	betIndex = betIndex+1;

	if(add == TeamsEnum.red) {
        amountRed = SafeMath.add(amountRed,msg.value);
	} else {
	amountBlue = SafeMath.add(amountBlue,msg.value);
	}

	if(bet == TeamsEnum.red) {
	bettedRed = SafeMath.add(bettedRed,msg.value);
	} else {
	bettedBlue = SafeMath.add(bettedBlue, msg.value);
	}
	}

uint toTransfer = 0;
	function solve() payable {

	if(now < lastSolved + 1 * 1 days) {
 	return;
        }
	lastSolved = now;
	 Logging("amountred" , amountRed);
	Logging("amountblue", amountBlue);
	if((amountBlue > amountRed && amountRed*3 < amountBlue) || (amountRed > amountBlue && amountBlue * 3 > amountRed)) {
	for(uint i=0;i<=betIndex;i++) { 
	if(bets[i].betted == TeamsEnum.red) {
	Logging("this color red won" , uint(TeamsEnum.red));
        Logging("betted by this winning bet" , (bets[i].value) );
         Logging("betted by winning blue total" , bettedBlue );
        Logging("betted by losing red total:" ,   bettedRed);
	toTransfer = SafeMath.mul(SafeMath.div(970*bets[i].value,bettedRed) , bettedBlue)/1000 + bets[i].value;
	bets[i].addr.transfer(toTransfer);
	Deposit(bets[i].addr,toTransfer);
 	}
}
} else {
	for(uint j=0;j<=betIndex;j++) {
Logging("betted", uint(bets[i].betted));
        Logging("winner", uint(TeamsEnum.red));
Logging("betted.VALUE:", uint(bets[i].value));
	if(bets[j].betted == TeamsEnum.blue) {
	Logging("this color blue won", uint(TeamsEnum.blue));
	Logging("betted by this winning bet" , (bets[j].value) );
	 Logging("betted by winning blue total" , bettedBlue );
	Logging("betted by losing red total:" ,   bettedRed);
	toTransfer = SafeMath.mul(SafeMath.div(bets[j].value*970,bettedBlue) , bettedRed)/1000 + bets[j].value;
	bets[j].addr.transfer(toTransfer);
Deposit(bets[j].addr, toTransfer);
 	}
}

home.transfer(this.balance);


}

amountBlue = 0;
amountRed = 0 ;
bettedBlue = 0;
bettedRed = 0;
betIndex = 0;


}





}
