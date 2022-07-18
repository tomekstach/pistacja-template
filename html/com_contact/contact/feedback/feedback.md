## Info

**Component:** com_contact

**View:** contact

**Template:** feedback

**Description:** This is the view which we use to display contact form.

## Data

### {{ view }}

This is a main object for the view which contains all data and method.

### {{ params }}

It contains all params for this view.

### {{ pageclass_sfx }}

CSS class suffix.

### {{ item }}

Main object for this page.

**Tips:**

 - To display main image:
 ```
 <!-- PISTACJA LOGO -->
 <div class="contact__logo">
   <img src="{{ baseUrl }}/templates/{{ templateName }}/images/pi-glodni-wiedzy.png" alt="" width="190">
 </div>
 ```

 - To display breadcrumbs:
 ```
 {{ jposition("position-3") }}
 ```

### {{ fieldsets }}

Array which contains all fieldsets which contain all inputs/fields for the contact form.

**Tips**

 - To display main fields:
 ```
 <!-- CONTACT FORM -->
 <form class="contact__form" id="contact-form" action="{{ jroute('index.php') }}" method="post">
   <ul>
     <li class="contact__form__header">
       {{ jtext('COM_CONTACT_FORM_LABEL') }}
     </li>
     <li class="contact__form__user">
       <label for="jform_contact_name">{{ view.form.getLabel('contact_name')|raw }}</label>
       <input id="jform_contact_name" name="jform[contact_name]" class="required" type="text" placeholder="Wpisz swoje imię i nazwisko">
     </li>
     <li class="contact__form__email">
       <label for="jform_contact_email">{{ view.form.getLabel('contact_email')|raw }}</label>
       <input id="jform_contact_email" name="jform[contact_email]" class="validate-email required" type="text" placeholder="Wpisz swój adres e-mail">
     </li>
     <li class="contact__form__topic">
       <label for="jform_contact_emailmsg">{{ view.form.getLabel('contact_subject')|raw }}</label>
       <input id="jform_contact_emailmsg" name="jform[contact_subject]" class="required" type="text" value = "{% if url %}Zgłoś uwagę do strony: {{ url }}{% endif %}">
     </li>
     <li class="contact__form__message">
       <label for="jform_contact_message-lbl">{{ view.form.getLabel('contact_message')|raw }}</label>
       <textarea name="jform[contact_message]" id="jform_contact_message" class="required" cols="30" rows="10"></textarea>
     </li>
 ```

 - To display fields from fieldsets:
 ```
 {% for fieldset in fieldsets %}
   {% for field in fieldset.fields %}
     {% for item in field %}
   <li>
     <div class="control-group">
       {% if item.hidden %}
         <div class="controls">
           {{ item.inputHTML|raw }}
         </div>
       {% else %}
         <div class="control-label">
           {{ item.labelHTML|raw }}
           {% if item.required and item.type != 'Spacer' %}
             <span class="optional">{{ jtext('COM_CONTACT_OPTIONAL') }}</span>
           {% endif %}
         </div>
         <div class="controls">{{ item.inputHTML|raw }}</div>
       {% endif %}
     </div>
   </li>
     {% endfor %}
   {% endfor %}
 {% endfor %}
 ```

 - To display RODO clause:
 ```
 <li class="contact__form__text">
   <p>{{ jtext('COM_CONTACT_RODO_TEXT')|raw }}</p>
 </li>
 <li class="contact__form__consent">
   <input type="checkbox" name="consent" id="consent" class="required"> <label for="consent">{{ jtext('COM_CONTACT_CONSENT')|raw }}</label>
 </li>
 ```

 - To display submit button and end of the form:
 ```
   <li class="contact__form__submit">
     <button type="submit" disabled>{{ jtext('COM_CONTACT_CONTACT_SEND') }}</button>
     <input type="hidden" name="option" value="com_contact" />
     <input type="hidden" name="task" value="contact.submit" />
     <input type="hidden" name="return" value="{{ view.return_page }}" />
     <input type="hidden" name="id" value="{{ view.contact.slug }}" />
     {{ jhtml('form.token') }}
   </li>
  </ul>
  </form>
  <!-- ./CONTACT FORM -->
 ```

### {{ baseUrl }}

Main url for the website.

### {{ current }}

Current url.

### {{ templateName }}

Name of the current template which is use for the website - this is very useful to create a path for the images which are inside the template.
