__yadda = require('../helpers/_library')

<% _.each(scenarios, function (scenario) { %>
describe <%= JSON.stringify(scenario.title) %>, ->
<% _.each(scenario.steps, function(step) { %>
  it <%= JSON.stringify(step) %>, ->
    __yadda.yadda [<%= JSON.stringify(step) %>]
<% }) }) %>
