module.exports = {
  'Index test' : function (browser) {
    browser
      .url('http://localhost:8080/index.html')
      .waitForElementVisible('body', 1000)
      .assert.containsText('.brand-logo', 'Outside My Window')
      .assert.visible('#modal2')
      .assert.containsText('h3', 'ALLOW LOCATION SERVICES OR ENTER ZIP CODE')
      .click('.modal-close')

      .assert.containsText('h5', 'Outside My Window')
      .setValue('input[id=search]', '80209')
      .submitForm('form')
      .pause(3000)
      .assert.elementPresent("#test4")
      .assert.elementPresent("#test5")
      .assert.elementPresent("#test6")
      .assert.elementPresent("#test7")
      .assert.elementPresent("#alerts")
      .click('.btn-large')
      .pause(1000)
      // .assert.visible('#modal1')
      .click('.btn-flat')


      .end();
  }
};
