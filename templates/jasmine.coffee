<%= heading %>

<% _.each(features, function(feature) { _.each(feature.scenarios, function (scenario) { %>
describe <%= JSON.stringify(scenario.title) %>, ->
<% _.each(scenario.steps, function(step) { %>
  it <%= JSON.stringify(step) %>, ->
    __yadda.yadda [<%= JSON.stringify(step) %>]
<% }) }) }) %>
