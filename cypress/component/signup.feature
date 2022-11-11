Feature:User Register
As unregistered user
I want to  create an account
So that I can use the application

Feature: Registration
    @sucess
    Scenario: Successful Registration
        Given I am in registration page
        When I registered with the following details
            | firstName   | middleName   | lastName   | phoneNumber   | email   | password   | passwordConfirm   |
            | <firstName> | <middleName> | <lastName> | <phoneNumber> | <email> | <password> | <passwordConfirm> |

        Then I will have a new account and a notice message displayed
        Examples:
            | firstName   | middleName   | lastName   | phoneNumber   | email   | password   |  passwordConfirm |
            | testuser1  | testuser1   | testuser1 | 0925252525   | test1@gmail.com | 12345678  | 12345678 |
    @fail
    Scenario: Failed Registration
        Given I am in registration pagee
        When I registered with the following detailss
            | firstName   | middleName   | lastName   | phoneNumber   | email          | password   | passwordConfirm   | 
            |             |              |            |               |                |            |                   |
            |             |              |            |               | test1gmail.com | 12         | 1234              |
        Then I will not have a new account
        And a validation notice displayed
            | firstName              | middleName              | lastName              | phoneNumber              | email                | password             | passwordConfirm                   |
            | First name is required | Middle name is required | Last name is required | Phone number is required | email is required    | password is required | password confirmation is requried |
            |                        |                         |                       |                          | Email is invalid     | Password to short    | Password is not correct           |
            