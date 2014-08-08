Feature: Nightwatch Example

Scenario: Open Google

    Given http://google.com
    then I wait 1 second until body appears

Scenario: Search for "nodejs"

    Given "nodejs" into input[type=text]
    then I wait 1 second until button[name=btnG] appears
    then I click button[name=btnG] and wait 1 second
    then should I see "joyent/node" within #ires
