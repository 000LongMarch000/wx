{{#if data}}
<label>{{name}}</label>
<select>
  {{#each data}}
  <option value="{{id}}">{{value}}</option>
  {{/each}}
</select>
{{/if}}
