## Info

**Component:** com_content

**View:** article

**Template:** default

**Description:** This is the view which we use to display a main subpage for specific article.

## Data

### {{ view }}

This is a main object for the view which contains all data and method.

### {{ params }}

It contains all params for this view. Best way to get data from params is using method `get` in a such way:
```
{% if params.get('show_title', 1) %}
```

### {{ pageclass_sfx }}

CSS class suffix.

### {{ item }}

Main object for the specific article - it contains all data such as title, description e.t.c.

**Tips:**

 - To display article image:
```
{% if images.image_fulltext %}
<div class="item-image">
  <img src="{{ images.image_fulltext }}" title="{{ images.image_fulltext_caption }}" alt="{{ images.image_fulltext_alt }}" itemprop="image"/>
</div>
{% endif %}
```

### {{ tags }}

Object with tags for a specific article.

**Tips:**

 - To display tags:
 ```
 {% if params.get('show_tags', 1) and tags.itemTags %}
   {{ jlayout_render('joomla.content.tags', tags.itemTags) }}
 {% endif %}
 ```

### {{ pagination }}

Object to prepare and display pagination.

**Tips:**

 - To display pagination:
 ```
 {% if item.pagination and item.pagination and item.paginationposition and item.paginationrelative %}
   {{ item.pagination }}
 {% endif %}
 ```

 - To display or not intro text:
 ```
 {% if params.get("show_intro", 1) and item.intro %}
   {{ item.intro|raw }}
   {{ item.fulltext|raw }}
 {% else %}
   {{ item.text|raw }}
 {% endif %}
 ```
