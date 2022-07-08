## Info

**Module:** mod_finder

**Template:** default

**Description:** This is the view which we use to display a searchbox.

## Data

### {{ data.route }}

This is a url for the form action.

### {{ data.query }}

This is a query object.

### {{ data.search }}

This is a searched phrase.

### {{ data.subjects }}

This is a list of available subjects.

### {{ data.levels }}

This is a list of available levels.

### {{ data.types }}

This is a list of available types.

### {{ class_sfx }}

CSS class suffix.

**Tips:**

 - old version of searchbox:
 ```
 <!-- SEARCHBOX -->
 <section data-ee="SearchBox" data-mode="regular" data-click="hide()">
 	<a href="#" class="searchbox-button active" id="searchbox-button" data-click="open()"><i class="material-icons searchbox-button__icon">search</i></a>
 	<div class="searchbox" id="SearchBox" action="{{ jroute(data.route) }}">
 		<div class="searchbox__box">
 			<div class="searchbox__box__input">
 	  		<input id="SearchInput" type="text" name="search" value="{{ data.search }}" placeholder="Wpisz tytuł wideo, kod podstawy lub szukaną frazę...">
 				<a href="#" class="searchbox__box__input__close" data-click="close()"><i class="material-icons searchbox__box__input__close__icon">close</i></a>
 			</div>
 		</div>
 	</div>
 </section>
 <!-- ./SEARCHBOX -->
 ```
