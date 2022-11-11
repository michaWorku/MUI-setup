Feature:User Login

As a user
I want to get authenticated using my existing account
So that I can access Ride trusted clients(applications)

Feature: Login
    Scenario: Failed Login
        Given I am a registered user
        When I log in with the following detailss
            | email         | password   |
            |               |            |
            |test1gmail.com | 12         |
        Then I will not be logged in to my account
        And the system should display message
            | email                | password             |
            | Email is required    | Password is required |
            | Email is invalid     | Password to short    |

    Scenario: Successful Login
        Given I am a registered user
        When I log in with the following details
            | email   | password   |
            | <email> | <password> |
        Then I will be logged in securely to my account
        Examples:
            | email          | password |
            | example.2f.com | 123456   |