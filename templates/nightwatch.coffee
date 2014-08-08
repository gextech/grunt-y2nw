<%= heading %>

module.exports =

<% _.each(features, function(feature) { _.each(feature.scenarios, function (scenario) { %>
  '<%= scenario.title %>': (browser) ->
    __yadda.yadda <%= JSON.stringify(scenario.steps) %>, { browser }
<% }) }) %>

  'Close Session': (browser) ->
    browser.end()
