Feature: Nightwatch Example

Scenario: Open Google

    Given http://google.com
    Then I wait 1 second until <body> appears

Scenario: Search for "nodejs"

    Given "nodejs" into <input[type=text]>
    Then I wait 1 second until <button[name=btnG]> appears
    Then I click <button[name=btnG]> and wait 1 second
    Then should I see "joyent/node" within <#ires>
