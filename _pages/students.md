---
layout: people
permalink: /students/
title: "People@TAI Lab"
author_profile: false
---

<section class="people-section" aria-labelledby="principal-investigator">
  <h2 id="principal-investigator">Principal Investigator</h2>
  <div class="people-pi">
    <img class="people-pi-photo" src="{{ '/images/profile.png' | relative_url }}" alt="Enyan Dai" width="152" height="152">
    <div>
      <h3>Enyan Dai</h3>
      <p class="people-pi-role">Assistant Professor</p>
      <p class="people-pi-bio">Enyan obtained his Ph.D. from the Pennsylvania State University. He has published over 30 papers in top-tier venues including ICLR (Spotlight), KDD, NeurIPS, WWW, and TKDE. As of 2025, he has over 1,900 Google Scholar citations and an h-index of 18.</p>
    </div>
  </div>
</section>

<div class="people-groups">
{% for group in site.data.people %}
<section class="people-section people-section--{{ group.id }}" aria-labelledby="people-{{ group.id }}">
  <h2 id="people-{{ group.id }}">{{ group.title }}</h2>
  <ul class="people-grid people-grid--{{ group.id }}">
    {% for member in group.members %}
    <li class="people-member">
      <span class="people-portrait{% if member.portrait %} people-portrait--{{ member.portrait }}{% endif %}">
        {% assign image_start = member.image | slice: 0, 1 %}
        {% if image_start == '/' %}
          {% assign image_url = member.image | relative_url %}
        {% else %}
          {% assign image_url = member.image %}
        {% endif %}
        <img src="{{ image_url | escape }}" alt="Portrait of {{ member.name | escape }}" width="116" height="116" loading="lazy" decoding="async">
      </span>
      <h3 class="people-name">{% if member.url %}<a href="{{ member.url | escape }}">{{ member.name }}</a>{% else %}{{ member.name }}{% endif %}</h3>
      <p class="people-role">{{ member.role }}</p>
      {% if member.education.size > 0 %}
      <p class="people-education">{% for degree in member.education %}<span>{{ degree }}</span>{% endfor %}</p>
      {% endif %}
      {% if member.note %}<p class="people-note">{{ member.note }}</p>{% endif %}
    </li>
    {% endfor %}
  </ul>
</section>
{% endfor %}
</div>
