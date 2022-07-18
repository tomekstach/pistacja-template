## Info

**Component:** com_content

**View:** category

**Template:** blog

**Description:** This is the view which we use to display a list of articles as a blog list.

## Data

### {{ view }}

This is a main object for the view which contains all data and method.

### {{ params }}

It contains all params for this view. Best way to get data from params is using method `get` in a such way:
```
{% if params.get('show_page_heading') %}
...
{{ view.escape(params.get('page_subheading')) }}
```

### {{ pageclass_sfx }}

CSS class suffix.

### {{ category }}

Main object for the specific category - it contains all category data such as title, description e.t.c.

**Tips:**

 - To display category image:
```
{% if params.get('show_description_image') and category.getParams().get('image') %}
<img src="{{ category.getParams().get('image') }}" alt="{{ category.getParams().get('image_alt')|escape }}"/>
{% endif %}
```

### {{ afterDisplayTitle }}, {{ beforeDisplayContent }}, {{ afterDisplayContent }}

Specific data which can be added by the Joomla! plugins.

### {{ intro_items }}

All items (articles) which should be displayed in an intro part.

**Tips:**

 - To get item params:
```
{% set item_params = item.params %}
```
 - To get item images:
```
{% set images = item.images|json_decode %}
{{ dump(images) }}
```

### {{ lead_items }}

All items which should be displayed as leads.

### {{ pagination }}

Object to prepare and display pagination.

**Tips:**

 - To display pagination:
 ```
 {% if (params.def('show_pagination', 1) == 1 or params.get('show_pagination') == 2) and pagination.get('pages.total') > 1 %}
 <div class="pie-pagination">
   {% if params.def('show_pagination_results', 1) %}
     <p class="counter pull-right">{{ pagination.getPagesCounter() }}</p>
   {% endif %}
   {{ pagination.getPagesLinks()|raw }}
 </div>
 {% endif %}
 ```
