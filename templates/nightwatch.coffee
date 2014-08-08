<%= heading %>

module.exports =

<% _.each(features, function(feature) { _.each(feature.scenarios, function (scenario) { %>
  <%= JSON.stringify(scenario.title) %>: (browser) ->
    __yadda.yadda <%= JSON.stringify(scenario.steps) %>, { browser }
<% }) }) %>

    browser.end()
