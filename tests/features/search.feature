Feature: Nightwatch Example

Scenario: [Engine] search engine

    Given [Engine]Search
    When I search for "[Term]"
    Then should I see "[Result]"

    Examples:
      Engine | Term            | Result
      Google | nodejs          | nodejs.org
      Google | selenium        | Web Browser Automation
      Bing   | Grupo Expansión | grupoexpansion.mx
