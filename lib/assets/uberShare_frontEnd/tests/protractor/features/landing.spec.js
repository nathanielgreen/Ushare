describe('user landing page - login', function() {
    it ('should not allow users to proceed with blank input fields', function() {
        browser.get('http://localhost:3000');
        element(by.id('login_button')).click();
        expect(element(by.binding('validationPrompt')).getText()).
            toEqual('invalid email/password combination');
    });
});