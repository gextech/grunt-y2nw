__Yadda = require('yadda')
__dictionary = new __Yadda.Dictionary()

<% _.each(patterns, function(pattern, name) { %>
.define('<%= name %>', <%= pattern.indexOf('$') > -1 ? JSON.stringify(pattern) : '/' + pattern + '/' %>)
<% }) %>

<%= code %>

__library = __Yadda.localisation.<%= language %>.library(__dictionary)

<% _.each(steps, function(set, file) { _.each(set, function(step) { %>
.<%= step.method %> <%= JSON.stringify(step.label) %>, <%= step.code %>
<% }) }) %>

__yadda = new __Yadda.Yadda __library

<% _.each(features, function(feature) { _.each(feature.scenarios, function (scenario) { %>
describe <%= JSON.stringify(scenario.title) %>, ->
<% _.each(scenario.steps, function(step) { %>
  it <%= JSON.stringify(step) %>, ->
    __yadda.yadda [<%= JSON.stringify(step) %>]
<% }) }) }) %>