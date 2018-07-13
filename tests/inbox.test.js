const assert = require('assert');
const ganache = require('ganache-cli')
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
 const {interface, bytecode} = require('../compile')

let accounts;
let inbox

beforeEach(async()=>{
   accounts = await web3.eth.getAccounts();
   //use one account to deploy contract

   inbox = await new web3.eth.Contract(JSON.parse(interface))
   .deploy({data: bytecode, arguments: ['Hi There!']})
   .send({from: accounts[0], gas: '1000000'})

   
});

describe('Inbox', ()=>{
    it('deployes a contract', ()=>{
    assert.ok(inbox.options.address)
    
    });
    it('it has a default message', async ()=>{
    const message = await inbox.methods.message().call()
    assert.equal(message, 'Hi There!')
    })
    it('it can change messages', async ()=>{
        await inbox.methods.setMessage('Bye').send({from: accounts[0], gas: '1000000'});
        const message = await inbox.methods.message().call()
         assert.equal(message, 'Bye')

    })
})