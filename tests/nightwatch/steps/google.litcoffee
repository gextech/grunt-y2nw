$NUM (\d+)
$URL (https?:\/\/\S+)

- Given $URL

    (url_to_open) ->
      @browser.url url_to_open

- then I wait $NUM seconds? until $EL appears

    (wait_n_seconds, selector) ->
      @browser.waitForElementVisible selector, wait_n_seconds * 1000

- Given "$KEYWORD" into $EL

    (search_for, selector) ->
      @browser.setValue selector, search_for

- then I click $EL and wait $NUM seconds?

    (selector, wait_n_seconds) ->
      @browser.click(selector).pause wait_n_seconds * 1000

- then should I see "$TEXT" within $EL

    (text_for, selector) ->
      @browser.assert.containsText selector, text_for
