const { test, expect } = require('@playwright/test');

// ტესტების ჯგუფი (Test Suite) ლოგინის გვერდისთვის
test.describe('Login Functionality Tests', () => {

    // ტესტ-ქეისი 1: წარმატებული ავტორიზაცია
    test('Should login successfully with valid credentials', async ({ page }) => {
        
        // 1. გადავდივართ ლოგინის გვერდზე
        await page.goto('https://example.com/login');

        // 2. ვპოულობთ HTML ელემენტებს ID-ებით და ვავსებთ ველებს
        await page.fill('#username', 'test_user');
        await page.fill('#password', 'CorrectPassword123');

        // 3. ვაჭერთ შესვლის ღილაკს
        await page.click('#login-button');

        // 4. შემოწმება (Assertion): გადავიდა თუ არა გვერდი დეშბორდზე
        await expect(page).toHaveURL('https://example.com/dashboard');

        // 5. შემოწმება: გამოჩნდა თუ არა მისალმების ტექსტი
        const welcomeMessage = page.locator('.welcome-banner');
        await expect(welcomeMessage).toHaveText('Welcome, test_user!');
    });


    // ტესტ-ქეისი 2: უარყოფითი ტესტი (არასწორი პაროლი)
    test('Should show error message with invalid password', async ({ page }) => {
        
        // 1. გადავდივართ ლოგინის გვერდზე
        await page.goto('https://example.com/login');

        // 2. შეგვყავს სწორი იუზერი, მაგრამ არასწორი პაროლი
        await page.fill('#username', 'test_user');
        await page.fill('#password', 'WrongPassword');

        // 3. ვაჭერთ ღილაკს
        await page.click('#login-button');

        // 4. შემოწმება (Assertion): ამოვარდა თუ არა ერორის შეტყობინება
        const errorMessage = page.locator('.error-message');
        await expect(errorMessage).toBeVisible(); // უნდა ჩანდეს ეკრანზე
        await expect(errorMessage).toHaveText('Invalid username or password');
    });

});