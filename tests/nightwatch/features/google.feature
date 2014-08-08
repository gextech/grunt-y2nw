Feature: Nightwatch Example

Scenario: Open Google and search for "nodejs"

    Given <GoogleSearch>
    When I search for "nodejs"
    Then should I see "joyent/node"
