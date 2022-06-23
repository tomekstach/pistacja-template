## Info

**Module:** mod_menu

**Template:** top

**Description:** This is the view which we use to display a top menu items.

## Data

### {{ data.list }}

This is a list of all menu items. It should be displayed in such way:
```
{% if data.list|length > 0 %}
	<ul>
	{% for item in data.list %}
		<li>
			<a href="{{ item.flink }}" class="{{ data.class_sfx }} {% if item.id in data.path or (item.type == 'alias' and data.path|length > 0 and item.params.get('aliasoptions') == data.path|last) %} active{% endif %}" title="{{ item.anchor_title }}">{{ item.title }}</a>
		{% if item.deeper %}
		<ul>
		{% elseif item.shallower %}
			{% for i in range(1, item.level_diff) %}
			</ul></li>
			{% endfor %}
		{% else %}
		</li>
		{% endif %}
	{% endfor %}
	</ul>
{% endif %}
```

**Tips:**

 - Item link should be taken from:
 ```
{{ item.flink }}
 ```

 - Info about active element should be taken from the `data.path` for specific ID:
 ```
if item.id in data.path
 ```
 or for the `aliasoptions` for the an 'alias' **NOT TESTED**:
 ```
data.path|length > 0 and item.params.get('aliasoptions') == data.path|last
 ```

 - If the next item is deeper:
 ```
{% if item.deeper %}
 ```

 - If the next item is shallower:
 ```
{% elseif item.shallower %}
 ```

 - How many levels should be ended:
 ```
 {% for i in range(1, item.level_diff) %}
 </ul></li>
 {% endfor %}
 ```

### {{ data.base }}

This is a base menu item (usualy is the same as active).

### {{ data.active }}

This is an active menu item.

### {{ data.default }}

This is a default menu item for the webpage (home page).

### {{ data.active_id }}

This is a ID for active item.

### {{ data.default_id }}

This is a ID for default item.

### {{ data.path }}

This is a path for current subpage.

### {{ data.showAll }}

This is a showAll marker.

### {{ pageclass_sfx }}

CSS class suffix.
