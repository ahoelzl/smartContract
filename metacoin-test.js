var MetaCoin = artifacts.require("./RedBlue.sol");

contract('RedBlue', function(accounts) {
//  it("should instantiate correctly", function(done) {
 //   MetaCoin.deployed().then(async function(instance) {
 //     meta = instance;
 //     var nextblock = await meta.nextBlock();
  //    assert.equal(nextblock.toNumber(), 0, "next block was not set correctly ");
   //   done();
  //  });
//});

  it("should add bet correctly",async function ()  {
    var instance =  await  MetaCoin.new(accounts[10]);
    console.log(web3.toWei(1, "ether"))
    meta = instance;
    var result = await meta.bet(0, 1, {from:accounts[0],  value: web3.toWei(2, "ether")})
    var amountRed = await meta.amountRed();
    console.log(amountRed.toNumber())
    assert.equal(amountRed.toNumber(), web3.toWei(2,'ether'), "added amount not correct " + meta.amountBlue());
    }); 

it("should add bet correctly2", async function ()  {
    var instance =  await  MetaCoin.new(accounts[11]);
    console.log(web3.toWei(1, "ether"))
    meta = instance;
    var result = await meta.bet(1, 0, {from:accounts[0],  value: web3.toWei(2, "ether")})
    var amountBlue = await meta.amountBlue();
    console.log(amountBlue.toNumber())
    assert.equal(amountBlue.toNumber(), web3.toWei(2,'ether'), "added amount not correct " + meta.amountBlue());
  });


it("correctly solve bets", async function ()  {
    var instance =  await  MetaCoin.new(accounts[12]);
    console.log(web3.toWei(1, "ether"))
    meta = instance;

    var balance1before  = await web3.eth.getBalance(accounts[0]).toNumber();
    var balance2before  = await web3.eth.getBalance(accounts[1]).toNumber();
    var result = await meta.bet(0, 0, {from:accounts[0],  value: web3.toWei(1, "ether")})
    var result2 = await meta.bet(1, 1, {from:accounts[1],  value: web3.toWei(2, "ether")})
     var metaBalance = await web3.eth.getBalance(meta.address).toNumber();
console.log("b1: " + balance1before + " b2: " + balance2before + " metabalance : " + metaBalance);


    var result3 = await meta.solve({from:accounts[2],  value: web3.toWei(0.001, "ether")})

    var balance1 = await web3.eth.getBalance(accounts[0]).toNumber();
    var balance2 = await web3.eth.getBalance(accounts[1]).toNumber();

    var diff1 = (balance1 - balance1before + parseInt(web3.toWei(1, "ether")))
    var diff2 = (balance2 - balance2before - parseInt(web3.toWei(1, "ether")))
  metaBalance = await web3.eth.getBalance(meta.address).toNumber();
console.log("b1: " + balance1 + " b2: " + balance2 + " metabalance : " + metaBalance);

    assert.isTrue(Math.abs(diff1)  < web3.toWei(0.1, "ether"), "added amount not correct ");
    assert.isTrue(Math.abs(diff2)< web3.toWei(0.1, "ether"), "added amount not correct 2");
});





it("correctly solve bets minor wins", async function ()  {
    var instance =  await  MetaCoin.new(accounts[12]);
    console.log(web3.toWei(1, "ether"))
    meta = instance;

    var balance1before  = await web3.eth.getBalance(accounts[0]).toNumber();
    var balance2before  = await web3.eth.getBalance(accounts[1]).toNumber();
    var result = await meta.bet(0, 0, {from:accounts[0],  value: web3.toWei(1, "ether")})
    var result2 = await meta.bet(1, 1, {from:accounts[1],  value: web3.toWei(4, "ether")})
     var metaBalance = await web3.eth.getBalance(meta.address).toNumber();
console.log("b1: " + balance1before + " b2: " + balance2before + " metabalance : " + metaBalance);


    var result3 = await meta.solve({from:accounts[2],  value: web3.toWei(0.001, "ether")})

    var balance1 = await web3.eth.getBalance(accounts[0]).toNumber();
    var balance2 = await web3.eth.getBalance(accounts[1]).toNumber();

    var diff1 = (balance1 - balance1before - parseInt(web3.toWei(4, "ether")))
    var diff2 = (balance2 - balance2before + parseInt(web3.toWei(4, "ether")))
  metaBalance = await web3.eth.getBalance(meta.address).toNumber();
console.log("b1: " + balance1 + " b2: " + balance2 + " metabalance : " + metaBalance);

    assert.isTrue(Math.abs(diff1)  < web3.toWei(0.14, "ether"), "added amount not correct ");
    assert.isTrue(Math.abs(diff2)< web3.toWei(0.14, "ether"), "added amount not correct 2");
});




it("correctly solve bets2", async function ()  {
    var instance =  await  MetaCoin.new(accounts[13]);
    console.log(web3.toWei(1, "ether"))
    meta = instance;

    var balance1before  = await web3.eth.getBalance(accounts[0]).toNumber();
    var balance2before  = await web3.eth.getBalance(accounts[1]).toNumber();
    var balance3before  = await web3.eth.getBalance(accounts[3]).toNumber();
    var metaBalance = await web3.eth.getBalance(meta.address).toNumber();
    console.log("b1: " + balance1before + " b2: " + balance2before + " b3: " + balance3before + " metabalance : " + metaBalance);

    var result = await meta.bet(0, 0, {from:accounts[0],  value: web3.toWei(1, "ether")})
    var result2 = await meta.bet(1, 1, {from:accounts[1],  value: web3.toWei(2, "ether")})
    var result2 = await meta.bet(0, 0, {from:accounts[3],  value: web3.toWei(3, "ether")})
    var result3 = await meta.solve({from:accounts[2],  value: web3.toWei(0.001, "ether")})

    var balance1 = await web3.eth.getBalance(accounts[0]).toNumber();
    var balance2 = await web3.eth.getBalance(accounts[1]).toNumber();
    var balance3 = await web3.eth.getBalance(accounts[3]).toNumber();
metaBalance = await web3.eth.getBalance(meta.address).toNumber();
console.log("b1: " + balance1 + " b2: " + balance2 + " b3: " + balance3 + " metabalance : " + metaBalance);

    var diff1 = (balance1 - balance1before - parseInt(web3.toWei(0.5, "ether")))
    var diff2 = (balance2 - balance2before + parseInt(web3.toWei(2, "ether")))
    var diff3 = (balance3 - balance3before - parseInt(web3.toWei(1.5, "ether")))

console.log("diff1: " + diff1 + " diff2: " + diff2 + " diff3: " + diff3);


    assert.isTrue(Math.abs(diff1)  < web3.toWei(0.1, "ether"), "added amount not correct ");
    assert.isTrue(Math.abs(diff2)< web3.toWei(0.1, "ether"), "added amount not correct 2");
    assert.isTrue(Math.abs(diff3)< web3.toWei(0.1, "ether"), "added amount not correct 3");
});



it("correctly solve bets2 minor wins", async function ()  {
    var instance =  await  MetaCoin.new(accounts[13]);
    console.log(web3.toWei(1, "ether"))
    meta = instance;

    var balance1before  = await web3.eth.getBalance(accounts[0]).toNumber();
    var balance2before  = await web3.eth.getBalance(accounts[1]).toNumber();
    var balance3before  = await web3.eth.getBalance(accounts[3]).toNumber();
    var metaBalance = await web3.eth.getBalance(meta.address).toNumber();
    console.log("b1: " + balance1before + " b2: " + balance2before + " b3: " + balance3before + " metabalance : " + metaBalance);

    var result = await meta.bet(0, 0, {from:accounts[0],  value: web3.toWei(1, "ether")})
    var result2 = await meta.bet(1, 1, {from:accounts[1],  value: web3.toWei(2, "ether")})
    var result2 = await meta.bet(1, 1, {from:accounts[3],  value: web3.toWei(3, "ether")})
    var result3 = await meta.solve({from:accounts[2],  value: web3.toWei(0.001, "ether")})

    var balance1 = await web3.eth.getBalance(accounts[0]).toNumber();
    var balance2 = await web3.eth.getBalance(accounts[1]).toNumber();
    var balance3 = await web3.eth.getBalance(accounts[3]).toNumber();
metaBalance = await web3.eth.getBalance(meta.address).toNumber();
console.log("b1: " + balance1 + " b2: " + balance2 + " b3: " + balance3 + " metabalance : " + metaBalance);

    var diff1 = (balance1 - balance1before - parseInt(web3.toWei(5, "ether")))
    var diff2 = (balance2 - balance2before + parseInt(web3.toWei(2, "ether")))
    var diff3 = (balance3 - balance3before + parseInt(web3.toWei(3, "ether")))

console.log("diff1: " + diff1 + " diff2: " + diff2 + " diff3: " + diff3);


    assert.isTrue(Math.abs(diff1)  < web3.toWei(0.18, "ether"), "added amount not correct ");
    assert.isTrue(Math.abs(diff2)< web3.toWei(0.18, "ether"), "added amount not correct 2");
    assert.isTrue(Math.abs(diff3)< web3.toWei(0.18, "ether"), "added amount not correct 3");
});




it("correctly solve bets2 minor wins", async function ()  {
    var instance =  await  MetaCoin.new(accounts[13]);
    console.log(web3.toWei(1, "ether"))
    meta = instance;

    var balance1before  = await web3.eth.getBalance(accounts[0]).toNumber();
    var balance2before  = await web3.eth.getBalance(accounts[1]).toNumber();
    var balance3before  = await web3.eth.getBalance(accounts[3]).toNumber();
    var metaBalance = await web3.eth.getBalance(meta.address).toNumber();
    console.log("b1: " + balance1before + " b2: " + balance2before + " b3: " + balance3before + " metabalance : " + metaBalance);

    var result = await meta.bet(0, 0, {from:accounts[0],  value: web3.toWei(1, "ether")})
    var result2 = await meta.bet(1, 1, {from:accounts[1],  value: web3.toWei(2, "ether")})
    var result2 = await meta.bet(1, 1, {from:accounts[3],  value: web3.toWei(3, "ether")})
    var result3 = await meta.solve({from:accounts[2],  value: web3.toWei(0.001, "ether")})

    var balance1 = await web3.eth.getBalance(accounts[0]).toNumber();
    var balance2 = await web3.eth.getBalance(accounts[1]).toNumber();
    var balance3 = await web3.eth.getBalance(accounts[3]).toNumber();
metaBalance = await web3.eth.getBalance(meta.address).toNumber();
console.log("b1: " + balance1 + " b2: " + balance2 + " b3: " + balance3 + " metabalance : " + metaBalance);

    var diff1 = (balance1 - balance1before - parseInt(web3.toWei(5, "ether")))
    var diff2 = (balance2 - balance2before + parseInt(web3.toWei(2, "ether")))
    var diff3 = (balance3 - balance3before + parseInt(web3.toWei(3, "ether")))

console.log("diff1: " + diff1 + " diff2: " + diff2 + " diff3: " + diff3);


    assert.isTrue(Math.abs(diff1)  < web3.toWei(0.18, "ether"), "added amount not correct ");
    assert.isTrue(Math.abs(diff2)< web3.toWei(0.18, "ether"), "added amount not correct 2");
    assert.isTrue(Math.abs(diff3)< web3.toWei(0.18, "ether"), "added amount not correct 3");
});




it("correctly solve bets minor wins betOther", async function ()  {

var instance =  await  MetaCoin.new(accounts[12]);
    console.log(web3.toWei(1, "ether"))
    meta = instance;


    var balance1before  = await web3.eth.getBalance(accounts[0]).toNumber();
    var balance2before  = await web3.eth.getBalance(accounts[1]).toNumber();
    var balance3before  = await web3.eth.getBalance(accounts[3]).toNumber();
    var metaBalance = await web3.eth.getBalance(meta.address).toNumber();
    console.log("b1: " + balance1before + " b2: " + balance2before + " b3: " + balance3before + " metabalance : " + metaBalance);

    var result = await meta.bet(1, 1, {from:accounts[0],  value: web3.toWei(1, "ether")})
    var result2 = await meta.bet(0, 1, {from:accounts[1],  value: web3.toWei(2, "ether")})
    var result2 = await meta.bet(0, 0, {from:accounts[3],  value: web3.toWei(3, "ether")})
    var result3 = await meta.solve({from:accounts[2],  value: web3.toWei(0.001, "ether")})

    var balance1 = await web3.eth.getBalance(accounts[0]).toNumber();
    var balance2 = await web3.eth.getBalance(accounts[1]).toNumber();
    var balance3 = await web3.eth.getBalance(accounts[3]).toNumber();
metaBalance = await web3.eth.getBalance(meta.address).toNumber();
console.log("b1: " + balance1 + " b2: " + balance2 + " b3: " + balance3 + " metabalance : " + metaBalance);

    var diff1 = (balance1 - balance1before - parseInt(web3.toWei(1, "ether")))
    var diff2 = (balance2 - balance2before - parseInt(web3.toWei(2, "ether")))
    var diff3 = (balance3 - balance3before + parseInt(web3.toWei(3, "ether")))

console.log("diff1: " + diff1 + " diff2: " + diff2 + " diff3: " + diff3);


    assert.isTrue(Math.abs(diff1)  < web3.toWei(0.1, "ether"), "added amount not correct ");
    assert.isTrue(Math.abs(diff2)< web3.toWei(0.1, "ether"), "added amount not correct 2");
    assert.isTrue(Math.abs(diff3)< web3.toWei(0.1, "ether"), "added amount not correct 3");
});



it("correctly solve bets2", async function ()  {
    var instance =  await  MetaCoin.new(accounts[13]);
    console.log(web3.toWei(1, "ether"))
    meta = instance;

    var balance1before  = await web3.eth.getBalance(accounts[0]).toNumber();
    var balance2before  = await web3.eth.getBalance(accounts[1]).toNumber();
    var balance3before  = await web3.eth.getBalance(accounts[3]).toNumber();
     var balance4before  = await web3.eth.getBalance(accounts[4]).toNumber();
     var balance5before  = await web3.eth.getBalance(accounts[5]).toNumber();
    var metaBalance = await web3.eth.getBalance(meta.address).toNumber();
    console.log("b1: " + balance1before + " b2: " + balance2before + " b3: " + balance3before + "b4: " + balance4before + " b5:" + balance5before +  " metabalance : " + metaBalance);


     var r1 = Math.random();
     var r2 = Math.random();
     var r3 = Math.random();
     var r4 = Math.random();
     var r5 = Math.random();

    var result = await meta.bet(0, 0, {from:accounts[0],  value: web3.toWei(r1* 5, "ether")})
    var result2 = await meta.bet(1, 1, {from:accounts[1],  value: web3.toWei(r2* 5, "ether")})
    var result2 = await meta.bet(0, 0, {from:accounts[3],  value: web3.toWei(r3* 5, "ether")})
    var result2 = await meta.bet(0, 0, {from:accounts[4],  value: web3.toWei(r4* 5, "ether")})
    var result2 = await meta.bet(1, 1, {from:accounts[5],  value: web3.toWei(r5* 5, "ether")})


     console.log("b1 bets " + r1 * 5 + " on 0");
       console.log("b2 bets " + r2 * 5 + " on 1");
 console.log("b3 bets " + r3 * 5 + " on 0");
 console.log("b4 bets " + r4 * 5 + " on 0");
  console.log("b5 bets " + r5 * 5 + " on 1");

    var result3 = await meta.solve({from:accounts[2],  value: web3.toWei(0.001, "ether")})

    var balance1 = await web3.eth.getBalance(accounts[0]).toNumber();
    var balance2 = await web3.eth.getBalance(accounts[1]).toNumber();
    var balance3 = await web3.eth.getBalance(accounts[3]).toNumber();
    var balance4 = await web3.eth.getBalance(accounts[4]).toNumber();
    var balance5 = await web3.eth.getBalance(accounts[5]).toNumber();

metaBalance = await web3.eth.getBalance(meta.address).toNumber();
console.log("b1: " + balance1 + " b2: " + balance2 + " b3: " + balance3 + "b4: " + balance4 + " b5:" + balance5 + " metabalance : " + metaBalance);

    var diff1 = balance1 - balance1before;
    var diff2 = balance2 - balance2before;
    var diff3 = (balance3 - balance3before)
    var diff4 = balance4 - balance4before;
    var diff5 = balance5 - balance5before

console.log("diff1: " + diff1 + " diff2: " + diff2 + " diff3: " + diff3 + " diff4: " + diff4 + " diff5: " + diff5);


});


});
