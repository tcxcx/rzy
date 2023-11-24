const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../backend/app');

chai.use(chaiHttp);
chai.should();

describe("POST /redeem-promo", () => {
  it("should redeem a promo and insert user activities and coupon data", (done) => {
    const walletAddress = '0x123'; // Replace with a valid wallet address
    const promo = {
      businessName: 'Test Business',
      tokens: 100,
      email: 'test@example.com',
    };

    chai.request(app)
      .post('/redeem-promo')
      .send({
        wallet_address: walletAddress,
        businessName: promo.businessName,
        tokens: promo.tokens,
        email: promo.email,
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('Promo redeemed successfully');
        done();
      });
  });
});
