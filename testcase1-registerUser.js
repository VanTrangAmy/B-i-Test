describe('exercise', () => {
    beforeEach(() => {
        cy.visit('https://automationexercise.com/')
        //    4. Click on 'Signup / Login' button

    })
    let randomEmail = 'trang' + Math.floor(Math.random() * 111111) + "@gmail.com"
    let signUpName = "Trang"
    it('Test case 1: Should register user successfully', () => {
        cy.get("a[href='/login']").click()
        //    5. Verify 'New User Signup!' is visible
        cy.get(".signup-form").should('be.visible')
        //    6. Enter name and email address
        cy.get("input[data-qa='signup-name']").type(signUpName)
        cy.get("input[data-qa='signup-email']").type(randomEmail)
        //    7. Click 'Signup' button
        cy.get("button[data-qa='signup-button']").click()
        //    8. Verify that 'ENTER ACCOUNT INFORMATION' is visible
        cy.get(".login-form").should('be.visible')
        //    9. Fill details: Title, Name, Email, Password, Date of birth
        cy.get("#id_gender2").click()
        cy.get("#password").type("123456")
        cy.get("#days").select(28)
        cy.get("#months").select(5)
        cy.get("#years").select("1991")
        //    10. Select checkbox 'Sign up for our newsletter!'
        cy.get("#newsletter").click()
        //    11. Select checkbox 'Receive special offers from our partners!'
        cy.get("#optin").click()
        //    12. Fill details: First name, Last name, Company, Address, Address2, Country, State, City, Zipcode, Mobile Number
        cy.get("#first_name").type("Trang")
        cy.get("#last_name").type("Tran")
        cy.get("#company").type("CMC")
        cy.get("#address1").type("Duy Tân")
        cy.get("#address2").type("Hà Nội")
        cy.get("#country").select("Canada")
        cy.get("#state").type("Vietnam")
        cy.get("#city").type("Vietnam")
        cy.get("#zipcode").type("10000")
        cy.get("#mobile_number").type("0921239432443")
        //    13. Click 'Create Account button'
        cy.get("button[data-qa='create-account']").click()
        //    14. Verify that 'ACCOUNT CREATED!' is visible
        cy.get(".col-sm-9").should('be.visible')
        //    15. Click 'Continue' button
        cy.get("a[data-qa='continue-button']").click()
        //    16. Verify that 'Logged in as username' is visible
        cy.get("ul li").contains('Logged in as ' + signUpName).should('be.visible')
        // //    17. Click 'Delete Account' button
        // cy.get("a[href='/delete_account']").click()
        // //    18. Verify that 'ACCOUNT DELETED!' is visible and click 'Continue' button
        // cy.get(".col-sm-9").should('be.visible')
        // cy.get("a[data-qa='continue-button']").click()

    })
    it('Test case 2: Login User with correct email and password', () => {
        cy.get("a[href='/login']").click()
        // 5. Verify 'Login to your account' is visible 
        cy.get(".login-form").should('be.visible')

        // 6. Enter correct email address and password
        cy.get("input[data-qa='login-email']").type(randomEmail)
        cy.get("input[data-qa='login-password']").type("123456")
        // 7. Click 'login' button
        cy.get("button[data-qa='login-button']").click()
        // 8. Verify that 'Logged in as username' is visible
        cy.get("ul li").contains(' Logged in as ' + signUpName).should('be.visible')
        // // 9. Click 'Delete Account' button
        // cy.get("a[href='/delete_account']").click()
        // // 10. Verify that 'ACCOUNT DELETED!' is visible
        // cy.get(".col-sm-9").should('be.visible')
    })
    it('Test Case 3: Login User with incorrect email and password', () => {
        cy.get("a[href='/login']").click()
        // 6. Enter incorrect email address and password
        cy.get("input[data-qa='login-email']").type(randomEmail)
        cy.get("input[data-qa='login-password']").type("1234567")
        // 7. Click 'login' button
        cy.get("button[data-qa='login-button']").click()
        // 8. Verify error 'Your email or password is incorrect!' is visible
        cy.get("p").contains("Your email or password is incorrect!").should('be.visible')
    })
    it('Test Case 4: Logout User', () => {
        cy.get("a[href='/login']").click()

        // 6. Enter correct email address and password
        cy.get("input[data-qa='login-email']").type(randomEmail)
        cy.get("input[data-qa='login-password']").type("123456")
        // 7. Click 'login' button
        cy.get("button[data-qa='login-button']").click()
        // 9. Click 'Logout' button
        cy.get("a[href='/logout']").click()
        // 10. Verify that user is navigated to login page
        cy.location().should((loc) => {
            expect(loc.href).to.eq(
                'https://automationexercise.com/login'
            )
        })
    })
    it('Test Case 5: Register User with existing email', () => {
        cy.get("a[href='/login']").click()

        // 6. Enter name and already registered email address
        cy.get("input[data-qa='signup-name']").type(signUpName)
        cy.get("input[data-qa='signup-email']").type(randomEmail)
        // 7. Click 'Signup' button
        cy.get("button[data-qa='signup-button']").click()
        // 8. Verify error 'Email Address already exist!' is visible
        cy.get("form p").contains('Email Address already exist!').should('be.visible')

    })
    it('Test Case 6: Contact Us Form', () => {

        // 4. Click on 'Contact Us' button
        cy.get("a[href='/contact_us']").click()
        // 5. Verify 'GET IN TOUCH' is visible
        cy.get(".contact-form").should('be.visible')
        // 6. Enter name, email, subject and message
        cy.get("input[name='name']").type("Trang")
        cy.get("input[name='email']").type("trang@mail.com")
        cy.get("input[name='subject']").type("Test subject")
        cy.get("#message").type("To test subject thôi")
        // 7. Upload file
        cy.get("input[name='upload_file']").selectFile("cypress/fixtures/fileUpload.png")
        // 8. Click 'Submit' button
        cy.get("input[data-qa='submit-button']").click()
        // 9. Click OK button
        cy.on('window:confirm', () => true)
        // 10. Verify success message 'Success! Your details have been submitted successfully.' is visible
        cy.get(".status").contains('Success! Your details have been submitted successfully.').should('be.visible')
        // 11. Click 'Home' button and verify that landed to home page successfully
        cy.get(".btn-success").click()
        cy.location().should((loca) => {
            expect(loca.href).to.eq(
                'https://automationexercise.com/'
            )
        })
    })
    it('Test Case 7: Verify Test Cases Page', () => {

        // 4. Click on 'Test Cases' button
        cy.contains(' Test Cases').click()
        // 5. Verify user is navigated to test cases page successfully
        cy.location().should((loctc) => {
            expect(loctc.href).to.eq(
                'https://automationexercise.com/test_cases'
            )
        })

    })
    it('Test Case 8: Verify All Products and product detail page', () => {

        // 4. Click on 'Products' button
        cy.get("a[href='/products']").click()
        // 5. Verify user is navigated to ALL PRODUCTS page successfully
        cy.location().should((locprod) => {
            expect(locprod.href).to.eq(
                'https://automationexercise.com/products'
            )
        })
        // 6. The products list is visible
        cy.get(".features_items").should('be.visible')
        // 7. Click on 'View Product' of first product
        cy.get("a[href='/product_details/1']").click()
        // 8. User is landed to product detail page
        cy.location().should((locprod1) => {
            expect(locprod1.href).to.eq(
                'https://automationexercise.com/product_details/1'
            )
        })
        // 9. Verify that detail detail is visible: product name, category, price, availability, condition, brand
        cy.get(".col-sm-7").within(() => {
            cy.get('div h2').should('be.visible')
            cy.get("p").should('be.visible')
            cy.get("span span").should('be.visible')
            cy.get("span label").contains('Quantity:').should('be.visible')
            cy.get("p b").contains('Availability:').should('be.visible')
            cy.get("p b").contains('Condition:').should('be.visible')
            cy.get("p b").contains('Brand:').should('be.visible')

        })

    })
    it('Test Case 9: Search Product', () => {

        // 4. Click on 'Products' button
        cy.get("a[href='/products']").click()
        // 5. Verify user is navigated to ALL PRODUCTS page successfully
        cy.location().should((locprod) => {
            expect(locprod.href).to.eq(
                'https://automationexercise.com/products'
            )
        })
        // 6. Enter product name in search input and click search button\
        cy.get("#search_product").type("Pink")
        cy.get("#submit_search").click()
        // 7. Verify 'SEARCHED PRODUCTS' is visible
        cy.get(".features_items").should('be.visible')
        // 8. Verify all the products related to search are visible
        cy.get('.features_items').find("div .productinfo p").each((productName) => {
            cy.wrap(productName).should('contain.text', 'Pink')

        })

    })
    it('Test Case 10: Verify Subscription in home page', () => {

        // 5. Verify text 'SUBSCRIPTION'
        cy.get("div .single-widget h2").should('have.text', 'Subscription')
        // 6. Enter email address in input and click arrow button
        cy.get("#susbscribe_email").type('trang@mail.com')
        cy.get("#subscribe").click()
        // 7. Verify success message 'You have been successfully subscribed!' is visible
        cy.get(".alert-success").should('have.text','You have been successfully subscribed!')

    })

})
