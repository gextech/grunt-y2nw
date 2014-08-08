Feature: Nightwatch Example

Scenario: Open Google and search for "[Term]"

    Given <GoogleSearch>
    When I search for "[Term]"
    Then should I see "[Result]"

    Where:
      Term     | Result
      nodejs   | joyent/node
      selenium | Web Browser Automation
